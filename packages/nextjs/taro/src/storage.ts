import {getParameterError, temporarilyNotSupport} from './utils'
import { MethodHandler } from './utils/handler'

function getItem(key) {
    let item
    try {
        item = JSON.parse(localStorage.getItem(key) || '')
    } catch (e) { }

    // 只返回使用 Taro.setStorage API 存储的数据
    if (item && typeof item === 'object' && item.hasOwnProperty('data')) {
        return { result: true, data: item.data }
    } else {
        return { result: false }
    }
}

// 数据缓存
export const setStorageSync = (key, data = '') => {
    if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
        console.error('setStorageSync does nothing on the server-side.')
        return
    }

    if (typeof key !== 'string') {
        console.error(getParameterError({
            name: 'setStorage',
            correct: 'String',
            wrong: key
        }))
        return
    }

    const type = typeof data
    let obj = {}

    if (type === 'symbol') {
        obj = { data: '' }
    } else {
        obj = { data }
    }
    localStorage.setItem(key, JSON.stringify(obj))
}

export const setStorage = ({ key, data, success, fail, complete }) => {
    if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
        fail?.()
        complete?.()
        const msg = 'setStorage is always fail on the server-side.'
        console.error(msg)
        return Promise.reject(new Error(msg))
    }

    const handle = new MethodHandler({ name: 'setStorage', success, fail, complete })

    if (typeof key !== 'string') {
        return handle.fail({
            errMsg: getParameterError({
                para: 'key',
                correct: 'String',
                wrong: key
            })
        })
    }

    setStorageSync(key, data)
    return handle.success()
}

export const revokeBufferURL = temporarilyNotSupport('revokeBufferURL')

export const removeStorageSync = (key: string) => {
    if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
        console.error('removeStorageSync does nothing on the server-side.')
        return
    }

    if (typeof key !== 'string') {
        console.error(getParameterError({
            name: 'removeStorage',
            correct: 'String',
            wrong: key
        }))
        return
    }

    localStorage.removeItem(key)
}

export const removeStorage = ({ key, success, fail, complete }) => {
    if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
        fail?.()
        complete?.()
        const msg = 'removeStorage is always fail on the server-side.'
        console.error(msg)
        return Promise.reject(new Error(msg))
    }

    const handle = new MethodHandler({ name: 'removeStorage', success, fail, complete })

    if (typeof key !== 'string') {
        return handle.fail({
            errMsg: getParameterError({
                para: 'key',
                correct: 'String',
                wrong: key
            })
        })
    }

    removeStorageSync(key)
    return handle.success()
}

export const getStorageSync = (key) => {
    if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
        console.error('getStorageSync does nothing on the server-side.')
        return
    }

    if (typeof key !== 'string') {
        console.error(getParameterError({
            name: 'getStorageSync',
            correct: 'String',
            wrong: key
        }))
        return
    }

    const res = getItem(key)
    if (res.result) return res.data

    return ''
}

export const getStorageInfoSync = () => {
    if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
        console.error('getStorageInfoSync does nothing on the server-side.')
        return
    }

    const res = {
        keys: Object.keys(localStorage),
        limitSize: NaN,
        currentSize: NaN
    }
    return res
}

export const getStorageInfo = ({ success, fail, complete } = {} as any) => {
    if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
        fail?.()
        complete?.()
        const msg = 'getStorageInfo is always fail on the server-side.'
        console.error(msg)
        return Promise.reject(new Error(msg))
    }

    const handle = new MethodHandler({ name: 'getStorageInfo', success, fail, complete })
    return handle.success(getStorageInfoSync())
}

export const getStorage = ({ key, success, fail, complete }) => {
    if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
        fail?.()
        complete?.()
        const msg = 'getStorage is always fail on the server-side.'
        console.error(msg)
        return Promise.reject(new Error(msg))
    }

    const handle = new MethodHandler({ name: 'getStorage', success, fail, complete })

    if (typeof key !== 'string') {
        return handle.fail({
            errMsg: getParameterError({
                para: 'key',
                correct: 'String',
                wrong: key
            })
        })
    }

    const { result, data } = getItem(key)
    if (result) {
        return handle.success({ data })
    } else {
        return handle.fail({
            errMsg: 'data not found'
        })
    }
}

export const createBufferURL = temporarilyNotSupport('createBufferURL')

export const clearStorageSync = () => {
    if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
        console.error('clearStorageSync does nothing on the server-side.')
        return
    }

    localStorage.clear()
}

export const clearStorage = ({ success, fail, complete }) => {
    if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
        fail?.()
        complete?.()
        const msg = 'clearStorage is always fail on the server-side.'
        console.error(msg)
        return Promise.reject(new Error(msg))
    }

    const handle = new MethodHandler({ name: 'clearStorage', success, fail, complete })
    clearStorageSync()
    return handle.success()
}
