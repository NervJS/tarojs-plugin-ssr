const nodePath = require('path')

const regexLikeCssGlobal = /((?<!\.module)\.css)|((?<!\.module)\.(scss|sass))$/

module.exports = function (babel, options, dirname) {
    const t = babel.types

    const outputAppFilePath = nodePath.isAbsolute(options.outputAppFilePath)
        ? options.outputAppFilePath
        : nodePath.resolve(dirname, options.outputAppFilePath)

    return {
        name: 'taro-app-plugin',
        visitor: {
            Program: {
                enter(programPath, state) {
                    if (state.file.opts.filename !== outputAppFilePath) {
                        return
                    }

                    programPath.traverse({
                        ImportDeclaration(path) {
                            if (
                                t.isStringLiteral(path.node.source)
                                && regexLikeCssGlobal.test(path.node.source.value)
                            ) {
                                path.remove()
                            }
                        }
                    })
                }
            }
        }
    }
}
