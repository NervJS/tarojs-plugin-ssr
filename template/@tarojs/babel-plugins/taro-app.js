const regexLikeCssGlobal = /((?<!\.module)\.css)|((?<!\.module)\.(scss|sass))$/

module.exports = function (babel) {
    const t = babel.types

    return {
        name: 'taro-app-plugin',
        visitor: {
            Program: {
                enter(programPath, state) {
                    if (
                        process.env.NODE_ENV !== 'test' &&
                        state.file.opts.filename !== '@@OUTPUT_TARO_APP_FILE_PATH@@'
                    ) {
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
