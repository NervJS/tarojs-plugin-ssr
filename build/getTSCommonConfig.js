const fs = require('fs')
const assign = require('object-assign')
const {getProjectPath} = require('./projectHelper')

module.exports = function () {
    let my = {}
    if (fs.existsSync(getProjectPath('tsconfig.json'))) {
        my = require(getProjectPath('tsconfig.json'))
    }
    return assign(
        {
            noUnusedParameters: true,
            noUnusedLocals: true,
            strictNullChecks: true,
            target: 'es6',
            jsx: 'preserve',
            moduleResolution: 'node',
            declaration: true,
            allowSyntheticDefaultImports: true,
            allowJs: true
        },
        my.compilerOptions
    )
}
