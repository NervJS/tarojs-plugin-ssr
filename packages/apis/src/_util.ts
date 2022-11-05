
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
