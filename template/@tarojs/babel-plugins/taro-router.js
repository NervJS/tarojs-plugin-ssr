const splitExportDeclaration = require('@babel/helper-split-export-declaration').default

module.exports = function (babel) {
    const t = babel.types

    /**
     * Takes a class definition and replaces it with an equivalent class declaration
     * which is then assigned to a local variable. This allows us to reassign the
     * local variable with the decorated version of the class. The class definition
     * retains its original name so that `toString` is not affected, other
     * references to the class are renamed instead.
     */
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

    function transformClass() {
        return {
            Program: {
                enter() {
                    needsWithRouter = false
                },
                exit(path) {
                    if (needsWithRouter) {
                        const id = t.identifier('withRouter')
                        path.node.body.unshift(
                            t.importDeclaration(
                                [t.importSpecifier(id, id)],
                                t.stringLiteral('next/router')
                            )
                        )
                    }
                }
            },
            ClassDeclaration: {
                enter(path) {
                    if (
                        t.isIdentifier(path.node.superClass)
                        && ['Component', 'PureComponent'].includes(path.node.superClass.name)
                    ) {
                        isInClassComponent = true
                    }
                },
                exit(path) {
                    if (isInClassComponent && isCalledGetCurrentInstance) {
                        needsWithRouter = true

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

                    isInClassComponent = false
                }
            },
            'ExportNamedDeclaration|ExportDefaultDeclaration'(path) {
                if (!path.get('declaration').isClassDeclaration()) return

                splitExportDeclaration(path)
            },
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

                    const exp = t.cloneNode(path.node)
                    exp.arguments.push(
                        t.memberExpression(
                            t.memberExpression(
                                t.thisExpression(),
                                t.identifier('props')
                            ),
                            t.identifier('router')
                        )
                    )
                    path.replaceWith(exp)
                    path.skip()
                }
            }
        }
    }

    let needsWithRouter = false

    let isInClassComponent = false

    let isCalledGetCurrentInstance = false

    return {
        name: 'taro-router-plugin',
        visitor: {
            Program: {
                enter(path) {
                    needsWithRouter = false

                    // 由于 `@babel/plugin-transform-classes` 在转换类时影响 this，因此 program enter 时提前进行转换
                    path.traverse({
                        ClassDeclaration: {
                            enter(path) {
                                if (
                                    t.isIdentifier(path.node.superClass)
                                    && ['Component', 'PureComponent'].includes(path.node.superClass.name)
                                ) {
                                    isInClassComponent = true
                                }
                            },
                            exit(path) {
                                if (isInClassComponent && isCalledGetCurrentInstance) {
                                    needsWithRouter = true
            
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
            
                                isInClassComponent = false
                            }
                        },
                        'ExportNamedDeclaration|ExportDefaultDeclaration'(path) {
                            if (!path.get('declaration').isClassDeclaration()) return
            
                            splitExportDeclaration(path)
                        },
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
            
                                const exp = t.cloneNode(path.node)
                                exp.arguments.push(
                                    t.memberExpression(
                                        t.memberExpression(
                                            t.thisExpression(),
                                            t.identifier('props')
                                        ),
                                        t.identifier('router')
                                    )
                                )
                                path.replaceWith(exp)
                                path.skip()
                            }
                        }
                    })
                },
                exit(path) {
                    if (needsWithRouter) {
                        const id = t.identifier('withRouter')
                        path.node.body.unshift(
                            t.importDeclaration(
                                [t.importSpecifier(id, id)],
                                t.stringLiteral('next/router')
                            )
                        )
                    }
                }
            }
        }
    }
}
