import {CallbackManager} from '../_util/handler'
import type * as swan from '../swan'

export const NETWORK_TIMEOUT = 60000

const url2Blob = (url: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.responseType = 'blob'
        xhr.onload = function () {
            if (this.status === 200) {
                resolve(this.response)
            } else {
                reject({status: this.status})
            }
        }
        xhr.send()
    })
}

/**
 * 将本地资源上传到服务器。客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data。使用前请注意阅读相关说明。
 */
export const uploadFile: typeof swan.uploadFile = ({
    url,
    filePath,
    name,
    header,
    formData,
    success,
    fail,
    complete
}) => {
    let timeoutTimer: ReturnType<typeof setTimeout> | null = null
    let formKey
    const xhr = new XMLHttpRequest()
    const form = new FormData()
    const callbackManager = {
        headersReceived: new CallbackManager(),
        progressUpdate: new CallbackManager()
    }

    xhr.open('POST', url)

    for (const key in header) {
        xhr.setRequestHeader(key, header[key])
    }

    for (formKey in formData) {
        form.append(formKey, formData[formKey])
    }

    xhr.upload.onprogress = ({loaded, total}) => {
        callbackManager.progressUpdate.trigger({
            progress: Math.round(loaded / total * 100),
            totalBytesSent: loaded,
            totalBytesExpectedToSent: total
        })
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 2) return
        callbackManager.headersReceived.trigger({
            header: xhr.getAllResponseHeaders()
        })
    }

    xhr.onload = () => {
        const status = xhr.status
        clearTimeout(timeoutTimer)
        success?.({
            statusCode: status,
            data: xhr.responseText || xhr.response
        })
        complete?.()
    }

    xhr.onabort = () => {
        clearTimeout(timeoutTimer)
        fail?.({
            errMsg: 'uploadFile:fail abort'
        })
        complete?.()
    }

    xhr.onerror = (e: ProgressEvent<EventTarget> & { message?: string }) => {
        clearTimeout(timeoutTimer)
        fail?.({
            errMsg: `uploadFile:fail ${e.message}`
        })
        complete?.()
    }

    /**
     * 中断任务
     */
    const abort = () => {
        clearTimeout(timeoutTimer)
        xhr.abort()
    }

    const send = () => {
        xhr.send(form)
        timeoutTimer = setTimeout(() => {
            xhr.onabort = null
            xhr.onload = null
            xhr.upload.onprogress = null
            xhr.onreadystatechange = null
            xhr.onerror = null
            abort()
            fail?.({
                errMsg: 'uploadFile:fail timeout'
            })
            complete?.()
        }, NETWORK_TIMEOUT)
    }

    url2Blob(filePath)
        .then((fileObj) => {
            form.append(name, fileObj, (fileObj as any).name || `file-${Date.now()}`)
            send()
        })
        .catch(e => {
            fail?.({
                errMsg: `uploadFile:fail ${e.message}`
            })
            complete?.()
        })

    /**
     * 监听 HTTP Response Header 事件。会比请求完成事件更早
     * @param {HeadersReceivedCallback} callback HTTP Response Header 事件的回调函数
     */
    const onHeadersReceived = callbackManager.headersReceived.add as any
    /**
     * 取消监听 HTTP Response Header 事件
     * @param {HeadersReceivedCallback} callback HTTP Response Header 事件的回调函数
     */
    const offHeadersReceived = callbackManager.headersReceived.remove as any

    /**
     * 监听进度变化事件
     * @param {ProgressUpdateCallback} callback HTTP Response Header 事件的回调函数
     */
    const onProgressUpdate = callbackManager.progressUpdate.add as any
    /**
     * 取消监听进度变化事件
     * @param {ProgressUpdateCallback} callback HTTP Response Header 事件的回调函数
     */
    const offProgressUpdate = callbackManager.progressUpdate.remove as any

    return {
        abort,
        onHeadersReceived,
        offHeadersReceived,
        onProgressUpdate,
        offProgressUpdate
    }
}
