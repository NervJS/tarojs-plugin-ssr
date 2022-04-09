module.exports = function (babel) {
    const t = babel.types

    function transformProgram(programPath) {
        programPath.traverse({
            ImportDeclaration(path) {
                const source = path.get('source')
                if (source.isStringLiteral()) {
                    if (source.node.value === '@tarojs/components') {
                        source.replaceWith(
                            t.stringLiteral('tarojs-plugin-platform-nextjs/components')
                        )
                    } else if (source.node.value === '@tarojs/taro') {
                        source.replaceWith(
                            t.stringLiteral('tarojs-plugin-platform-nextjs/taro')
                        )
                    }
                }
            }
        })
    }

    return {
        name: 'taro-import-plugin',
        visitor: {
            Program: {
                enter(programPath) {
                    transformProgram(programPath)
                }
            }
        }
    }
}
