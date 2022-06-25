import promisify from 'mpromisify'
import {unsupported} from './utils'
import type * as swan from './swan'

/**
 * 将数据存储在本地缓存中指定的 key 中。如果之前存在同名 key，会覆盖掉原来该 key 对应的内容。这是一个同步接口。
 */
export const setStorageSync: typeof swan.setStorageSync = (key, data) => {
    if (typeof window === 'undefined') {
        console.error('`setStorageSync` does nothing on the server-side.')
        return
    }

    if (typeof key !== 'string') {
        throw new Error(`key should be String instead of ${typeof key}.`)
    }

    localStorage.setItem(key, JSON.stringify(data))
}

const setStorageInternal: typeof swan.setStorage = ({key, data, success, fail, complete}) => {
    if (typeof window === 'undefined') {
        const err = {
            errMsg: '`setStorage` is always fail on the server-side.'
        }
        fail?.(err)
    } else {
        try {
            setStorageSync(key, data)
            success?.()
        } catch(err) {
            fail?.({
                errMsg: err.message
            })
        }
    }
    complete?.()
}

/**
 * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容。
 */
export const setStorage = promisify(setStorageInternal)

/**
 * 根据 URL 销毁存在内存中的数据
 */
export const revokeBufferURL = unsupported._void('revokeBufferURL')

/**
 * 从本地缓存中同步移除指定 key。
 */
export const removeStorageSync: typeof swan.removeStorageSync = key => {
    if (typeof window === 'undefined') {
        console.error('`removeStorageSync` does nothing on the server-side.')
        return
    }

    if (typeof key !== 'string') {
        throw new Error(`key should be String instead of ${typeof key}.`)
    }

    localStorage.removeItem(key)
}

const removeStorageInternal: typeof swan.removeStorage = ({key, success, fail, complete}) => {
    if (typeof window === 'undefined') {
        const err = {
            errMsg: '`removeStorage` is always fail on the server-side.'
        }
        fail?.(err)
    } else {
        try {
            removeStorageSync(key)
            success?.()
        } catch (err) {
            fail?.({
                errMsg: err.message
            })
        }
    }
    complete?.()
}

/**
 * 从本地缓存中同步移除指定 key。
 */
export const removeStorage = promisify(removeStorageInternal)

/**
 * 从本地缓存中同步移除指定 key。
 */
export const getStorageSync: typeof swan.getStorageSync = key => {
    if (typeof window === 'undefined') {
        console.error('`getStorageSync` does nothing on the server-side.')
        return
    }

    if (typeof key !== 'string') {
        throw new Error(`key should be String instead of ${typeof key}.`)
    }

    const json = localStorage.getItem(key)
    try {
        return JSON.parse(json)
    } catch { }
    return ''
}

const getStorageInternal = ({key, success, fail, complete}) => {
    if (typeof window === 'undefined') {
        const err = {
            errMsg: '`getStorage` is always fail on the server-side.'
        }
        fail?.(err)
    } else {
        try {
            const data = getStorageSync(key)
            success?.({data})
        } catch (err) {
            fail?.({
                errMsg: err.message
            })
        }
    }
    complete?.()
}

/**
 * 从本地缓存中同步移除指定 key。
 */
export const getStorage = promisify(getStorageInternal)

/**
 * 同步获取当前 storage 的相关信息。
 */
export const getStorageInfoSync: typeof swan.getStorageInfoSync = () => {
    if (typeof window === 'undefined') {
        console.error('`getStorageInfoSync` does nothing on the server-side.')
        return
    }

    const keys: string[] = []
    let currentSize = 0
    for (const key in localStorage){
        keys.push(key)
        const value = localStorage.getItem(key)
        currentSize += key.length + value.length
    }
    return {
        keys,
        limitSize: Number.MAX_VALUE,
        currentSize: Math.ceil(currentSize * 2 / 1024)
    }
}

const getStorageInfoInternal = ({success, fail, complete} = {} as any) => {
    if (typeof window === 'undefined') {
        const err = {
            errMsg: '`getStorageInfo` is always fail on the server-side.'
        }
        fail?.(err)
    } else {
        try {
            const data = getStorageInfoSync()
            success?.({data})
        } catch (err) {
            fail?.({
                errMsg: err.message
            })
        }
    }
    complete?.()
}

/**
 * 获取当前 storage 的相关信息。
 */
export const getStorageInfo = promisify(getStorageInfoInternal)

/**
 * 根据传入的 buffer 创建一个唯一的 URL 存在内存中。
 */
export const createBufferURL = unsupported._void('createBufferURL')

/**
 * 同步清理本地数据缓存。
 */
export const clearStorageSync: typeof swan.clearStorageSync = () => {
    if (typeof window === 'undefined') {
        console.error('`clearStorageSync` does nothing on the server-side.')
        return
    }
    localStorage.clear()
}

/**
 * 清理本地数据缓存。
 */
const clearStorageInternal: typeof swan.clearStorage = ({success, fail, complete}) => {
    if (typeof window === 'undefined') {
        const err = {
            errMsg: '`clearStorage` is always fail on the server-side.'
        }
        fail?.(err)
    } else {
        clearStorageSync()
        success?.()
    }
    complete?.()
}

export const clearStorage = promisify(clearStorageInternal)
