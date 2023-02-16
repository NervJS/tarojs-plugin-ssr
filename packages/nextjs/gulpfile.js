const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const babel = require('gulp-babel')
const ts = require('gulp-typescript')
const clean = require('gulp-clean')
const {
    getPluginProjectPath,
    getTaroProjectPath,
    getRouterProjectPath,
    getComponentsProjectPath
} = require('./build/projectHelper')
const getBabelCommonConfig = require('./build/getBabelCommonConfig')
const getTSCommonConfig = require('./build/getTSCommonConfig')

function babelify(js, useESModules) {
    const babelConfig = getBabelCommonConfig(useESModules)
    delete babelConfig.cacheDirectory

    return js.pipe(babel(babelConfig))
}

function buildTaro() {
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

function cleanTaro() {
    const lib = getTaroProjectPath('lib')
    return gulp
        .src(lib, {
            allowEmpty: true,
            read: false
        })
        .pipe(clean())
}

gulp.task('taro', gulp.series(
    cleanTaro, 
    buildTaro
))

function buildRouter() {
    const source = [
        'router/src/**/*.jsx',
        'router/src/**/*.js',
        'router/src/**/*.tsx',
        'router/src/**/*.ts'
    ]
    const sourceStream = gulp.src(source)

    const libDir = getRouterProjectPath('lib')
    return babelify(sourceStream, false).pipe(gulp.dest(libDir))
}

function cleanRouter() {
    const lib = getRouterProjectPath('lib')
    return gulp.src(lib, {
            allowEmpty: true,
            read: false
        })
        .pipe(clean())
}

gulp.task('router', gulp.series(cleanRouter, buildRouter))

function cleanPlugin() {
    const lib = getPluginProjectPath('lib')
    return gulp.src(lib, {
            allowEmpty: true,
            read: false
        })
        .pipe(clean())
}

const buildPlugin = () => {
    const tsConfig = getTSCommonConfig()
    return gulp.src('src/**')
        .pipe(ts(tsConfig))
        .pipe(gulp.dest(getPluginProjectPath('lib')))
}

gulp.task('plugin', gulp.series(
    cleanPlugin, 
    buildPlugin
))

function cleanComponents() {
    const lib = getComponentsProjectPath('lib')
    return gulp.src(lib, {
            allowEmpty: true,
            read: false
        })
        .pipe(clean())
}

function buildComponents() {
    const tsConfig = getTSCommonConfig()
    const libDir = getComponentsProjectPath('lib')
    return gulp
        .src('components/src/**')
        .pipe(ts(tsConfig))
        .pipe(gulp.dest(libDir))
}

function copyComponentsCss(cb) {
    const tarorCss = require.resolve('@taror/components/dist/taror.css')
    fs.copyFileSync(tarorCss,path.join(getComponentsProjectPath('lib'), 'taror.css'))
    cb()
}

gulp.task('components',gulp.series(
        cleanComponents, 
        buildComponents, 
        copyComponentsCss
))

gulp.task(
    'default',
    gulp.parallel('plugin", "taro", "router", "components')
)
