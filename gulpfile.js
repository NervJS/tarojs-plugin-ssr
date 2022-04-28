const gulp = require('gulp')
const babel = require('gulp-babel')
const ts = require('gulp-typescript')
const clean = require('gulp-clean')
const through2 = require('through2')
const merge2 = require('merge2')
const webpack = require('webpack')
const path = require('path')
const {getPluginProjectPath, getComponentsProjectPath, getTaroProjectPath} = require('./build/projectHelper')
const getBabelCommonConfig = require('./build/getBabelCommonConfig')
const getTSCommonConfig = require('./build/getTSCommonConfig')
const getWebpackConfig = require('./build/getWebpackConfig')
const renderSass = require('./build/renderSass')

const libDir = getComponentsProjectPath('lib')
const esDir = getComponentsProjectPath('es')

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

    return js.pipe(babel(babelConfig))
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

    const source = [
        'components/src/**/*.jsx',
        'components/src/**/*.js',
        'components/src/**/*.tsx',
        'components/src/**/*.ts',
        '!components/src/**/__tests__/**'
    ]
    const sourceStream = gulp.src(source)

    const destDir = useESModules ? esDir : libDir
    const filesStream = babelify(sourceStream, useESModules)
    return merge2([fonts, sass, filesStream]).pipe(gulp.dest(destDir))
}

function compileTaro() {
    const source = [
        'taro/src/**/*.jsx',
        'taro/src/**/*.js',
        'taro/src/**/*.tsx',
        'taro/src/**/*.ts'
    ]
    const sourceStream = gulp.src(source)

    const libDir = getTaroProjectPath('lib')
    return babelify(sourceStream, false).pipe(gulp.dest(libDir))
}

function cleanComponents() {
    const lib = getComponentsProjectPath('lib')
    const dist = getComponentsProjectPath('dist')
    return gulp.src([lib, dist], {
        allowEmpty: true,
        read: false
    }).pipe(clean())
}

function compileWithLib(done) {
    compile(false).on('finish', done)
}

function compileWithDist(done) {
    dist(done)
}

gulp.task('build:components', gulp.series(
    cleanComponents,
    gulp.parallel(
        compileWithLib,
        compileWithDist
    ))
)

function cleanTaro() {
    const lib = getTaroProjectPath('lib')
    return gulp.src(lib, {
        allowEmpty: true,
        read: false
    }).pipe(clean())
}

gulp.task('build:taro', gulp.series(
    cleanTaro,
    compileTaro
))

const buildPlugin = () => {
    const tsConfig = getTSCommonConfig()
    return gulp.src('src/**')
        .pipe(ts(tsConfig))
        .pipe(gulp.dest(getPluginProjectPath('lib')))
}

gulp.task('plugin', buildPlugin)

gulp.task('default', gulp.parallel('plugin'))
