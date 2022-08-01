import path from 'path'
import fs from 'fs'
import {src, dest, watch} from 'gulp'
import rename from 'gulp-rename'
import filter from 'gulp-filter'
import es from 'event-stream'
import {merge} from 'lodash'
import ejs from 'ejs'
import chalk from 'chalk'
import spawn from 'cross-spawn'
import * as babel from '@babel/core'
import type {IPluginContext} from '@tarojs/service'
import {mergeTaroPages} from './taroUtils'
import {
    getNextExportedFunctions,
    resolveDynamicPagesToRewrites,
    getNextPageInfos
} from './nextUtils'
import getNextSassOptions from './scssUtils'
import {
    ensureLeadingSlash,
    resolveScriptPath,
    parseJson,
    unIndent,
    resolveAliasToTSConfigPaths
} from './utils'
import { SCRIPT_EXTS } from './constants'
import openBrowser from './openBrowser'

const isWindows = process.platform === 'win32'

const DEFAULT_ROUTER_CONFIG = {
    mode: 'browser',
    customRoutes: {}
}

const DEFAULT_POSTCSS_OPTIONS = ['autoprefixer', 'pxtransform', 'cssModules']

const DEFAULT_AUTOPREFIXER_OPTION = {
    enable: true,
    config: {
        flexbox: 'no-2009'
    }
}

const DEFAULT_PORT = '10086'

interface PluginOptions {
    /**
     * 是否启动 nextjs
     */
    runNextjs?: boolean
    /**
     * 是否打开浏览器
     */
    browser?: boolean
}

