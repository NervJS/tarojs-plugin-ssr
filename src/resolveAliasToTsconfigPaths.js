const path = require('path')
const fs = require('fs')
const ts = require('typescript')
const {parseJson} = require('./utils')

function resolveAliasToTsconfigPaths(alias, tsconfigPath) {
    const {baseUrl = '.'} = parseJson(tsconfigPath).compilerOptions
    const pathsBaseUrl = path.resolve(path.dirname(tsconfigPath), baseUrl)

    const paths = {}

    Object.keys(alias).forEach(item => {
        const key = item + '/*'
        const value = path.relative(pathsBaseUrl, alias[item])
        paths[key] = [value + '/*']
    })

    return paths
}

module.exports = resolveAliasToTsconfigPaths
