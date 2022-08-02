import * as path from 'path'
import * as fs from 'fs'
import ts from 'typescript'
import {SCRIPT_EXTS} from './constants'

export function unIndent(strings: { raw: readonly string[] | ArrayLike<string>}, ...values: any[]): string {
    const text = String.raw(strings, ...values)
    const lines = text.replace(/^\n/u, '').replace(/\n\s*$/u, '').split('\n')
    const lineIndents = lines.filter(line => line.trim()).map(line => line.match(/ */u)![0].length)
    const minLineIndent = Math.min(...lineIndents)
    return lines.map(line => line.slice(minLineIndent)).join('\n')
}

/**
 * For a given page path, this function ensures that there is a leading slash.
 * If there is not a leading slash, one is added, otherwise it is noop.
 */
export function ensureLeadingSlash(path: string): string {
    if (path == null) {
        return ''
    }
    return path.startsWith('/') ? path : `/${path}`
}

export function resolveScriptPath(filePath: string, extArrs = SCRIPT_EXTS): string {
    const taroEnv = 'h5'
    for (let i = 0; i < extArrs.length; i++) {
        const item = extArrs[i]
        if (taroEnv) {
            if (fs.existsSync(`${filePath}.${taroEnv}${item}`)) {
                return `${filePath}.${taroEnv}${item}`
            }
            if (fs.existsSync(`${filePath}${path.sep}index.${taroEnv}${item}`)) {
                return `${filePath}${path.sep}index.${taroEnv}${item}`
            }
            if (fs.existsSync(`${filePath.replace(/\/index$/, `.${taroEnv}/index`)}${item}`)) {
                return `${filePath.replace(/\/index$/, `.${taroEnv}/index`)}${item}`
            }
        }
        if (fs.existsSync(`${filePath}${item}`)) {
            return `${filePath}${item}`
        }
        if (fs.existsSync(`${filePath}${path.sep}index${item}`)) {
            return `${filePath}${path.sep}index${item}`
        }
    }
    return filePath
}

export function parseJson(filePath: string): any {
    const sourceText = fs.readFileSync(filePath, 'utf-8')
    const jsonFile = ts.parseJsonText(filePath, sourceText)
    const errors: ts.Diagnostic[] = []
    const result = ts.convertToObject(jsonFile, errors)
    return result
}

export function resolveAliasToTSConfigPaths(alias: Record<string, string>, tsconfigPath: string): Record<string, string[]> {
    const {baseUrl = '.'} = parseJson(tsconfigPath).compilerOptions
    const pathsBaseUrl = path.resolve(path.dirname(tsconfigPath), baseUrl)

    const paths: Record<string, string[]> = {}

    Object.keys(alias).forEach(item => {
        const key = item + '/*'
        const value = path.relative(pathsBaseUrl, alias[item])
        paths[key] = [value + '/*']
    })

    return paths
}
