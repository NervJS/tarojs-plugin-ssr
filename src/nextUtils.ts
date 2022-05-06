import * as babel from '@babel/core'
import * as fs from 'fs'
import {SCRIPT_EXT} from './constants'

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
            const declaration = path.get('declaration')
            if (!declaration || !declaration.node) {
                return;
            }

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

const ROUTE_PARMA_REGEX = /(\S*)\/\[([^/]+?)\]$/

export function resolveDynamicPagesToRewrites(dynamicPages: string[]): Rewrite[] {
    return dynamicPages.map(page => {
        const [_, source, key] = ROUTE_PARMA_REGEX.exec(page)!
        return {
            source,
            has: [
                {
                    type: 'query',
                    key,
                    value: `(?<${key}>.*)`
                }
            ],
            destination: `${source}/:${key}`
        }
    })
}

// Identify /[param]/ in route string
const TEST_ROUTE_PATTERN = `\\[[^/]+?\\](${SCRIPT_EXT.join('|')})$`

export function isDynamicRoute(route: string): boolean {
    return new RegExp(TEST_ROUTE_PATTERN).test(route)
}
