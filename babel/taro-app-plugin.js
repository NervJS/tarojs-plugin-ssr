
const regexLikeCssGlobal = /((?<!\.module)\.css)|((?<!\.module)\.(scss|sass))$/

module.exports = function (babel, {outputAppFilePath}) {
    const t = babel.types

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
