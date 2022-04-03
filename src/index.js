const path = require('path')
const fs = require('fs')
const {src, dest} = require('gulp')
const replace = require('gulp-replace')
const rename = require('gulp-rename')
const filter = require('gulp-filter')
const es = require('event-stream')
const {merge} = require('lodash')
const ejs = require('ejs')
const {ensureLeadingSlash, install} = require('./utils')

module.exports = ctx => {
    const {paths, helper} = ctx
    const {appPath} = paths

    ctx.registerPlatform({
        name: 'nextjs',
        useConfigName: 'h5',
        async fn({config}) {
            const {sourceRoot, outputRoot, router, env} = config

            if (router.mode !== 'browser') {
                throw new Error('Next.js only support `browser` router mode.')
            }

            const sourceDir = path.resolve(appPath, sourceRoot)
            const outputDir = path.resolve(appPath, outputRoot)

            const appConfigFilePath = helper.resolveScriptPath(path.join(sourceDir, `${helper.ENTRY}.config`))

            const outputSourceDir = path.join(outputDir, sourceRoot)
            const templateDir = path.resolve(__dirname, '../template')

            const appConfig = helper.readConfig(appConfigFilePath)

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
                    src(`${templateDir}/@tarojs/**`).pipe(dest(path.join(outputDir, '@tarojs'))),
                    src(`${templateDir}/next.config.ejs`)
                        .pipe(es.through(function (data) {
                            const result = ejs.render(data.contents.toString(), {env})
                            data.contents = Buffer.from(result)
                            this.emit('data', data)
                        }))
                        .pipe(rename('next.config.js'))
                        .pipe(dest(outputDir)),
                    src(`${templateDir}/postcss.config.js`).pipe(dest(outputDir)),
                    src(`${templateDir}/.babelrc`).pipe(dest(outputDir)),
                    src(`${templateDir}/package.json`)
                        .pipe(replace('@@NAME@@', () => {
                            const name = taroPkg.name
                            return name || 'tarojs-to-nextjs'
                        }))
                        .pipe(dest(outputDir)),
                    src(`${templateDir}/tsconfig.json`)
                        .pipe(es.through(function (data) {
                            const taroTSConfigPath = `${appPath}/tsconfig.json`
                            const taroTSConfig = JSON.parse(fs.readFileSync(taroTSConfigPath, 'utf-8'))
                            const templateTSConfig = JSON.parse(data.contents.toString())

                            let mergedTSConfig = templateTSConfig
                            if (fs.existsSync(taroTSConfigPath)) {
                                mergedTSConfig = merge(taroTSConfig, templateTSConfig)
                            }

                            data.contents = Buffer.from(JSON.stringify(mergedTSConfig, null, '  '))
                            this.emit('data', data)
                        }))
                        .pipe(dest(outputDir))
                )
            }
            scaffold().on('end', async () => {
                await install({
                    cwd: outputDir,
                    dependencies: taroPkg.dependencies
                })
                await install({
                    cwd: outputDir,
                    devDependencies: taroPkg.devDependencies
                })
            })

            function createNextjsPages() {
                const nextjsPagesDir = `${outputDir}/pages`

                for (const taroPage of taroPages) {
                    let filePath = customRoutes[taroPage]
                        ? path.join(nextjsPagesDir, customRoutes[taroPage]) + '.js'
                        : path.join(nextjsPagesDir, taroPage) + '.js'

                    const fileDir = path.dirname(filePath)

                    if (!fs.existsSync(fileDir)) {
                        fs.mkdirSync(fileDir, {recursive: true})
                    }

                    const outputSourcePage = `${outputDir}/${sourceRoot}${taroPage}`
                    const modulePath = path.relative(fileDir, outputSourcePage)
                    const contents = `export {default} from '${modulePath}'`
                    fs.writeFileSync(filePath, contents, {encoding: 'utf-8'})
                }
            }
            createNextjsPages()
        }
    })
}
