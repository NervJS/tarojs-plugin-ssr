const splitExportDeclaration = require('@babel/helper-split-export-declaration').default

module.exports = function (babel) {
    const t = babel.types

    function replaceClassWithVar(path) {
        if (path.type === 'ClassDeclaration') {
            const varId = path.scope.generateUidIdentifierBasedOnNode(path.node.id)
            const classId = t.identifier(path.node.id.name)

            path.scope.rename(classId.name, varId.name)

            path.insertBefore(
                t.variableDeclaration('let', [t.variableDeclarator(varId)])
            )
            path.get('id').replaceWith(classId)

            return [t.cloneNode(varId), path]
        } else {
            let className
            let varId

            if (path.node.id) {
                className = path.node.id.name
                varId = path.scope.parent.generateDeclaredUidIdentifier(className)
                path.scope.rename(className, varId.name)
            } else if (
                path.parentPath.node.type === 'VariableDeclarator' &&
                path.parentPath.node.id.type === 'Identifier'
            ) {
                className = path.parentPath.node.id.name
                varId = path.scope.parent.generateDeclaredUidIdentifier(className)
            } else {
                varId = path.scope.parent.generateDeclaredUidIdentifier('decorated_class')
            }

            const newClassExpr = t.classExpression(
                className && t.identifier(className),
                path.node.superClass,
                path.node.body || []
            )

            const [newPath] = path.replaceWith(
                t.sequenceExpression([newClassExpr, varId])
            )

            return [t.cloneNode(varId), newPath.get('expressions.0')]
        }
    }

    let needsWithRouter = false

    let isWithRouterImported = false

    return {
        name: 'class-component-taro-router-plugin',
        visitor: {
            Program: {
                enter() {
                    needsWithRouter = false
                    isWithRouterImported = false
                },
                exit(path) {
                    if (needsWithRouter && !isWithRouterImported) {
                        path.unshiftContainer(
                            'body',
                            t.importDeclaration(
                                [t.importSpecifier(
                                    t.identifier('withRouter'),
                                    t.identifier('withRouter')
                                )],
                                t.stringLiteral('tarojs-plugin-platform-nextjs/router')
                            )
                        )
                    }
                }
            },

            ImportDeclaration(path) {
                if (t.isStringLiteral(path.node.source, {value: 'tarojs-plugin-platform-nextjs/router'})) {
                    if (path.node.specifiers.find(specifier => t.isIdentifier(specifier.imported, {name: 'withRouter'}))) {
                        isWithRouterImported = true
                    }
                }
            },

            ClassDeclaration(path) {
                let isCalledGetCurrentInstance = false

                if (
                    !t.isIdentifier(path.node.superClass)
                    || !['Component', 'PureComponent'].includes(path.node.superClass.name)
                ) {
                    return
                }

                path.traverse({
                    CallExpression(path) {
                        if (
                            t.isIdentifier(path.node.callee, {
                                type: 'Identifier',
                                name: 'getCurrentInstance'
                            })
                            || (
                                t.isMemberExpression(path.node.callee)
                                && t.isIdentifier(path.node.callee.property, {name: 'getCurrentInstance'})
                            )
                        ) {
                            isCalledGetCurrentInstance = true

                            if (
                                t.isIdentifier(path.node.callee, {
                                    type: 'Identifier',
                                    name: 'getCurrentInstance'
                                })
                                || (
                                    t.isMemberExpression(path.node.callee)
                                    && t.isIdentifier(path.node.callee.property, {name: 'getCurrentInstance'})
                                )
                            ) {
                                isCalledGetCurrentInstance = true
            
                                if (path.node.arguments.length === 0) {
                                    const exp = t.cloneNode(path.node)
                                    exp.arguments.push(
                                        t.objectExpression([
                                            t.objectProperty(
                                                t.identifier('type'),
                                                t.stringLiteral('class')
                                            ),
                                            t.objectProperty(
                                                t.identifier('component'),
                                                t.thisExpression()
                                            )
                                        ])
                                    )
                                    path.replaceWith(exp)
                                    path.skip()
                                }
                            }
                        }
                    }
                })

                if (!isCalledGetCurrentInstance) {
                    return
                }

                needsWithRouter = true

                const isDecorated = Array.from(path.parentPath.node.body).some(exp => (
                    t.isExpressionStatement(exp)
                    && t.isAssignmentExpression(exp.expression)
                    && t.isCallExpression(exp.expression.right)
                    && t.isIdentifier(exp.expression.right.callee, {
                        name: 'withRouter'
                    })
                    && exp.expression.right.arguments.some(arg => t.isIdentifier(arg, {
                        name: path.node.id.name
                    }))
                ))

                if (!isDecorated) {
                    const [localId, classPath] = replaceClassWithVar(path)
                    classPath.insertAfter(
                        t.expressionStatement(
                            t.assignmentExpression(
                                '=',
                                localId,
                                t.callExpression(
                                    t.identifier('withRouter'),
                                    [t.identifier(classPath.node.id.name)]
                                )
                            )
                        )
                    )
                }
            },
            'ExportNamedDeclaration|ExportDefaultDeclaration'(path) {
                if (!path.get('declaration').isClassDeclaration()) return

                splitExportDeclaration(path)
            }
        }
    }
}
