const gulp = require('gulp')
const babel = require('gulp-babel')
const ts = require('gulp-typescript')
const through2 = require('through2')
const merge2 = require('merge2')
const webpack = require('webpack')
const path = require('path')
const {getProjectPath} = require('./build/projectHelper')
const getBabelCommonConfig = require('./build/getBabelCommonConfig')
const getWebpackConfig = require('./build/getWebpackConfig')
const tsConfig = require('./build/getTSCommonConfig')()
const renderSass = require('./build/renderSass')

const libDir = getProjectPath('lib')
const esDir = getProjectPath('es')

const tsDefaultReporter = ts.reporter.defaultReporter()

function dist(done) {
    const webpackConfig = getWebpackConfig(false)

    webpack(webpackConfig, (err, stats) => {
        if (err) {
            console.error(err.stack || err)
            if (err.details) {
                console.error(err.details)
            }
            return
        }

        const info = stats.toJson()

        if (stats.hasErrors()) {
            console.error(info.errors)
        }

        if (stats.hasWarnings()) {
            console.warn(info.warnings)
        }

        const buildInfo = stats.toString({
            colors: true,
            children: true,
            chunks: false,
            modules: false,
            chunkModules: false,
            hash: false,
            version: false,
        })
        console.log(buildInfo)

        done(0)
    })
}

function babelify(js, useESModules) {
    const babelConfig = getBabelCommonConfig(useESModules)
    delete babelConfig.cacheDirectory

    const stream = js.pipe(babel(babelConfig))
    return stream.pipe(gulp.dest(useESModules ? esDir : libDir))
}

function compile(useESModules) {
    const fontsDestPath = path.join(useESModules ? esDir : libDir, 'style/fonts')
    const fonts = gulp
        .src('components/src/style/fonts/**/*')
        .pipe(gulp.dest(fontsDestPath))

    const sass = gulp
        .src([
            'components/src/**/*.sass',
            'components/src/**/*.scss'
        ])
        .pipe(
            through2.obj(function (file, encoding, next) {
                this.push(file.clone())

                if (file.path.match(/(\/|\\)style(\/|\\)index\.s(a|c)ss$/)) {
                    renderSass(file.path)
                        .then(css => {
                            file.contents = Buffer.from(css)
                            file.path = file.path.replace(/\.s(a|c)ss$/, '.css')
                            this.push(file)
                            next()
                        })
                        .catch(e => {
                            console.error(e)
                        })
                } else {
                    next()
                }
            })
        )
        .pipe(gulp.dest(useESModules ? esDir : libDir))

    let error = 0

    const source = [
        'components/src/**/*.jsx',
        'components/src/**/*.js',
        'components/src/**/*.tsx',
        'components/src/**/*.ts',
        'components/typings/**/*.d.ts',
        '!components/src/**/__tests__/**'
    ]

    let sourceStream = gulp.src(source)

    const tsResult = sourceStream.pipe(
        ts(tsConfig, {
            error(e) {
                tsDefaultReporter.error(e)
                error = 1
            },
            finish: tsDefaultReporter.finish
        })
    )

    function check() {
        if (error) {
            process.exit(1)
        }
    }

    tsResult.on('finish', check)
    tsResult.on('end', check)

    const tsFilesStream = babelify(tsResult.js, useESModules)
    const tsd = tsResult.dts.pipe(gulp.dest(useESModules ? esDir : libDir))
    return merge2([fonts, sass, tsFilesStream, tsd])
}

function compileWithLib(done) {
    compile(false).on('finish', done)
}

function compileWithDist(done) {
    dist(done)
}

gulp.task('build:components', gulp.parallel(
    compileWithLib,
    compileWithDist
))
