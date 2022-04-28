const fs = require('fs')
const merge = require('lodash/merge')
const {getPluginProjectPath} = require('./projectHelper')

module.exports = function () {
    let my = {}
    const pluginProjectPath = getPluginProjectPath('tsconfig.json')
    if (fs.existsSync(pluginProjectPath)) {
        my = require(pluginProjectPath)
    }
    return merge(
        my.compilerOptions,
        {
            noUnusedParameters: true,
            noUnusedLocals: true,
            strictNullChecks: true,
            target: 'es6',
            jsx: 'preserve',
            module: 'commonjs',
            moduleResolution: 'node',
            allowSyntheticDefaultImports: true
        }
    )
}
