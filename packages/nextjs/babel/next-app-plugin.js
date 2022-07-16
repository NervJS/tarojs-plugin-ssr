const fs = require('fs')
const nodePath = require('upath')

const regexLikeCssGlobal = /((?<!\.module)\.css)|((?<!\.module)\.(scss|sass))$/

const isWindows = process.platform === 'win32'

module.exports = function (babel, options, dirname) {
    const t = babel.types

    const outputAppFilePath = nodePath.isAbsolute(options.outputAppFilePath)
        ? options.outputAppFilePath
        : nodePath.resolve(dirname, options.outputAppFilePath)

    const nextAppFilePath = nodePath.isAbsolute(options.nextAppFilePath)
        ? options.nextAppFilePath
        : nodePath.resolve(dirname, options.nextAppFilePath)

    function getGlobalCss(nextAppPath) {
        const code = fs.readFileSync(outputAppFilePath, 'utf-8')
        const ast = babel.parse(code, {filename: outputAppFilePath})

        const result = []
        babel.traverse(ast, {
            ImportDeclaration(path) {
                if (!t.isStringLiteral(path.node.source)) {
                    return
                }

                const request = path.node.source.value
                if (!regexLikeCssGlobal.test(request)) {
                    return
                }

                const isRelative = request.startsWith('./') ||
                    request.startsWith('../') ||
                    ((isWindows && request.startsWith('.\\')) ||
                    request.startsWith('..\\'))

                const node = t.cloneNode(path.node)
                if (isRelative) {
                    const absolutePath = nodePath.resolve(nodePath.dirname(outputAppFilePath), request)
                    const relativePath = nodePath.relative(nodePath.dirname(nextAppPath), absolutePath)
                    node.source.value = nodePath.normalize(relativePath)
                    result.push(node)
                } else {
                    result.push(node)
                }
            }
        })
        return result
    }

    let globalCss = []

    return {
        name: 'next-app-plugin',
        visitor: {
            Program: {
                enter(path, state) {
                    const filename = state.file.opts.filename
                    if (state.file.opts.filename !== nextAppFilePath) {
                        return
                    }

                    globalCss = getGlobalCss(filename)
                },
                exit(path) {
                    if (globalCss.length) {
                        path.unshiftContainer(
                            'body',
                            globalCss
                        )
                    }

                    globalCss = []
                }
            }
        }
    }
}
