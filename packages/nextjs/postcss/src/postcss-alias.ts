import * as fs from 'fs'
import * as path from 'path'

const JS_EXT: string[] = ['.js', '.jsx']
const TS_EXT: string[] = ['.ts', '.tsx']
const SCRIPT_EXT: string[] = JS_EXT.concat(TS_EXT)

function resolveMainFilePath(p: string, extArrs = SCRIPT_EXT): string {
    const realPath = p
    const taroEnv = 'h5'
    for (let i = 0; i < extArrs.length; i++) {
        const item = extArrs[i]
        if (taroEnv) {
            if (fs.existsSync(`${p}.${taroEnv}${item}`)) {
                return `${p}.${taroEnv}${item}`
            }
            if (fs.existsSync(`${p}${path.sep}index.${taroEnv}${item}`)) {
                return `${p}${path.sep}index.${taroEnv}${item}`
            }
            if (fs.existsSync(`${p.replace(/\/index$/, `.${taroEnv}/index`)}${item}`)) {
                return `${p.replace(/\/index$/, `.${taroEnv}/index`)}${item}`
            }
        }
        if (fs.existsSync(`${p}${item}`)) {
            return `${p}${item}`
        }
        if (fs.existsSync(`${p}${path.sep}index${item}`)) {
            return `${p}${path.sep}index${item}`
        }
    }
    return realPath
}

function resolveScriptPath(p: string): string {
    return resolveMainFilePath(p)
}

function normalizePath(path: string) {
    return path.replace(/\\/g, '/').replace(/\/{2,}/g, '/')
}

function promoteRelativePath(fPath: string): string {
    const fPathArr = fPath.split(path.sep)
    let dotCount = 0
    fPathArr.forEach(item => {
        if (item.indexOf('..') >= 0) {
            dotCount++
        }
    })
    if (dotCount === 1) {
        fPathArr.splice(0, 1, '.')
        return fPathArr.join('/')
    }
    if (dotCount > 1) {
        fPathArr.splice(0, 1)
        return fPathArr.join('/')
    }
    return normalizePath(fPath)
}

function isAliasPath(name: string, pathAlias: Record<string, any> = {}): boolean {
    const prefixes = Object.keys(pathAlias)
    if (prefixes.length === 0) {
        return false
    }
    return prefixes.includes(name) || (new RegExp(`^(${prefixes.join('|')})/`).test(name))
}

function replaceAliasPath(filePath: string, name: string, pathAlias: Record<string, any> = {}): string {
    // 后续的 path.join 在遇到符号链接时将会解析为真实路径，如果
    // 这里的 filePath 没有做同样的处理，可能会导致 import 指向
    // 源代码文件，导致文件被意外修改
    filePath = fs.realpathSync(filePath)
  
    const prefixes = Object.keys(pathAlias)
    if (prefixes.includes(name)) {
        return promoteRelativePath(path.relative(filePath, fs.realpathSync(resolveScriptPath(pathAlias[name]))))
    }
    const reg = new RegExp(`^(${prefixes.join('|')})/(.*)`)
    name = name.replace(reg, function (_m, $1, $2) {
        return promoteRelativePath(path.relative(filePath, path.join(pathAlias[$1], $2)))
    })
    return name
}

const pattern = /(url\(\s*['"]?)([^"')]+)(["']?\s*\))/g

interface IOptions {
    alias?: Record<string, string>
}

const postcssAlias = (options: IOptions = {}) => {
    return {
        postcssPlugin: 'postcss-alias',
        Once (styles, { result }) {
            if (!options.alias || !Object.keys(options.alias).length) return

            const opts = result.opts
            const from = opts.from

            styles.walkDecls(decl => {
                if (pattern.test(decl.value)) {
                    decl.value = decl.value.replace(pattern, (matched, before, url, after) => {
                        url = url.replace(/^~/, '')
                        if (isAliasPath(url, options.alias)) {
                            const newUrl = replaceAliasPath(from, url, options.alias)
                            return `${before}${newUrl}${after}`
                        } else {
                            return matched
                        }
                    })
                }
            })
        }
    }
}

postcssAlias.postcss = true

export = postcssAlias
