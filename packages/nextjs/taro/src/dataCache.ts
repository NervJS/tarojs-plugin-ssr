import promisify from 'mpromisify'
import {unsupported, limited} from './_util'
import type * as swan from './swan'

const setStorageSyncInternal: typeof swan.setStorageSync = (key, data) => {
    if (typeof key !== 'string') {
        throw new Error(`key should be String instead of ${typeof key}.`)
    }

    localStorage.setItem(key, JSON.stringify(data))
}

/**
 * 将数据存储在本地缓存中指定的 key 中。如果之前存在同名 key，会覆盖掉原来该 key 对应的内容。这是一个同步接口。
 */
export const setStorageSync = limited._void('setStorageSync', setStorageSyncInternal)

const setStorageInternal: typeof swan.setStorage = ({key, data, success, fail, complete}) => {
    try {
        setStorageSync(key, data)
        success?.()
    } catch(err) {
        fail?.({
            errMsg: err.message
        })
    }
    complete?.()
}

/**
 * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容。
 */
export const setStorage = promisify(limited.async('setStorage', setStorageInternal))

/**
 * 根据 URL 销毁存在内存中的数据
 */
export const revokeBufferURL = unsupported._void('revokeBufferURL')

const removeStorageSyncInternal: typeof swan.removeStorageSync = key => {
    if (typeof key !== 'string') {
        throw new Error(`key should be String instead of ${typeof key}.`)
    }

    localStorage.removeItem(key)
}

/**
 * 从本地缓存中同步移除指定 key。
 */
export const removeStorageSync = limited._void('removeStorageSync', removeStorageSyncInternal)

const removeStorageInternal: typeof swan.removeStorage = ({key, success, fail, complete}) => {
    try {
        removeStorageSync(key)
        success?.()
    } catch (err) {
        fail?.({
            errMsg: err.message
        })
    }
    complete?.()
}

/**
 * 从本地缓存中同步移除指定 key。
 */
export const removeStorage = promisify(limited.async('removeStorage', removeStorageInternal))

const getStorageSyncInternal: typeof swan.getStorageSync = key => {
    if (typeof key !== 'string') {
        throw new Error(`key should be String instead of ${typeof key}.`)
    }

    const json = localStorage.getItem(key)
    if (!json) {
        return ''
    }
    try {
        return JSON.parse(json)
    } catch { }
    return ''
}

/**
 * 从本地缓存中同步移除指定 key。
 */
export const getStorageSync = limited.never('getStorageSync', getStorageSyncInternal)

const getStorageInternal = ({key, success, fail, complete}) => {
    try {
        const data = getStorageSync(key)
        success?.({data})
    } catch (err) {
        fail?.({
            errMsg: err.message
        })
    }
    complete?.()
}

/**
 * 从本地缓存中同步移除指定 key。
 */
export const getStorage = promisify(limited.async('getStorage', getStorageInternal))

const getStorageInfoSyncInternal: typeof swan.getStorageInfoSync = () => {
    const keys: string[] = []
    let currentSize = 0
    for (const key in localStorage){
        keys.push(key)
        const value = localStorage.getItem(key)
        if (value != null) {
            currentSize += key.length + value.length
        }
    }
    return {
        keys,
        limitSize: Number.MAX_VALUE,
        currentSize: Math.ceil(currentSize * 2 / 1024)
    }
}

/**
 * 同步获取当前 storage 的相关信息。
 */
export const getStorageInfoSync = limited.never('getStorageInfoSync', getStorageInfoSyncInternal)

const getStorageInfoInternal = ({success, fail, complete} = {} as any) => {
    try {
        const data = getStorageInfoSync()
        success?.({data})
    } catch (err) {
        fail?.({
            errMsg: err.message
        })
    }
    complete?.()
}

/**
 * 获取当前 storage 的相关信息。
 */
export const getStorageInfo = promisify(limited.async('getStorageInfo', getStorageInfoInternal))

/**
 * 根据传入的 buffer 创建一个唯一的 URL 存在内存中。
 */
export const createBufferURL = unsupported._void('createBufferURL')

const clearStorageSyncInternal: typeof swan.clearStorageSync = () => {
    localStorage.clear()
}

/**
 * 同步清理本地数据缓存。
 */
export const clearStorageSync = limited._void('clearStorageSync', clearStorageSyncInternal)

/**
 * 清理本地数据缓存。
 */
const clearStorageInternal: typeof swan.clearStorage = ({success, complete}) => {
    clearStorageSync()
    success?.()
    complete?.()
}

export const clearStorage = promisify(limited.async('clearStorage', clearStorageInternal))
