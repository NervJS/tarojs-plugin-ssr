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
        // eslint-disable-next-line react/no-find-dom-node
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

/**
 * 显式标识不能在服务端执行的 API。
 */
export namespace limited {
    /**
     * 处理拥有返回值的函数，直接抛出异常。
     */
    export function never<T extends Function>(api: string, fn: T): T {
        const res = (...args) => {
            if (typeof window === 'undefined') {
                throw new Error(`\`${api}\` cannot be called on server-side!`)
            }
            return fn(...args)
        }
        return res as unknown as T
    }

    /**
     * 处理无返回值的函数，给予一个提示即可。
     */
    export function _void<T extends Function>(api: string, fn: T): T {
        const res = (...args) => {
            if (typeof window === 'undefined') {
                console.error(`\`${api}\` does nothing on the server-side!`)
            }
            return fn(...args)
        }
        return res as unknown as T
    }

    /**
     * 处理异步函数，触发失败回调。
     */
    export function async<T extends (option: any) => void>(api: string, fn: T): T {
        const res = option => {
            if (typeof window === 'undefined') {
                const {fail, complete} = option
                const err = {
                    errMsg: `\`${api}\` cannot be called on server-side!`
                }
                fail?.(err)
                complete?.()
                return
            }
            return fn(option)
        }
        return res as unknown as T
    }
}

/**
 * 显式处理不支持的 API。
 */
export namespace unsupported {
    /**
     * 处理拥有返回值的函数，直接抛出异常。
     */
    export function never(api: string): () => never {
        return () => {
            throw new Error(`Taro H5 端不支持 API - ${api}`)
        }
    }

    /**
     * 处理无返回值的函数，给予一个提示即可。
     */
    export function _void(api: string): () => void {
        return () => {
            console.error(`Taro H5 端不支持 API - ${api}`)
        }
    }

    /**
     * 处理异步函数，触发失败回调。
     */
    export function async(api: string): (option?: any) => void {
        return ({fail, complete} = {}) => {
            const err = {
                errMsg: `Taro H5 端不支持 API - ${api}`
            }
            fail?.(err)
            complete?.()
            return Promise.reject(err)
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

export function isFunction(obj: unknown): boolean {
    return typeof obj === 'function'
}

const VALID_COLOR_REG = /^#[0-9a-fA-F]{6}$/

export const isValidColor = (color: string): boolean => {
    return VALID_COLOR_REG.test(color)
}

export function easeInOutCubic(t: number, b: number, c: number, d: number) {
    const cc = c - b
    t /= d / 2
    if (t < 1) {
      return (cc / 2) * t * t * t + b
    }
    return (cc / 2) * ((t -= 2) * t * t + 2) + b
}

export * from './env'
