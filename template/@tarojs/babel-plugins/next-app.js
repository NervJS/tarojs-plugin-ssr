const fs = require('fs')
const nodePath = require('path')

const regexLikeCssGlobal = /((?<!\.module)\.css)|((?<!\.module)\.(scss|sass))$/

const isWindows = process.platform === 'win32'

module.exports = function (babel, {taroAppFilePath}) {
    const t = babel.types

    function getGlobalCss(nextAppPath) {
        const outputTaroAppFilePath = taroAppFilePath || '@@OUTPUT_TARO_APP_FILE_PATH@@'
        const code = fs.readFileSync(outputTaroAppFilePath, 'utf-8')
        const ast = babel.parse(code, {filename: outputTaroAppFilePath})

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
                    const absolutePath = nodePath.resolve(nodePath.dirname(outputTaroAppFilePath), request)
                    const relativePath = nodePath.relative(nodePath.dirname(nextAppPath), absolutePath)
                    node.source.value = relativePath
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
                    if (
                        process.env.NODE_ENV !== 'test' &&
                        state.file.opts.filename !== '@@NEXT_APP_FILE_PATH@@'
                    ) {
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
                        path.skip()
                    }

                    globalCss = []
                }
            }
        }
    }
}
