import {ReactInstance} from 'react'
import ReactDOM from 'react-dom'

export function shouldBeObject(target: unknown): {flag: boolean, msg?: string} {
    if (target && typeof target === 'object') {
        return {
            flag: true
        }
    }

    return {
        flag: false,
        msg: getParameterError({
            correct: 'Object',
            wrong: target
        })
    }
}

export function findDOM(inst?: ReactInstance | null | undefined): Element | Text | null {
    if (inst) {
        return ReactDOM.findDOMNode(inst)
    }
    return document.body
}

interface IParameterErrorParam {
    name?: string
    para?: string
    correct?: string
    wrong?: unknown
}
export function getParameterError({ name = '', para, correct, wrong }: IParameterErrorParam): string {
    const parameter = para ? `parameter.${para}` : 'parameter'
    const errorType = upperCaseFirstLetter(wrong === null ? 'Null' : typeof wrong)
    if (name) {
        return `${name}:fail parameter error: ${parameter} should be ${correct} instead of ${errorType}`
    } else {
        return `parameter error: ${parameter} should be ${correct} instead of ${errorType}`
    }
}

function upperCaseFirstLetter(str: string): string {
    return str.replace(/^./, match => match.toUpperCase())
}

export function setTransform(el: HTMLElement, val: string): void {
    el.style.webkitTransform = val
    el.style.transform = val
}

export function serializeParams(params?: Record<string, any>): string {
    if (!params) {
        return ''
    }
    return Object.keys(params)
        .map(key => (
            `${encodeURIComponent(key)}=${typeof (params[key]) === 'object'
                ? encodeURIComponent(JSON.stringify(params[key]))
                : encodeURIComponent(params[key])}`))
        .join('&')
}

export function temporarilyNotSupport(apiName: string): () => void {
    return () => {
        const errMsg = `暂时不支持 API ${apiName}`
        if (process.env.NODE_ENV !== 'production') {
            console.error(errMsg)
            return Promise.reject({
                errMsg
            })
        } else {
            console.warn(errMsg)
            return Promise.resolve({
                errMsg
            })
        }
    }
}

export function weixinCorpSupport(apiName: string) {
    return () => {
        const errMsg = `h5端仅在微信公众号中支持 API ${apiName}`
        if (process.env.NODE_ENV !== 'production') {
            console.error(errMsg)
            return Promise.reject({
                errMsg
            })
        } else {
            console.warn(errMsg)
            return Promise.resolve({
                errMsg
            })
        }
    }
}

export function permanentlyNotSupport(apiName: string) {
    return () => {
        const errMsg = `不支持 API ${apiName}`
        if (process.env.NODE_ENV !== 'production') {
            console.error(errMsg)
            return Promise.reject({
                errMsg
            })
        } else {
            console.warn(errMsg)
            return Promise.resolve({
                errMsg
            })
        }
    }
}

export function isFunction(obj: unknown): boolean {
    return typeof obj === 'function'
}

const VALID_COLOR_REG = /^#[0-9a-fA-F]{6}$/

export const isValidColor = (color: string): boolean => {
    return VALID_COLOR_REG.test(color)
}

export function processOpenApi(
    apiName: string,
    defaultOptions?: Record<string, unknown>,
    formatResult = (x: any) => x,
    formatParams = (x: any) => x,
) {
    return (options: Record<string, any>) => {
        // @ts-ignore
        if (typeof window.wx === 'undefined') {
            return weixinCorpSupport(apiName)
        }

        options = options || {}
        const obj = Object.assign({}, defaultOptions, options)
        const p = new Promise((resolve, reject) => {
            ['fail', 'success', 'complete'].forEach(k => {
                obj[k] = (oriRes: any) => {
                    const res = formatResult(oriRes)
                    options[k] && options[k](res)
                    if (k === 'success') {
                        resolve(res)
                    } else if (k === 'fail') {
                        reject(res)
                    }
                }
            })
            // @ts-ignore
            wx[apiName](formatParams(obj))
        })
        return p
    }
}

/**
 * ease-in-out的函数
 * @param t 0-1的数字
 */
export const easeInOut = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

