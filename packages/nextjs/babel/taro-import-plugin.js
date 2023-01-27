module.exports = function (babel) {
    const t = babel.types

    return {
        name: 'taro-import-plugin',
        visitor: {
            ImportDeclaration(path) {
                const source = path.get('source')
                if (!source.isStringLiteral()) {
                    return
                }
                if (source.node.value === '@tarojs/components') {
                    source.replaceWith(
                        t.stringLiteral('tarojs-plugin-platform-nextjs/components/lib')
                    )
                } else if (source.node.value === '@tarojs/taro') {
                    source.replaceWith(
                        t.stringLiteral('tarojs-plugin-platform-nextjs/taro')
                    )
                }
            },
            VariableDeclarator(path) {
                const init = path.get('init')
                if (!init || !init.isCallExpression()) {
                    return
                }
                const callee = init.get('callee')
                const name = callee.node.name
                if (!callee.isIdentifier() || name !== 'require') {
                    return
                }
                const source = init.get('arguments')[0]
                if (!source.isStringLiteral()) {
                    return
                }
                if (source.node.value === '@tarojs/components') {
                    source.replaceWith(
                        t.stringLiteral('tarojs-plugin-platform-nextjs/components/lib')
                    )
                } else if (source.node.value === '@tarojs/taro') {
                    source.replaceWith(
                        t.stringLiteral('tarojs-plugin-platform-nextjs/taro')
                    )
                }
            }
        }
    }
}
