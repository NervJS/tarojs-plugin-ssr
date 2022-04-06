// @ts-ignore
import jsonpRetry from 'jsonp-retry'
import {serializeParams} from '../utils'

function generateRequestUrlWithParams (url: string, params?: Record<string, any> | string) {
  params = typeof params === 'string' ? params : serializeParams(params)
  if (params) {
    url += (~url.indexOf('?') ? '&' : '?') + params
  }
  return url.replace('?&', '?')
}

export default function request(options: any) {
    options = options || {}
    if (typeof options === 'string') {
        options = {
            url: options
        }
    }
    const {success, complete, fail} = options
    let url = options.url
    const params: any = {}
    const res: any = {}
    if (options.jsonp) {
        Object.assign(params, options)
        params.params = options.data
        params.cache = options.jsonpCache
        if (typeof options.jsonp === 'string') {
            params.name = options.jsonp
        }
        delete params.jsonp
        return jsonpRetry(url, params)
            .then((data: any) => {
                res.statusCode = 200
                res.data = data
                typeof success === 'function' && success(res)
                typeof complete === 'function' && complete(res)
                return res
            })
            .catch((err: any) => {
                typeof fail === 'function' && fail(err)
                typeof complete === 'function' && complete(res)
                return Promise.reject(err)
            })
    }
    params.method = options.method || 'GET'
    const methodUpper = params.method.toUpperCase()
    params.cache = options.cache || 'default'
    if (methodUpper === 'GET' || methodUpper === 'HEAD') {
        url = generateRequestUrlWithParams(url, options.data)
    } else if (typeof options.data === 'object') {
        options.header = options.header || {}

        const keyOfContentType = Object.keys(options.header).find(item => item.toLowerCase() === 'content-type')
        if (!keyOfContentType) {
            options.header['Content-Type'] = 'application/json'
        }
        const contentType = options.header[keyOfContentType || 'Content-Type']

        if (contentType.indexOf('application/json') >= 0) {
            params.body = JSON.stringify(options.data)
        } else if (contentType.indexOf('application/x-www-form-urlencoded') >= 0) {
            params.body = serializeParams(options.data)
        } else {
            params.body = options.data
        }
    } else {
        params.body = options.data
    }
    if (options.header) {
        params.headers = options.header
    }
    if (options.mode) {
        params.mode = options.mode
    }
    if (options.signal) {
        params.signal = options.signal
    }
    params.credentials = options.credentials
    return fetch(url, params)
        .then(response => {
            if (!response) {
                const errorResponse = { ok: false }
                throw errorResponse
            }
            res.statusCode = response.status
            res.header = {}
            for (const key of Object.keys(response.headers)) {
                res.header[key] = response.headers.get(key)
            }
            if (!response.ok) {
                throw response
            }
            if (options.responseType === 'arraybuffer') {
                return response.arrayBuffer()
            }
            if (res.statusCode !== 204) {
                if (options.dataType === 'json' || typeof options.dataType === 'undefined') {
                    return response.json()
                }
            }
            if (options.responseType === 'text' || options.dataType === 'text') {
                return response.text()
            }
            return Promise.resolve(null)
        })
        .then(data => {
            res.data = data
            typeof success === 'function' && success(res)
            typeof complete === 'function' && complete(res)
            return res
        })
        .catch(err => {
            typeof fail === 'function' && fail(err)
            typeof complete === 'function' && complete(res)
            return Promise.reject(err)
        })
}
