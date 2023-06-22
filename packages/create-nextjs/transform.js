const plugin = 'tarojs-plugin-platform-nextjs'

module.exports = function (file, api, options) {
    const j = api.jscodeshift

    const root = j(file.source)

    let isPluginsPropertyExist = false
    let configObjectExpression = null

    root
        .find(j.Identifier, {
            name: 'config'
        })
        .forEach(path => {
            if (
                path.parentPath &&
                path.parentPath.value.type === 'VariableDeclarator' &&
                path.parentPath.value.init.type === 'ObjectExpression'
            ) {
                configObjectExpression = path.parentPath.value.init

                path.parentPath.value.init.properties.forEach(property => {
                    if (property.key.type === 'Identifier' && property.key.name === 'plugins') {
                        isPluginsPropertyExist = true

                        if (property.value.type === 'ArrayExpression') {
                            if (!property.value.elements.some(element => element.type === 'Literal' && element.value === plugin)) {
                                property.value.elements.push(j.stringLiteral(plugin))
                            }
                        }
                    }
                })
            }
        })

    if (!isPluginsPropertyExist && configObjectExpression) {
        configObjectExpression.properties.push(
            j.property(
                'init',
                j.identifier('plugins'),
                j.arrayExpression([
                    j.stringLiteral(plugin)
                ])
            )
        )
    }

    return root.toSource(options)
}
