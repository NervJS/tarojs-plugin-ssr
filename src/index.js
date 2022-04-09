const path = require('path')
const fs = require('fs')
const {src, dest, watch} = require('gulp')
const replace = require('gulp-replace')
const rename = require('gulp-rename')
const filter = require('gulp-filter')
const es = require('event-stream')
const {merge} = require('lodash')
const ejs = require('ejs')
const chalk = require('chalk')
const spawn = require('cross-spawn')
const getNextjsExportedFunctions = require('./getNextjsExportedFunctions')
const resolveAliasToTSConfigPaths = require('./resolveAliasToTSConfigPaths')
const resolveDynamicPagesToRewrites = require('./resolveDynamicPagesToRewrites')
const {ensureLeadingSlash, resolveScriptPath, parseJson, isDynamicRoute} = require('./utils')

const DEFAULT_ROUTER_CONFIG = {
    mode: 'browser',
    customRoutes: {}
}

module.exports = ctx => {
    const {paths, helper} = ctx
    const {appPath} = paths

    ctx.registerPlatform({
        name: 'nextjs',
        useConfigName: 'h5',
        async fn({config}) {
            const {
                sourceRoot = 'src',
                outputRoot = 'dist',
                router = DEFAULT_ROUTER_CONFIG,
                env = {},
                isWatch,
                mode,
                alias = {},
                sass = {}
            } = config

            if (router.mode !== 'browser') {
                throw new Error('Next.js only support `browser` router mode.')
            }

            const sourceDir = path.resolve(appPath, sourceRoot)
            const outputDir = path.resolve(appPath, outputRoot)

            const appConfigFilePath = resolveScriptPath(path.join(sourceDir, `${helper.ENTRY}.config`))
            const appConfig = helper.readConfig(appConfigFilePath)
            const appFilePath = resolveScriptPath(path.join(sourceDir, helper.ENTRY))

            const outputSourceDir = path.join(outputDir, sourceRoot)
            const outputAppFilePath = path.join(outputSourceDir, helper.ENTRY) + path.extname(appFilePath)
            const nextAppFilePath = path.join(outputDir, 'pages/_app.tsx')

            const templateDir = path.resolve(__dirname, '../template')

            const taroPages = []
            if (Array.isArray(appConfig.pages)) {
                for (const page of appConfig.pages) {
                    taroPages.push(ensureLeadingSlash(page))
                }
            }
            if (Array.isArray(appConfig.subPackages)) {
                for (const package of appConfig.subPackages) {
                    if (!Array.isArray(package.pages)) {
                        return
                    }

                    for (const page of package.pages) {
                        taroPages.push(ensureLeadingSlash(`${package.root}/${page}`))
                    }
                }
            }

            const customRoutes = Object.create(null)
            if (router.customRoutes) {
                for (const key of Object.keys(router.customRoutes)) {
                    customRoutes[ensureLeadingSlash(key)] = router.customRoutes[key]
                }
            }

            const taroPkg = require(`${appPath}/package.json`)

            function createNextjsPages() {
                const result = []

                const nextjsPagesDir = `${outputDir}/pages`

                for (const taroPage of taroPages) {
                    const taroPageFilePath = resolveScriptPath(path.join(sourceDir, taroPage))
                    const taroPageDir = path.dirname(taroPageFilePath)
                    const taroRoute = customRoutes[taroPage] || taroPage

                    const files = fs.readdirSync(taroPageDir)
                    const dynamicPageFileName = files.find(name => isDynamicRoute(name))
                    let dynamicPageFileBaseName
                    if (dynamicPageFileName) {
                        const dynamicPageFileExt = path.extname(dynamicPageFileName)
                        dynamicPageFileBaseName = path.basename(dynamicPageFileName, dynamicPageFileExt)
                        result.push(`${taroRoute}/${dynamicPageFileBaseName}`)
                    }

                    const targetPageFile = dynamicPageFileName || 'index.js'
                    const targetPageFilePath = dynamicPageFileName
                        ? path.join(taroPageDir, dynamicPageFileName)
                        : taroPageFilePath
                    const nextjsPageFilePath = path.join(nextjsPagesDir, taroRoute, targetPageFile)

                    const nextjsPageDir = path.dirname(nextjsPageFilePath)
                    if (!fs.existsSync(nextjsPageDir)) {
                        fs.mkdirSync(nextjsPageDir, {recursive: true})
                    }

                    const exportedFunctions = getNextjsExportedFunctions(targetPageFilePath)

                    const exportedNames = ['default', ...exportedFunctions]
                    let request = `${outputDir}/${sourceRoot}${taroPage}`
                    if (dynamicPageFileBaseName) {
                        request = path.join(path.dirname(request), dynamicPageFileBaseName)
                    }
                    const modulePath = path.relative(nextjsPageDir, request)
                    const contents = `export {${exportedNames.join(', ')}} from '${modulePath}'`
                    fs.writeFileSync(nextjsPageFilePath, contents, {encoding: 'utf-8'})
                }

                return result
            }

            const dynamicPages = createNextjsPages()

            function scaffold() {
                return es.merge(
                    src(`${sourceDir}/**`)
                        .pipe(filter(file => {
                            const stat = fs.statSync(file.path)
                            if (stat.isDirectory()) {
                                return true
                            }

                            const ext = path.extname(file.path)
                            if (!helper.SCRIPT_EXT.includes(ext)) {
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
                        .pipe(dest(outputSourceDir)),
                    src(`${templateDir}/pages/**`).pipe(dest(path.join(outputDir, 'pages'))),
                    src(`${templateDir}/@tarojs/**`)
                        .pipe(replace('@@OUTPUT_TARO_APP_FILE_PATH@@', outputAppFilePath))
                        .pipe(replace('@@NEXT_APP_FILE_PATH@@', nextAppFilePath))
                        .pipe(es.through(function (data) {
                            if (data.path === `${templateDir}/@tarojs/taro/constants.ts`) {
                                const code = `export const customRoutes: Record<string, string> = ${JSON.stringify(customRoutes)}`
                                data.contents = Buffer.from(code)
                            }
                            this.emit('data', data)
                        }))
                        .pipe(dest(path.join(outputDir, '@tarojs'))),
                    src(`${templateDir}/next.config.ejs`)
                        .pipe(es.through(function (data) {
                            const prependData = JSON.stringify(sass.data)
                            const includePaths = JSON.stringify(sass.includePaths)
                            const rewrites = resolveDynamicPagesToRewrites(dynamicPages)

                            const ejsData = {
                                env,
                                prependData,
                                includePaths,
                                rewrites
                            }
                            const result = ejs.render(data.contents.toString(), ejsData)
                            data.contents = Buffer.from(result)

                            this.emit('data', data)
                        }))
                        .pipe(rename('next.config.js'))
                        .pipe(dest(outputDir)),
                    src(`${templateDir}/postcss.config.js`).pipe(dest(outputDir)),
                    src(`${templateDir}/babel.config.js`).pipe(dest(outputDir)),
                    src(`${templateDir}/tsconfig.json`)
                        .pipe(es.through(function (data) {
                            const taroTSConfigPath = path.join(appPath, 'tsconfig.json')

                            const taroTSConfig = parseJson(taroTSConfigPath)
                            const templateTSConfig = parseJson(data.path)

                            let mergedTSConfig = templateTSConfig
                            if (fs.existsSync(taroTSConfigPath)) {
                                const paths = resolveAliasToTSConfigPaths(alias, taroTSConfigPath)
                                mergedTSConfig = merge(taroTSConfig, templateTSConfig, {compilerOptions: {paths}})
                            }

                            data.contents = Buffer.from(JSON.stringify(mergedTSConfig, null, '  '))
                            this.emit('data', data)
                        }))
                        .pipe(dest(outputDir))
                )
            }
            scaffold().on('end', async () => {
                if (mode === 'development') {
                    spawn('next', ['dev'], {
                        cwd: outputDir,
                        stdio: 'inherit'
                    })
                }

                if (isWatch) {
                    const watcher = watch(`${sourceDir}/**`)
                    watcher.on('change', filePath => {
                        const relativePath = filePath.substring(appPath.length + 1)
                        const outputPath = path.join(outputDir, relativePath)
                        console.log(`${chalk.green('File was changed')} ${relativePath}`)
                        fs.copyFileSync(filePath, outputPath)
                    })
                    watcher.on('add', filePath => {
                        const relativePath = filePath.substring(appPath.length + 1)
                        const outputPath = path.join(outputDir, relativePath)
                        console.log(`${chalk.green('File was added')} ${relativePath}`)
                        fs.copyFileSync(filePath, outputPath)
                    })
                    watcher.on('unlink', filePath => {
                        const relativePath = filePath.substring(appPath.length + 1)
                        const outputPath = path.join(outputDir, relativePath)
                        console.log(`${chalk.green('File was removed')} ${relativePath}`)
                        fs.rmSync(outputPath)
                    })
                }
            })
        }
    })
}
