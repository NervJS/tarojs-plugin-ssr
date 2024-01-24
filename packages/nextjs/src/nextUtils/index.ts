import * as babel from '@babel/core'
import * as fs from 'fs'
import {SCRIPT_EXTS} from '../constants'
import {isDynamicPage} from './isDynamicPage'

export {recursiveReadDir} from './recursiveReadDir'

export {isDynamicPage} from './isDynamicPage'

export {getNextPageInfos} from './getNextPageInfos'

const NEXT_EXPORT_FUNCTIONS = [
    'getStaticProps',
    'getStaticPaths',
    'getServerSideProps'
]

export function getNextExportedFunctions(filename: string): string[] {
    const code = fs.readFileSync(filename, 'utf-8')
    const ast = babel.parseSync(code, {filename})!

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

export function resolveDynamicPagesToRewrites(dynamicPages: string[]): Rewrite[] {
    const rewrites = dynamicPages.map(page => {
        const segments = page.split('/').filter(Boolean)

        let source = ''
        let destination = ''
        const has: RouteHas[] = []

        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i]
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
            } else if (has.length === 0) {
                source += `/${segment}`
                destination += `/${segment}`
            } else if (segment !== 'index' || i !== segments.length - 1) {
                return null
            }
        }

        return {
            source,
            has,
            destination
        }
    })
    return rewrites.filter(Boolean) as Rewrite[]
}

// Identify /[param]/ in route string
const TEST_ROUTE_PATTERN = `\\[[^/]+?\\](${SCRIPT_EXTS.join('|')})$`

export function isDynamicRoute(route: string): boolean {
    return new RegExp(TEST_ROUTE_PATTERN).test(route)
}
