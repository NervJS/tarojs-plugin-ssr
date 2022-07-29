import * as babel from '@babel/core'
import * as fs from 'fs'
import {SCRIPT_EXTS} from './constants'

const NEXT_EXPORT_FUNCTIONS = [
    'getStaticProps',
    'getStaticPaths',
    'getServerSideProps'
]

export function getNextExportedFunctions(filename: string): string[] {
    const code = fs.readFileSync(filename, 'utf-8')
    const ast = babel.parseSync(code, {filename})

    const result: string[] = []

    babel.traverse(ast, {
        ExportNamedDeclaration(path) {
            const specifiers = path.get('specifiers')
            if (specifiers && specifiers.length) {
                for (const specifier of specifiers) {
                    const exported = specifier.node.exported
                    if (exported.type === 'Identifier' && NEXT_EXPORT_FUNCTIONS.includes(exported.name)) {
                        result.push(exported.name)
                    }
                }
            }

            const declaration = path.get('declaration')
            if (declaration && declaration.node) {
                if (declaration.isFunctionDeclaration()) {
                    const name = declaration.node.id!.name
                    if (NEXT_EXPORT_FUNCTIONS.includes(name)) {
                        result.push(name)
                    }
                }
    
                if (declaration.isVariableDeclaration()) {
                    for (const declarator of declaration.node.declarations) {
                        if (declarator.id.type !== 'Identifier') {
                            return
                        }
                        const name = declarator.id.name
                        if (NEXT_EXPORT_FUNCTIONS.includes(name)) {
                            result.push(name)
                        }
                    }
                }
            }
        }
    })

    return result
}

type RouteHas =
    | {
        type: 'header' | 'query' | 'cookie'
        key: string
        value?: string
    }
    | {
        type: 'host'
        key?: undefined
        value: string
    }

type Rewrite = {
    source: string
    destination: string
    basePath?: false
    locale?: false
    has?: RouteHas[]
}

export function isDynamicPage(content: string): boolean {
    return content.startsWith('[') && content.endsWith(']')
}

export function resolveDynamicPagesToRewrites(dynamicPages: string[]): Rewrite[] {
    return dynamicPages.map(page => {
        const segments = page.split('/').filter(segment => segment)
        let source = ''
        let destination = ''
        const has: RouteHas[] = []

        for (const segment of segments) {
            if (isDynamicPage(segment)) {
                const key = segment.substring(1, segment.length - 1)
                if (key) {
                    has.push({
                        type: 'query',
                        key,
                        value: `(?<${key}>.*)`
                    })
                    destination += `/:${key}`
                }
            } else {
                source += `/${segment}`
                destination += `/${segment}`
            }
        }

        return {
            source,
            has,
            destination
        }
    })
}

// Identify /[param]/ in route string
const TEST_ROUTE_PATTERN = `\\[[^/]+?\\](${SCRIPT_EXTS.join('|')})$`

export function isDynamicRoute(route: string): boolean {
    return new RegExp(TEST_ROUTE_PATTERN).test(route)
}