export default (ctx: IPluginContext, pluginOpts: PluginOptions) => {
    const {paths, helper, runOpts} = ctx
    const {appPath, outputPath, sourcePath, configPath} = paths

    const runNextjs = pluginOpts.runNextjs == null && true
    const browser = pluginOpts.browser == null && true

    ctx.registerCommand({
        name: 'start',
        optionsMap: {
            '-p, --port': 'A port number on which to start the application'
        },
        synopsisList: [
            'taro start -p <port>'
        ],
        fn () {
            const port = runOpts.port || runOpts.p || DEFAULT_PORT
            spawn.sync('next', ['start', outputPath, '-p', port], {
                stdio: 'inherit'
            })
        }
    })

    ctx.registerPlatform({
        name: 'nextjs',
        useConfigName: 'h5',
        async fn({config}) {
            const {
                router = DEFAULT_ROUTER_CONFIG,
                env,
                defineConstants,
                mode,
                alias = {},
                sass = {},
                designWidth = 750,
                postcss = {},
                isWatch,
                devServer = {}
            } = config

            if (router.mode !== 'browser') {
                throw new Error('Next.js only support `browser` router mode.')
            }

            const appConfigFilePath = resolveScriptPath(path.join(sourcePath, `${helper.ENTRY}.config`))
            const appConfig = helper.readConfig(appConfigFilePath)
            const appFilePath = resolveScriptPath(path.join(sourcePath, helper.ENTRY))

            const outputSourcePath = path.join(outputPath, 'src')
            const outputAppFilePath = path.join(outputSourcePath, helper.ENTRY) + path.extname(appFilePath)
            const nextAppFilePath = path.join(outputPath, 'pages/_app.jsx')

            const templateDir = path.resolve(__dirname, '../template')

            const taroPages = mergeTaroPages(appConfig.pages, appConfig.subPackages)

            const customRoutes = Object.create(null)
            if (router.customRoutes) {
                for (const key of Object.keys(router.customRoutes)) {
                    customRoutes[ensureLeadingSlash(key)] = router.customRoutes[key]
                }
            }

            const additionalData = await getNextSassOptions(sass)

            const nextPageInfos = await getNextPageInfos(sourcePath, taroPages, customRoutes)

            function createNextjsPages() {
                const nextjsPagesDir = `${outputPath}/pages`

                for (const pageInfo of nextPageInfos) {
                    const nextRoute = pageInfo.route

                    const targetPageFile = nextRoute && nextRoute !== '/' ? `${nextRoute}.js` : 'index.js'
                    const nextjsPageFilePath = path.join(nextjsPagesDir, targetPageFile)

                    const nextjsPageDir = path.dirname(nextjsPageFilePath)
                    if (!fs.existsSync(nextjsPageDir)) {
                        fs.mkdirSync(nextjsPageDir, {recursive: true})
                    }

                    const exportedFunctions = getNextExportedFunctions(path.join(sourcePath, pageInfo.file))

                    const request = path.join(outputSourcePath, pageInfo.request)
                    const modulePath = path.relative(nextjsPageDir, request)

                    const configAbsolutePath = helper.resolveMainFilePath(`${request}.config`)

                    let contents: string
                    if (fs.existsSync(configAbsolutePath)) {
                        // 读取 Taro 页面配置
                        // 注意：需要处理 definePageConfig 宏函数
                        const res = babel.transformFileSync(configAbsolutePath, {
                            presets: [['@babel/preset-env']],
                            plugins: ['@babel/plugin-proposal-class-properties']
                        })
                        const macro = 'function definePageConfig(config) { return config }\n'
                        const code = macro + res!.code as string
                        const pageConfig = eval(code)

                        contents = unIndent`
                            import {TaroPage} from 'tarojs-plugin-platform-nextjs/taro'
                            import Page from '${modulePath}'
                            
                            const pageConfig = {
                                backgroundColor: ${JSON.stringify(pageConfig.backgroundColor)}
                            }

                            export default function NextPage(props) {
                                return <TaroPage {...props} Page={Page} pageConfig={pageConfig} />
                            }
                        `
                    } else {
                        contents = unIndent`
                            import {TaroPage} from 'tarojs-plugin-platform-nextjs/taro'
                            import Page from '${modulePath}'

                            export default function NextPage(props) {
                                return <TaroPage {...props} Page={Page} />
                            }
                        `
                    }
                    if (exportedFunctions.length) {
                        contents += `\nexport {${exportedFunctions.join(', ')}} from '${modulePath}'`
                    }
                    fs.writeFileSync(nextjsPageFilePath, contents, {encoding: 'utf-8'})
                }

                // 处理自定义路由
                const customRoutesFilePath = path.join(outputPath, 'customRoutes.json')
                fs.writeFileSync(customRoutesFilePath, JSON.stringify(customRoutes, null, '  '), {encoding: 'utf-8'})

                // 处理 next.js 错误处理页面
                for (const errorPage of ['_error', '404', '500']) {
                    const pagePath = resolveScriptPath(path.join(sourcePath, errorPage))
                    if (fs.existsSync(pagePath)) {
                        const modulePath = path.relative(nextjsPagesDir, path.join(outputSourcePath, errorPage))
                        const contents = `export {default} from '${modulePath}'`
                        const nextjsErrorPagePath = path.join(nextjsPagesDir, `${errorPage}.js`)
                        fs.writeFileSync(nextjsErrorPagePath, contents, {encoding: 'utf-8'})
                    }
                }
            }
            createNextjsPages()

            function scaffold() {
                return es.merge(
                    src(`${appPath}/*.d.ts`).pipe(dest(outputPath)),
                    src(`${sourcePath}/**`)
                        .pipe(filter(file => {
                            const stat = fs.statSync(file.path)
                            if (stat.isDirectory()) {
                                return true
                            }

                            const ext = path.extname(file.path)
                            if (!SCRIPT_EXTS.includes(ext)) {
                                return true
                            }

                            const dir = path.dirname(file.path)
                            const name = path.basename(file.path, ext)
                            const specifiedFilePath = path.join(dir, `${name}.h5${ext}`)
                            return !fs.existsSync(specifiedFilePath)
                        }))
                        .pipe(rename(p => {
                            const secondaryExt = path.extname(p.basename)
                            if (secondaryExt === '.h5') {
                                p.basename = path.basename(p.basename, secondaryExt)
                            }
                        }))
                        .pipe(dest(outputSourcePath)),
                    src(`${templateDir}/pages/_app.ejs`)
                        .pipe(es.through(function (data) {
                            const ejsData = {
                                designWidth
                            }
                            const result = ejs.render(data.contents.toString(), ejsData)
                            data.contents = Buffer.from(result)

                            this.emit('data', data)
                        }))
                        .pipe(rename('_app.jsx'))
                        .pipe(dest(path.join(outputPath, 'pages'))),
                    src(`${templateDir}/pages/_document.jsx`).pipe(dest(path.join(outputPath, 'pages'))),
                    src(`${appPath}/config/**`).pipe(dest(path.join(outputPath, 'config'))),
                    src(`${templateDir}/next.config.ejs`)
                        .pipe(es.through(function (data) {
                            const dynamicPages = nextPageInfos
                                .filter(pageInfo => pageInfo.dynamic)
                                .map(pageInfo => pageInfo.route)
                            const rewrites = resolveDynamicPagesToRewrites(dynamicPages)

                            const customNextConfigPath = path.join(path.dirname(configPath), 'next.config.js')
                            let customNextConfig: string | null = null
                            if (fs.existsSync(customNextConfigPath)) {
                                customNextConfig = path.relative(outputPath, customNextConfigPath)
                            }

                            const multipleRoutePages = Object.values(customRoutes).filter(value => Array.isArray(value)) as string[][]
                            for (const multipleRoute of multipleRoutePages) {
                                for (const source of multipleRoute.slice(1)) {
                                    rewrites.push({
                                        source: ensureLeadingSlash(source),
                                        destination: ensureLeadingSlash(multipleRoute[0])
                                    })
                                }
                            }

                            const ejsData = {
                                env,
                                defineConstants,
                                additionalData,
                                rewrites,
                                customNextConfig
                            }
                            const result = ejs.render(data.contents.toString(), ejsData)
                            data.contents = Buffer.from(result)

                            this.emit('data', data)
                        }))
                        .pipe(rename('next.config.js'))
                        .pipe(dest(outputPath)),
                    src(`${templateDir}/postcss.config.ejs`)
                        .pipe(es.through(function (data) {
                            const plugins = Object.entries(postcss).reduce((result, info) => {
                                const [pluginName, pluginOption] = info as any;
                                if (
                                    !DEFAULT_POSTCSS_OPTIONS.includes(pluginName) &&
                                    pluginOption?.enable
                                ) {
                                    const isRelative = pluginName.startsWith('./') ||
                                        pluginName.startsWith('../') ||
                                        ((isWindows && pluginName.startsWith('.\\')) ||
                                        pluginName.startsWith('..\\'))

                                    let request = pluginName
                                    if (isRelative) {
                                        const absolutePath = path.join(appPath, pluginName)
                                        request = path.relative(outputPath, absolutePath)
                                    }

                                    const plugin = {
                                        request,
                                        option: pluginOption
                                    }
                                    result.push(plugin)
                                }

                                return result
                            }, [] as {request: string, option: Record<string, any>}[])

                            const autoprefixerOption = merge({}, DEFAULT_AUTOPREFIXER_OPTION, postcss.autoprefixer)
                            const ejsData = {
                                designWidth,
                                autoprefixerOption: autoprefixerOption.enable
                                    ? JSON.stringify(autoprefixerOption.config)
                                    : null,
                                plugins
                            }
                            const result = ejs.render(data.contents.toString(), ejsData)
                            data.contents = Buffer.from(result)

                            this.emit('data', data)
                        }))
                        .pipe(rename('postcss.config.js'))
                        .pipe(dest(outputPath)),
                    src(`${templateDir}/babel.config.ejs`)
                        .pipe(es.through(function (data) {
                            const ejsData = {
                                nextAppFilePath: JSON.stringify(path.relative(outputPath, nextAppFilePath)),
                                outputAppFilePath: JSON.stringify(path.relative(outputPath, outputAppFilePath)),
                                taroPages: JSON.stringify(taroPages)
                            }
                            const result = ejs.render(data.contents.toString(), ejsData)
                            data.contents = Buffer.from(result)

                            this.emit('data', data)
                        }))
                        .pipe(rename('babel.config.js'))
                        .pipe(dest(outputPath)),
                    src(`${templateDir}/tsconfig.json`)
                        .pipe(es.through(function (data) {
                            const taroTSConfigPath = path.join(appPath, 'tsconfig.json')
                            if (fs.existsSync(taroTSConfigPath)) {
                                const taroTSConfig = parseJson(taroTSConfigPath)
                                const templateTSConfig = parseJson(data.path)

                                let mergedTSConfig = templateTSConfig
                                const paths = resolveAliasToTSConfigPaths(alias, taroTSConfigPath)
                                mergedTSConfig = merge(taroTSConfig, templateTSConfig, {compilerOptions: {paths}})

                                data.contents = Buffer.from(JSON.stringify(mergedTSConfig, null, '  '))
                            }
                            this.emit('data', data)
                        }))
                        .pipe(dest(outputPath))
                )
            }
            scaffold().on('end', async () => {
                console.log(chalk.green('Compiled to Next.js application successfully!\n'))

                const port = devServer.port || DEFAULT_PORT
                if (runNextjs) {
                    const args: string[] = []
                    if (mode === 'development') {
                        args.push('dev')
                        args.push('-p', port)
                        spawn('next', args, {
                            cwd: outputPath,
                            stdio: 'inherit'
                        })
                    } else {
                        args.push('build')
                        const next = spawn('next', args, {
                            cwd: outputPath,
                            stdio: 'inherit'
                        })
                        next.on('close', code => {
                            if (code !== 0) {
                                process.exit(code || 1)
                            }
                        });
                    }
                }

                if (isWatch) {
                    if (browser) {
                        let indexRoute: string | undefined = customRoutes[taroPages[0]] || taroPages[0]
                        if (Array.isArray(indexRoute)) {
                            indexRoute = indexRoute[0]
                        }
                        if (indexRoute) {
                            const nextConfigPath = path.resolve(outputPath, 'next.config.js')
                            const {basePath} = await import(nextConfigPath)
                            let url = [undefined, '', '/'].includes(basePath)
                                ? `http://127.0.0.1:${port}${indexRoute}`
                                : `http://127.0.0.1:${port}${basePath}${indexRoute}`
                            if (url.endsWith('/')) {
                                url = url.substring(0, url.length - 1)
                            }
                            openBrowser(url)
                        }
                    }

                    function hasSpecifiedFile(filePath: string): boolean {
                        const dir = path.dirname(filePath)
                        const ext = path.extname(filePath)
                        const base = path.basename(filePath, ext)

                        if (!fs.existsSync(dir)) {
                            return false
                        }

                        const files = fs.readdirSync(dir)
                        return files.some(name => {
                            const ext = path.extname(name)
                            if (!SCRIPT_EXTS.includes(ext)) {
                                return false
                            }
                            const primaryBase = path.basename(name, ext)
                            const secondaryExt = path.extname(primaryBase)
                            if (secondaryExt !== '.h5') {
                                return false
                            }
                            const secondaryBase = path.basename(primaryBase, secondaryExt)
                            return secondaryBase === base
                        })
                    }

                    function getOutputFilePath(filePath: string): string | null {
                        const relativePath = filePath.substring(appPath.length + 1)

                        const ext = path.extname(filePath)
                        if (!SCRIPT_EXTS.includes(ext)) {
                            return path.join(outputPath, relativePath)
                        }

                        const base = path.basename(relativePath, ext)
                        const secondaryExt = path.extname(base)
                        if (secondaryExt === '.h5') {
                            return path.join(
                                outputPath,
                                path.dirname(relativePath),
                                path.basename(base, secondaryExt) + ext
                            )
                        }

                        if (hasSpecifiedFile(filePath)) {
                            return null
                        }

                        return path.join(outputPath, relativePath)
                    }

                    function handleWatch(operation: 'changed' | 'added' | 'removed', filePath: string): void {
                        const outputFilePath = getOutputFilePath(filePath)
                        if (!outputFilePath) {
                            return
                        }

                        const relativePath = filePath.substring(appPath.length + 1)

                        if (['changed', 'added'].includes(operation)) {
                            const outputDir = path.dirname(outputFilePath)
                            if (!fs.existsSync(outputDir)) {
                                fs.mkdirSync(outputDir, {recursive: true})
                            }
                            fs.copyFileSync(filePath, outputFilePath)
                        }

                        if (operation === 'removed') {
                            fs.rmSync(outputFilePath)

                            const dir = path.dirname(filePath)
                            const ext = path.extname(filePath)
                            const base = path.basename(filePath, ext)
                            const secondaryExt = path.extname(base)
                            if (secondaryExt) {
                                const primaryFilePath = path.join(dir, `${path.basename(base, secondaryExt)}${ext}`)
                                if (fs.existsSync(primaryFilePath)) {
                                    const outputDir = path.dirname(outputFilePath)
                                    if (!fs.existsSync(outputDir)) {
                                        fs.mkdirSync(outputDir, {recursive: true})
                                    }
                                    fs.copyFileSync(primaryFilePath, outputFilePath)
                                }
                            } else if (hasSpecifiedFile(filePath)) {
                                const h5FilePath = path.join(dir, `${base}.h5${ext}`)
                                if (fs.existsSync(h5FilePath)) {
                                    const outputDir = path.dirname(outputFilePath)
                                    if (!fs.existsSync(outputDir)) {
                                        fs.mkdirSync(outputDir, {recursive: true})
                                    }
                                    fs.copyFileSync(h5FilePath, outputFilePath)
                                }
                            }
                        }

                        console.log(`${chalk.green(`File was ${operation}`)} ${relativePath}`)
                    }

                    const watcher = watch(`${path.normalize(sourcePath)}/**`, {delay: 200})
                    watcher.on('ready', () => console.log(chalk.blue('\nWatching for file changes...\n')))
                    watcher.on('change', filePath => handleWatch('changed', filePath))
                    watcher.on('add', filePath => handleWatch('added', filePath))
                    watcher.on('unlink', filePath => handleWatch('removed', filePath))

                    process.on('exit', () => {
                        watcher.close()
                    })
                }
            })
        }
    })
}
