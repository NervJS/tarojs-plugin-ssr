export namespace request {
    export type Param = {
        /**
         * 开发者服务器接口地址
         */
        url: string
        /**
         * 请求的参数
         */
        data?: any | string | ArrayBuffer
        /**
         * 设置请求的 header，header 中不能设置 Referer。
         */
        header?: any
        /**
         * （需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         *
         * @default GET
         */
        method?: string
        /**
         * 如果设为json，会尝试对返回的数据做一次 JSON.parse
         *
         * @default json
         */
        dataType?: string
        /**
         * 设置响应的数据类型。合法值：text、arraybuffer
         *
         * @default text
         */
        responseType?: string
        /**
         * 收到开发者服务成功返回的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 收到开发者服务成功返回的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 开发者服务器返回的数据
         *
         * **data 数据说明：**
         *
         * 最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String 。转换规则如下：
         *
         * *   对于 `GET` 方法的数据，会将数据转换成 query string（encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
         * *   对于 `POST` 方法且 `header['content-export type']` 为 `application/json` 的数据，会对数据进行 JSON 序列化
         * *   对于 `POST` 方法且 `header['content-export type']` 为 `application/x-www-form-urlencoded` 的数据，会将数据转换成 query string （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
         */
        data: any | string | ArrayBuffer
        /**
         * 开发者服务器返回的 HTTP 状态码
         */
        statusCode: number
        /**
         * 开发者服务器返回的 HTTP Response Header
         *
         */
        header: any
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
    export type Return = {
        /**
         * 中断请求任务
         *
         */
        abort: ReturnPropAbort
    }
    /**
     * 中断请求任务
     */
    export type ReturnPropAbort = () => any
}
/**
 * 发起网络请求。**使用前请先阅读[说明](https://smartapp.baidu.com/docs/develop/api/net/)**。
 *
 * **返回值：**
 *
 *
 * 返回一个 `requestTask` 对象，通过 `requestTask`，可中断请求任务。
 *
 * **Bug & Tip：**
 *
 * 1.  `tip`: content-export type 默认为 'application/json';
 * 2.  `bug`: 开发者工具 `0.10.102800` 版本，`header` 的 `content-export type` 设置异常；
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.request({
 *       url: 'test.php', //仅为示例，并非真实的接口地址
 *       data: {
 *          x: '' ,
 *          y: ''
 *       },
 *       header: {
 *           'content-export type': 'application/json' // 默认值
 *       },
 *       success: function(res) {
 *         console.log(res.data)
 *       }
 *     })
 *     ```
 *
 * **示例代码：**
 *
 *     ```javascript
 *     const requestTask = swan.request({
 *       url: 'test.php', //仅为示例，并非真实的接口地址
 *       data: {
 *          x: '' ,
 *          y: ''
 *       },
 *       header: {
 *           'content-export type': 'application/json'
 *       },
 *       success: function(res) {
 *         console.log(res.data)
 *       }
 *     })
 *
 *     requestTask.abort() // 取消请求任务
 *     ```
 * 
 */
export function request(OBJECT: request.Param): request.Return

export namespace uploadFile {
    export type Param = {
        /**
         * 开发者服务器 url
         */
        url: string
        /**
         * 要上传文件资源的路径
         */
        filePath: string
        /**
         * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
         */
        name: string
        /**
         * HTTP 请求 Header, header 中不能设置 Referer
         */
        header?: any
        /**
         * HTTP 请求中其他额外的 form data
         */
        formData?: any
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 开发者服务器返回的数据
         */
        data: string
        /**
         * 开发者服务器返回的 HTTP 状态码
         */
        statusCode: number
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
    export type Return = {
        /**
         * 监听上传进度变化
         */
        onProgressUpdate: ReturnPropOnProgressUpdate

        /**
         * 取消监听下载进度变化。
         */
        offProgressUpdate: ReturnPropOnProgressUpdate

        /**
         * 监听上传的 HTTP Response Header 事件，一次连接只会触发一次，早于上传请求完成事件。
         */
        onHeadersReceived: ReturnPropOnHeadersReceived

        /**
         * 取消监听上传的 HTTP Response Header 事件。
         */
        offHeadersReceived: ReturnPropOnHeadersReceived

        /**
         * 中断上传任务
         */
        abort: ReturnPropAbort
    }
    /**
     * 监听上传进度变化
     */
    export type ReturnPropOnProgressUpdate = (callback: ReturnPropOnProgressUpdateParam) => any
    export type ReturnPropOnProgressUpdateParam = (res: ReturnPropOnProgressUpdateParamParam) => any
    export type ReturnPropOnProgressUpdateParamParam = {
        /**
         * 上传进度百分比
         */
        progress: number
        /**
         * 已经上传的数据长度，单位 Bytes
         */
        totalBytesSent: number
        /**
         * 预期需要上传的数据总长度，单位 Bytes
         */
        totalBytesExpectedToSend: number
    }
    /**
     * 监听上传的 HTTP Response Header 事件
     */
     export type ReturnPropOnHeadersReceived = (callback: ReturnPropOnProgressUpdateParam) => any
     export type ReturnPropOnHeadersReceivedParam = (res: ReturnPropOnProgressUpdateParamParam) => any
     export type ReturnPropOnHeadersReceivedParamParam = {
        /**
         * 开发者服务器返回的 HTTP Response Header
         */
        header: Record<string, string>
     }
    /**
     * 中断上传任务
     */
    export type ReturnPropAbort = () => any
}
/**
 * 将本地资源上传到开发者服务器，客户端发起一个 HTTPS POST 请求，其中 `content-export type` 为 `multipart/form-data` 。
 *
 * 如页面通过 [swan.chooseImage](https://smartapp.baidu.com/docs/develop/api/media/#chooseImage) 等接口获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器。
 *
 * **返回值：**
 *
 *
 * 返回一个 `uploadTask` 对象，通过 `uploadTask`，可监听上传进度变化事件，以及取消上传任务。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.chooseImage({
 *       success: function(res) {
 *         var tempFilePaths = res.tempFilePaths
 *         swan.uploadFile({
 *           url: 'https://smartprogram.baidu.com/xxx', // 开发者服务器 url
 *           filePath: tempFilePaths[0],
 *           name: 'file',
 *           formData:{
 *             'user': 'test'
 *           },
 *           success: function(res){
 *             var data = res.data
 *             //do something
 *           }
 *         })
 *       }
 *     })
 *     ```
 *
 * **示例代码：**
 *
 *     ```javascript
 *     const uploadTask = swan.uploadFile({
 *         url: 'https://smartprogram.baidu.com/xxx', // 开发者服务器 url
 *         filePath: tempFilePaths[0],
 *         name: 'file',
 *         formData:{
 *             'user': 'test'
 *         },
 *         success: function(res){
 *             var data = res.data
 *             //do something
 *         }
 *     })
 *
 *     uploadTask.onProgressUpdate((res) => {
 *         console.log('上传进度', res.progress)
 *         console.log('已经上传的数据长度', res.totalBytesSent)
 *         console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
 *     })
 *
 *     uploadTask.abort() // 取消上传任务
 *     ```
 * 
 */
export function uploadFile(OBJECT: uploadFile.Param): uploadFile.Return

export namespace downloadFile {
    export type Param = {
        /**
         * 下载资源的 url
         */
        url: string
        /**
         * HTTP 请求 Header，header 中不能设置 Referer
         */
        header?: any
        /**
         * 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 临时文件路径，下载后的文件会存储到一个临时文件
         */
        tempFilePath: string
        /**
         * 开发者服务器返回的 HTTP 状态码
         */
        statusCode: number
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
    export type Return = {
        /**
         * 监听下载进度变化
         *
         */
        onProgressUpdate: ReturnPropOnProgressUpdate
        /**
         * 中断下载任务
         *
         */
        abort: ReturnPropAbort
    }
    /**
     * 监听下载进度变化
     */
    export type ReturnPropOnProgressUpdate = (callback: ReturnPropOnProgressUpdateParam) => any
    export type ReturnPropOnProgressUpdateParam = (res: ReturnPropOnProgressUpdateParamParam) => any
    export type ReturnPropOnProgressUpdateParamParam = {
        /**
         * 下载进度百分比
         */
        progress: number
        /**
         * 已经下载的数据长度，单位 Bytes
         */
        totalBytesWritten: number
        /**
         * 预期需要下载的数据总长度，单位 Bytes
         */
        totalBytesExpectedToWrite: number
    }
    /**
     * 中断下载任务
     */
    export type ReturnPropAbort = () => any
}
/**
 * 下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。
 *
 * **返回值：**
 *
 *
 * 返回一个 `downloadTask` 对象，通过 `downloadTask`，可监听下载进度变化事件，以及取消下载任务。
 *
 * **Tips：**
 *
 * 1. 文件的临时路径，在智能小程序本次启动期间可以正常使用，如需持久保存，需再主动调用 swan.saveFile，才能在智能小程序下次启动时访问得到。
 * 2. 请在 header 中指定合理的 Content-Type 字段，以保证客户端正确处理文件类型  
 * 3. uploadFile 上传文件大小限制为 25M。       
 * 
 * **示例代码：**
 *
 *     ```javascript
 *     swan.downloadFile({
 *       url: 'https://smartprogram.baidu.com/xxx', //仅为示例，并非真实的资源
 *       success: function(res) {
 *         // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
 *         if (res.statusCode === 200) {
 *             swan.playVoice({
 *               filePath: res.tempFilePath
 *             })
 *         }
 *       }
 *     })
 *     ```
 *
 * **示例代码：**
 *
 *     ```javascript
 *     const downloadTask = swan.downloadFile({
 *         url: 'https://smartprogram.baidu.com/xxx', //仅为示例，并非真实的资源
 *         success: function(res) {
 *             swan.playVoice({
 *                 filePath: res.tempFilePath
 *             })
 *         }
 *     })
 *
 *     downloadTask.onProgressUpdate((res) => {
 *         console.log('下载进度', res.progress)
 *         console.log('已经下载的数据长度', res.totalBytesWritten)
 *         console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
 *     })
 *
 *     downloadTask.abort() // 取消下载任务
 *     ```
 * 
 */
export function downloadFile(OBJECT: downloadFile.Param): downloadFile.Return

export namespace connectSocket {
    export type Param = {
        /**
         * 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
         */
        url: string
        /**
         * HTTP Header , header 中不能设置 Referer
         */
        header?: any
        /**
         * 默认是GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         */
        method?: string
        /**
         * 子协议数组
         *
         */
        protocols?: string[]
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 创建一个 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) 连接。
 *
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.connectSocket({
 *       url: 'wss://example.baidu.com',
 *       data:{
 *         x: '',
 *         y: ''
 *       },
 *       header:{ 
 *         'content-export type': 'application/json'
 *       },
 *       protocols: ['protocol1'],
 *       method:"GET"
 *     })
 *     ```
 * 
 */
export function connectSocket(OBJECT: connectSocket.Param): SocketTask

export namespace onSocketOpen {
    export type Param = (res: ParamParam) => any
    export type ParamParam = {
        /**
         * 连接成功的 HTTP 响应 Header
         *
         */
        header?: any
    }
}
/**
 * 监听WebSocket连接打开事件。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.connectSocket({
 *       url: 'test.php'
 *     })
 *     swan.onSocketOpen(function(res) {
 *       console.log('WebSocket连接已打开！')
 *     })
 *     ```
 * 
 */
export function onSocketOpen(callback?: onSocketOpen.Param): void

/**
 * 监听WebSocket错误。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.connectSocket({
 *       url: 'test.php'
 *     })
 *     swan.onSocketOpen(function(res){
 *       console.log('WebSocket连接已打开！')
 *     })
 *     swan.onSocketError(function(res){
 *       console.log('WebSocket连接打开失败，请检查！')
 *     })
 *     ```
 * 
 */
export function onSocketError(CALLBACK: any): void

export namespace sendSocketMessage {
    export type Param = {
        /**
         * 需要发送的内容
         */
        data: string | ArrayBuffer
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 通过 WebSocket 连接发送数据，需要先 [swan.connectSocket](https://smartapp.baidu.com/docs/develop/api/net/#connectSocket)，并在 [swan.onSocketOpen](https://smartapp.baidu.com/docs/develop/api/net/#onSocketOpen) 回调之后才能发送。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     var socketOpen = false
 *     var socketMsgQueue = []
 *     swan.connectSocket({
 *       url: 'test.php'
 *     })
 *
 *     swan.onSocketOpen(function(res) {
 *       socketOpen = true
 *       for (var i = 0; i < socketMsgQueue.length; i++){
 *          sendSocketMessage(socketMsgQueue[i])
 *       }
 *       socketMsgQueue = []
 *     })
 *
 *     export function sendSocketMessage(msg) {
 *       if (socketOpen) {
 *         swan.sendSocketMessage({
 *           data:msg
 *         })
 *       } else {
 *          socketMsgQueue.push(msg)
 *       }
 *     }
 *     ```
 * 
 */
export function sendSocketMessage(OBJECT: sendSocketMessage.Param): void

export namespace onSocketMessage {
    export type Param = (res: ParamParam) => any
    export type ParamParam = {
        /**
         * 服务器返回的消息
         */
        data: string | ArrayBuffer
    }
}
/**
 * 监听WebSocket接受到服务器的消息事件。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.connectSocket({
 *       url: 'test.php'
 *     })
 *
 *     swan.onSocketMessage(function(res) {
 *       console.log('收到服务器内容：' + res.data)
 *     })
 *     ```
 * 
 */
export function onSocketMessage(CALLBACK: onSocketMessage.Param): void

export namespace closeSocket {
    export type Param = {
        /**
         * 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）
         *
         */
        code?: number
        /**
         * 一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于123字节的UTF-8 文本（不是字符）
         *
         */
        reason?: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 关闭 WebSocket 连接。
 * 
 */
export function closeSocket(OBJECT: closeSocket.Param): void

/**
 * 监听WebSocket关闭。
 *
 * **返回值：**
 *
 *
 * 返回一个SocketTask
 *
 *
 *
 * **示例：**
 *
 *     ```javascript
 *     swan.connectSocket({
 *       url: 'test.php'
 *     })
 *
 *     //注意这里有时序问题，
 *     //如果 swan.connectSocket 还没回调 swan.onSocketOpen，而先调用 swan.closeSocket，那么就做不到关闭 WebSocket 的目的。
 *     //必须在 WebSocket 打开期间调用 swan.closeSocket 才能关闭。
 *     swan.onSocketOpen(function() {
 *       swan.closeSocket()
 *     })
 *
 *     swan.onSocketClose(function(res) {
 *       console.log('WebSocket 已关闭！')
 *     })
 *     ```
 * 
 */
export function onSocketClose(CALLBACK: any): void

export namespace SocketTask {
    export namespace send {
        export type Param = {
            /**
             * 需要发送的内容
             */
            data: string | ArrayBuffer
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace close {
        export type Param = {
            /**
             * 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）
             */
            code?: number
            /**
             * 一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于123字节的UTF-8 文本（不是字符）
             */
            reason?: string
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace onOpen {
        export type Param = (res: ParamParam) => any
        export type ParamParam = {
            /**
             * 连接成功的 HTTP 响应 Header
             *
             */
            header: any
        }
    }
    export namespace onError {
        export type Param = (res: ParamParam) => any
        export type ParamParam = {
            /**
             * 错误信息
             */
            errMsg: string
        }
    }
    export namespace onMessage {
        export type Param = (res: ParamParam) => any
        export type ParamParam = {
            /**
             * 服务器返回的消息
             */
            data: string | ArrayBuffer
        }
    }
}
/**
 *
 * WebSocket 任务，可通过 swan.connectSocket()接口创建返回。
 */
export class  SocketTask {
    /**
     *
     * **SocketTask.send(OBJECT)：**
     *
     * 通过 WebSocket 连接发送数据。
     */
    send(OBJECT: SocketTask.send.Param): void
    /**
     *
     * **SocketTask.close(OBJECT)：**
     *
     * 关闭 WebSocket 连接。
     */
    close(OBJECT: SocketTask.close.Param): void
    /**
     *
     * **SocketTask.onOpen(CALLBACK)：**
     *
     * 监听 WebSocket 连接打开事件。
     */
    onOpen(CALLBACK: SocketTask.onOpen.Param): void
    /**
     *
     * **SocketTask.onClose(CALLBACK)：**
     *
     * 监听 WebSocket 连接关闭事件。
     */
    onClose(CALLBACK: any): void
    /**
     *
     * **SocketTask.onError(CALLBACK)：**
     *
     * 监听 WebSocket 错误。
     */
    onError(CALLBACK: SocketTask.onError.Param): void
    /**
     *
     * **SocketTask.onMessage(CALLBACK)：**
     *
     * 监听WebSocket接受到服务器的消息事件。
     */
    onMessage(CALLBACK: SocketTask.onMessage.Param): void
}
export namespace chooseImage {
    export type Param = {
        /**
         * 最多可以选择的图片张数，默认9
         */
        count?: number
        /**
         * original 原图，compressed 压缩图，默认二者都有
         */
        sizeType?: string[]
        /**
         * album 从相册选图，camera 使用相机，默认二者都有
         */
        sourceType?: string[]
        /**
         * 成功则返回图片的本地文件路径列表 tempFilePaths
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 成功则返回图片的本地文件路径列表 tempFilePaths
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 图片的本地文件路径列表
         */
        tempFilePaths: string[]
        /**
         * 图片的本地文件列表，每一项是一个 File 对象
         *
         */
        tempFiles: ParamPropSuccessParamPropTempFiles
    }
    /**
     * 图片的本地文件列表，每一项是一个 File 对象
     */
    export type ParamPropSuccessParamPropTempFiles = ParamPropSuccessParamPropTempFilesItem[]
    export type ParamPropSuccessParamPropTempFilesItem = {
        /**
         * 本地文件路径
         */
        path: string
        /**
         * 本地文件大小，单位：B
         */
        size: number
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 从本地相册选择图片或使用相机拍照。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.chooseImage({
 *       count: 1, // 默认9
 *       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
 *       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
 *       success: export function (res) {
 *         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
 *         var tempFilePaths = res.tempFilePaths
 *       }
 *     })
 *     ```
 */
export function chooseImage(OBJECT: chooseImage.Param): void

export namespace previewImage {
    export type Param = {
        /**
         * 当前显示图片的链接，不填则默认为 urls 的第一张
         */
        current?: string
        /**
         * 需要预览的图片链接列表
         */
        urls: string[]
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 预览图片。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.previewImage({
 *       current: '', // 当前显示图片的http链接
 *       urls: [] // 需要预览的图片http链接列表
 *     })
 *     ```
 * 
 */
export function previewImage(OBJECT: previewImage.Param): void

export namespace getImageInfo {
    export type Param = {
        /**
         * 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
         */
        src: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 图片宽度，单位px
         */
        width: number
        /**
         * 图片高度，单位px
         */
        height: number
        /**
         * 返回图片的本地路径
         */
        path: string
        /**
         * 返回图片的方向，有效值见下表
         *
         * **orientation参数说明：**
         *
         *   枚举值           |  说明           
         * -------------------|-----------------
         *   up               |  默认           
         *   down             |  180度旋转      
         *   left             |  逆时针旋转90度 
         *   right            |  顺时针旋转90度 
         *   up-mirrored      | 同up，但水平翻转
         *   down-mirrored    |同down，但水平翻转
         *   left-mirrored    |同left，但垂直翻转
         *   right-mirrored   |同right，但垂直翻转
         *
         * 
         */
        orientation: string
        /**
         * 返回图片的格式
         *
         * 
         */
        type: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 获取图片信息
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getImageInfo({
 *       src: 'images/a.jpg',
 *       success: export function (res) {
 *         console.log(res.width)
 *         console.log(res.height)
 *       }
 *     })
 *
 *     swan.chooseImage({
 *       success: export function (res) {
 *         swan.getImageInfo({
 *           src: res.tempFilePaths[0],
 *           success: export function (res) {
 *             console.log(res.width)
 *             console.log(res.height)
 *           }
 *         })
 *       }
 *     })
 *     ```
 * 
 */
export function getImageInfo(OBJECT: getImageInfo.Param): void

export namespace saveImageToPhotosAlbum {
    export type Param = {
        /**
         * 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
         */
        filePath: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 调用结果
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 保存图片到系统相册。需要用户授权scope.writePhotosAlbum
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.saveImageToPhotosAlbum({
 *         success(res) {
 *         }
 *     })
 *     ```
 */
export function saveImageToPhotosAlbum(OBJECT: saveImageToPhotosAlbum.Param): void

export namespace startRecord {
    export type Param = {
        /**
         * 录音成功后调用，返回录音文件的临时文件路径，res = {tempFilePath: '录音文件的临时路径'}
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 录音成功后调用，返回录音文件的临时文件路径，res = {tempFilePath: '录音文件的临时路径'}
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 录音文件的临时路径
         */
        tempFilePath: any
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * **注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的swan.getRecorderManager接口**
 *
 * 开始录音。当主动调用`swan.stopRecord`，或者录音超过1分钟时自动结束录音，返回录音文件的临时文件路径。当用户离开小程序时，此接口无法调用。
 *
 * 需要用户授权scope.record
 * 
 */
export function startRecord(OBJECT: startRecord.Param): void

/**
 * 主动调用停止录音。
 * **示例代码：**
 *
 *     ```javascript
 *     swan.startRecord({
 *       success: function(res) {
 *         var tempFilePath = res.tempFilePath 
 *       },
 *       fail: function(res) {
 *          //录音失败
 *       }
 *     })
 *     setTimeout(function() {
 *       //结束录音  
 *       swan.stopRecord()
 *     }, 10000)
 *     ```
 * 
 */
export function stopRecord(): void

/**
 * 
 *
 * 获取**全局唯一**的录音管理器 `recorderManager`。
 *
 * **其中，采样率和码率有一定要求，具体有效值如下：：**
 *
 *   采样率  |  编码码率         
 * ----------|-------------------
 *   8000    |  16000 ~ 48000    
 *   11025   |  16000 ~ 48000    
 *   12000   |  24000 ~ 64000    
 *   16000   |  24000 ~ 96000    
 *   22050   |  32000 ~ 128000   
 *   24000   |  32000 ~ 128000   
 *   32000   |  48000 ~ 192000   
 *   44100   |  64000 ~ 320000   
 *   48000   |  64000 ~ 320000   
 *
 * audioSource 有效值：
 *
 * **示例代码：**
 *
 *     ```javascript
 *     const recorderManager = swan.getRecorderManager()
 *
 *     recorderManager.onStart(() => {
 *       console.log('recorder start')
 *     })
 *     recorderManager.onPause(() => {
 *       console.log('recorder pause')
 *     })
 *     recorderManager.onStop((res) => {
 *       console.log('recorder stop', res)
 *       const { tempFilePath } = res
 *     })
 *     recorderManager.onFrameRecorded((res) => {
 *       const { frameBuffer } = res
 *       console.log('frameBuffer.byteLength', frameBuffer.byteLength)
 *     })
 *
 *     const options = {
 *       duration: 10000,
 *       sampleRate: 44100,
 *       numberOfChannels: 1,
 *       encodeBitRate: 192000,
 *       format: 'aac',
 *       frameSize: 50
 *     }
 *
 *     recorderManager.start(options)
 *     ```
 * 
 */
export function getRecorderManager(): RecorderManager

export namespace RecorderManager {
    export namespace start {
        export type Param = {
            /**
             * 指定录音的时长，单位 ms ，如果传入了合法的 duration ，在到达指定的 duration 后会自动停止录音，最大值 600000（10 分钟）,默认值 60000（1 分钟）
             *
             * 
             */
            duration?: number
            /**
             * 采样率，有效值 8000/16000/44100
             *
             * 
             */
            sampleRate?: number
            /**
             * 录音通道数，有效值 1/2
             *
             * 
             */
            numberOfChannels?: number
            /**
             * 编码码率，有效值见下表格
             *
             * 
             */
            encodeBitRate?: number
            /**
             * 音频格式，有效值 aac/mp3
             *
             * 
             */
            format?: string
            /**
             * 指定帧大小，单位 KB。传入 frameSize 后，每录制指定帧大小的内容后，会回调录制的文件内容，不指定则不会回调。暂仅支持 mp3 格式。
             *
             * 
             */
            frameSize?: number
            /**
             * 指定音频输入源，默认值为 'auto'
             *
             * 
             */
            audioSource?: string
        }
    }
    export namespace onStop {
        export type Param = (res: ParamParam) => any
        export type ParamParam = {
            /**
             * 录音文件的临时路径
             */
            tempFilePath: string
        }
    }
    export namespace onFrameRecorded {
        export type Param = (res: ParamParam) => any
        export type ParamParam = {
            /**
             * 录音分片结果数据
             */
            frameBuffer: ArrayBuffer
            /**
             * 当前帧是否正常录音结束前的最后一帧
             */
            isLastFrame: boolean
        }
    }
    export namespace onError {
        export type Param = (res: ParamParam) => any
        export type ParamParam = {
            /**
             * 错误信息
             */
            errMsg: string
        }
    }
}
export class  RecorderManager {
    /**
     * 开始录音
     */
    start(options: RecorderManager.start.Param): any
    /**
     * 暂停录音
     */
    pause(): any
    /**
     * 继续录音
     */
    resume(): any
    /**
     * 停止录音
     */
    stop(): any
    /**
     * 录音开始事件
     */
    onStart(callback: any): any
    /**
     * 录音暂停事件
     */
    onPause(callback: any): any
    /**
     * 录音停止事件，会回调文件地址
     */
    onStop(callback: RecorderManager.onStop.Param): any
    /**
     * 已录制完指定帧大小的文件，会回调录音分片结果数据。如果设置了 frameSize ，则会回调此事件
     */
    onFrameRecorded(callback: RecorderManager.onFrameRecorded.Param): any
    /**
     * 录音错误事件, 会回调错误信息
     */
    onError(callback: RecorderManager.onError.Param): any
}
export namespace playVoice {
    export type Param = {
        /**
         * 需要播放的语音文件的文件路径
         */
        filePath: string
        /**
         * 指定录音时长，到达指定的录音时长后会自动停止录音，单位：秒，默认值：60
         *
         * 
         */
        duration?: number
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * **注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 [swan.createInnerAudioContext]接口**
 *
 * 开始播放语音，同时只允许一个语音文件正在播放，如果前一个语音文件还没播放完，将中断前一个语音播放。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.startRecord({
 *       success: function(res) {
 *         var tempFilePath = res.tempFilePath
 *         swan.playVoice({
 *           filePath: tempFilePath,
 *           complete: function(){
 *           }
 *         })
 *       }
 *     })
 *     ```
 * 
 */
export function playVoice(OBJECT: playVoice.Param): void

/**
 * 暂停正在播放的语音。再次调用swan.playVoice播放同一个文件时，会从暂停处开始播放。如果想从头开始播放，需要先调用 swan.stopVoice。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.startRecord({
 *       success: function(res) {
 *         var tempFilePath = res.tempFilePath
 *           swan.playVoice({
 *           filePath: tempFilePath
 *         })
 *
 *         setTimeout(function() {
 *             //暂停播放
 *           swan.pauseVoice()
 *         }, 5000)
 *       }
 *     })
 *     ```
 * 
 */
export function pauseVoice(): void

/**
 * 结束播放语音。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.startRecord({
 *       success: function(res) {
 *         var tempFilePath = res.tempFilePath
 *         swan.playVoice({
 *           filePath:tempFilePath
 *         })
 *
 *         setTimeout(function(){
 *           swan.stopVoice()
 *         }, 5000)
 *       }
 *     })
 *     ```
 * 
 */
export function stopVoice(): void

export namespace getBackgroundAudioPlayerState {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 选定音频的长度（单位：s），只有在当前有音乐播放时返回
         */
        duration: any
        /**
         * 选定音频的播放位置（单位：s），只有在当前有音乐播放时返回
         */
        currentPosition: any
        /**
         * 播放状态（2：没有音乐在播放，1：播放中，0：暂停中）
         */
        status: any
        /**
         * 音频的下载进度（整数，80 代表 80%），只有在当前有音乐播放时返回
         */
        downloadPercent: any
        /**
         * 歌曲数据链接，只有在当前有音乐播放时返回
         */
        dataUrl: any
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * **注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 swan.getBackgroundAudioManager接口**
 *
 * 获取后台音乐播放状态。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getBackgroundAudioPlayerState({
 *         success: function(res) {
 *             var status = res.status
 *             var dataUrl = res.dataUrl
 *             var currentPosition = res.currentPosition
 *             var duration = res.duration
 *             var downloadPercent = res.downloadPercent
 *         }
 *     })
 *     ```
 * 
 */
export function getBackgroundAudioPlayerState(OBJECT: getBackgroundAudioPlayerState.Param): void

export namespace playBackgroundAudio {
    export type Param = {
        /**
         * 音乐链接，目前支持的格式有 m4a, aac, mp3, wav
         */
        dataUrl: string
        /**
         * 音乐标题
         */
        title?: string
        /**
         * 封面URL
         */
        coverImgUrl?: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 使用后台播放器播放音乐，对于客户端来说，只能同时有一个后台音乐在播放。当用户离开小程序后，音乐将暂停播放；当用户点击“显示在聊天顶部”时，音乐不会暂停播放；当用户在其他小程序占用了音乐播放器，原有小程序内的音乐将停止播放。
 *
 * **OBJECT参数说明：**
 *
 *     ```javascript
 *     swan.playBackgroundAudio({
 *         dataUrl: '',
 *         title: '',
 *         coverImgUrl: ''
 *     })
 *     ```
 * 
 */
export function playBackgroundAudio(OBJECT: playBackgroundAudio.Param): void

/**
 * 暂停播放音乐。
 *
 * **示例代码**
 *
 * **示例：**
 *
 *     ```javascript
 *     swan.pauseBackgroundAudio()
 *     ```
 * 
 */
export function pauseBackgroundAudio(): void

export namespace seekBackgroundAudio {
    export type Param = {
        /**
         * 音乐位置，单位：秒
         */
        position: number
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 控制音乐播放进度。
 *
 * **OBJECT参数说明：**
 *
 *     ```javascript
 *     swan.seekBackgroundAudio({
 *         position: 30
 *     })
 *     ```
 */
export function seekBackgroundAudio(OBJECT: seekBackgroundAudio.Param): void

/**
 * 停止播放音乐。
 *
 * **示例代码**
 *
 * **示例：**
 *
 *     ```javascript
 *     swan.stopBackgroundAudio()
 *     ```
 * 
 */
export function stopBackgroundAudio(): void

/**
 * 监听音乐播放。
 * 
 */
export function onBackgroundAudioPlay(CALLBACK: any): void

/**
 * 监听音乐暂停。
 * 
 */
export function onBackgroundAudioPause(CALLBACK: any): void

/**
 * 监听音乐停止。
 *
 * **bug & tip：**
 *
 * 1.  `bug`: `iOS` `6.3.30` swan.seekBackgroundAudio 会有短暂延迟
 * 
 */
export function onBackgroundAudioStop(CALLBACK: any): void

/**
 * 
 *
 * 获取**全局唯一**的背景音频管理器 `backgroundAudioManager`。
 *
 * **errcode 说明：**
 *
 *   errCode   |  说明   
 * ------------|---------
 *   10001     | 系统错误
 *   10002     | 网络错误
 *   10003     | 文件错误
 *   10004     | 格式错误
 *   -1        | 未知错误
 *
 * **示例代码：**
 *
 *     ```javascript
 *     const backgroundAudioManager = swan.getBackgroundAudioManager()
 *
 *     backgroundAudioManager.title = '此时此刻'
 *     backgroundAudioManager.epname = '此时此刻'
 *     backgroundAudioManager.singer = '许巍'
 *     backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
 *     backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放
 *     ```
 * 
 */
export function getBackgroundAudioManager(): BackgroundAudioManager

export class  BackgroundAudioManager {
    /**
     * 当前音频的长度（单位：s），只有在当前有合法的 src 时返回
     *
     * @readonly
     */
    duration: number
    /**
     * 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回
     *
     * @readonly
     */
    currentTime: number
    /**
     * 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
     *
     * @readonly
     */
    paused: boolean
    /**
     * 音频的数据源，默认为空字符串，**当设置了新的 src 时，会自动开始播放** ，目前支持的格式有 m4a, aac, mp3, wav
     */
    src: string
    /**
     * 音频开始播放的位置（单位：s）
     */
    startTime: number
    /**
     * 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。
     *
     * @readonly
     */
    buffered: number
    /**
     * 音频标题，用于做原生音频播放器音频标题。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。
     */
    title: string
    /**
     * 专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
     */
    epname: string
    /**
     * 歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
     */
    singer: string
    /**
     * 封面图url，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图。
     */
    coverImgUrl: string
    /**
     * 页面链接，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
     */
    webUrl: string
    /**
     * 音频协议。默认值为 'http'，设置 'hls' 可以支持播放 HLS 协议的直播音频
     *
     * 
     */
    protocol: string
    /**
     * 播放
     */
    play(): any
    /**
     * 暂停
     */
    pause(): any
    /**
     * 停止
     */
    stop(): any
    /**
     * 跳转到指定位置，单位 s。精确到小数点后 3 位，即支持 ms 级别精确度
     */
    seek(position: any): any
    /**
     * 背景音频进入可以播放状态，但不保证后面可以流畅播放
     */
    onCanplay(callback: any): any
    /**
     * 背景音频播放事件
     */
    onPlay(callback: any): any
    /**
     * 背景音频暂停事件
     */
    onPause(callback: any): any
    /**
     * 背景音频停止事件
     */
    onStop(callback: any): any
    /**
     * 背景音频自然播放结束事件
     */
    onEnded(callback: any): any
    /**
     * 背景音频播放进度更新事件
     */
    onTimeUpdate(callback: any): any
    /**
     * 用户在系统音乐播放面板点击上一曲事件（iOS only）
     */
    onPrev(callback: any): any
    /**
     * 用户在系统音乐播放面板点击下一曲事件（iOS only）
     */
    onNext(callback: any): any
    /**
     * 背景音频播放错误事件
     */
    onError(callback: any): any
    /**
     * 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
     */
    onWaiting(callback: any): any
}
/**
 * **注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 [swan.createInnerAudioContext]() 接口**
 *
 * 创建并返回 audio 上下文 `audioContext` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<audio/>` 组件
 *
 * **audioContext：**
 *
 * `audioContext` 通过 audioId 跟一个 `<audio/>` 组件绑定，通过它可以操作对应的 `<audio/>` 组件。
 *
 * **示例代码：**
 *
 *     ```html
 *     <!-- audio.swan -->
 *     <audio  src="{{src}}" id="myAudio" ></audio>
 *
 *     <button export type="primary" bindtap="audioPlay">播放</button>
 *     <button export type="primary" bindtap="audioPause">暂停</button>
 *     <button export type="primary" bindtap="audio14">设置当前播放时间为14秒</button>
 *     <button export type="primary" bindtap="audioStart">回到开头</button>
 *     ```
 *
 * **示例代码：**
 *
 *     ```javascript
 *     // audio.js
 *     Page({
 *       onReady: export function (e) {
 *         // 使用 swan.createAudioContext 获取 audio 上下文 context
 *         this.audioCtx = swan.createAudioContext('myAudio')
 *         this.audioCtx.setSrc('http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46')
 *         this.audioCtx.play()
 *       },
 *       data: {
 *         src: ''
 *       },
 *       audioPlay: export function () {
 *         this.audioCtx.play()
 *       },
 *       audioPause: export function () {
 *         this.audioCtx.pause()
 *       },
 *       audio14: export function () {
 *         this.audioCtx.seek(14)
 *       },
 *       audioStart: export function () {
 *         this.audioCtx.seek(0)
 *       }
 *     })
 *     ```
 * 
 */
export function createAudioContext(audioId: any, instance?: any): AudioContext

export class  AudioContext {
    /**
     * 音频的地址
     */
    setSrc(src: any): any
    /**
     * 播放
     */
    play(): any
    /**
     * 暂停
     */
    pause(): any
    /**
     * 跳转到指定位置，单位 s
     */
    seek(position: any): any
}
/**
 * 
 *
 * 创建并返回内部 audio 上下文 `innerAudioContext` 对象。_本接口是 `swan.createAudioContext` 升级版。_
 *
 * **errCode 说明：**
 *
 *   errCode   |  说明   
 * ------------|---------
 *   10001     | 系统错误
 *   10002     | 网络错误
 *   10003     | 文件错误
 *   10004     | 格式错误
 *   -1        | 未知错误
 *
 * **示例代码：**
 *
 *     ```javascript
 *     const innerAudioContext = swan.createInnerAudioContext()
 *     innerAudioContext.autoplay = true
 *     innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
 *     innerAudioContext.onPlay(() => {
 *         console.log('开始播放')
 *     })
 *     innerAudioContext.onError((res) => {
 *         console.log(res.errMsg)
 *         console.log(res.errCode)
 *     })
 *     ```
 * 
 */
export function createInnerAudioContext(): InnerAudioContext

export class  InnerAudioContext {
    /**
     * 音频的数据链接，用于直接播放。
     */
    src: string
    /**
     * 开始播放的位置（单位：s），默认 0
     */
    startTime: number
    /**
     * 是否自动开始播放，默认 false
     */
    autoplay: boolean
    /**
     * 是否循环播放，默认 false
     */
    loop: boolean
    /**
     * 是否遵循系统静音开关，当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音，默认值 true
     */
    obeyMuteSwitch: boolean
    /**
     * 当前音频的长度（单位：s），只有在当前有合法的 src 时返回
     *
     * @readonly
     */
    duration: number
    /**
     * 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回，时间不取整，保留小数点后 6 位
     *
     * @readonly
     */
    currentTime: number
    /**
     * 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
     *
     * @readonly
     */
    paused: boolean
    /**
     * 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。
     *
     * @readonly
     */
    buffered: number
    /**
     * 音量。范围 0~1。
     *
     * 
     */
    volume: number
    /**
     * 播放
     */
    play(): any
    /**
     * 暂停
     */
    pause(): any
    /**
     * 停止
     */
    stop(): any
    /**
     * 跳转到指定位置，单位 s。精确到小数点后 3 位，即支持 ms 级别精确度
     */
    seek(position: any): any
    /**
     * 销毁当前实例
     */
    destroy(): any
    /**
     * 音频进入可以播放状态，但不保证后面可以流畅播放
     */
    onCanplay(callback: any): any
    /**
     * 音频播放事件
     */
    onPlay(callback: any): any
    /**
     * 音频暂停事件
     */
    onPause(callback: any): any
    /**
     * 音频停止事件
     */
    onStop(callback: any): any
    /**
     * 音频自然播放结束事件
     */
    onEnded(callback: any): any
    /**
     * 音频播放进度更新事件
     */
    onTimeUpdate(callback: any): any
    /**
     * 音频播放错误事件
     */
    onError(callback: any): any
    /**
     * 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
     */
    onWaiting(callback: any): any
    /**
     * 音频进行 seek 操作事件
     */
    onSeeking(callback: any): any
    /**
     * 音频完成 seek 操作事件
     */
    onSeeked(callback: any): any
    /**
     * 取消监听 onCanplay 事件
     *
     * 
     */
    offCanplay(callback: any): any
    /**
     * 取消监听 onPlay 事件
     *
     * 
     */
    offPlay(callback: any): any
    /**
     * 取消监听 onPause 事件
     *
     * 
     */
    offPause(callback: any): any
    /**
     * 取消监听 onStop 事件
     *
     * 
     */
    offStop(callback: any): any
    /**
     * 取消监听 onEnded 事件
     *
     * 
     */
    offEnded(callback: any): any
    /**
     * 取消监听 onTimeUpdate 事件
     *
     * 
     */
    offTimeUpdate(callback: any): any
    /**
     * 取消监听 onError 事件
     *
     * 
     */
    offError(callback: any): any
    /**
     * 取消监听 onWaiting 事件
     *
     * 
     */
    offWaiting(callback: any): any
    /**
     * 取消监听 onSeeking 事件
     *
     * 
     */
    offSeeking(callback: any): any
    /**
     * 取消监听 onSeeked 事件
     *
     * 
     */
    offSeeked(callback: any): any
}
export namespace getAvailableAudioSources {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 音频输入源，每一项对应一种音频输入源
         */
        audioSources: string[]
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * **audioSource 有效值：：**
 *
 *   值           |  说明                              |  支持平台               
 * ---------------|------------------------------------|-------------------------
 *   auto         |自动设置，默认使用手机麦克风，插上耳麦后自动切换使用耳机麦克风|  iOS/Android/devtools   
 *   buildInMic   |  手机麦克风                        |  iOS                    
 *   headsetMic   |  耳机麦克风                        |  iOS                    
 *   mic          |麦克风（没插耳麦时是手机麦克风，插耳麦时是耳机麦克风|  Android                
 *   camcorder    |  摄像头的麦克风                    |  Android                
 * 
 */
export function getAvailableAudioSources(OBJECT: getAvailableAudioSources.Param): void

export namespace chooseVideo {
    export type Param = {
        /**
         * album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
         */
        sourceType?: string[]
        /**
         * 是否压缩所选的视频源文件，默认值为true，需要压缩
         */
        compressed?: boolean
        /**
         * 拍摄视频最长拍摄时间，单位秒。最长支持 60 秒
         */
        maxDuration?: number
        /**
         * 接口调用成功，返回视频文件的临时文件路径，详见返回参数说明
         *
         * **注：文件的临时路径，在小程序本次启动期间可以正常使用，如需持久保存，需在主动调用 [swan.saveFile]()，在小程序下次启动时才能访问得到。**
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功，返回视频文件的临时文件路径，详见返回参数说明
     *
     * **注：文件的临时路径，在小程序本次启动期间可以正常使用，如需持久保存，需在主动调用 [swan.saveFile]()，在小程序下次启动时才能访问得到。**
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 选定视频的临时文件路径
         */
        tempFilePath: any
        /**
         * 选定视频的时间长度
         */
        duration: any
        /**
         * 选定视频的数据量大小
         */
        size: any
        /**
         * 返回选定视频的长
         */
        height: any
        /**
         * 返回选定视频的宽
         */
        width: any
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。
 *
 * **示例代码：**
 *
 *     ```html
 *     <view class="container">
 *         <video src="{{src}}"></video>
 *         <button bindtap="bindButtonTap">获取视频</button>
 *     </view>
 *     ```
 *
 * **示例代码：**
 *
 *     ```javascript
 *     Page({
 *         bindButtonTap: function() {
 *             var that = this
 *             swan.chooseVideo({
 *                 sourceType: ['album','camera'],
 *                 maxDuration: 60,
 *           camera: 'back',
 *                 success: function(res) {
 *                     that.setData({
 *                         src: res.tempFilePath
 *                     })
 *                 }
 *             })
 *         }
 *     })
 *     ```
 * 
 */
export function chooseVideo(OBJECT: chooseVideo.Param): void

export namespace saveVideoToPhotosAlbum {
    export type Param = {
        /**
         * 视频文件路径，可以是临时文件路径也可以是永久文件路径
         */
        filePath: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 调用结果
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 保存视频到系统相册。需要用户授权 scope.writePhotosAlbum
 *
 * **Bug & Tip：**
 *
 * 1.  `tip`: camera 参数在部分 Android 手机下由于系统 ROM 不支持无法生效
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.saveVideoToPhotosAlbum({
 *       filePath: 'swanfile://xxx'
 *       success(res) {
 *         console.log(res.errMsg)
 *       }
 *     })
 *     ```
 * 
 */
export function saveVideoToPhotosAlbum(OBJECT: saveVideoToPhotosAlbum.Param): void

/**
 * 创建并返回 video 上下文 `videoContext` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<video/>` 组件
 *
 * **videoContext：**
 *
 * `videoContext` 通过 videoId 跟一个 video 组件绑定，通过它可以操作一个 video 组件。
 *
 * **示例代码：**
 *
 *     ```html
 *     <view class="section tc">
 *       <video id="myVideo" src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"   enable-danmu danmu-btn controls></video>
 *       <view class="btn-area">
 *         <input bindblur="bindInputBlur"/>
 *         <button bindtap="bindSendDanmu">发送弹幕</button>
 *       </view>
 *     </view>
 *     ```
 *
 * **示例代码：**
 *
 *     ```javascript
 *     export function getRandomColor () {
 *       let rgb = []
 *       for (let i = 0 ; i < 3; ++i){
 *         let color = Math.floor(Math.random() * 256).toString(16)
 *         color = color.length == 1 ? '0' + color : color
 *         rgb.push(color)
 *       }
 *       return '#' + rgb.join('')
 *     }
 *
 *     Page({
 *       onReady: export function (res) {
 *         this.videoContext = swan.createVideoContext('myVideo')
 *       },
 *       inputValue: '',
 *       bindInputBlur: function(e) {
 *         this.inputValue = e.detail.value
 *       },
 *       bindSendDanmu: export function () {
 *         this.videoContext.sendDanmu({
 *           text: this.inputValue,
 *           color: getRandomColor()
 *         })
 *       }
 *     })
 *     ```
 * 
 */
export function createVideoContext(videoId: any, instance?: any): VideoContext

export class VideoContext {
    /**
     * 播放
     */
    play(): void
    /**
     * 暂停
     */
    pause(): void
    /**
     * 跳转到指定位置，单位 s
     */
    seek(position: number): void
    /**
     * 发送弹幕，danmu 包含两个属性 text, color。
     */
    sendDanmu(danmu: any): void
    /**
     * 设置倍速播放，支持的倍率有 0.5/0.8/1.0/1.25/1.5
     *
     * 
     */
    playbackRate(rate: number): void
    /**
     * 进入全屏，可传入{direction}参数（1.7.0起支持），详见video组件文档
     *
     * 
     */
    requestFullScreen(): void
    /**
     * 退出全屏
     *
     * 
     */
    exitFullScreen(): void
    /**
     * 显示状态栏，仅在iOS全屏下有效
     *
     * 
     */
    showStatusBar(): void
    /**
     * 隐藏状态栏，仅在iOS全屏下有效
     *
     * 
     */
    hideStatusBar(): void
}
/**
 * 
 *
 * 创建并返回 camera 上下文 `cameraContext` 对象，`cameraContext` 与页面的 `camera` 组件绑定，一个页面只能有一个camera，通过它可以操作对应的 `<camera/>` 组件。 在自定义组件下，第一个参数传入组件实例this，以操作组件内 `<camera/>` 组件
 *
 * **示例代码：**
 *
 * 在开发者工具中预览效果
 * 
 */
export function createCameraContext(instance?: any): CameraContext

export namespace CameraContext {
    export namespace takePhoto {
        export type Param = {
            /**
             * 成像质量，值为high, normal, low，默认normal
             */
            quality?: string
            /**
             * 接口调用成功的回调函数 ，res = { tempImagePath }
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数 ，res = { tempImagePath }
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace startRecord {
        export type Param = {
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
            /**
             * 超过30s或页面onHide时会结束录像，res = { tempThumbPath, tempVideoPath }
             */
            timeoutCallback?: ParamPropTimeoutCallback
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
        /**
         * 超过30s或页面onHide时会结束录像，res = { tempThumbPath, tempVideoPath }
         */
        export type ParamPropTimeoutCallback = () => any
    }
    export namespace stopRecord {
        export type Param = {
            /**
             * 接口调用成功的回调函数 ，res = { tempThumbPath, tempVideoPath }
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数 ，res = { tempThumbPath, tempVideoPath }
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
}
export class  CameraContext {
    /**
     * 拍照，可指定质量，成功则返回图片
     */
    takePhoto(OBJECT: CameraContext.takePhoto.Param): any
    /**
     * 开始录像
     */
    startRecord(OBJECT: CameraContext.startRecord.Param): any
    /**
     * 结束录像，成功则返回封面与视频
     */
    stopRecord(OBJECT: CameraContext.stopRecord.Param): any
}
/**
 * 
 *
 * 操作对应的 `<live-player/>` 组件。 创建并返回 `live-player` 上下文 `LivePlayerContext` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<live-player/>` 组件
 *
 * **示例代码：**
 *
 * 在开发者工具中预览效果
 * 
 */
export function createLivePlayerContext(domId: any, instance?: any): LivePlayerContext

export namespace LivePlayerContext {
    export namespace play {
        export type Param = {
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace stop {
        export type Param = {
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace mute {
        export type Param = {
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace pause {
        export type Param = {
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace resume {
        export type Param = {
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace requestFullScreen {
        export type Param = {
            /**
             * 有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）
             */
            direction?: number
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace exitFullScreen {
        export type Param = {
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
}
export class  LivePlayerContext {
    /**
     * 播放
     */
    play(OBJECT: LivePlayerContext.play.Param): any
    /**
     * 停止
     */
    stop(OBJECT: LivePlayerContext.stop.Param): any
    /**
     * 静音
     */
    mute(OBJECT: LivePlayerContext.mute.Param): any
    /**
     * 暂停
     *
     * 
     */
    pause(OBJECT: LivePlayerContext.pause.Param): any
    /**
     * 恢复
     *
     * 
     */
    resume(OBJECT: LivePlayerContext.resume.Param): any
    /**
     * 进入全屏
     */
    requestFullScreen(OBJECT: LivePlayerContext.requestFullScreen.Param): any
    /**
     * 退出全屏
     */
    exitFullScreen(OBJECT: LivePlayerContext.exitFullScreen.Param): any
}
/**
 * 
 *
 * 创建并返回 `live-pusher` 上下文 `LivePusherContext` 对象，`LivePusherContext` 与页面的 `<live-pusher />` 组件绑定，一个页面只能有一个 `live-pusher`，通过它可以操作对应的 `<live-pusher/>` 组件。 在自定义组件下，第一个参数传入组件实例this，以操作组件内 `<live-pusher/>` 组件
 *
 * **示例代码：**
 *
 * 在开发者工具中预览效果
 * 
 */
export function createLivePusherContext(): LivePusherContext

export namespace LivePusherContext {
    export namespace start {
        export type Param = {
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace stop {
        export type Param = {
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace pause {
        export type Param = {
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace resume {
        export type Param = {
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace switchCamera {
        export type Param = {
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace snapshot {
        export type Param = {
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace toggleTorch {
        export type Param = {
            /**
             * 接口调用成功的回调函数
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
}
export class  LivePusherContext {
    /**
     * 播放推流
     */
    start(OBJECT: LivePusherContext.start.Param): any
    /**
     * 停止推流
     */
    stop(OBJECT: LivePusherContext.stop.Param): any
    /**
     * 暂停推流
     */
    pause(OBJECT: LivePusherContext.pause.Param): any
    /**
     * 恢复推流
     */
    resume(OBJECT: LivePusherContext.resume.Param): any
    /**
     * 切换前后摄像头
     */
    switchCamera(OBJECT: LivePusherContext.switchCamera.Param): any
    /**
     * 快照
     *
     * 
     */
    snapshot(OBJECT: LivePusherContext.snapshot.Param): any
    /**
     * 切换闪光灯
     *
     * 
     */
    toggleTorch(OBJECT: LivePusherContext.toggleTorch.Param): any
}
export namespace loadFontFace {
    export type Param = {
        /**
         * 定义的字体名称
         */
        family: string
        /**
         * 字体资源的地址
         */
        source: string
        /**
         * 可选的字体描述符
         */
        desc?: ParamPropDesc
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 可选的字体描述符
     */
    export type ParamPropDesc = {
        /**
         * normal / italic / oblique
         */
        style?: string
        /**
         * normal / bold / 100 / 200../ 900
         */
        weight?: string
        /**
         * normal / small-caps / inherit
         */
        variant?: string
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 动态加载网络字体
 *
 * **Tip：**
 *
 * 1.  引入的外部字体资源，建议格式为TTF和WOFF，WOFF2在低版本的IOS上会不兼容。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.loadFontFace({
 *       family: 'Bitstream Vera Serif Bold',
 *       source: 'url("http://developer.mozilla.org/@api/deki/files/2934/=VeraSeBd.ttf")',
 *       success: function(res) {
 *         console.log(res.status) //  loaded
 *       },
 *       fail: function(res) {
 *         console.log(res.status) //  error
 *       },
 *       complete: function(res) {
 *         console.log(res.status);
 *       }
 *     });
 *     ```
 * 
 */
export function loadFontFace(OBJECT: loadFontFace.Param): void

export namespace saveFile {
    export type Param = {
        /**
         * 需要保存的文件的临时路径
         */
        tempFilePath: string
        /**
         * 返回文件的保存路径，res = {savedFilePath: '文件的保存路径'}
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 返回文件的保存路径，res = {savedFilePath: '文件的保存路径'}
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 文件的保存路径
         */
        savedFilePath: any
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 保存文件到本地。**注意：saveFile 会把临时文件移动，因此调用成功后传入的 tempFilePath 将不可用**
 *
 * **bug & tip：**
 *
 * 1.  `tip`: 本地文件存储的大小限制为 10M
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.chooseImage({
 *       success: function(res) {
 *         var tempFilePaths = res.tempFilePaths
 *         swan.saveFile({
 *           tempFilePath: tempFilePaths[0],
 *           success: function(res) {
 *             var savedFilePath = res.savedFilePath
 *           }
 *         })
 *       }
 *     })
 *     ```
 * 
 */
export function saveFile(OBJECT: saveFile.Param): void

export namespace getSavedFileList {
    export type Param = {
        /**
         * 接口调用成功的回调函数，返回结果见`success返回参数说明`
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数，返回结果见`success返回参数说明`
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 接口调用结果
         */
        errMsg: string
        /**
         * 文件列表
         */
        fileList: ParamPropSuccessParamPropFileList
    }
    /**
     * 文件列表
     */
    export type ParamPropSuccessParamPropFileList = ParamPropSuccessParamPropFileListItem[]
    export type ParamPropSuccessParamPropFileListItem = {
        /**
         * 文件的本地路径
         */
        filePath: string
        /**
         * 文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
         */
        createTime: number
        /**
         * 文件大小，单位B
         */
        size: number
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 获取本地已保存的文件列表
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getSavedFileList({
 *       success: function(res) {
 *         console.log(res.fileList)
 *       }
 *     })
 *     ```
 * 
 */
export function getSavedFileList(OBJECT: getSavedFileList.Param): void

export namespace getSavedFileInfo {
    export type Param = {
        /**
         * 文件路径
         */
        filePath: string
        /**
         * 接口调用成功的回调函数，返回结果见`success返回参数说明`
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数，返回结果见`success返回参数说明`
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 接口调用结果
         */
        errMsg: string
        /**
         * 文件大小，单位B
         */
        size: number
        /**
         * 文件保存时的时间戳，从1970/01/01 08:00:00 到该时刻的秒数
         */
        createTime: number
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，请使用 [swan.getFileInfo]() 接口。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getSavedFileInfo({
 *       filePath: 'swanfile://somefile', //仅做示例用，非真正的文件路径
 *       success: function(res) {
 *         console.log(res.size)
 *         console.log(res.createTime)
 *       }
 *     })
 *     ```
 * 
 */
export function getSavedFileInfo(OBJECT: getSavedFileInfo.Param): void

export namespace removeSavedFile {
    export type Param = {
        /**
         * 需要删除的文件路径
         */
        filePath: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 删除本地存储的文件
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getSavedFileList({
 *       success: function(res) {
 *         if (res.fileList.length > 0){
 *           swan.removeSavedFile({
 *             filePath: res.fileList[0].filePath,
 *             complete: function(res) {
 *               console.log(res)
 *             }
 *           })
 *         }
 *       }
 *     })
 *     ```
 * 
 */
export function removeSavedFile(OBJECT: removeSavedFile.Param): void

export namespace openDocument {
    export type Param = {
        /**
         * 文件路径，可通过 downFile 获得
         */
        filePath: string
        /**
         * 文件类型，指定文件类型打开文件，有效值 doc, xls, ppt, pdf, docx, xlsx, pptx
         *
         * 
         */
        fileType?: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.downloadFile({
 *       url: 'http://example.com/somefile.pdf',
 *       success: export function (res) {
 *         var filePath = res.tempFilePath
 *         swan.openDocument({
 *           filePath: filePath,
 *           success: export function (res) {
 *             console.log('打开文档成功')
 *           }
 *         })
 *       }
 *     })
 *     ```
 * 
 */
export function openDocument(OBJECT: openDocument.Param): void

export namespace getFileInfo {
    export type Param = {
        /**
         * 本地文件路径
         */
        filePath: string
        /**
         * 计算文件摘要的算法，默认值 md5，有效值：md5，sha1
         */
        digestAlgorithm?: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 文件大小，单位：B
         */
        size: number
        /**
         * 按照传入的 digestAlgorithm 计算得出的的文件摘要
         */
        digest: string
        /**
         * 调用结果
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 获取文件信息
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getFileInfo({
 *         success(res) {
 *             console.log(res.size)
 *             console.log(res.digest)
 *         }
 *     })
 *     ```
 * 
 */
export function getFileInfo(OBJECT: getFileInfo.Param): void

export namespace setStorage {
    export type Param = {
        /**
         * 本地缓存中的指定的 key
         */
        key: string
        /**
         * 需要存储的内容
         */
        data: any | string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}
/**
 * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.setStorage({
 *       key:"key",
 *       data:"value"
 *     })
 *     ```
 * 
 */
export function setStorage(OBJECT: setStorage.Param): void

/**
 * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
 *
 * **参数说明：**
 *
 *     ```javascript
 *     try {
 *         swan.setStorageSync('key', 'value')
 *     } catch (e) {    
 *     }
 *     ```
 * 
 */
export function setStorageSync(key: string, data: any | string): void

export namespace getStorage {
    export type Param = {
        /**
         * 本地缓存中的指定的 key
         */
        key: string
        /**
         * 接口调用的回调函数,res = {data: key对应的内容}
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用的回调函数,res = {data: key对应的内容}
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * key对应的内容
         */
        data: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 从本地缓存中异步获取指定 key 对应的内容。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getStorage({
 *       key: 'key',
 *       success: function(res) {
 *           console.log(res.data)
 *       } 
 *     })
 *     ```
 * 
 */
export function getStorage(OBJECT: getStorage.Param): void

/**
 * 从本地缓存中同步获取指定 key 对应的内容。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     try {
 *       var value = swan.getStorageSync('key')
 *       if (value) {
 *           // Do something with return value
 *       }
 *     } catch (e) {
 *       // Do something when catch error
 *     }
 *     ```
 * 
 */
export function getStorageSync(key: string): any | undefined

export namespace getStorageInfo {
    export type Param = {
        /**
         * 接口调用的回调函数，详见返回参数说明
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用的回调函数，详见返回参数说明
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 当前storage中所有的key
         */
        keys: string[]
        /**
         * 当前占用的空间大小, 单位kb
         */
        currentSize: number
        /**
         * 限制的空间大小，单位kb
         */
        limitSize: number
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 异步获取当前storage的相关信息
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getStorageInfo({
 *       success: function(res) {
 *         console.log(res.keys)
 *         console.log(res.currentSize)
 *         console.log(res.limitSize)
 *       }
 *     })
 *     ```
 * 
 */
export function getStorageInfo(OBJECT: getStorageInfo.Param): void

export namespace getStorageInfoSync {
    export type Return = {
        /**
         * 当前storage中所有的key
         */
        keys: string[]
        /**
         * 当前占用的空间大小, 单位kb
         */
        currentSize: number
        /**
         * 限制的空间大小，单位kb
         */
        limitSize: number
    }
}
/**
 * 同步获取当前storage的相关信息
 *
 * **示例代码：**
 *
 *     ```javascript
 *     try {
 *       var res = swan.getStorageInfoSync()
 *       console.log(res.keys)
 *       console.log(res.currentSize)
 *       console.log(res.limitSize)
 *     } catch (e) {
 *       // Do something when catch error
 *     }
 *     ```
 * 
 */
export function getStorageInfoSync(): getStorageInfoSync.Return

export namespace removeStorage {
    export type Param = {
        /**
         * 本地缓存中的指定的 key
         */
        key: string
        /**
         * 接口调用的回调函数
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用的回调函数
     */
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}
/**
 * 从本地缓存中异步移除指定 key 。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.removeStorage({
 *       key: 'key',
 *       success: function(res) {
 *         console.log(res.data)
 *       } 
 *     })
 *     ```
 * 
 */
export function removeStorage(OBJECT: removeStorage.Param): void

/**
 * 从本地缓存中同步移除指定 key 。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     try {
 *       swan.removeStorageSync('key')
 *     } catch (e) {
 *       // Do something when catch error
 *     }
 *     ```
 * 
 */
export function removeStorageSync(key: string): void

export namespace clearStorage {
    export type Param = {
        /**
         * 接口调用的回调函数
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用的回调函数
     */
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}

/**
 * 清理本地数据缓存。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.clearStorage()
 *     ```
 * 
 */
export function clearStorage(OBJECT: clearStorage.Param): void

/**
 * 同步清理本地数据缓存
 *
 * **Bug & Tip：**
 *
 * 1.  `tip`: 本地数据存储的大小限制为 10MB
 *
 * **示例代码：**
 *
 *     ```javascript
 *     try {
 *         swan.clearStorageSync()
 *     } catch(e) {
 *       // Do something when catch error
 *     }
 *     ```
 * 
 */
export function clearStorageSync(): void

export namespace getLocation {
    export type Param = {
        /**
         * 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于`swan.openLocation`的坐标
         */
        type?: string
        /**
         * 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
         *
         * 
         */
        altitude?: boolean
        /**
         * 接口调用成功的回调函数，返回内容详见返回参数说明。
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数，返回内容详见返回参数说明。
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 纬度，浮点数，范围为-90~90，负数表示南纬
         */
        latitude: any
        /**
         * 经度，浮点数，范围为-180~180，负数表示西经
         */
        longitude: any
        /**
         * 速度，浮点数，单位m/s
         */
        speed: any
        /**
         * 位置的精确度
         */
        accuracy: any
        /**
         * 高度，单位 m
         *
         * 
         */
        altitude: any
        /**
         * 垂直精度，单位 m（Android 无法获取，返回 0）
         *
         * 
         */
        verticalAccuracy: any
        /**
         * 水平精度，单位 m
         *
         * 
         */
        horizontalAccuracy: any
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getLocation({
 *       export type: 'wgs84',
 *       success: function(res) {
 *         var latitude = res.latitude
 *         var longitude = res.longitude
 *         var speed = res.speed
 *         var accuracy = res.accuracy
 *       }
 *     })
 *     ```
 * 
 */
export function getLocation(OBJECT: getLocation.Param): void

export namespace chooseLocation {
    export type Param = {
        /**
         * 接口调用成功的回调函数，返回内容详见返回参数说明。
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数，返回内容详见返回参数说明。
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 位置名称
         */
        name: any
        /**
         * 详细地址
         */
        address: any
        /**
         * 纬度，浮点数，范围为-90~90，负数表示南纬
         */
        latitude: any
        /**
         * 经度，浮点数，范围为-180~180，负数表示西经
         */
        longitude: any
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 打开地图选择位置。
 *
 * 需要用户授权scope.userLocation
 * 
 */
export function chooseLocation(OBJECT: chooseLocation.Param): void

export namespace openLocation {
    export type Param = {
        /**
         * 纬度，范围为-90~90，负数表示南纬
         */
        latitude: number
        /**
         * 经度，范围为-180~180，负数表示西经
         */
        longitude: number
        /**
         * 缩放比例，范围5~18，默认为18
         */
        scale?: number
        /**
         * 位置名
         */
        name?: string
        /**
         * 地址的详细说明
         */
        address?: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 使用内置地图查看位置。
 *
 * 需要用户授权scope.userLocation
 *
 * **Bug & Tip：**
 *
 * 1.  `bug`: `iOS` `6.3.30` export type 参数不生效，只会返回 wgs84 类型的坐标信息
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getLocation({
 *       export type: 'gcj02', //返回可以用于swan.openLocation的经纬度
 *       success: function(res) {
 *         var latitude = res.latitude
 *         var longitude = res.longitude
 *         swan.openLocation({
 *           latitude: latitude,
 *           longitude: longitude,
 *           scale: 28
 *         })
 *       }
 *     })
 *     ```
 * 
 */
export function openLocation(OBJECT: openLocation.Param): void

/**
 * 创建并返回 map 上下文 `mapContext` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<map/>` 组件
 *
 * **mapContext：**
 *
 * `mapContext` 通过 mapId 跟一个 `<map/>` 组件绑定，通过它可以操作对应的 `<map/>` 组件。
 *
 * **示例代码：**
 *
 *     ```html
 *     <!-- map.swan -->
 *     <map id="myMap" show-location />
 *
 *     <button export type="primary" bindtap="getCenterLocation">获取位置</button>
 *     <button export type="primary" bindtap="moveToLocation">移动位置</button>
 *     <button export type="primary" bindtap="translateMarker">移动标注</button>
 *     <button export type="primary" bindtap="includePoints">缩放视野展示所有经纬度</button>
 *     ```
 *
 * **示例代码：**
 *
 *     ```javascript
 *     // map.js
 *     Page({
 *       onReady: export function (e) {
 *         // 使用 swan.createMapContext 获取 map 上下文
 *         this.mapCtx = swan.createMapContext('myMap')
 *       },
 *       getCenterLocation: export function () {
 *         this.mapCtx.getCenterLocation({
 *           success: function(res){
 *             console.log(res.longitude)
 *             console.log(res.latitude)
 *           }
 *         })
 *       },
 *       moveToLocation: export function () {
 *         this.mapCtx.moveToLocation()
 *       },
 *       translateMarker: function() {
 *         this.mapCtx.translateMarker({
 *           markerId: 0,
 *           autoRotate: true,
 *           duration: 1000,
 *           destination: {
 *             latitude:23.10229,
 *             longitude:113.3345211,
 *           },
 *           animationEnd() {
 *             console.log('animation end')
 *           }
 *         })
 *       },
 *       includePoints: function() {
 *         this.mapCtx.includePoints({
 *           padding: [10],
 *           points: [{
 *             latitude:23.10229,
 *             longitude:113.3345211,
 *           }, {
 *             latitude:23.00229,
 *             longitude:113.3345211,
 *           }]
 *         })
 *       }
 *     })
 *     ```
 * 
 */
export function createMapContext(mapId: any, instance?: any): MapContext

export namespace MapContext {
    export namespace getCenterLocation {
        export type Param = {
            /**
             * 接口调用成功的回调函数 ，res = { longitude: "经度", latitude: "纬度"}
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数 ，res = { longitude: "经度", latitude: "纬度"}
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace translateMarker {
        export type Param = {
            /**
             * 指定marker
             */
            markerId: number
            /**
             * 指定marker移动到的目标点
             */
            destination: any
            /**
             * 移动过程中是否自动旋转marker
             */
            autoRotate: boolean
            /**
             * marker的旋转角度
             */
            rotate: number
            /**
             * 动画持续时长，默认值1000ms，平移与旋转分别计算
             */
            duration?: number
            /**
             * 动画结束回调函数
             */
            animationEnd?: ParamPropAnimationEnd
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
        }
        /**
         * 动画结束回调函数
         */
        export type ParamPropAnimationEnd = () => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = () => any
    }
    export namespace includePoints {
        export type Param = {
            /**
             * 要显示在可视区域内的坐标点列表，[{latitude, longitude}]
             */
            points: any[]
            /**
             * 坐标点形成的矩形边缘到地图边缘的距离，单位像素。格式为[上,右,下,左]，安卓上只能识别数组第一项，上下左右的padding一致。开发者工具暂不支持padding参数。
             */
            padding?: any[]
        }
    }
    export namespace getRegion {
        export type Param = {
            /**
             * 接口调用成功的回调函数，res = {southwest, northeast}，西南角与东北角的经纬度
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数，res = {southwest, northeast}，西南角与东北角的经纬度
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
    export namespace getScale {
        export type Param = {
            /**
             * 接口调用成功的回调函数，res = {scale}
             */
            success?: ParamPropSuccess
            /**
             * 接口调用失败的回调函数
             */
            fail?: ParamPropFail
            /**
             * 接口调用结束的回调函数（调用成功、失败都会执行）
             */
            complete?: ParamPropComplete
        }
        /**
         * 接口调用成功的回调函数，res = {scale}
         */
        export type ParamPropSuccess = (res: any) => any
        /**
         * 接口调用失败的回调函数
         */
        export type ParamPropFail = (err: any) => any
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        export type ParamPropComplete = () => any
    }
}
export class  MapContext {
    /**
     * 获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 [`swan.openLocation`](#wxopenlocationobject)
     */
    getCenterLocation(OBJECT: MapContext.getCenterLocation.Param): any
    /**
     * 将地图中心移动到当前定位点，需要配合map组件的show-location使用
     */
    moveToLocation(): any
    /**
     * 平移marker，带动画
     *
     * 
     */
    translateMarker(OBJECT: MapContext.translateMarker.Param): any
    /**
     * 缩放视野展示所有经纬度
     *
     * 
     */
    includePoints(OBJECT: MapContext.includePoints.Param): any
    /**
     * 获取当前地图的视野范围
     *
     * 
     */
    getRegion(OBJECT: MapContext.getRegion.Param): any
    /**
     * 获取当前地图的缩放级别
     *
     * 
     */
    getScale(OBJECT: MapContext.getScale.Param): any
}
export namespace getSystemInfo {
    export type Param = {
        /**
         * 接口调用成功的回调
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 手机品牌
         */
        brand: any
        /**
         * 手机型号
         */
        model: any
        /**
         * 设备像素比
         */
        pixelRatio: any
        /**
         * 屏幕宽度
         *
         * 
         */
        screenWidth: any
        /**
         * 屏幕高度
         *
         * 
         */
        screenHeight: any
        /**
         * 可使用窗口宽度
         */
        windowWidth: any
        /**
         * 可使用窗口高度
         */
        windowHeight: any
        /**
         * 状态栏的高度
         *
         * 
         */
        statusBarHeight: any
        /**
         * 手百设置的语言
         */
        language: any
        /**
         * 手百版本号
         */
        version: any
        /**
         * 操作系统版本
         */
        system: any
        /**
         * 客户端平台
         */
        platform: any
        /**
         * 用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px
         *
         * 
         */
        fontSizeSetting: any
        /**
         * 客户端基础库版本
         *
         * 
         */
        SDKVersion: any
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 获取系统信息。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getSystemInfo({
 *       success: function(res) {
 *         console.log(res.model)
 *         console.log(res.pixelRatio)
 *         console.log(res.windowWidth)
 *         console.log(res.windowHeight)
 *         console.log(res.language)
 *         console.log(res.version)
 *         console.log(res.platform)
 *       }
 *     })
 *     ```
 * 
 */
export function getSystemInfo(OBJECT: getSystemInfo.Param): void

export namespace getSystemInfoSync {
    export type Return = {
        /**
         * 手机品牌
         */
        brand: any
        /**
         * 手机型号
         */
        model: any
        /**
         * 设备像素比
         */
        pixelRatio: any
        /**
         * 屏幕宽度
         *
         * 
         */
        screenWidth: any
        /**
         * 屏幕高度
         *
         * 
         */
        screenHeight: any
        /**
         * 可使用窗口宽度
         */
        windowWidth: any
        /**
         * 可使用窗口高度
         */
        windowHeight: any
        /**
         * 状态栏的高度
         *
         * 
         */
        statusBarHeight: any
        /**
         * 手百设置的语言
         */
        language: any
        /**
         * 手百版本号
         */
        version: any
        /**
         * 操作系统版本
         */
        system: any
        /**
         * 客户端平台
         */
        platform: any
        /**
         * 用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px
         *
         * 
         */
        fontSizeSetting: any
        /**
         * 客户端基础库版本
         *
         * 
         */
        SDKVersion: any
    }
}
/**
 * 获取系统信息同步接口
 *
 * **示例代码：**
 *
 *     ```javascript
 *     try {
 *       var res = swan.getSystemInfoSync()
 *       console.log(res.model)
 *       console.log(res.pixelRatio)
 *       console.log(res.windowWidth)
 *       console.log(res.windowHeight)
 *       console.log(res.language)
 *       console.log(res.version)
 *       console.log(res.platform)
 *     } catch (e) {
 *       // Do something when catch error
 *     }
 *     ```
 * 
 */
export function getSystemInfoSync(): getSystemInfoSync.Return

/**
 *
 * 判断小程序的API，回调，参数，组件等是否在当前版本可用。
 *
 * **String参数说明：** 使用`${API}.${method}.${param}.${options}`或者`${component}.${attribute}.${option}`方式来调用，例如：
 *
 * *   `${API}` 代表 API 名字
 * *   `${method}` 代表调用方式，有效值为`return`, `success`, `object`, `callback`
 * *   `${param}` 代表参数或者返回值
 * *   `${options}` 代表参数的可选值
 * *   `${component}` 代表组件名字
 * *   `${attribute}` 代表组件属性
 * *   `${option}` 代表组件属性的可选值
 *
 * 例子：
 *
 * **示例：**
 *
 *     ```js
 *     swan.canIUse('openBluetoothAdapter')
 *     swan.canIUse('getSystemInfoSync.return.screenWidth')
 *     swan.canIUse('getSystemInfo.success.screenWidth')
 *     swan.canIUse('showToast.object.image')
 *     swan.canIUse('onCompassChange.callback.direction')
 *     swan.canIUse('request.object.method.GET')
 *
 *     swan.canIUse('live-player')
 *     swan.canIUse('text.selectable')
 *     swan.canIUse('button.open-export type.contact')
 *     ```
 * 
 */
export function canIUse(String: any): boolean

export namespace onMemoryWarning {
    export type Param = (res: ParamParam) => any
    export type ParamParam = {
        /**
         * 仅Android有该字段，对应系统内存告警等级宏定义
         */
        level: number
    }
}
/**
 * 
 *
 * 监听内存不足的告警事件，Android下有告警等级划分，只有LOW和CRITICAL会回调开发者；iOS无等级划分。
 *
 * **CALLBACK返回参数：**
 *
 *     ```
 *     TRIM_MEMORY_RUNNING_MODERATE = 5
 *     TRIM_MEMORY_RUNNING_LOW = 10
 *     TRIM_MEMORY_RUNNING_CRITICAL = 15
 *     ```
 *
 * **示例代码：**
 *
 *     ```
 *     swan.onMemoryWarning(export function () {
 *       console.log('onMemoryWarningReceive')
 *     })
 *     ```
 * 
 */
export function onMemoryWarning(callback: onMemoryWarning.Param): void

export namespace getNetworkType {
    export type Param = {
        /**
         * 接口调用成功，返回网络类型 networkType
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功，返回网络类型 networkType
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 网络类型
         */
        networkType: any
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 获取网络类型。
 *
 * **success返回参数说明：**
 *
 *     ```javascript
 *     swan.getNetworkType({
 *       success: function(res) {
 *         // 返回网络类型, 有效值：
 *         // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
 *         var networkType = res.networkType
 *       }
 *     })
 *     ```
 * 
 */
export function getNetworkType(OBJECT: getNetworkType.Param): void

export namespace onNetworkStatusChange {
    export type Param = (res: ParamParam) => any
    export type ParamParam = {
        /**
         * 当前是否有网络连接
         */
        isConnected: boolean
        /**
         * 网络类型
         *
         * **networkType 有效值：**
         *
         *   值        |  说明               
         * ------------|---------------------
         *   wifi      |  wifi 网络          
         *   2g        |  2g 网络            
         *   3g        |  3g 网络            
         *   4g        |  4g 网络            
         *   none      |  无网络             
         *   unknown   |Android下不常见的网络类型
         */
        networkType: string
    }
}
/**
 * 
 *
 * 监听网络状态变化。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.onNetworkStatusChange(function(res) {
 *       console.log(res.isConnected)
 *       console.log(res.networkType)
 *     })
 *     ```
 * 
 */
export function onNetworkStatusChange(CALLBACK: onNetworkStatusChange.Param): void

export namespace setScreenBrightness {
    export type Param = {
        /**
         * 屏幕亮度值，范围 0~1，0 最暗，1 最亮
         */
        value: number
        /**
         * 接口调用成功
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 设置屏幕亮度。
 * 
 */
export function setScreenBrightness(OBJECT: setScreenBrightness.Param): void

export namespace getScreenBrightness {
    export type Param = {
        /**
         * 接口调用成功
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 屏幕亮度值，范围 0~1，0 最暗，1 最亮
         */
        value: number
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 获取屏幕亮度。
 * 
 */
export function getScreenBrightness(OBJECT: getScreenBrightness.Param): void

export namespace vibrateLong {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 使手机发生较长时间的振动（400ms）
 * 
 */
export function vibrateLong(OBJECT: vibrateLong.Param): void

export namespace vibrateShort {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}
/**
 * 
 *
 * 使手机发生较短时间的振动（15ms）
 *
 * **Bug & Tip：**
 *
 * 1.  `tip`：`vibrateShort` 接口仅在 iPhone7/iPhone7Plus 及 Android 机型生效
 * 2.  `tip`: `getScreenBrightness` 接口若安卓系统设置中开启了自动调节亮度功能，则屏幕亮度会根据光线自动调整，该接口仅能获取自动调节亮度之前的值，而非实时的亮度值。
 * 
 */
export function vibrateShort(OBJECT: vibrateShort.Param): void

export namespace onAccelerometerChange {
    export type Param = (res: ParamParam) => any
    export type ParamParam = {
        /**
         * X 轴
         */
        x: number
        /**
         * Y 轴
         */
        y: number
        /**
         * Z 轴
         */
        z: number
    }
}
/**
 * 监听加速度数据，频率：5次/秒，接口调用后会自动开始监听，可使用 `swan.stopAccelerometer` 停止监听。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.onAccelerometerChange(function(res) {
 *       console.log(res.x)
 *       console.log(res.y)
 *       console.log(res.z)
 *     })
 *     ```
 * 
 */
export function onAccelerometerChange(CALLBACK: onAccelerometerChange.Param): void

export namespace startAccelerometer {
    export type Param = {
        /**
         * 监听加速度数据回调函数的执行频率
         *
         * 
         */
        interval?: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}
/**
 * 
 *
 * 开始监听加速度数据。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.startAccelerometer({
 *         interval: 'game'
 *     })
 *     ```
 * 
 */
export function startAccelerometer(OBJECT: startAccelerometer.Param): void

export namespace stopAccelerometer {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}
/**
 * 
 *
 * 停止监听加速度数据。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.stopAccelerometer()
 *     ```
 * 
 */
export function stopAccelerometer(OBJECT: stopAccelerometer.Param): void

export namespace onCompassChange {
    export type Param = (res: ParamParam) => any
    export type ParamParam = {
        /**
         * 面对的方向度数
         */
        direction: number
    }
}
/**
 * 监听罗盘数据，频率：5次/秒，接口调用后会自动开始监听，可使用`swan.stopCompass`停止监听。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.onCompassChange(export function (res) {
 *       console.log(res.direction)
 *     })
 *     ```
 * 
 */
export function onCompassChange(CALLBACK: onCompassChange.Param): void

export namespace startCompass {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}
/**
 * 
 *
 * 开始监听罗盘数据。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.startCompass()
 *     ```
 * 
 */
export function startCompass(OBJECT: startCompass.Param): void

export namespace stopCompass {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}
/**
 * 
 *
 * 停止监听罗盘数据。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.stopCompass()
 *     ```
 * 
 */
export function stopCompass(OBJECT: stopCompass.Param): void

export namespace makePhoneCall {
    export type Param = {
        /**
         * 需要拨打的电话号码
         */
        phoneNumber: string
        /**
         * 接口调用成功的回调
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调
     */
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}
/**
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.makePhoneCall({
 *       phoneNumber: '1340000' //仅为示例，并非真实的电话号码
 *     })
 *     ```
 * 
 */
export function makePhoneCall(OBJECT: makePhoneCall.Param): void

export namespace scanCode {
    export type Param = {
        /**
         * 是否只能从相机扫码，不允许从相册选择图片
         *
         * 
         */
        onlyFromCamera?: boolean
        /**
         * 扫码类型，参数类型是数组，二维码是'qrCode'，一维码是'barCode'，DataMatrix是‘datamatrix’，pdf417是‘pdf417’。
         *
         * 
         */
        scanType?: any[]
        /**
         * 接口调用成功的回调函数，返回内容详见返回参数说明。
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数，返回内容详见返回参数说明。
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 所扫码的内容
         */
        result: any
        /**
         * 所扫码的类型
         */
        scanType: any
        /**
         * 所扫码的字符集
         */
        charSet: any
        /**
         * 当所扫的码为当前小程序的合法二维码时，会返回此字段，内容为二维码携带的 path
         */
        path: any
        /**
         * 原始数据，base64编码
         */
        rawData: any
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 调起客户端扫码界面，扫码成功后返回对应的结果
 *
 * **示例代码：**
 *
 *     ```javascript
 *     // 允许从相机和相册扫码
 *     swan.scanCode({
 *       success: (res) => {
 *         console.log(res)
 *       }
 *     })
 *
 *     // 只允许从相机扫码
 *     swan.scanCode({
 *       onlyFromCamera: true,
 *       success: (res) => {
 *         console.log(res)
 *       }
 *     })
 *     ```
 * 
 */
export function scanCode(OBJECT: scanCode.Param): void

export namespace setClipboardData {
    export type Param = {
        /**
         * 需要设置的内容
         */
        data: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}
/**
 * 
 *
 * 设置系统剪贴板的内容
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.setClipboardData({
 *       data: 'data',
 *       success: function(res) {
 *         swan.getClipboardData({
 *           success: function(res) {
 *             console.log(res.data) // data
 *           }
 *         })
 *       }
 *     })
 *     ```
 * 
 */
export function setClipboardData(OBJECT: setClipboardData.Param): void

export namespace getClipboardData {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 剪贴板的内容
         */
        data: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 获取系统剪贴板内容
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getClipboardData({
 *       success: function(res){
 *         console.log(res.data)
 *       }
 *     })
 *     ```
 * 
 */
export function getClipboardData(OBJECT: getClipboardData.Param): void

export namespace openBluetoothAdapter {
    export type Param = {
        /**
         * 成功则返回成功初始化信息
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 成功则返回成功初始化信息
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 初始化小程序蓝牙模块，生效周期为调用`swan.openBluetoothAdapter`至调用`swan.closeBluetoothAdapter`或小程序被销毁为止。 在小程序蓝牙适配器模块生效期间，开发者可以正常调用下面的小程序API，并会收到蓝牙模块相关的on回调。
 *
 * **Bug & Tip：**
 *
 * 2.  `tip`: 在没有调用`swan.openBluetoothAdapter`的情况下调用小程序其它蓝牙模块相关API，API会返回错误，错误码为`10000`
 * 3.  `bug`: 在用户蓝牙开关未开启或者手机不支持蓝牙功能的情况下，调用`swan.openBluetoothAdapter`会返回错误，错误码为`10001`，表示手机蓝牙功能不可用；此时小程序蓝牙模块已经初始化完成，可通过`swan.onBluetoothAdapterStateChange`监听手机蓝牙状态的改变，也可以调用蓝牙模块的所有API。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.openBluetoothAdapter({
 *       success: export function (res) {
 *         console.log(res)
 *       }
 *     })
 *     ```
 * 
 */
export function openBluetoothAdapter(OBJECT: openBluetoothAdapter.Param): void

export namespace closeBluetoothAdapter {
    export type Param = {
        /**
         * 成功则返回成功关闭模块信息
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 成功则返回成功关闭模块信息
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 关闭蓝牙模块，使其进入未初始化状态。调用该方法将断开所有已建立的链接并释放系统资源。建议在使用小程序蓝牙流程后调用，与`swan.openBluetoothAdapter`成对调用。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.closeBluetoothAdapter({
 *       success: export function (res) {
 *         console.log(res)
 *       }
 *     })
 *     ```
 * 
 */
export function closeBluetoothAdapter(OBJECT: closeBluetoothAdapter.Param): void

export namespace getBluetoothAdapterState {
    export type Param = {
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 成功则返回本机蓝牙适配器状态
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 是否正在搜索设备
         */
        discovering: boolean
        /**
         * 蓝牙适配器是否可用
         */
        available: boolean
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 获取本机蓝牙适配器状态
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getBluetoothAdapterState({
 *       success: export function (res) {
 *         console.log(res)
 *       }
 *     })
 *     ```
 * 
 */
export function getBluetoothAdapterState(OBJECT: getBluetoothAdapterState.Param): void

export namespace onBluetoothAdapterStateChange {
    export type Param = (res: ParamParam) => any
    export type ParamParam = {
        /**
         * 蓝牙适配器是否可用
         */
        available: boolean
        /**
         * 蓝牙适配器是否处于搜索状态
         */
        discovering: boolean
    }
}
/**
 * 
 *
 * 监听蓝牙适配器状态变化事件
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.onBluetoothAdapterStateChange(function(res) {
 *       console.log(`adapterState changed, now is`, res)
 *     })
 *     ```
 * 
 */
export function onBluetoothAdapterStateChange(CALLBACK: onBluetoothAdapterStateChange.Param): void

export namespace startBluetoothDevicesDiscovery {
    export type Param = {
        /**
         * 蓝牙设备主 service 的 uuid 列表
         */
        services?: any[]
        /**
         * 是否允许重复上报同一设备， 如果允许重复上报，则onDeviceFound 方法会多次上报同一设备，但是 RSSI 值会有不同
         */
        allowDuplicatesKey?: boolean
        /**
         * 上报设备的间隔，默认为0，意思是找到新设备立即上报，否则根据传入的间隔上报
         */
        interval?: number
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 成功则返回本机蓝牙适配器状态
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 开始搜寻附近的蓝牙外围设备。注意，该操作比较耗费系统资源，请在搜索并连接到设备后调用 stop 方法停止搜索。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     // 以硬件平台的蓝牙智能灯为例，主服务的 UUID 是 FEE7。传入这个参数，只搜索主服务 UUID 为 FEE7 的设备
 *     swan.startBluetoothDevicesDiscovery({
 *       services: ['FEE7'],
 *       success: export function (res) {
 *         console.log(res)
 *       }
 *     })
 *     ```
 * 
 */
export function startBluetoothDevicesDiscovery(OBJECT: startBluetoothDevicesDiscovery.Param): void

export namespace stopBluetoothDevicesDiscovery {
    export type Param = {
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 成功则返回本机蓝牙适配器状态
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.stopBluetoothDevicesDiscovery({
 *       success: export function (res) {
 *         console.log(res)
 *       }
 *     })
 *     ```
 * 
 */
export function stopBluetoothDevicesDiscovery(OBJECT: stopBluetoothDevicesDiscovery.Param): void

export namespace getBluetoothDevices {
    export type Param = {
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 成功则返回本机蓝牙适配器状态
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * uuid 对应的的已连接设备列表
         */
        devices: ParamPropSuccessParamPropDevices
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string
    }
    /**
     * uuid 对应的的已连接设备列表
     */
    export type ParamPropSuccessParamPropDevices = ParamPropSuccessParamPropDevicesItem[]
    export type ParamPropSuccessParamPropDevicesItem = {
        /**
         * 蓝牙设备名称，某些设备可能没有
         */
        name: string
        /**
         * 用于区分设备的 id
         */
        deviceId: string
        /**
         * 当前蓝牙设备的信号强度
         */
        RSSI: number
        /**
         * 当前蓝牙设备的广播数据段中的ManufacturerData数据段 **（注意：vConsole 无法打印出 ArrayBuffer 类型数据）**
         */
        advertisData: ArrayBuffer
        /**
         * 当前蓝牙设备的广播数据段中的ServiceUUIDs数据段
         */
        advertisServiceUUIDs: any[]
        /**
         * 当前蓝牙设备的广播数据段中的LocalName数据段
         */
        localName: string
        /**
         * 当前蓝牙设备的广播数据段中的ServiceData数据段
         */
        serviceData: ArrayBuffer
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 获取在小程序蓝牙模块生效期间所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备。
 *
 * **Bug & Tip：**
 *
 * 1.  `tip`: Mac系统可能无法获取`advertisData`及`RSSI`，请使用真机调试
 * 2.  `tip`: 开发者工具和 Android 上获取到的`deviceId`为设备 MAC 地址，iOS 上则为设备 uuid。因此`deviceId`不能硬编码到代码中
 * 3.  `tip`: 注意该接口获取到的设备列表为**小程序蓝牙模块生效期间所有搜索到的蓝牙设备**，若在蓝牙模块使用流程结束后未及时调用 swan.closeBluetoothAdapter 释放资源，会存在调用该接口会返回之前的蓝牙使用流程中搜索到的蓝牙设备，可能设备已经不在用户身边，无法连接。
 * 4.  `tips`: 蓝牙设备在被搜索到时，系统返回的 name 字段一般为广播包中的LocalName字段中的设备名称，而如果与蓝牙设备建立连接，系统返回的 name 字段会改为从蓝牙设备上获取到的GattName。若需要动态改变设备名称并展示，建议使用localName字段。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     // ArrayBuffer转16进度字符串示例
 *     export function ab2hex(buffer) {
 *       var hexArr = Array.protoexport type.map.call(
 *         new Uint8Array(buffer),
 *         function(bit) {
 *           return ('00' + bit.toString(16)).slice(-2)
 *         }
 *       )
 *       return hexArr.join('');
 *     }
 *     swan.getBluetoothDevices({
 *       success: export function (res) {
 *         console.log(res)
 *         if (res.devices[0]) {
 *           console.log(ab2hex(res.devices[0].advertisData))
 *         }
 *       }
 *     })
 *     ```
 * 
 */
export function getBluetoothDevices(OBJECT: getBluetoothDevices.Param): void

export namespace onBluetoothDeviceFound {
    export type Param = (res: ParamParam) => any
    export type ParamParam = {
        /**
         * 新搜索到的设备列表
         */
        devices: ParamParamPropDevices
    }
    /**
     * 新搜索到的设备列表
     */
    export type ParamParamPropDevices = ParamParamPropDevicesItem[]
    export type ParamParamPropDevicesItem = {
        /**
         * 蓝牙设备名称，某些设备可能没有
         */
        name: string
        /**
         * 用于区分设备的 id
         */
        deviceId: string
        /**
         * 当前蓝牙设备的信号强度
         */
        RSSI: number
        /**
         * 当前蓝牙设备的广播数据段中的ManufacturerData数据段 **（注意：vConsole 无法打印出 ArrayBuffer 类型数据）**
         */
        advertisData: ArrayBuffer
        /**
         * 当前蓝牙设备的广播数据段中的ServiceUUIDs数据段
         */
        advertisServiceUUIDs: any[]
        /**
         * 当前蓝牙设备的广播数据段中的LocalName数据段
         */
        localName: string
        /**
         * 当前蓝牙设备的广播数据段中的ServiceData数据段
         */
        serviceData: ArrayBuffer
    }
}
/**
 * 
 *
 * 监听寻找到新设备的事件
 *
 * **Bug & Tip：**
 *
 * 1.  `tip`: Mac系统可能无法获取`advertisData`及`RSSI`，请使用真机调试
 * 2.  `tip`: 开发者工具和 Android 上获取到的`deviceId`为设备 MAC 地址，iOS 上则为设备 uuid。因此`deviceId`不能硬编码到代码中
 * 3.  `tip`: 若在onBluetoothDeviceFound回调了某个设备，则此设备会添加到 swan.getBluetoothDevices 接口获取到的数组中
 *
 * **示例代码：**
 *
 *     ```javascript
 *     // ArrayBuffer转16进度字符串示例
 *     export function ab2hex(buffer) {
 *       var hexArr = Array.protoexport type.map.call(
 *         new Uint8Array(buffer),
 *         function(bit) {
 *           return ('00' + bit.toString(16)).slice(-2)
 *         }
 *       )
 *       return hexArr.join('');
 *     }
 *     swan.onBluetoothDeviceFound(function(devices) {
 *       console.log('new device list has founded')
 *       console.dir(devices)
 *       console.log(ab2hex(devices[0].advertisData))
 *     })
 *     ```
 * 
 */
export function onBluetoothDeviceFound(CALLBACK: onBluetoothDeviceFound.Param): void

export namespace getConnectedBluetoothDevices {
    export type Param = {
        /**
         * 蓝牙设备主 service 的 uuid 列表
         */
        services: any[]
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 成功则返回本机蓝牙适配器状态
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 搜索到的设备列表
         */
        devices: ParamPropSuccessParamPropDevices
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string
    }
    /**
     * 搜索到的设备列表
     */
    export type ParamPropSuccessParamPropDevices = ParamPropSuccessParamPropDevicesItem[]
    export type ParamPropSuccessParamPropDevicesItem = {
        /**
         * 蓝牙设备名称，某些设备可能没有
         */
        name: string
        /**
         * 用于区分设备的 id
         */
        deviceId: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 根据 uuid 获取处于已连接状态的设备
 *
 * **Bug & Tip：**
 *
 * 1.  `tip`: 开发者工具和 Android 上获取到的`deviceId`为设备 MAC 地址，iOS 上则为设备 uuid。因此`deviceId`不能硬编码到代码中
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getConnectedBluetoothDevices({
 *       success: export function (res) {
 *         console.log(res)
 *       }
 *     })
 *     ```
 * 
 */
export function getConnectedBluetoothDevices(OBJECT: getConnectedBluetoothDevices.Param): void

export namespace createBLEConnection {
    export type Param = {
        /**
         * 蓝牙设备 id，参考 getDevices 接口
         */
        deviceId: string
        /**
         * 超时时间，单位ms，不填表示不会超时
         */
        timeout?: number
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 成功则返回本机蓝牙适配器状态
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 连接低功耗蓝牙设备。
 *
 * > 若小程序在之前已有搜索过某个蓝牙设备，并成功建立链接，可直接传入之前搜索获取的deviceId直接尝试连接该设备，无需进行搜索操作。
 *
 * **Bug & Tip：**
 *
 * 1.  `tip`: 安卓手机上如果多次调用create创建连接，有可能导致系统持有同一设备多个连接的实例，导致调用close的时候并不能真正的断开与设备的连接。因此请保证尽量成对的调用create和close接口
 * 2.  `tip`: 蓝牙链接随时可能断开，建议监听 swan.onBLEConnectionStateChange 回调事件，当蓝牙设备断开时按需执行重连操作
 * 3.  `tip`: 若对未连接的设备或已断开连接的设备调用数据读写操作的接口，会返回10006错误，详见错误码，建议进行重连操作
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.createBLEConnection({
 *       // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接 
 *       deviceId: deviceId,
 *       success: export function (res) {
 *         console.log(res)
 *       }
 *     })
 *     ```
 * 
 */
export function createBLEConnection(OBJECT: createBLEConnection.Param): void

export namespace closeBLEConnection {
    export type Param = {
        /**
         * 蓝牙设备 id，参考 getDevices 接口
         */
        deviceId: string
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 成功则返回本机蓝牙适配器状态
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 断开与低功耗蓝牙设备的连接
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.closeBLEConnection({
 *       deviceId:deviceId
 *       success: export function (res) {
 *         console.log(res)
 *       }
 *     })
 *     ```
 * 
 */
export function closeBLEConnection(OBJECT: closeBLEConnection.Param): void

export namespace onBLEConnectionStateChange {
    export type Param = (res: ParamParam) => any
    export type ParamParam = {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string
        /**
         * 连接目前的状态
         */
        connected: boolean
    }
}
/**
 * 
 *
 * 监听低功耗蓝牙连接状态的改变事件，包括开发者主动连接或断开连接，设备丢失，连接异常断开等等
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.onBLEConnectionStateChange(function(res) {
 *       // 该方法回调中可以用于处理连接意外断开等异常情况
 *       console.log(`device ${res.deviceId} state has changed, connected: ${res.connected}`)
 *     })
 *     ```
 * 
 */
export function onBLEConnectionStateChange(CALLBACK: onBLEConnectionStateChange.Param): void

export namespace getBLEDeviceServices {
    export type Param = {
        /**
         * 蓝牙设备 id，参考 getDevices 接口
         */
        deviceId: string
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 成功则返回本机蓝牙适配器状态
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 设备服务列表
         */
        services: ParamPropSuccessParamPropServices
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string
    }
    /**
     * 设备服务列表
     */
    export type ParamPropSuccessParamPropServices = ParamPropSuccessParamPropServicesItem[]
    export type ParamPropSuccessParamPropServicesItem = {
        /**
         * 蓝牙设备服务的 uuid
         */
        uuid: string
        /**
         * 该服务是否为主服务
         */
        isPrimary: boolean
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 获取蓝牙设备所有 service（服务）
 *
 * **Bug & Tip：**
 *
 * 1.  `tip`:iOS平台上后续对特征值的read、write、notify，由于系统需要获取特征值实例，传入的 serviceId 与 characteristicId 必须由 getBLEDeviceServices 与 getBLEDeviceCharacteristics 中获取到后才能使用。建议双平台统一在建立链接后先执行 getBLEDeviceServices 与 getBLEDeviceCharacteristics 后再进行与蓝牙设备的数据交互
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getBLEDeviceServices({
 *       // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接 
 *       deviceId: deviceId,
 *       success: export function (res) {
 *         console.log('device services:', res.services)
 *       }
 *     })
 *     ```
 * 
 */
export function getBLEDeviceServices(OBJECT: getBLEDeviceServices.Param): void

export namespace getBLEDeviceCharacteristics {
    export type Param = {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string
        /**
         * 蓝牙服务 uuid
         */
        serviceId: string
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 成功则返回本机蓝牙适配器状态
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 设备特征值列表
         */
        characteristics: ParamPropSuccessParamPropCharacteristics
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string
    }
    /**
     * 设备特征值列表
     */
    export type ParamPropSuccessParamPropCharacteristics = ParamPropSuccessParamPropCharacteristicsItem[]
    export type ParamPropSuccessParamPropCharacteristicsItem = {
        /**
         * 蓝牙设备特征值的 uuid
         */
        uuid: string
        /**
         * 该特征值支持的操作类型
         */
        properties: ParamPropSuccessParamPropCharacteristicsItemPropProperties
    }
    /**
     * 该特征值支持的操作类型
     */
    export type ParamPropSuccessParamPropCharacteristicsItemPropProperties = {
        /**
         * 该特征值是否支持 read 操作
         */
        read: boolean
        /**
         * 该特征值是否支持 write 操作
         */
        write: boolean
        /**
         * 该特征值是否支持 notify 操作
         */
        notify: boolean
        /**
         * 该特征值是否支持 indicate 操作
         */
        indicate: boolean
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 获取蓝牙设备某个服务中的所有 characteristic（特征值）
 *
 * **Bug & Tip：**
 *
 * 1.  `tip`:传入的serviceId需要在getBLEDeviceServices获取到
 * 2.  `tip`:iOS平台上后续对特征值的read、write、notify，由于系统需要获取特征值实例，传入的 serviceId 与 characteristicId 必须由 getBLEDeviceServices 与 getBLEDeviceCharacteristics 中获取到后才能使用。建议双平台统一在建立链接后先执行 getBLEDeviceServices 与 getBLEDeviceCharacteristics 后再进行与蓝牙设备的数据交互
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getBLEDeviceCharacteristics({
 *       // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
 *       deviceId: deviceId,
 *       // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
 *       serviceId: serviceId,
 *       success: export function (res) {
 *         console.log('device getBLEDeviceCharacteristics:', res.characteristics)
 *       }
 *     })
 *     ```
 * 
 */
export function getBLEDeviceCharacteristics(OBJECT: getBLEDeviceCharacteristics.Param): void

export namespace readBLECharacteristicValue {
    export type Param = {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string
        /**
         * 蓝牙特征值对应服务的 uuid
         */
        serviceId: string
        /**
         * 蓝牙特征值的 uuid
         */
        characteristicId: string
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 成功则返回本机蓝牙适配器状态
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 错误码
         */
        errCode: number
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持`read`才可以成功调用，具体参照 characteristic 的 properties 属性
 *
 * **Bug & Tip：**
 *
 * 1.  `tip`: 并行调用多次读写接口存在读写失败的可能性。
 * 2.  `tip`: `read`接口读取到的信息需要在`onBLECharacteristicValueChange`方法注册的回调中获取。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     // 必须在这里的回调才能获取
 *     swan.onBLECharacteristicValueChange(function(characteristic) {
 *       console.log('characteristic value comed:', characteristic)
 *     })
 *
 *     swan.readBLECharacteristicValue({
 *       // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接  [**new**]
 *       deviceId: deviceId,
 *       // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
 *       serviceId: serviceId,
 *       // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
 *       characteristicId: characteristicId,
 *       success: export function (res) {
 *         console.log('readBLECharacteristicValue:', res.errCode)
 *       }
 *     })
 *     ```
 * 
 */
export function readBLECharacteristicValue(OBJECT: readBLECharacteristicValue.Param): void

export namespace writeBLECharacteristicValue {
    export type Param = {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string
        /**
         * 蓝牙特征值对应服务的 uuid
         */
        serviceId: string
        /**
         * 蓝牙特征值的 uuid
         */
        characteristicId: string
        /**
         * 蓝牙设备特征值对应的二进制值
         */
        value: ArrayBuffer
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 成功则返回本机蓝牙适配器状态
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持`write`才可以成功调用，具体参照 characteristic 的 properties 属性
 *
 * _tips: 并行调用多次读写接口存在读写失败的可能性_
 *
 * **Bug & Tip：**
 *
 * 1.  `tip`: 并行调用多次读写接口存在读写失败的可能性。
 * 2.  `tip`: 小程序不会对写入数据包大小做限制，但系统与蓝牙设备会确定蓝牙4.0单次传输的数据大小，超过最大字节数后会发生写入错误，建议每次写入不超过20字节。
 * 3.  `tip`: 安卓平台上，在调用notify成功后立即调用write接口，在部分机型上会发生 10008 系统错误
 * 4.  `bug`: 若单次写入数据过长，iOS平台上存在系统不会有任何回调的情况(包括错误回调)。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     // 向蓝牙设备发送一个0x00的16进制数据
 *     let buffer = new ArrayBuffer(1)
 *     let dataView = new DataView(buffer)
 *     dataView.setUint8(0, 0)
 *
 *     swan.writeBLECharacteristicValue({
 *       // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
 *       deviceId: deviceId,
 *       // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
 *       serviceId: serviceId,
 *       // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
 *       characteristicId: characteristicId,
 *       // 这里的value是ArrayBuffer类型
 *       value: buffer,
 *       success: export function (res) {
 *         console.log('writeBLECharacteristicValue success', res.errMsg)
 *       }
 *     })
 *     ```
 * 
 */
export function writeBLECharacteristicValue(OBJECT: writeBLECharacteristicValue.Param): void

export namespace notifyBLECharacteristicValueChange {
    export type Param = {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string
        /**
         * 蓝牙特征值对应服务的 uuid
         */
        serviceId: string
        /**
         * 蓝牙特征值的 uuid
         */
        characteristicId: string
        /**
         * true: 启用 notify; false: 停用 notify
         */
        state: boolean
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 成功则返回本机蓝牙适配器状态
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。注意：必须设备的特征值支持`notify`或者`indicate`才可以成功调用，具体参照 characteristic 的 properties 属性
 *
 * 另外，必须先启用`notify`才能监听到设备 characteristicValueChange 事件
 *
 * **Bug & Tip：**
 *
 * 1.  `tip`: 订阅操作成功后需要设备主动更新特征值的value，才会触发 swan.onBLECharacteristicValueChange 回调。
 * 2.  `tip`: 安卓平台上，在调用notify成功后立即调用write接口，在部分机型上会发生 10008 系统错误
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.notifyBLECharacteristicValueChange({
 *       state: true, // 启用 notify 功能
 *       // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接  
 *       deviceId: deviceId,
 *       // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
 *       serviceId: serviceId,
 *       // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
 *       characteristicId: characteristicId,
 *       success: export function (res) {
 *         console.log('notifyBLECharacteristicValueChange success', res.errMsg)
 *       }
 *     })
 *     ```
 * 
 */
export function notifyBLECharacteristicValueChange(OBJECT: notifyBLECharacteristicValueChange.Param): void

export namespace onBLECharacteristicValueChange {
    export type Param = (res: ParamParam) => any
    export type ParamParam = {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string
        /**
         * 特征值所属服务 uuid
         */
        serviceId: string
        /**
         * 特征值 uuid
         */
        characteristicId: string
        /**
         * 特征值最新的值 **（注意：vConsole 无法打印出 ArrayBuffer 类型数据）**
         */
        value: ArrayBuffer
    }
}
/**
 * 
 *
 * 监听低功耗蓝牙设备的特征值变化。必须先启用`notify`接口才能接收到设备推送的notification。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     // ArrayBuffer转16进度字符串示例
 *     export function ab2hex(buffer) {
 *       var hexArr = Array.protoexport type.map.call(
 *         new Uint8Array(buffer),
 *         function(bit) {
 *           return ('00' + bit.toString(16)).slice(-2)
 *         }
 *       )
 *       return hexArr.join('');
 *     }
 *     swan.onBLECharacteristicValueChange(function(res) {
 *       console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`)
 *       console.log(ab2hext(res.value))
 *     })
 *     ```
 * 
 */
export function onBLECharacteristicValueChange(CALLBACK: onBLECharacteristicValueChange.Param): void

export namespace startBeaconDiscovery {
    export type Param = {
        /**
         * iBeacon设备广播的 uuids
         */
        uuids: string[]
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 调用结果
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 开始搜索附近的`iBeacon`设备
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.startBeaconDiscovery({
 *         success(res) {
 *         }
 *     })
 *     ```
 * 
 */
export function startBeaconDiscovery(OBJECT: startBeaconDiscovery.Param): void

export namespace stopBeaconDiscovery {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 调用结果
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 停止搜索附近的`iBeacon`设备
 * 
 */
export function stopBeaconDiscovery(OBJECT: stopBeaconDiscovery.Param): void

export namespace getBeacons {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * iBeacon 设备列表
         */
        beacons: ParamPropSuccessParamPropBeacons
        /**
         * 调用结果
         */
        errMsg: string
    }
    /**
     * iBeacon 设备列表
     */
    export type ParamPropSuccessParamPropBeacons = ParamPropSuccessParamPropBeaconsItem[]
    export type ParamPropSuccessParamPropBeaconsItem = {
        /**
         * iBeacon 设备广播的 uuid
         */
        uuid: string
        /**
         * iBeacon 设备的主 id
         */
        major: string
        /**
         * iBeacon 设备的次 id
         */
        minor: string
        /**
         * 表示设备距离的枚举值
         */
        proximity: number
        /**
         * iBeacon 设备的距离
         */
        accuracy: number
        /**
         * 表示设备的信号强度
         */
        rssi: number
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 获取所有已搜索到的`iBeacon`设备
 * 
 */
export function getBeacons(OBJECT: getBeacons.Param): void

export namespace onBeaconUpdate {
    export type Param = (res: ParamParam) => any
    export type ParamParam = {
        /**
         * 当前搜寻到的所有 iBeacon 设备列表
         */
        beacons: ParamParamPropBeacons
    }
    /**
     * 当前搜寻到的所有 iBeacon 设备列表
     */
    export type ParamParamPropBeacons = ParamParamPropBeaconsItem[]
    export type ParamParamPropBeaconsItem = {
        /**
         * iBeacon 设备广播的 uuid
         */
        uuid: string
        /**
         * iBeacon 设备的主 id
         */
        major: string
        /**
         * iBeacon 设备的次 id
         */
        minor: string
        /**
         * 表示设备距离的枚举值
         */
        proximity: number
        /**
         * iBeacon 设备的距离
         */
        accuracy: number
        /**
         * 表示设备的信号强度
         */
        rssi: number
    }
}
/**
 * 
 *
 * 监听 `iBeacon` 设备的更新事件
 * 
 */
export function onBeaconUpdate(CALLBACK: onBeaconUpdate.Param): void

export namespace onBeaconServiceChange {
    export type Param = (res: ParamParam) => any
    export type ParamParam = {
        /**
         * 服务目前是否可用
         */
        available: boolean
        /**
         * 目前是否处于搜索状态
         */
        discovering: boolean
    }
}
/**
 * 
 *
 * 监听 `iBeacon` 服务的状态变化
 * 
 */
export function onBeaconServiceChange(CALLBACK: onBeaconServiceChange.Param): void

export namespace setKeepScreenOn {
    export type Param = {
        /**
         * 是否保持屏幕常亮
         */
        keepScreenOn: boolean
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 调用结果
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 设置是否保持常亮状态。仅在当前小程序生效，离开小程序后设置失效。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     // 保持屏幕常亮
 *     swan.setKeepScreenOn({
 *         keepScreenOn: true
 *     })
 *     ```
 * 
 */
export function setKeepScreenOn(OBJECT: setKeepScreenOn.Param): void

/**
 * 
 *
 * 监听用户主动截屏事件，用户使用系统截屏按键截屏时触发此事件
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.onUserCaptureScreen(function(res) {
 *         console.log('用户截屏了')
 *     })
 *     ```
 * 
 */
export function onUserCaptureScreen(CALLBACK: any): void

export namespace addPhoneContact {
    export type Param = {
        /**
         * 头像本地文件路径
         */
        photoFilePath?: string
        /**
         * 昵称
         */
        nickName?: string
        /**
         * 姓氏
         */
        lastName?: string
        /**
         * 中间名
         */
        middleName?: string
        /**
         * 名字
         */
        firstName: string
        /**
         * 备注
         */
        remark?: string
        /**
         * 手机号
         */
        mobilePhoneNumber?: string
        /**
         * 联系地址国家
         */
        addressCountry?: string
        /**
         * 联系地址省份
         */
        addressState?: string
        /**
         * 联系地址城市
         */
        addressCity?: string
        /**
         * 联系地址街道
         */
        addressStreet?: string
        /**
         * 联系地址邮政编码
         */
        addressPostalCode?: string
        /**
         * 公司
         */
        organization?: string
        /**
         * 职位
         */
        title?: string
        /**
         * 工作传真
         */
        workFaxNumber?: string
        /**
         * 工作电话
         */
        workPhoneNumber?: string
        /**
         * 公司电话
         */
        hostNumber?: string
        /**
         * 电子邮件
         */
        email?: string
        /**
         * 网站
         */
        url?: string
        /**
         * 工作地址国家
         */
        workAddressCountry?: string
        /**
         * 工作地址省份
         */
        workAddressState?: string
        /**
         * 工作地址城市
         */
        workAddressCity?: string
        /**
         * 工作地址街道
         */
        workAddressStreet?: string
        /**
         * 工作地址邮政编码
         */
        workAddressPostalCode?: string
        /**
         * 住宅传真
         */
        homeFaxNumber?: string
        /**
         * 住宅电话
         */
        homePhoneNumber?: string
        /**
         * 住宅地址国家
         */
        homeAddressCountry?: string
        /**
         * 住宅地址省份
         */
        homeAddressState?: string
        /**
         * 住宅地址城市
         */
        homeAddressCity?: string
        /**
         * 住宅地址街道
         */
        homeAddressStreet?: string
        /**
         * 住宅地址邮政编码
         */
        homeAddressPostalCode?: string
        /**
         * 接口调用成功
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 调用后，用户可以选择将该表单以“新增联系人”或“添加到已有联系人”的方式，写入手机系统通讯录，完成手机通讯录联系人和联系方式的增加。
 *
 * **回调结果：**
 *
 *   回调类型  |  errMsg           |  说明                 
 * ------------|-------------------|-----------------------
 *   success   |  ok               |  添加成功             
 *   fail      |  fail cancel      |  用户取消操作         
 *   fail      |  fail ${detail}   |调用失败，detail 加上详细信息
 * 
 */
export function addPhoneContact(OBJECT: addPhoneContact.Param): void

export namespace getHCEState {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 错误信息
         */
        errMsg: string
        /**
         * 错误码
         */
        errCode: number
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 判断当前设备是否支持 HCE 能力。
 *
 * **success返回参数说明：**
 *
 *     ```javascript
 *     swan.getHCEState({
 *       success: function(res) {
 *         console.log(res.errCode)
 *       }
 *     })
 *     ```
 * 
 */
export function getHCEState(OBJECT: getHCEState.Param): void

export namespace startHCE {
    export type Param = {
        /**
         * 需要注册到系统的 AID 列表，每个 AID 为 String 类型
         */
        aid_list: any[]
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 错误信息
         */
        errMsg: string
        /**
         * 错误码
         */
        errCode: number
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 初始化 NFC 模块。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.startHCE({
 *       aid_list: ['F222222222']
 *       success: function(res) {
 *         console.log(res.errMsg)
 *       }
 *     })
 *     ```
 * 
 */
export function startHCE(OBJECT: startHCE.Param): void

export namespace stopHCE {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 错误信息
         */
        errMsg: string
        /**
         * 错误码
         */
        errCode: number
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 关闭 NFC 模块。仅在安卓系统下有效。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.stopHCE({
 *       success: function(res) {
 *         console.log(res.errMsg)
 *       }
 *     })
 *     ```
 * 
 */
export function stopHCE(OBJECT: stopHCE.Param): void

export namespace onHCEMessage {
    export type Param = (res: ParamParam) => any
    export type ParamParam = {
        /**
         * 消息类型
         */
        messageType: number
        /**
         * 客户端接收到 NFC 设备的指令，此参数当且仅当 `messageType=1` 时有效
         */
        data: ArrayBuffer
        /**
         * 此参数当且仅当 `messageType=2` 时有效
         */
        reason: number
    }
}
/**
 * 
 *
 * 监听 NFC 设备的消息回调，并在回调中处理。返回参数中 `messageType` 表示消息类型，目前有如下值：
 *
 * *   1：消息为HCE Apdu Command类型，小程序需对此指令进行处理，并调用 `sendHCEMessage` 接口返回处理指令；
 * *   2：消息为设备离场事件
 * 
 */
export function onHCEMessage(CALLBACK: onHCEMessage.Param): void

export namespace sendHCEMessage {
    export type Param = {
        /**
         * 二进制数据
         */
        data: ArrayBuffer
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 错误信息
         */
        errMsg: string
        /**
         * 错误码
         *
         * **errCode列表：**
         *
         * 每个接口调用的时候，都会返回 `errCode` 字段。
         *
         *   错误码  |  说明                     
         * ----------|---------------------------
         *   0       |  Ok                       
         *   13000   |  当前设备不支持 NFC       
         *   13001   |当前设备支持 NFC，但系统NFC开关未开启
         *   13002   |当前设备支持 NFC，但不支持HCE
         *   13003   |  AID 列表参数格式错误     
         *   13005   |  返回的指令不合法         
         *   13006   |  注册 AID 失败            
         */
        errCode: number
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 发送 NFC 消息。仅在安卓系统下有效。
 *
 * **success返回参数说明：**
 *
 *     ```javascript
 *     const buffer = new ArrayBuffer(1)
 *     const dataView = new DataView(buffer)
 *     dataView.setUint8(0, 0)
 *
 *     swan.startHCE({
 *       success: function(res) {
 *         swan.onHCEMessage(function(res) {
 *           if (res.messageType === 1) {
 *             swan.sendHCEMessage({data: buffer})
 *           }
 *         })
 *       }
 *     })
 *     ```
 * 
 */
export function sendHCEMessage(OBJECT: sendHCEMessage.Param): void

export namespace startWifi {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 初始化 Wi-Fi 模块。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.startWifi({
 *       success: function(res) {
 *         console.log(res.errMsg)
 *       }
 *     })
 *     ```
 * 
 */
export function startWifi(OBJECT: startWifi.Param): void

export namespace stopWifi {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 关闭 Wi-Fi 模块。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.stopWifi({
 *       success: function(res) {
 *         console.log(res.errMsg)
 *       }
 *     })
 *     ```
 * 
 */
export function stopWifi(OBJECT: stopWifi.Param): void

export namespace connectWifi {
    export type Param = {
        /**
         * Wi-Fi 设备ssid
         */
        SSID: string
        /**
         * Wi-Fi 设备bssid
         */
        BSSID: string
        /**
         * Wi-Fi 设备密码
         */
        password?: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 连接 Wi-Fi。若已知 Wi-Fi 信息，可以直接利用该接口连接。仅 Android 与 iOS 11 以上版本支持。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.connectWifi({
 *       SSID: '',
 *       BSSID: '',
 *       success: function(res) {
 *         console.log(res.errMsg)
 *       }
 *     })
 *     ```
 * 
 */
export function connectWifi(OBJECT: connectWifi.Param): void

export namespace getWifiList {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 请求获取 Wi-Fi 列表，在 `onGetWifiList` 注册的回调中返回 wifiList 数据。iOS 将跳转到系统的 Wi-Fi 界面，Android 不会跳转。 **iOS 11.0 及 iOS 11.1 两个版本因系统问题，该方法失效。但在 iOS 11.2 中已修复。**
 * 
 */
export function getWifiList(OBJECT: getWifiList.Param): void

export namespace onGetWifiList {
    export type Param = (res: ParamParam) => any
    export type ParamParam = {
        /**
         * Wi-Fi 列表数据
         */
        wifiList: ParamParamPropWifiList
    }
    /**
     * Wi-Fi 列表数据
     */
    export type ParamParamPropWifiList = ParamParamPropWifiListItem[]
    export type ParamParamPropWifiListItem = {
        /**
         * Wi-Fi 的SSID
         */
        SSID: string
        /**
         * Wi-Fi 的BSSID
         */
        BSSID: string
        /**
         * Wi-Fi 是否安全
         */
        secure: boolean
        /**
         * Wi-Fi 信号强度
         */
        signalStrength: number
    }
}
/**
 * 
 *
 * 监听在获取到 Wi-Fi 列表数据时的事件，在回调中将返回 wifiList。
 * 
 */
export function onGetWifiList(CALLBACK: onGetWifiList.Param): void

export namespace setWifiList {
    export type Param = {
        /**
         * 提供预设的 Wi-Fi 信息列表
         */
        wifiList: ParamPropWifiList
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 提供预设的 Wi-Fi 信息列表
     */
    export type ParamPropWifiList = ParamPropWifiListItem[]
    export type ParamPropWifiListItem = {
        /**
         * Wi-Fi 设备ssid
         */
        SSID: string
        /**
         * Wi-Fi 设备bssid
         */
        BSSID: string
        /**
         * Wi-Fi 设备密码
         */
        password: string
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * **iOS特有接口** 在 `onGetWifiList` 回调后，利用接口设置 wifiList 中 AP 的相关信息。
 *
 * 注意：
 *
 * 1.  该接口只能在 `onGetWifiList` 回调之后才能调用。
 * 2.  此时客户端会挂起，等待小程序设置 Wi-Fi 信息，请务必尽快调用该接口，若无数据请传入一个空数组。
 * 3.  有可能随着周边 Wi-Fi 列表的刷新，单个流程内收到多次带有存在重复的 Wi-Fi 列表的回调。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.onGetWifiList(function(res) {
 *       if (res.wifiList.length) {
 *         swan.setWifiList({
 *           wifiList: [{
 *             SSID: res.wifiList[0].SSID,
 *             BSSID: res.wifiList[0].BSSID,
 *             password: '123456'
 *           }]
 *         })
 *       } else {
 *         swan.setWifiList({
 *           wifiList: []
 *         })
 *       }
 *     })
 *     swan.getWifiList()
 *     ```
 * 
 */
export function setWifiList(OBJECT: setWifiList.Param): void

export namespace onWifiConnected {
    export type Param = (res: ParamParam) => any
    export type ParamParam = {
        /**
         * Wi-Fi 信息
         */
        wifi: ParamParamPropWifi
    }
    /**
     * Wi-Fi 信息
     */
    export type ParamParamPropWifi = {
        /**
         * Wi-Fi 的SSID
         */
        SSID: string
        /**
         * Wi-Fi 的BSSID
         */
        BSSID: string
        /**
         * Wi-Fi 是否安全
         */
        secure: boolean
        /**
         * Wi-Fi 信号强度
         */
        signalStrength: number
    }
}
/**
 * 
 *
 * 监听连接上 Wi-Fi 的事件。
 * 
 */
export function onWifiConnected(CALLBACK: onWifiConnected.Param): void

export namespace getConnectedWifi {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * Wi-Fi 信息
         */
        wifi: ParamPropSuccessParamPropWifi
    }
    /**
     * Wi-Fi 信息
     */
    export type ParamPropSuccessParamPropWifi = {
        /**
         * Wi-Fi 的SSID
         */
        SSID: string
        /**
         * Wi-Fi 的BSSID
         */
        BSSID: string
        /**
         * Wi-Fi 是否安全
         */
        secure: boolean
        /**
         * Wi-Fi 信号强度
         */
        signalStrength: number
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 获取已连接中的 Wi-Fi 信息
 *
 * **errCode列表：**
 *
 * 每个接口调用的时候，都会返回 `errCode` 字段。
 *
 *   错误码  |  说明                    |  备注                        
 * ----------|--------------------------|------------------------------
 *   0       |  ok                      |  正常                        
 *   12000   |  not init                |  未先调用startWifi接口       
 *   12001   |  system not support      |  当前系统不支持相关能力      
 *   12002   |  password error          |  Wi-Fi 密码错误              
 *   12003   |  connection timeout      |  连接超时                    
 *   12004   |  duplicate request       |  重复连接 Wi-Fi              
 *   12005   |  wifi not turned on      |Android特有，未打开 Wi-Fi 开关
 *   12006   |  gps not turned on       |Android特有，未打开 GPS 定位开关
 *   12007   |  user denied             |  用户拒绝授权链接 Wi-Fi      
 *   12008   |  invalid SSID            |  无效SSID                    
 *   12009   |  system config err       | 系统运营商配置拒绝连接 Wi-Fi 
 *   12010   |  system internal error   |系统其他错误，需要在errmsg打印具体的错误原因
 *   12011   |  weapp in background     |  应用在后台无法配置 Wi-Fi    
 * 
 */
export function getConnectedWifi(OBJECT: getConnectedWifi.Param): void

export namespace showToast {
    export type Param = {
        /**
         * 提示的内容
         */
        title: string
        /**
         * 图标，有效值 "success", "loading", "none"
         *
         * **icon有效值：**
         *
         *   有效值    |  说明                                 | 最低版本 
         * ------------|---------------------------------------|----------
         *   success   |显示成功图标，此时 title 文本最多显示 7 个汉字长度。默认值|          
         *   loading   |显示加载图标，此时 title 文本最多显示 7 个汉字长度。|          
         *   none      |不显示图标，此时 title 文本最多可显示两行|  1.9.0   
         */
        icon?: string
        /**
         * 自定义图标的本地路径，image 的优先级高于 icon
         *
         * 
         */
        image?: string
        /**
         * 提示的延迟时间，单位毫秒，默认：1500
         */
        duration?: number
        /**
         * 是否显示透明蒙层，防止触摸穿透，默认：false
         */
        mask?: boolean
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}
/**
 * 显示消息提示框
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.showToast({
 *       title: '成功',
 *       icon: 'success',
 *       duration: 2000
 *     })
 *     ```
 * 
 */
export function showToast(OBJECT: showToast.Param): void

export namespace showLoading {
    export type Param = {
        /**
         * 提示的内容
         */
        title: string
        /**
         * 是否显示透明蒙层，防止触摸穿透，默认：false
         */
        mask?: boolean
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}
/**
 * 
 *
 * 显示 loading 提示框, 需主动调用 swan.hideLoading才能关闭提示框
 * 
 */
export function showLoading(OBJECT: showLoading.Param): void

export namespace hideToast {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}
/**
 * 隐藏消息提示框
 */
export function hideToast(OBJECT: hideToast.Param): void

export namespace hideLoading {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}
/**
 * 隐藏 loading 提示框
 *
 * **示例：**
 *
 * ```javascript
 * swan.showLoading({
 *   title: '加载中',
 * })
 *
 * setTimeout(function(){
 *   swan.hideLoading()
 * }, 2000)
 * ```
 */
export function hideLoading(OBJECT: hideLoading.Param): void

export namespace showModal {
    export type Param = {
        /**
         * 提示的标题
         */
        title: string
        /**
         * 提示的内容
         */
        content: string
        /**
         * 是否显示取消按钮，默认为 true
         */
        showCancel?: boolean
        /**
         * 取消按钮的文字，默认为"取消"，最多 4 个字符
         */
        cancelText?: string
        /**
         * 取消按钮的文字颜色，默认为"#000000"
         */
        cancelColor?: string
        /**
         * 确定按钮的文字，默认为"确定"，最多 4 个字符
         */
        confirmText?: string
        /**
         * 确定按钮的文字颜色，默认为"#3CC51F"
         */
        confirmColor?: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 为 true 时，表示用户点击了确定按钮
         */
        confirm: boolean
        /**
         * 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）
         */
        cancel: boolean
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 显示模态框
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.showModal({
 *       title: '提示',
 *       content: '这是一个模态弹窗',
 *       success: function(res) {
 *         if (res.confirm) {
 *           console.log('用户点击确定')
 *         } else if (res.cancel) {
 *           console.log('用户点击取消')
 *         }
 *       }
 *     })
 *     ```
 * 
 */
export function showModal(OBJECT: showModal.Param): void

export namespace showActionSheet {
    export type Param = {
        /**
         * 按钮的文字数组，数组长度最大为6个
         */
        itemList: string[]
        /**
         * 按钮的文字颜色，默认为"#000000"
         */
        itemColor?: string
        /**
         * 接口调用成功的回调函数，详见返回参数说明
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数，详见返回参数说明
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 用户点击的按钮，从上到下的顺序，从0开始
         */
        tapIndex: number
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 显示操作菜单
 *
 * **Bug & Tip：**
 *
 * 1.  `bug`: `Android` `6.3.30`，swan.showModal 的返回的 confirm 一直为 true；
 * 2.  `tip`: swan.showActionSheet 点击取消或蒙层时，回调 `fail`, errMsg 为 "showActionSheet:fail cancel"；
 * 3.  `tip`: swan.showLoading 和 swan.showToast 同时只能显示一个，但 swan.hideToast/swan.hideLoading 也应当配对使用；
 * 4.  `tip`: `iOS` swan.showModal 点击蒙层不会关闭模态弹窗，所以尽量避免使用“取消”分支中实现业务逻辑。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.showActionSheet({
 *       itemList: ['A', 'B', 'C'],
 *       success: function(res) {
 *         console.log(res.tapIndex)
 *       },
 *       fail: function(res) {
 *         console.log(res.errMsg)
 *       }
 *     })
 *     ```
 * 
 */
export function showActionSheet(OBJECT: showActionSheet.Param): void

export namespace setTopBarText {
    export type Param = {
        /**
         * 置顶栏文字内容
         */
        text: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 动态设置置顶栏文字内容，只有当前小程序被置顶时能生效，如果当前小程序没有被置顶，也能调用成功，但是不会立即生效，只有在用户将这个小程序置顶后才换上设置的文字内容。**注意：调用成功后，需间隔 5s 才能再次调用此接口，如果在 5s 内再次调用此接口，会回调 fail，errMsg："setTopBarText: fail invoke too frequently"**
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.setTopBarText({
 *       text: 'hello, world!'
 *     })
 *     ```
 * 
 */
export function setTopBarText(OBJECT: setTopBarText.Param): void

export namespace setNavigationBarTitle {
    export type Param = {
        /**
         * 页面标题
         */
        title: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 动态设置当前页面的标题。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.setNavigationBarTitle({
 *       title: '当前页面'
 *     })
 *     ```
 * 
 */
export function setNavigationBarTitle(OBJECT: setNavigationBarTitle.Param): void

/**
 * 在当前页面显示导航条加载动画。
 * 
 */
export function showNavigationBarLoading(): void

/**
 * 隐藏导航条加载动画。
 * 
 */
export function hideNavigationBarLoading(): void

export namespace setNavigationBarColor {
    export type Param = {
        /**
         * 前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000
         */
        frontColor: string
        /**
         * 背景颜色值，有效值为十六进制颜色
         */
        backgroundColor: string
        /**
         * 动画效果
         *
         * **animation.timingFunc 有效值：**
         *
         *   值          |  说明             
         * --------------|-------------------
         *   linear      |动画从头到尾的速度是相同的。
         *   easeIn      |  动画以低速开始   
         *   easeOut     |  动画以低速结束。 
         *   easeInOut   |动画以低速开始和结束。
         */
        animation?: ParamPropAnimation
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 动画效果
     *
     * **animation.timingFunc 有效值：**
     *
     * 值          |  说明
     * --------------|-------------------
     * linear      |动画从头到尾的速度是相同的。
     * easeIn      |  动画以低速开始
     * easeOut     |  动画以低速结束。
     * easeInOut   |动画以低速开始和结束。
     */
    export type ParamPropAnimation = {
        /**
         * 动画变化时间，默认0，单位：毫秒
         */
        duration?: number
        /**
         * 动画变化方式，默认 linear
         */
        timingFunc?: string
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 调用结果
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.setNavigationBarColor({
 *         frontColor: '#ffffff',
 *         backgroundColor: '#ff0000',
 *         animation: {
 *             duration: 400,
 *             timingFunc: 'easeIn'
 *         }
 *     })
 *     ```
 * 
 */
export function setNavigationBarColor(OBJECT: setNavigationBarColor.Param): void

export namespace setTabBarBadge {
    export type Param = {
        /**
         * tabBar的哪一项，从左边算起
         */
        index: number
        /**
         * 显示的文本，超过 3 个字符则显示成“…”
         */
        text: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 为 tabBar 某一项的右上角添加文本
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.setTabBarBadge({
 *       index: 0,
 *       text: '1'
 *     })
 *     ```
 * 
 */
export function setTabBarBadge(OBJECT: setTabBarBadge.Param): void

export namespace removeTabBarBadge {
    export type Param = {
        /**
         * tabBar的哪一项，从左边算起
         */
        index: number
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 移除 tabBar 某一项右上角的文本
 * 
 */
export function removeTabBarBadge(OBJECT: removeTabBarBadge.Param): void

export namespace showTabBarRedDot {
    export type Param = {
        /**
         * tabBar的哪一项，从左边算起
         */
        index: number
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 显示 tabBar 某一项的右上角的红点
 * 
 */
export function showTabBarRedDot(OBJECT: showTabBarRedDot.Param): void

export namespace hideTabBarRedDot {
    export type Param = {
        /**
         * tabBar的哪一项，从左边算起
         */
        index: number
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 隐藏 tabBar 某一项的右上角的红点
 * 
 */
export function hideTabBarRedDot(OBJECT: hideTabBarRedDot.Param): void

export namespace setTabBarStyle {
    export type Param = {
        /**
         * tab 上的文字默认颜色
         */
        color?: string
        /**
         * tab 上的文字选中时的颜色
         */
        selectedColor?: string
        /**
         * tab 的背景色
         */
        backgroundColor?: string
        /**
         * tabbar上边框的颜色， 仅支持 black/white
         */
        borderStyle?: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 动态设置 tabBar 的整体样式
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.setTabBarStyle({
 *         color: '#FF0000',
 *         selectedColor: '#00FF00',
 *         backgroundColor: '#0000FF',
 *         borderStyle: 'white'
 *     })
 *     ```
 * 
 */
export function setTabBarStyle(OBJECT: setTabBarStyle.Param): void

export namespace setTabBarItem {
    export type Param = {
        /**
         * tabBar 的哪一项，从左边算起
         */
        index: number
        /**
         * tab 上按钮文字
         */
        text?: string
        /**
         * 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 postion 为 top 时，此参数无效，不支持网络图片
         */
        iconPath?: string
        /**
         * 选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 postion 为 top 时，此参数无效
         */
        selectedIconPath?: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 动态设置 tabBar 某一项的内容
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.setTabBarItem({
 *         index: 0,
 *         text: 'text',
 *         iconPath: '/path/to/iconPath',
 *         selectedIconPath: '/path/to/selectedIconPath'
 *     })
 *     ```
 * 
 */
export function setTabBarItem(OBJECT: setTabBarItem.Param): void

export namespace showTabBar {
    export type Param = {
        /**
         * 是否需要动画效果，默认无
         */
        animation?: boolean
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 显示 tabBar
 * 
 */
export function showTabBar(OBJECT: showTabBar.Param): void

export namespace hideTabBar {
    export type Param = {
        /**
         * 是否需要动画效果，默认无
         */
        animation?: boolean
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 隐藏 tabBar
 * 
 */
export function hideTabBar(OBJECT: hideTabBar.Param): void

export namespace setBackgroundColor {
    export type Param = {
        /**
         * 窗口的背景色
         */
        backgroundColor?: string
        /**
         * 顶部窗口的背景色，仅 iOS 支持
         */
        backgroundColorTop?: string
        /**
         * 底部窗口的背景色，仅 iOS 支持
         */
        backgroundColorBottom?: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = () => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 动态设置窗口的背景色
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.setBackgroundColor({
 *         backgroundColor: '#ffffff', // 窗口的背景色为白色
 *     })
 *
 *     swan.setBackgroundColor({
 *         backgroundColorTop: '#ffffff', // 顶部窗口的背景色为白色
 *         backgroundColorBottom: '#ffffff', // 底部窗口的背景色为白色
 *     })
 *     ```
 * 
 */
export function setBackgroundColor(OBJECT: setBackgroundColor.Param): void

export namespace setBackgroundTextStyle {
    export type Param = {
        /**
         * 下拉背景字体、loading 图的样式，仅支持 'dark', 'light'
         */
        textStyle?: string
    }
}

/**
 * 
 *
 * 动态设置下拉背景字体、loading 图的样式
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.setBackgroundTextStyle({
 *         textStyle: 'dark', // 下拉背景字体、loading 图的样式为dark
 *     })
 *     ```
 * 
 */
export function setBackgroundTextStyle(OBJECT: setBackgroundTextStyle.Param): void

export namespace navigateTo {
    export type Param = {
        /**
         * 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用`?`分隔，参数键与参数值用`=`相连，不同参数用`&`分隔；如 'path?key=value&key2=value2'
         */
        url: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = () => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}
/**
 * 保留当前页面，跳转到应用内的某个页面，使用`swan.navigateBack`可以返回到原页面。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.navigateTo({
 *       url: 'test?id=1'
 *     })
 *     ```
 *
 * **示例代码：**
 *
 *     ```javascript
 *     //test.js
 *     Page({
 *       onLoad: function(option){
 *         console.log(option.query)
 *       }
 *     })
 *     ```
 * 
 */
export function navigateTo(OBJECT: navigateTo.Param): void

export namespace redirectTo {
    export type Param = {
        /**
         * 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用`?`分隔，参数键与参数值用`=`相连，不同参数用`&`分隔；如 'path?key=value&key2=value2'
         */
        url: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = () => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 关闭当前页面，跳转到应用内的某个页面。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.redirectTo({
 *       url: 'test?id=1'
 *     })
 *     ```
 * 
 */
export function redirectTo(OBJECT: redirectTo.Param): void

export namespace reLaunch {
    export type Param = {
        /**
         * 需要跳转的应用内页面路径 , 路径后可以带参数。参数与路径之间使用`?`分隔，参数键与参数值用`=`相连，不同参数用`&`分隔；如 'path?key=value&key2=value2'，如果跳转的页面路径是 tabBar 页面则不能带参数
         */
        url: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = () => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 关闭所有页面，打开到应用内的某个页面。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.reLaunch({
 *       url: 'test?id=1'
 *     })
 *     ```
 *
 * **示例代码：**
 *
 *     ```javascript
 *     //test.js
 *     Page({
 *       onLoad: function(option){
 *         console.log(option.query)
 *       }
 *     })
 *     ```
 * 
 */
export function reLaunch(OBJECT: reLaunch.Param): void

export namespace switchTab {
    export type Param = {
        /**
         * 需要跳转的 tabBar 页面的路径（需在 app.json 的 tabBar字段定义的页面），路径后不能带参数
         */
        url: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 *
 * **示例代码：**
 *
 *     ```json
 *     {
 *       "tabBar": {
 *         "list": [{
 *           "pagePath": "index",
 *           "text": "首页"
 *         },{
 *           "pagePath": "other",
 *           "text": "其他"
 *         }]
 *       }
 *     }
 *     ```
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.switchTab({
 *       url: '/index'
 *     })
 *     ```
 * 
 */
export function switchTab(OBJECT: switchTab.Param): void

export namespace navigateBack {
    export type Param = {
        /**
         * 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
         *
         * @default 1
         */
        delta?: number
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = () => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 关闭当前页面，返回上一页面或多级页面。可通过 `getCurrentPages()`获取当前的页面栈，决定需要返回几层。
 *
 * **Tip：**
 *
 * 1.  `tip`: swan.navigateTo 和 swan.redirectTo 不允许跳转到 tabbar 页面，只能用 swan.switchTab 跳转到 tabbar 页面
 *
 * **示例代码：**
 *
 *     ```javascript
 *     // 注意：调用 navigateTo 跳转时，调用该方法的页面会被加入堆栈，而 redirectTo 方法则不会。见下方示例代码
 *
 *     // 此处是A页面
 *     swan.navigateTo({
 *       url: 'B?id=1'
 *     })
 *
 *     // 此处是B页面
 *     swan.navigateTo({
 *       url: 'C?id=1'
 *     })
 *
 *     // 在C页面内 navigateBack，将返回A页面
 *     swan.navigateBack({
 *       delta: 2
 *     })
 *     ```
 * 
 */
export function navigateBack(OBJECT: navigateBack.Param): void

export namespace createAnimation {
    export type Param = {
        /**
         * 动画持续时间，单位ms
         *
         * @default 400
         */
        duration?: number
        /**
         * 定义动画的效果
         *
         * **timingFunction 有效值：**
         *
         *   值            |  说明                    
         * ----------------|--------------------------
         *   linear        |动画从头到尾的速度是相同的
         *   ease          |动画以低速开始，然后加快，在结束前变慢
         *   ease-in       |  动画以低速开始          
         *   ease-in-out   |  动画以低速开始和结束    
         *   ease-out      |  动画以低速结束          
         *   step-start    |动画第一帧就跳至结束状态直到结束
         *   step-end      |动画一直保持开始状态，最后一帧跳到结束状态
         *
         * @default linear
         */
        timingFunction?: string
        /**
         * 动画延迟时间，单位 ms
         *
         * @default 0
         */
        delay?: number
        /**
         * 设置transform-origin
         *
         * @default 50% 50% 0
         */
        transformOrigin?: string
    }
}
/**
 * 创建一个动画实例animation。调用实例的方法来描述动画。最后通过动画实例的`export`方法导出动画数据传递给组件的`animation`属性。
 *
 * **注意: `export` 方法每次调用后会清掉之前的动画操作**
 *
 * **timingFunction 有效值：**
 *
 *     ```javascript
 *     var animation = swan.createAnimation({
 *       transformOrigin: "50% 50%",
 *       duration: 1000,
 *       timingFunction: "ease",
 *       delay: 0
 *     })
 *     ```
 * 
 */
export function createAnimation(OBJECT: createAnimation.Param): Animation

export class  Animation {
    /**
     * 透明度，参数范围 0~1
     */
    opacity(value: any): any
    /**
     * 颜色值
     */
    backgroundColor(color: any): any
    /**
     * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
     */
    width(length: any): any
    /**
     * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
     */
    height(length: any): any
    /**
     * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
     */
    top(length: any): any
    /**
     * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
     */
    left(length: any): any
    /**
     * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
     */
    bottom(length: any): any
    /**
     * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
     */
    right(length: any): any
    /**
     * deg的范围-180~180，从原点顺时针旋转一个deg角度
     */
    rotate(deg: any): any
    /**
     * deg的范围-180~180，在X轴旋转一个deg角度
     */
    rotateX(deg: any): any
    /**
     * deg的范围-180~180，在Y轴旋转一个deg角度
     */
    rotateY(deg: any): any
    /**
     * deg的范围-180~180，在Z轴旋转一个deg角度
     */
    rotateZ(deg: any): any
    /**
     * 同[transform-export function rotate3d](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate3d)
     */
    rotate3d(x: any, y: any, z: any, deg: any): any
    /**
     * 一个参数时，表示在X轴、Y轴同时缩放sx倍数；两个参数时表示在X轴缩放sx倍数，在Y轴缩放sy倍数
     */
    scale(sx: any, sy?: any): any
    /**
     * 在X轴缩放sx倍数
     */
    scaleX(sx: any): any
    /**
     * 在Y轴缩放sy倍数
     */
    scaleY(sy: any): any
    /**
     * 在Z轴缩放sy倍数
     */
    scaleZ(sz: any): any
    /**
     * 在X轴缩放sx倍数，在Y轴缩放sy倍数，在Z轴缩放sz倍数
     */
    scale3d(sx: any, sy: any, sz: any): any
    /**
     * 一个参数时，表示在X轴偏移tx，单位px；两个参数时，表示在X轴偏移tx，在Y轴偏移ty，单位px。
     */
    translate(tx: any, ty?: any): any
    /**
     * 在X轴偏移tx，单位px
     */
    translateX(tx: any): any
    /**
     * 在Y轴偏移tx，单位px
     */
    translateY(ty: any): any
    /**
     * 在Z轴偏移tx，单位px
     */
    translateZ(tz: any): any
    /**
     * 在X轴偏移tx，在Y轴偏移ty，在Z轴偏移tz，单位px
     */
    translate3d(tx: any, ty: any, tz: any): any
    /**
     * 参数范围-180~180；一个参数时，Y轴坐标不变，X轴坐标延顺时针倾斜ax度；两个参数时，分别在X轴倾斜ax度，在Y轴倾斜ay度
     */
    skew(ax: any, ay?: any): any
    /**
     * 参数范围-180~180；Y轴坐标不变，X轴坐标延顺时针倾斜ax度
     */
    skewX(ax: any): any
    /**
     * 参数范围-180~180；X轴坐标不变，Y轴坐标延顺时针倾斜ay度
     */
    skewY(ay: any): any
    /**
     * 同[transform-export function matrix](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix)
     */
    matrix(a: any, b: any, c: any, d: any, tx: any, ty: any): any
    /**
     * 同[transform-export function matrix3d](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d)
     */
    matrix3d(): any
}

export namespace pageScrollTo {
    export type Param = {
        /**
         * 滚动到页面的目标位置（单位px）
         */
        scrollTop: number
        /**
         * 滚动动画的时长，默认300ms，单位 ms
         */
        duration?: number

         /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }

    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => void

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}

/**
 * 
 *
 * 将页面滚动到目标位置。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.pageScrollTo({
 *       scrollTop: 0,
 *       duration: 300
 *     })
 *     ```
 * 
 */
export function pageScrollTo(OBJECT: pageScrollTo.Param): void

/**
 *
 * **定义：**
 *
 * 创建 canvas 绘图上下文（指定 canvasId）。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<canvas/>` 组件
 *
 * **Tip**: 需要指定 canvasId，该绘图上下文只作用于对应的 `<canvas/>`
 * 
 */
export function createCanvasContext(canvasId: string, componentInstance: any): CanvasContext

export namespace canvasToTempFilePath {
    export type Param0 = {
        /**
         * 画布x轴起点（默认0）
         *
         * 
         */
        x?: number
        /**
         * 画布y轴起点（默认0）
         *
         * 
         */
        y?: number
        /**
         * 画布宽度（默认为canvas宽度-x）
         *
         * 
         */
        width?: number
        /**
         * 画布高度（默认为canvas高度-y）
         *
         * 
         */
        height?: number
        /**
         * 输出图片宽度（默认为 width * 屏幕像素密度）
         *
         * 
         */
        destWidth?: number
        /**
         * 输出图片高度（默认为 height * 屏幕像素密度）
         *
         * 
         */
        destHeight?: number
        /**
         * 画布标识，传入 `<canvas/>`的 canvas-id
         */
        canvasId: string
        /**
         * 目标文件的类型，只支持 'jpg' 或 'png'。默认为 'png'
         *
         * 
         */
        fileType?: string
        /**
         * 图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理
         *
         * 
         */
        quality?: number
        /**
         * 接口调用成功的回调函数
         */
        success?: Param0PropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: Param0PropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Param0PropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type Param0PropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type Param0PropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type Param0PropComplete = () => any
}
/**
 * 把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<canvas/>` 组件
 *
 * **Bug & Tip：**
 *
 * 1.  `tip`: 在 `draw` 回调里调用该方法才能保证图片导出成功。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.canvasToTempFilePath({
 *       x: 100,
 *       y: 200,
 *       width: 50,
 *       height: 50,
 *       destWidth: 100,
 *       destHeight: 100,
 *       canvasId: 'myCanvas',
 *       success: function(res) {
 *         console.log(res.tempFilePath)
 *       } 
 *     })
 *     ```
 * 
 */
export function canvasToTempFilePath(OBJECT: canvasToTempFilePath.Param0, instance?: any): void

export namespace canvasGetImageData {
    export type Param0 = {
        /**
         * 画布标识，传入 `<canvas />`的 canvas-id
         */
        canvasId: string
        /**
         * 将要被提取的图像数据矩形区域的左上角 x 坐标
         */
        x: number
        /**
         * 将要被提取的图像数据矩形区域的左上角 y 坐标
         */
        y: number
        /**
         * 将要被提取的图像数据矩形区域的宽度
         */
        width: number
        /**
         * 将要被提取的图像数据矩形区域的高度
         */
        height: number
        /**
         * 接口调用成功的回调函数
         */
        success?: Param0PropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: Param0PropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Param0PropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type Param0PropSuccess = (res: Param0PropSuccessParam) => any
    export type Param0PropSuccessParam = {
        /**
         * 图像数据矩形的宽度
         */
        width: number
        /**
         * 图像数据矩形的高度
         */
        height: number
        /**
         * 图像像素点数据，一维数组，每四项表示一个像素点的rgba
         */
        data: Uint8ClampedArray
    }
    /**
     * 接口调用失败的回调函数
     */
    export type Param0PropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type Param0PropComplete = () => any
}
/**
 * 
 *
 * 返回一个数组，用来描述 canvas 区域隐含的像素数据。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<canvas/>` 组件
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.canvasGetImageData({
 *       canvasId: 'myCanvas',
 *       x: 0,
 *       y: 0,
 *       width: 100,
 *       height: 100,
 *       success(res) {
 *         console.log(res.width) // 100
 *         console.log(res.height) // 100
 *         console.log(res.data instanceof Uint8ClampedArray) // true
 *         console.log(res.data.length) // 100 * 100 * 4
 *       }
 *     })
 *     ```
 * 
 */
export function canvasGetImageData(OBJECT: canvasGetImageData.Param0, instance?: any): void

export namespace canvasPutImageData {
    export type Param0 = {
        /**
         * 画布标识，传入 `<canvas />`的 canvas-id
         */
        canvasId: string
        /**
         * 图像像素点数据，一维数组，每四项表示一个像素点的rgba
         */
        data: Uint8ClampedArray
        /**
         * 源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）
         */
        x: number
        /**
         * 源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）
         */
        y: number
        /**
         * 源图像数据矩形区域的宽度
         */
        width: number
        /**
         * 源图像数据矩形区域的高度
         */
        height?: number
        /**
         * 接口调用成功的回调函数
         */
        success?: Param0PropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: Param0PropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Param0PropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type Param0PropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type Param0PropFail = (err: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type Param0PropComplete = () => void
}
/**
 * 
 *
 * 将像素数据绘制到画布的方法。在自定义组件下，第二个参数传入组件实例this，以操作组件内 `<canvas/>` 组件
 *
 * **示例代码：**
 *
 *     ```javascript
 *     const data = new Uint8ClampedArray([255, 0, 0, 1])
 *     swan.canvasPutImageData({
 *       canvasId: 'myCanvas',
 *       x: 0,
 *       y: 0,
 *       width: 1,
 *       data: data,
 *       success(res) {}
 *     })
 *     ```
 * 
 */
export function canvasPutImageData(OBJECT: canvasPutImageData.Param0, instance?: any): void

export namespace startPullDownRefresh {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 接口调用结果
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.startPullDownRefresh()
 *     ```
 * 
 */
export function startPullDownRefresh(OBJECT: startPullDownRefresh.Param): void

/**
 * 停止当前页面下拉刷新。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     Page({
 *       onPullDownRefresh: function(){
 *         swan.stopPullDownRefresh()
 *       }
 *     })
 *     ```
 * 
 */
export function stopPullDownRefresh(): void

/**
 * 
 *
 * 返回一个SelectorQuery对象实例。可以在这个实例上使用`select`等方法选择节点，并使用`boundingClientRect`等方法选择需要查询的信息。
 *
 * **selectorQuery.in(component)：**
 *
 * 
 *
 * 将选择器的选取范围更改为自定义组件`component`内。（初始时，选择器仅选取页面范围的节点，不会选取任何自定义组件中的节点。）
 *
 * **selectorQuery.select(selector)：**
 *
 * 在当前页面下选择第一个匹配选择器`selector`的节点，返回一个`NodesRef`对象实例，可以用于获取节点信息。
 *
 * `selector`类似于CSS的选择器，但仅支持下列语法。
 *
 * *   ID选择器：`#the-id`
 * *   class选择器（可以连续指定多个）：`.a-class.another-class`
 * *   子元素选择器：`.the-parent > .the-child`
 * *   后代选择器：`.the-ancestor .the-descendant`
 * *   跨自定义组件的后代选择器：`.the-ancestor >>> .the-descendant`
 * *   多选择器的并集：`#a-node, .some-other-nodes`
 *
 * **selectorQuery.selectAll(selector)：**
 *
 * 在当前页面下选择匹配选择器`selector`的节点，返回一个`NodesRef`对象实例。 与`selectorQuery.selectNode(selector)`不同的是，它选择所有匹配选择器的节点。
 *
 * **selectorQuery.selectViewport()：**
 *
 * 选择显示区域，可用于获取显示区域的尺寸、滚动位置等信息，返回一个`NodesRef`对象实例。
 *
 * **nodesRef.boundingClientRect([callback])：**
 *
 * 添加节点的布局位置的查询请求，相对于显示区域，以像素为单位。其功能类似于DOM的getBoundingClientRect。返回值是nodesRef对应的selectorQuery。
 *
 * 返回的节点信息中，每个节点的位置用`left`、`right`、`top`、`bottom`、`width`、`height`字段描述。如果提供了callback回调函数，在执行selectQuery的exec方法后，节点信息会在callback中返回。
 *
 * **nodesRef.scrollOffset([callback])：**
 *
 * 添加节点的滚动位置查询请求，以像素为单位。节点必须是`scroll-view`或者viewport。返回值是nodesRef对应的selectorQuery。
 *
 * 返回的节点信息中，每个节点的滚动位置用`scrollLeft`、`scrollTop`字段描述。如果提供了callback回调函数，在执行selectQuery的exec方法后，节点信息会在callback中返回。
 *
 * **nodesRef.fields(fields, [callback])：**
 *
 * 获取节点的相关信息，需要获取的字段在`fields`中指定。返回值是nodesRef对应的selectorQuery。可指定获取的字段包括：
 *
 * > 注意： computedStyle 的优先级高于 size，当同时在 computedStyle 里指定了 width/height 和传入了 size: true，则优先返回 computedStyle 获取到的 width/height。
 *
 * **selectorQuery.exec([callback])：**
 *
 * 执行所有的请求，请求结果按请求次序构成数组，在callback的第一个参数中返回。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     Page({
 *       queryMultipleNodes: function(){
 *         var query = swan.createSelectorQuery()
 *         query.select('#the-id').boundingClientRect()
 *         query.selectViewport().scrollOffset()
 *         query.exec(function(res){
 *           res[0].top       // #the-id节点的上边界坐标
 *           res[1].scrollTop // 显示区域的竖直滚动位置
 *         })
 *       }
 *     })
 *     ```
 *
 * **示例代码：**
 *
 *     ```javascript
 *     Component({
 *       queryMultipleNodes: function(){
 *         var query = swan.createSelectorQuery().in(this)
 *         query.select('#the-id').boundingClientRect(function(res){
 *           res.top // 这个组件内 #the-id 节点的上边界坐标
 *         }).exec()
 *       }
 *     })
 *     ```
 *
 * **示例代码：**
 *
 *     ```javascript
 *     Page({
 *       getRect: function(){
 *         swan.createSelectorQuery().select('#the-id').boundingClientRect(function(rect){
 *           rect.id      // 节点的ID
 *           rect.dataset // 节点的dataset
 *           rect.left    // 节点的左边界坐标
 *           rect.right   // 节点的右边界坐标
 *           rect.top     // 节点的上边界坐标
 *           rect.bottom  // 节点的下边界坐标
 *           rect.width   // 节点的宽度
 *           rect.height  // 节点的高度
 *         }).exec()
 *       },
 *       getAllRects: function(){
 *         swan.createSelectorQuery().selectAll('.a-class').boundingClientRect(function(rects){
 *           rects.forEach(function(rect){
 *             rect.id      // 节点的ID
 *             rect.dataset // 节点的dataset
 *             rect.left    // 节点的左边界坐标
 *             rect.right   // 节点的右边界坐标
 *             rect.top     // 节点的上边界坐标
 *             rect.bottom  // 节点的下边界坐标
 *             rect.width   // 节点的宽度
 *             rect.height  // 节点的高度
 *           })
 *         }).exec()
 *       }
 *     })
 *     ```
 *
 * **示例代码：**
 *
 *     ```javascript
 *     Page({
 *       getScrollOffset: function(){
 *         swan.createSelectorQuery().selectViewport().scrollOffset(function(res){
 *           res.id      // 节点的ID
 *           res.dataset // 节点的dataset
 *           res.scrollLeft // 节点的水平滚动位置
 *           res.scrollTop  // 节点的竖直滚动位置
 *         }).exec()
 *       }
 *     })
 *     ```
 *
 * **示例代码：**
 *
 *     ```javascript
 *     Page({
 *       getFields: function(){
 *         swan.createSelectorQuery().select('#the-id').fields({
 *           dataset: true,
 *           size: true,
 *           scrollOffset: true,
 *           properties: ['scrollX', 'scrollY'],
 *           computedStyle: ['margin', 'backgroundColor']
 *         }, function(res){
 *           res.dataset    // 节点的dataset
 *           res.width      // 节点的宽度
 *           res.height     // 节点的高度
 *           res.scrollLeft // 节点的水平滚动位置
 *           res.scrollTop  // 节点的竖直滚动位置
 *           res.scrollX    // 节点 scroll-x 属性的当前值
 *           res.scrollY    // 节点 scroll-y 属性的当前值
 *           // 此处返回指定要返回的样式名
 *           res.margin
 *           res.backgroundColor
 *         }).exec()
 *       }
 *     })
 *     ```
 */
export function createSelectorQuery(): SelectorQuery

export class  SelectorQuery {
    /**
     * 参考下面详细介绍
     */
    in(component: any): any
    /**
     * 参考下面详细介绍
     */
    select(selector: any): any
    /**
     * 参考下面详细介绍
     */
    selectAll(selector: any): any
    /**
     * 参考下面详细介绍
     */
    selectViewport(): any
    /**
     * 参考下面详细介绍
     */
    exec(callback?: any): any
}
export namespace getExtConfig {
    export type Param = {
        /**
         * 返回第三方平台自定义的数据
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 返回第三方平台自定义的数据
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 调用结果
         */
        errMsg: string
        /**
         * 第三方平台自定义的数据
         */
        extConfig: any
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 获取第三方平台自定义的数据字段。
 *
 * **Bug & Tip：**
 *
 * 1.  `swan.getExtConfig` 暂时无法通过 `swan.canIUse` 判断是否兼容，开发者需要自行判断 `swan.getExtConfig` 是否存在来兼容
 *
 * **示例代码：**
 *
 *     ```javascript
 *     if(swan.getExtConfig) {
 *       swan.getExtConfig({
 *         success: export function (res) {
 *           console.log(res.extConfig)
 *         }
 *       })
 *     }
 *     ```
 * 
 */
export function getExtConfig(OBJECT: getExtConfig.Param): void

export namespace getExtConfigSync {
    export type Return = {
        /**
         * 第三方平台自定义的数据
         */
        extConfig: any
    }
}
/**
 * 
 *
 * 获取第三方平台自定义的数据字段的同步接口。
 *
 * **Bug & Tip：**
 *
 * 1.  `swan.getExtConfigSync` 暂时无法通过 `swan.canIUse` 判断是否兼容，开发者需要自行判断 `swan.getExtConfigSync` 是否存在来兼容
 *
 * **示例代码：**
 *
 *     ```javascript
 *     let extConfig = swan.getExtConfigSync? swan.getExtConfigSync(): {}
 *     console.log(extConfig)
 *     ```
 * 
 */
export function getExtConfigSync(): getExtConfigSync.Return

export namespace login {
    export type Param = {
        /**
         * 超时时间，单位 ms
         *
         * 
         */
        timeout?: number
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 调用结果
         */
        errMsg: string
        /**
         * 用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 api，使用 code 换取 openid 和 session_key 等信息
         */
        code: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 调用接口swan.login() 获取**临时登录凭证（code）**
 *
 * **示例代码：**
 *
 *     ```javascript
 *     //app.js
 *     App({
 *       onLaunch: function() {
 *         swan.login({
 *           success: function(res) {
 *             if (res.code) {
 *               //发起网络请求
 *               swan.request({
 *                 url: 'https://test.com/onLogin',
 *                 data: {
 *                   code: res.code
 *                 }
 *               })
 *             } else {
 *               console.log('登录失败！' + res.errMsg)
 *             }
 *           }
 *         });
 *       }
 *     })
 *     ```
 * 
 */
export function login(OBJECT: login.Param): void

export namespace checkSession {
    export type Param = {
        /**
         * 接口调用成功的回调函数，session_key未过期
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数，session_key已过期
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数，session_key未过期
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数，session_key已过期
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 校验用户当前session_key是否有效。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.checkSession({
 *       success: function(){
 *         //session_key 未过期，并且在本生命周期一直有效
 *       },
 *       fail: function(){
 *         // session_key 已经失效，需要重新执行登录流程
 *         swan.login() //重新登录
 *         ....
 *       }
 *     })
 *     ```
 * 
 */
export function checkSession(OBJECT: checkSession.Param): void

export namespace authorize {
    export type Param = {
        /**
         * 需要获取权限的scope
         */
        scope: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 调用结果
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     // 可以通过 swan.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
 *     swan.getSetting({
 *         success(res) {
 *             if (!res.authSetting['scope.record']) {
 *                 swan.authorize({
 *                     scope: 'scope.record',
 *                     success() {
 *                         // 用户已经同意小程序使用录音功能，后续调用 swan.startRecord 接口不会弹窗询问
 *                         swan.startRecord()
 *                     }
 *                 })
 *             }
 *         }
 *     })
 *     ```
 * 
 */
export function authorize(OBJECT: authorize.Param): void

export namespace getUserInfo {
    export type Param = {
        /**
         * 是否带上登录态信息
         *
         * 
         */
        withCredentials?: boolean
        /**
         * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。默认为en。
         *
         * 
         */
        lang?: string
        /**
         * 超时时间，单位 ms
         *
         * 
         */
        timeout?: number
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 用户信息对象，不包含 openid 等敏感信息
         */
        userInfo: ParamPropSuccessParamPropUserInfo
        /**
         * 不包括敏感信息的原始数据字符串，用于计算签名。
         */
        rawData: string
        /**
         * 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息
         */
        signature: string
        /**
         * 包括敏感数据在内的完整用户信息的加密数据
         */
        encryptedData: string
        /**
         * 加密算法的初始向量
         */
        iv: string
    }
    /**
     * 用户信息对象，不包含 openid 等敏感信息
     */
    export type ParamPropSuccessParamPropUserInfo = {
        /**
         * 用户昵称
         */
        nickName: string
        /**
         * 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表132*132正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
         */
        avatarUrl: string
        /**
         * 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
         */
        gender: string
        /**
         * 用户所在城市
         */
        city: string
        /**
         * 用户所在省份
         */
        province: string
        /**
         * 用户所在国家
         */
        country: string
        /**
         * 用户的语言，简体中文为zh_CN
         */
        language: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * **注意：此接口有调整，使用该接口将不再出现授权弹窗，请使用 <button open-export type="getUserInfo"></button>引导用户主动进行授权操作**
 *
 * 1.  当用户未授权过，调用该接口将直接报错
 * 2.  当用户授权过，可以使用该接口获取用户信息
 *
 * **示例代码：**
 *
 *     ```html
 *     <!--swan-->
 *     <!-- 如果只是展示用户头像昵称，可以使用 <open-data /> 组件 -->
 *     <open-data export type="userAvatarUrl"></open-data>
 *     <open-data export type="userNickName"></open-data>
 *     <!-- 需要使用 button 来授权登录 -->
 *     <button s-if="{{canIUse}}" open-export type="getUserInfo" bindgetuserinfo="bindGetUserInfo">授权登录</button>
 *     <view s-else>请升级手百版本</view>
 *     ```
 *
 * **示例代码：**
 *
 *     ```javascript
 *     //js
 *     Page({
 *       data: {
 *         canIUse: swan.canIUse('button.open-export type.getUserInfo')
 *       },
 *       onLoad: function() {
 *         // 查看是否授权
 *         swan.getSetting({
 *           success: function(res){
 *             if (res.authSetting['scope.userInfo']) {
 *               // 已经授权，可以直接调用 getUserInfo 获取头像昵称
 *               swan.getUserInfo({
 *                 success: function(res) {
 *                   console(res.userInfo)
 *                 }
 *               })
 *             }
 *           }
 *         })
 *       },
 *       bindGetUserInfo: function(e) {
 *         console.log(e.detail.userInfo)
 *       }
 *     })
 *     ```
 *
 * **示例代码：**
 *
 *     ```json
 *     {
 *         "openId": "OPENID",
 *         "nickName": "NICKNAME",
 *         "gender": GENDER,
 *         "city": "CITY",
 *         "province": "PROVINCE",
 *         "country": "COUNTRY",
 *         "avatarUrl": "AVATARURL",
 *         "unionId": "UNIONID",
 *         "watermark":
 *         {
 *             "appid":"APPID",
 *         "timestamp":TIMESTAMP
 *         }
 *     }
 *     ```
 * 
 */
export function getUserInfo(OBJECT: getUserInfo.Param): void

export namespace requestPayment {
    export type Param = {
        /**
         * 时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
         */
        timeStamp: string
        /**
         * 随机字符串，长度为32个字符以下。
         */
        nonceStr: string
        /**
         * 统一下单接口返回的 prepay\_id 参数值，提交格式如：prepay\_id=_*_
         */
        package: string
        /**
         * 签名算法，暂支持 MD5
         */
        signType: string
        /**
         * 签名
         */
        paySign: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 发起支付。
 *
 * **回调结果：**
 *
 *   回调类型  |  errMsg                                 |  说明                                    
 * ------------|-----------------------------------------|------------------------------------------
 *   success   |  requestPayment:ok                      |  调用支付成功                            
 *   fail      |  requestPayment:fail cancel             |  用户取消支付                            
 *   fail      |  requestPayment:fail (detail message)   |调用支付失败，其中 detail message 为后台返回的详细失败原因
 *
 * **Bug & Tip：**
 *
 * 1.  `bug`: 6.5.2 及之前版本中，用户取消支付不会触发 fail 回调，只会触发 complete 回调，回调 errMsg 为 'requestPayment:cancel'
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.requestPayment({
 *        'timeStamp': '',
 *        'nonceStr': '',
 *        'package': '',
 *        'signType': 'MD5',
 *        'paySign': '',
 *        'success':function(res){
 *        },
 *        'fail':function(res){
 *        }
 *     })
 *     ```
 * 
 */
export function requestPayment(OBJECT: requestPayment.Param): void

export namespace showShareMenu {
    export type Param = {
        /**
         * 是否使用带 shareTicket 的转发
         */
        withShareTicket?: boolean
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 显示当前页面的转发按钮
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.showShareMenu({
 *       withShareTicket: true
 *     })
 *     ```
 * 
 */
export function showShareMenu(OBJECT: showShareMenu.Param): void

export namespace hideShareMenu {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 隐藏转发按钮
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.hideShareMenu()
 *     ```
 * 
 */
export function hideShareMenu(OBJECT: hideShareMenu.Param): void

export namespace updateShareMenu {
    export type Param = {
        /**
         * 是否使用带 shareTicket 的转发
         */
        withShareTicket?: boolean
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 更新转发属性
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.updateShareMenu({
 *       withShareTicket: true,
 *       success() {
 *       }
 *     })
 *     ```
 * 
 */
export function updateShareMenu(OBJECT: updateShareMenu.Param): void

export namespace getShareInfo {
    export type Param = {
        /**
         * shareTicket
         */
        shareTicket: string
        /**
         * 超时时间，单位 ms
         *
         * 
         */
        timeout?: number
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 错误信息
         */
        errMsg: string
        /**
         * 包括敏感数据在内的完整转发信息的加密数据
         *
         * **encryptedData 解密后为一个 JSON 结构，包含字段如下：**
         *
         *   字段      |  说明            
         * ------------|------------------
         *   openGId   |群对当前小程序的唯一 ID
         *
         * **Tip:** 如需要展示群名称，可以使用开放数据组件
         */
        encryptedData: string
        /**
         * 加密算法的初始向量
         */
        iv: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 获取转发详细信息
 * 
 */
export function getShareInfo(OBJECT: getShareInfo.Param): void

export namespace chooseAddress {
    export type Param = {
        /**
         * 返回用户选择的收货地址信息
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 返回用户选择的收货地址信息
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 调用结果
         */
        errMsg: string
        /**
         * 收货人姓名
         */
        userName: string
        /**
         * 邮编
         */
        postalCode: string
        /**
         * 国标收货地址第一级地址
         */
        provinceName: string
        /**
         * 国标收货地址第二级地址
         */
        cityName: string
        /**
         * 国标收货地址第三级地址
         */
        countyName: string
        /**
         * 详细收货地址信息
         */
        detailInfo: string
        /**
         * 收货地址国家码
         */
        nationalCode: string
        /**
         * 收货人手机号码
         */
        telNumber: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。
 *
 * 需要用户授权scope.address
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.chooseAddress({
 *       success: export function (res) {
 *         console.log(res.userName)
 *         console.log(res.postalCode)
 *         console.log(res.provinceName)
 *         console.log(res.cityName)
 *         console.log(res.countyName)
 *         console.log(res.detailInfo)
 *         console.log(res.nationalCode)
 *         console.log(res.telNumber)
 *       }
 *     })
 *     ```
 * 
 */
export function chooseAddress(OBJECT: chooseAddress.Param): void

export namespace addCard {
    export type Param = {
        /**
         * 需要添加的卡券列表，列表内对象说明请参见[请求对象说明](#请求对象说明)
         */
        cardList: ParamPropCardList
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 需要添加的卡券列表，列表内对象说明请参见[请求对象说明](#请求对象说明)
     */
    export type ParamPropCardList = ParamPropCardListItem[]
    export type ParamPropCardListItem = {
        /**
         * 卡券 Id
         */
        cardId: string
        /**
         * 卡券的扩展参数
         *
         * **cardExt 说明：**
         *
         *   参数                   |  类型     |  必填 |是否参与签名|  说明                                                                                                                       
         * -------------------------|-----------|-------|-----------|-----------------------------------------------------------------------------------------------------------------------------
         *   code                   |  String   |  否   |  是       |用户领取的 code，仅自定义 code 模式的卡券须填写，非自定义 code 模式卡券不可填写
         *   openid                 |  String   |  否   |  是       |  指定领取者的openid，只有该用户能领取。 bind_openid 字段为 true 的卡券必须填写，bind_openid 字段为 false 不可填写。         
         *   timestamp              |  Number   |  是   |  是       |  时间戳，东八区时间,UTC+8，单位为秒                                                                                         
         *   nonce_str              |  String   |  否   |  是       |随机字符串，由开发者设置传入，加强安全性（若不填写可能被重放请求）。随机字符串，不长于 32 位。推荐使用大小写字母和数字，不同添加请求的 nonce_str 须动态生成，若重复将会导致领取失败。
         *   fixed_begintimestamp   |  Number   |  否   |  否       |卡券在第三方系统的实际领取时间，为东八区时间戳（UTC+8,精确到秒）。当卡券的有效期类为 DATE_TYPE_FIX_TERM 时专用，标识卡券的实际生效时间，用于解决商户系统内起始时间和领取卡券时间不同步的问题。
         *   outer_str              |  String   |  否   |  否       |  领取渠道参数，用于标识本次领取的渠道值。                                                                                   
         *   signature              |  String   |  是   |  -        |签名，商户将接口列表中的参数按照指定方式进行签名,签名方式使用 SHA1
         *
         * **注：cardExt 需进行 JSON 序列化为字符串传入**
         */
        cardExt: string
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 卡券添加结果列表
         */
        cardList: ParamPropSuccessParamPropCardList
    }
    /**
     * 卡券添加结果列表
     */
    export type ParamPropSuccessParamPropCardList = ParamPropSuccessParamPropCardListItem[]
    export type ParamPropSuccessParamPropCardListItem = {
        /**
         * 加密 code，为用户领取到卡券的code加密后的字符串
         */
        code: string
        /**
         * 用户领取到卡券的Id
         */
        cardId: string
        /**
         * 用户领取到卡券的扩展参数，与调用时传入的参数相同
         */
        cardExt: string
        /**
         * 是否成功
         */
        isSuccess: boolean
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 批量添加卡券。
 *
 * **回调结果：**
 *
 *   回调类型  |  errMsg                          |  说明                                    
 * ------------|----------------------------------|------------------------------------------
 *   success   |  addCard:ok                      |  添加卡券成功                            
 *   fail      |  addCard:fail cancel             |  用户取消添加卡券                        
 *   fail      |  addCard:fail (detail message)   |添加卡券失败，其中 detail message 为后台返回的详细失败原因
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.addCard({
 *       cardList: [
 *         {
 *           cardId: '',
 *           cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
 *         }, {
 *           cardId: '',
 *           cardExt: '{"code": "", "openid": "", "timestamp": "", "signature":""}'
 *         }
 *       ],
 *       success: function(res) {
 *         console.log(res.cardList) // 卡券添加结果
 *       }
 *     })
 *     ```
 * 
 */
export function addCard(OBJECT: addCard.Param): void

export namespace openCard {
    export type Param = {
        /**
         * 需要打开的卡券列表
         */
        cardList: ParamPropCardList
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 需要打开的卡券列表
     */
    export type ParamPropCardList = ParamPropCardListItem[]
    export type ParamPropCardListItem = {
        /**
         * 需要打开的卡券 Id
         */
        cardId: string
        /**
         * 由 addCard 的返回对象中的加密 code 通过解密后得到
         */
        code: string
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 查看卡包中的卡券。
 *
 * **Tip：**
 *
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.openCard({
 *       cardList: [
 *         {
 *           cardId: '',
 *           code: ''
 *         }, {
 *           cardId: '',
 *           code: ''
 *         }
 *       ],
 *       success: function(res) {
 *       }
 *     })
 *     ```
 * 
 */
export function openCard(OBJECT: openCard.Param): void

export namespace openSetting {
    export type Param = {
        /**
         * 接口调用成功的回调函数，返回内容详见返回参数说明。
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数，返回内容详见返回参数说明。
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 用户授权结果，其中 key 为 scope 值，value 为 Bool 值，表示用户是否允许授权
         */
        authSetting: any
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 * > 
 * > 此接口即将废弃，请使用<button>组件来使用此功能
 *
 * 调起客户端小程序设置界面，返回用户设置的操作结果。
 *
 * 注：设置界面只会出现小程序已经向用户请求过的权限。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.openSetting({
 *       success: (res) => {
 *
 *          // res.authSetting = {
 *          //   "scope.userInfo": true,
 *          //   "scope.userLocation": true
 *          // }
 *
 *       }
 *     })
 *     ```
 * 
 */
export function openSetting(OBJECT: openSetting.Param): void

export namespace getSetting {
    export type Param = {
        /**
         * 接口调用成功的回调函数，返回内容详见返回参数说明。
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数，返回内容详见返回参数说明。
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 用户授权结果，其中 key 为 scope 值，value 为 Bool 值，表示用户是否允许授权
         */
        authSetting: any
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 获取用户的当前设置。
 *
 * 注：返回值中只会出现小程序已经向用户请求过的权限。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getSetting({
 *       success: (res) => {
 *
 *          // res.authSetting = {
 *          //   "scope.userInfo": true,
 *          //   "scope.userLocation": true
 *          // }
 *
 *       }
 *     })
 *     ```
 * 
 */
export function getSetting(OBJECT: getSetting.Param): void

export namespace getWeRunData {
    export type Param = {
        /**
         * 超时时间，单位 ms
         *
         * 
         */
        timeout?: number
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 调用结果
         */
        errMsg: string
        /**
         * 包括敏感数据在内的完整用户信息的加密数据
         *
         * **encryptedData：**
         *
         * encryptedData 解密后为以下 json 结构
         *
         *   属性                       |  类型          |  说明             
         * -----------------------------|----------------|-------------------
         *   stepInfoList               |  ObjectArray   |用户过去三十天的运动步数
         *   stepInfoList[].timestamp   |  Number        |时间戳，表示数据对应的时间
         *   stepInfoList[].step        |  Number        |  运动步数     
         */
        encryptedData: string
        /**
         * 加密算法的初始向量
         */
        iv: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 获取用户过去三十天运动步数，需要先调用 swan.login接口。
 *
 * 需要用户授权scope.werun
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.getWeRunData({
 *         success(res) {
 *             const encryptedData = res.encryptedData
 *         }
 *     })
 *     ```
 * 
 */
export function getWeRunData(OBJECT: getWeRunData.Param): void

export namespace navigateToMiniProgram {
    export type Param = {
        /**
         * 要打开的小程序 appId
         */
        appId: string
        /**
         * 打开的页面路径，如果为空则打开首页
         */
        path?: string
        /**
         * 需要传递给目标小程序的数据，目标小程序可在 `App.onLaunch()`，`App.onShow()` 中获取到这份数据
         */
        extraData?: any
        /**
         * 要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版） ，仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是正式版，则打开的小程序必定是正式版。默认值 release
         */
        envVersion?: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 调用结果
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 * > 
 * > 此接口即将废弃，请使用 <navigator>组件来使用此功能
 *
 * 打开同一公众号下关联的另一个小程序。**（注：必须是同一公众号下，而非同个 open 账号下）**
 *
 * **Bug & Tip：**
 *
 * 1.  `tip`: 在开发者工具上调用此 API 并不会真实的跳转到另外的小程序，但是开发者工具会校验本次调用跳转是否成功
 * 2.  `tip`: 开发者工具上支持被跳转的小程序处理接收参数的调试
 * 3.  `tip`: 只有同一公众号下的关联的小程序之间才可相互跳转 
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.navigateToMiniProgram({
 *       appId: '',
 *       path: 'pages/index/index?id=123',
 *       extraData: {
 *         foo: 'bar'
 *       },
 *       envVersion: 'develop',
 *       success(res) {
 *         // 打开成功
 *       }
 *     })
 *     ```
 * 
 */
export function navigateToMiniProgram(OBJECT: navigateToMiniProgram.Param): void

export namespace navigateBackMiniProgram {
    export type Param = {
        /**
         * 需要返回给上一个小程序的数据，上一个小程序可在 `App.onShow()` 中获取到这份数据
         */
        extraData?: any
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 调用结果
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 * > 
 * > iOS 客户端 6.5.9 版本开始支持，Android 客户端即将在 6.5.10 版本开始支持，请先使用 iOS 客户端进行调试
 *
 * 返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.navigateBackMiniProgram({
 *       extraData: {
 *         foo: 'bar'
 *       },
 *       success(res) {
 *         // 返回成功
 *       }
 *     })
 *     ```
 * 
 */
export function navigateBackMiniProgram(OBJECT: navigateBackMiniProgram.Param): void

export namespace chooseInvoiceTitle {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 抬头类型（0：单位，1：个人）
         */
        type: string
        /**
         * 抬头名称
         */
        title: string
        /**
         * 抬头税号
         */
        taxNumber: string
        /**
         * 单位地址
         */
        companyAddress: string
        /**
         * 手机号码
         */
        telephone: string
        /**
         * 银行名称
         */
        bankName: string
        /**
         * 银行账号
         */
        bankAccount: string
        /**
         * 接口调用结果
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 选择用户的发票抬头。
 *
 * 需要用户授权scope.invoiceTitle
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.chooseInvoiceTitle({
 *       success(res) {
 *       }
 *     })
 *     ```
 * 
 */
export function chooseInvoiceTitle(OBJECT: chooseInvoiceTitle.Param): void

export namespace checkIsSupportSoterAuthentication {
    export type Param = {
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 该设备支持的可被SOTER识别的生物识别方式
         *
         * **supportMode 有效值：**
         *
         *   值            |  说明         
         * ----------------|---------------
         *   fingerPrint   |  指纹识别     
         *   facial        |人脸识别（暂未支持）
         *   speech        |声纹识别（暂未支持）
         */
        supportMode: string[]
        /**
         * 接口调用结果
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 获取本机支持的 SOTER 生物认证方式
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.checkIsSupportSoterAuthentication({
 *         success(res) {
 *             // res.supportMode = [] 不具备任何被SOTER支持的生物识别方式
 *             // res.supportMode = ['fingerPrint'] 只支持指纹识别
 *             // res.supportMode = ['fingerPrint', 'facial'] 支持指纹识别和人脸识别
 *         }
 *     })
 *     ```
 * 
 */
export function checkIsSupportSoterAuthentication(OBJECT: checkIsSupportSoterAuthentication.Param): void

export namespace startSoterAuthentication {
    export type Param = {
        /**
         * 请求使用的可接受的生物认证方式
         */
        requestAuthModes: string[]
        /**
         * 挑战因子。挑战因子为调用者为此次生物鉴权准备的用于签名的字符串关键识别信息，将作为result_json的一部分，供调用者识别本次请求。例如：如果场景为请求用户对某订单进行授权确认，则可以将订单号填入此参数。
         */
        challenge: string
        /**
         * 验证描述，即识别过程中显示在界面上的对话框提示内容
         */
        authContent?: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 错误码
         */
        errCode: number
        /**
         * 生物认证方式
         */
        authMode: string
        /**
         * 在设备安全区域（TEE）内获得的本机安全信息（如TEE名称版本号等以及防重放参数）以及本次认证信息（仅Android支持，本次认证的指纹ID）（仅Android支持，本次认证的指纹ID）
         *
         * **resultJSON 说明：**
         *
         * 此数据为设备TEE中，将传入的challenge和TEE内其他安全信息组成的数据进行组装而来的JSON，对下述字段的解释如表2。例子如下：
         *
         *   字段名    |  说明                                               
         * ------------|-----------------------------------------------------
         *   raw       |  调用者传入的challenge                              
         *   fid       |（仅Android支持）本次生物识别认证的生物信息编号（如指纹识别则是指纹信息在本设备内部编号）
         *   counter   |  防重放特征参数                                     
         *   tee_n     |  TEE名称（如高通或者trustonic等）                   
         *   tee_v     |  TEE版本号                                          
         *   fp_n      |  指纹以及相关逻辑模块提供商（如FPC等）              
         *   fp_v      |  指纹以及相关模块版本号                             
         *   cpu_id    |  机器唯一识别ID                                     
         *   uid       |  概念同Android系统定义uid，即应用程序编号           
         */
        resultJSON: string
        /**
         * 用SOTER安全密钥对result_json的签名(SHA256withRSA/PSS, saltlen=20)
         */
        resultJSONSignature: string
        /**
         * 接口调用结果
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 开始 SOTER 生物认证
 *
 * **生物识别方式定义：**
 *
 *   mode          |  说明         
 * ----------------|---------------
 *   fingerPrint   |  指纹识别     
 *   facial        |人脸识别（暂未支持）
 *   speech        |声纹识别（暂未支持）
 *
 * **resultJSON 说明：**
 *
 *     ```json
 *     {
 *         "raw":"msg",
 *         "fid":"2",
 *         "counter":123,
 *         "tee_n":"TEE Name",
 *         "tee_v":"TEE Version",
 *         "fp_n":"Fingerprint Sensor Name",
 *         "fp_v":"Fingerprint Sensor Version",
 *         "cpu_id":"CPU Id",
 *         "uid":"21"
 *     }
 *     ```
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.startSoterAuthentication({
 *       requestAuthModes: ['fingerPrint'],
 *       challenge: '123456',
 *       authContent: '请用指纹解锁',
 *       success(res) {
 *       }
 *     })
 *     ```
 * 
 */
export function startSoterAuthentication(OBJECT: startSoterAuthentication.Param): void

export namespace checkIsSoterEnrolledInDevice {
    export type Param = {
        /**
         * 认证方式
         *
         * **checkAuthMode 有效值：**
         *
         *   值            |  说明         
         * ----------------|---------------
         *   fingerPrint   |  指纹识别     
         *   facial        |人脸识别（暂未支持）
         *   speech        |声纹识别（暂未支持）
         */
        checkAuthMode: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 是否已录入信息
         */
        isEnrolled: boolean
        /**
         * 接口调用结果
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 获取设备内是否录入如指纹等生物信息的接口
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.checkIsSoterEnrolledInDevice({
 *         checkAuthMode: 'fingerPrint',
 *         success(res) {
 *             console.log(res.isEnrolled)
 *         }
 *     })
 *     ```
 * 
 */
export function checkIsSoterEnrolledInDevice(OBJECT: checkIsSoterEnrolledInDevice.Param): void

/**
 * 自定义分析数据上报接口。使用前，需要在小程序管理后台自定义分析中新建事件，配置好事件名与字段。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.reportAnalytics('purchase', {
 *       price: 120,
 *       color: 'red'
 *     })
 *     ```
 * 
 */
export function reportAnalytics(eventName: string, data: any): void

/**
 * 
 *
 * 获取**全局唯一**的版本更新管理器，用于管理小程序更新。
 *
 *
 * **Tips：**
 *
 * 1.  开发者工具上可以通过「编译模式」下的「下次编译模拟更新」开关来调试
 * 2.  小程序开发版/体验版没有「版本」概念，所以无法在开发版/体验版上测试更版本更新情况
 *
 * **示例代码：**
 *
 *     ```javascript
 *     const updateManager = swan.getUpdateManager()
 *
 *     updateManager.onCheckForUpdate(export function (res) {
 *       // 请求完新版本信息的回调
 *       console.log(res.hasUpdate)
 *     })
 *
 *     updateManager.onUpdateReady(export function () {
 *       swan.showModal({
 *         title: '更新提示',
 *         content: '新版本已经准备好，是否重启应用？',
 *         success: export function (res) {
 *           if (res.confirm) {
 *             // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
 *             updateManager.applyUpdate()
 *           }
 *         }
 *       })
 *
 *     })
 *
 *     updateManager.onUpdateFailed(export function () {
 *       // 新的版本下载失败
 *     })
 *     ```
 * 
 */
export function getUpdateManager(): UpdateManager

export namespace UpdateManager {
    export namespace onCheckForUpdate {
        export type Param = (res: ParamParam) => any
        export type ParamParam = {
            /**
             * 是否有新的版本
             */
            hasUpdate: boolean
        }
    }
}
export class  UpdateManager {
    /**
     * 当向后台请求完新版本信息，会进行回调
     *
     * **注：** 检查更新操作由手百在小程序冷启动时自动触发，不需由开发者主动触发，开发者只需监听检查结果即可。
     */
    onCheckForUpdate(callback: UpdateManager.onCheckForUpdate.Param): any
    /**
     * 当新版本下载完成，会进行回调
     *
     * **onUpdateReady(callback) 回调结果说明：**
     *
     * 当手百检查到小程序有新版本，会主动触发下载操作（无需开发者触发），当下载完成后，会通过 `onUpdateReady` 告知开发者。
     */
    onUpdateReady(callback: any): any
    /**
     * 当新版本下载失败，会进行回调
     *
     * **onUpdateFailed(callback) 回调结果说明：**
     *
     * 当手百检查到小程序有新版本，会主动触发下载操作（无需开发者触发），如果下载失败（可能是网络原因等），会通过 `onUpdateFailed` 告知开发者。
     */
    onUpdateFailed(callback: any): any
    /**
     * 当新版本下载完成，调用该方法会强制当前小程序应用上新版本并重启
     *
     * **applyUpdate() 说明：**
     *
     * 当小程序新版本已经下载时（即收到 `onUpdateReady` 回调），可以通过这个方法强制重启小程序并应用上最新版本。
     */
    applyUpdate(): any
}
/**
 * 
 *
 *
 * 创建一个 Worker 线程，并返回 Worker 实例，目前限制最多只能创建一个 Worker，创建下一个 Worker 前请调用 Worker.terminate。
 *
 * `scriptPath` 为 worker 的入口文件路径，需填写绝对路径。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     const worker = swan.createWorker('workers/request/index.js') // 文件名指定 worker 的入口文件路径，绝对路径
 *
 *     worker.onMessage(export function (res) {
 *       console.log(res)
 *     })
 *
 *     worker.postMessage({
 *       msg: 'hello worker'
 *     })
 *
 *     worker.terminate()
 *     ```
 * 
 */
export function createWorker(scriptPath: any): Worker

export namespace Worker {
    export namespace onMessage {
        export type Param = (res: ParamParam) => any
        export type ParamParam = {
            /**
             * Worker 线程向当前线程发送的消息
             */
            message: any
        }
    }
}
export class  Worker {
    /**
     * 向 Worker 线程发送的消息。
     *
     * **postMessage(message) 说明：**
     *
     * 向 Worker 线程发送消息，`message` 参数为需要发送的消息，必须是一个可序列化的 JavaScript 对象。
     */
    postMessage(Object: any): any
    /**
     * 监听 Worker 线程向当前线程发送的消息
     */
    onMessage(callback: Worker.onMessage.Param): any
    /**
     * 结束当前 Worker 线程，仅限在主线程 Worker 实例上调用。
     *
     * **terminate() 说明：**
     *
     * 结束当前 worker 线程，仅限在主线程 Worker 对象上调用。
     */
    terminate(): any
}
/**
 * 
 *
 * 自定义业务数据监控上报接口。使用前，需要在小程序管理后台-运维中心-性能监控-业务数据监控中新建监控事件，配置监控描述与告警类型。每一个监控事件对应唯一的监控ID，开发者最多可以创建128个监控事件。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     swan.reportMonitor('1', 1)
 *     ```
 * 
 */
export function reportMonitor(name: string, value: number): void

export namespace setEnableDebug {
    export type Param = {
        /**
         * 是否打开调试
         */
        enableDebug: boolean
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 调用结果
         */
        errMsg: string
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}
/**
 * 
 *
 * 设置是否打开调试开关，此开关对正式版也能生效。
 *
 * **Tips：**
 *
 * 1.  `tip`: 在正式版打开调试还有一种方法，就是先在开发版或体验版打开调试，再切到正式版就能看到vConsole。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     // 打开调试
 *     swan.setEnableDebug({
 *         enableDebug: true
 *     })
 *
 *     // 关闭调试
 *     swan.setEnableDebug({
 *         enableDebug: false
 *     })
 *     ```
 * 
 */
export function setEnableDebug(OBJECT: setEnableDebug.Param): void

/**
 * 
 *
 * 获取日志管理器 `logManager` 对象。logManager提供log、info、warn、debug四个方法写日志到文件，这四个方法接受任意个类型为Object/Array/Number/String的参数，每次调用的参数的总大小不超过100Kb。最多保存5M的日志内容，超过5M后，旧的日志内容会被删除。用户可以通过设置Button组件的`open-export type`为`feedback`来上传打印的日志。用户上传的日志可以通过登录小程序管理后台后进入左侧菜单“客服反馈”页面获取到。
 *
 * 基础库默认会把App、Page的生命周期函数和swan命名空间下的函数调用写入日志。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     const logger = swan.getLogManager()
 *     logger.log({str: 'hello world'}, 'basic log', 100, [1, 2, 3])
 *     logger.info({str: 'hello world'}, 'info log', 100, [1, 2, 3])
 *     logger.debug({str: 'hello world'}, 'debug log', 100, [1, 2, 3])
 *     logger.warn({str: 'hello world'}, 'warn log', 100, [1, 2, 3])
 *     ```
 * 
 */
// export function getLogManager(): LogManager

// export class  LogManager {
//   /**
//    * 写log日志，可以提供任意个参数，每个参数的类型为Object/Array/Number/String，参数p1到pN的内容会写入日志
//    */
//   log(p1 [: any, p2: any, ...: any, pN]: any): any
//   /**
//    * 写info日志，参数同log方法
//    */
//   info(p1 [: any, p2: any, ...: any, pN]: any): any
//   /**
//    * 写warn日志，参数同log方法
//    */
//   warn(p1 [: any, p2: any, ...: any, pN]: any): any
//   /**
//    * 写debug日志，参数同log方法
//    */
//   debug(p1 [: any, p2: any, ...: any, pN]: any): any
// }
export namespace CanvasContext {
    export namespace draw {
        export type Param1 = () => any
    }
}
export class  CanvasContext {
    /**
     *
     * **定义：**
     *
     * 设置填充色。
     *
     * **Tip**: 如果没有设置 `fillStyle`，默认颜色为 `black`。
     *
     * **参数：**
     *
     *   参数     |  类型                                                                               |  定义              
     * ----------|------------------------------------------------------------------------------------|--------------------
     *   color   |  Color                                                                             |  Gradient Object   
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.setFillStyle(color)
     *     canvasContext.fillStyle = color 
     *     ```
     *
     * **例子：**
     *
     *     ```js
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.setFillStyle('red')
     *     ctx.fillRect(10, 10, 150, 75)
     *     ctx.draw()
     *     ```
     */
    setFillStyle(color: string): void
    /**
     *
     * **定义：**
     *
     * 设置边框颜色。
     *
     * **Tip**: 如果没有设置 `fillStyle`，默认颜色为 `black`。
     *
     * **参数：**
     *
     *   参数    |  类型                                                                              |  定义              
     * ----------|------------------------------------------------------------------------------------|--------------------
     *   color   |  Color                                                                             |  Gradient Object   
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.setStrokeStyle(color)
     *     canvasContext.strokeStyle = color 
     *     ```
     *
     * **例子：**
     *
     *     ```js
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.setStrokeStyle('red')
     *     ctx.strokeRect(10, 10, 150, 75)
     *     ctx.draw()
     *     ```
     */
    setStrokeStyle(color: string): void
    /**
     *
     * **定义：**
     *
     * 设置阴影样式。
     *
     * **Tip**: 如果没有设置，offsetX 默认值为0， offsetY 默认值为0， blur 默认值为0，color 默认值为 `black`。
     *
     * **参数：**
     *
     *   参数      |  类型                                                                              |  范围    |  定义              
     * ------------|------------------------------------------------------------------------------------|----------|--------------------
     *   offsetX   |  Number                                                                            |          |阴影相对于形状在水平方向的偏移
     *   offsetY   |  Number                                                                            |          |阴影相对于形状在竖直方向的偏移
     *   blur      |  Number                                                                            |  0~100   |阴影的模糊级别，数值越大越模糊
     *   color     |  Color                                                                             |          |  阴影的颜色        
     *
     * **例子：**
     *
     *     ```js
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.setFillStyle('red')
     *     ctx.setShadow(10, 50, 50, 'blue')
     *     ctx.fillRect(10, 10, 150, 75)
     *     ctx.draw()
     *     ```
     */
    setShadow(offsetX: number, offsetY: number, blur: number, color: string): void
    /**
     *
     * **定义：**
     *
     * 设置阴影的模糊级别
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.shadowBlur = value
     *     ```
     */
    shadowBlur(): void
    /**
     *
     * **定义：**
     *
     * 设置阴影的颜色
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.shadowColor = value
     *     ```
     */
    shadowColor(): void
    /**
     *
     * **定义：**
     *
     * 设置阴影相对于形状在水平方向的偏移
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.shadowOffsetX = value
     *     ```
     */
    shadowOffsetX(): void
    /**
     *
     * **定义：**
     *
     * 设置阴影相对于形状在竖直方向的偏移
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.shadowOffsetY = value
     *     ```
     */
    shadowOffsetY(): void
    /**
     *
     * **定义：**
     *
     * 创建一个线性的渐变颜色。
     *
     * **Tip**: 需要使用 `addColorStop()` 来指定渐变点，至少要两个。
     *
     * **参数：**
     *
     *   参数 |  类型     |  定义     
     * -------|-----------|-----------
     *   x0   |  Number   |起点的x坐标
     *   y0   |  Number   |起点的y坐标
     *   x1   |  Number   |终点的x坐标
     *   y1   |  Number   |终点的y坐标
     *
     * **例子：**
     *
     *     ```js
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     // Create linear gradient
     *     const grd = ctx.createLinearGradient(0, 0, 200, 0)
     *     grd.addColorStop(0, 'red')
     *     grd.addColorStop(1, 'white')
     *
     *     // Fill with gradient
     *     ctx.setFillStyle(grd)
     *     ctx.fillRect(10, 10, 150, 80)
     *     ctx.draw()
     *     ```
     */
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): void
    /**
     *
     * **定义：**
     *
     * 创建一个圆形的渐变颜色。
     *
     * **Tip**: 起点在圆心，终点在圆环。
     *
     * **Tip**: 需要使用 `addColorStop()` 来指定渐变点，至少要两个。
     *
     * **参数：**
     *
     *   参数 |  类型     |  定义     
     * -------|-----------|-----------
     *   x    |  Number   |圆心的x坐标
     *   y    |  Number   |圆心的y坐标
     *   r    |  Number   |  圆的半径 
     *
     * **例子：**
     *
     *     ```js
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     // Create circular gradient
     *     const grd = ctx.createCircularGradient(75, 50, 50)
     *     grd.addColorStop(0, 'red')
     *     grd.addColorStop(1, 'white')
     *
     *     // Fill with gradient
     *     ctx.setFillStyle(grd)
     *     ctx.fillRect(10, 10, 150, 80)
     *     ctx.draw()
     *     ```
     */
    createCircularGradient(x: number, y: number, r: number): void
    /**
     *
     * **定义：**
     *
     * 创建一个颜色的渐变点。
     *
     * **Tip**: 小于最小 stop 的部分会按最小 stop 的 color 来渲染，大于最大 stop 的部分会按最大 stop 的 color 来渲染。
     *
     * **Tip**: 需要使用 `addColorStop()` 来指定渐变点，至少要两个。
     *
     * **参数：**
     *
     *   参数    |  类型                                                                              |  定义              
     * ----------|------------------------------------------------------------------------------------|--------------------
     *   stop    |  Number(0-1)                                                                       |表示渐变点在起点和终点中的位置
     *   color   |  Color                                                                             |  渐变点的颜色      
     *
     * **示例代码：**
     *
     *     ```js
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     // Create circular gradient
     *     const grd = ctx.createLinearGradient(30, 10, 120, 10)
     *     grd.addColorStop(0, 'red')
     *     grd.addColorStop(0.16, 'orange')
     *     grd.addColorStop(0.33, 'yellow')
     *     grd.addColorStop(0.5, 'green')
     *     grd.addColorStop(0.66, 'cyan')
     *     grd.addColorStop(0.83, 'blue')
     *     grd.addColorStop(1, 'purple')
     *
     *     // Fill with gradient
     *     ctx.setFillStyle(grd)
     *     ctx.fillRect(10, 10, 150, 80)
     *     ctx.draw()
     *     ```
     */
    addColorStop(stop: number, color: string): void
    /**
     *
     * **定义：**
     *
     * 设置线条的宽度。
     *
     * **参数：**
     *
     *   参数        |  类型     |  说明           
     * --------------|-----------|-----------------
     *   lineWidth   |  Number   |线条的宽度(单位是px)
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.setLineWidth(lineWidth)
     *     canvasContext.lineWidth = lineWidth 
     *     ```
     *
     * **例子：**
     *
     *     ```js
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.beginPath()
     *     ctx.moveTo(10, 10)
     *     ctx.lineTo(150, 10)
     *     ctx.stroke()
     *
     *     ctx.beginPath()
     *     ctx.setLineWidth(5)
     *     ctx.moveTo(10, 30)
     *     ctx.lineTo(150, 30)
     *     ctx.stroke()
     *
     *     ctx.beginPath()
     *     ctx.setLineWidth(10)
     *     ctx.moveTo(10, 50)
     *     ctx.lineTo(150, 50)
     *     ctx.stroke()
     *
     *     ctx.beginPath()
     *     ctx.setLineWidth(15)
     *     ctx.moveTo(10, 70)
     *     ctx.lineTo(150, 70)
     *     ctx.stroke()
     *
     *     ctx.draw()
     *     ```
     */
    setLineWidth(lineWidth: number): void
    /**
     *
     * **定义：**
     *
     * 设置线条的端点样式。
     *
     * **参数：**
     *
     *   参数      |  类型     |  范围                      |  说明        
     * ------------|-----------|----------------------------|--------------
     *   lineCap   |  String   |  'butt'、'round'、'square' |线条的结束端点样式
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.setLineCap(lineCap)
     *     canvasContext.lineCap = lineCap 
     *     ```
     *
     * **示例代码：**
     *
     *     ```js
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.beginPath()
     *     ctx.moveTo(10, 10)
     *     ctx.lineTo(150, 10)
     *     ctx.stroke()
     *
     *     ctx.beginPath()
     *     ctx.setLineCap('butt')
     *     ctx.setLineWidth(10)
     *     ctx.moveTo(10, 30)
     *     ctx.lineTo(150, 30)
     *     ctx.stroke()
     *
     *     ctx.beginPath()
     *     ctx.setLineCap('round')
     *     ctx.setLineWidth(10)
     *     ctx.moveTo(10, 50)
     *     ctx.lineTo(150, 50)
     *     ctx.stroke()
     *
     *     ctx.beginPath()
     *     ctx.setLineCap('square')
     *     ctx.setLineWidth(10)
     *     ctx.moveTo(10, 70)
     *     ctx.lineTo(150, 70)
     *     ctx.stroke()
     *
     *     ctx.draw()
     *     ```
     */
    setLineCap(lineCap: string): void
    /**
     *
     * **定义：**
     *
     * 设置线条的交点样式。
     *
     * **参数：**
     *
     *   参数       |  类型     |  范围                      |  说明        
     * -------------|-----------|----------------------------|--------------
     *   lineJoin   |  String   |  'bevel'、'round'、'miter' |线条的结束交点样式
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.setLineJoin(lineJoin)
     *     canvasContext.lineJoin = lineJoin 
     *     ```
     *
     * **例子：**
     *
     *     ```js
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.beginPath()
     *     ctx.moveTo(10, 10)
     *     ctx.lineTo(100, 50)
     *     ctx.lineTo(10, 90)
     *     ctx.stroke()
     *
     *     ctx.beginPath()
     *     ctx.setLineJoin('bevel')
     *     ctx.setLineWidth(10)
     *     ctx.moveTo(50, 10)
     *     ctx.lineTo(140, 50)
     *     ctx.lineTo(50, 90)
     *     ctx.stroke()
     *
     *     ctx.beginPath()
     *     ctx.setLineJoin('round')
     *     ctx.setLineWidth(10)
     *     ctx.moveTo(90, 10)
     *     ctx.lineTo(180, 50)
     *     ctx.lineTo(90, 90)
     *     ctx.stroke()
     *
     *     ctx.beginPath()
     *     ctx.setLineJoin('miter')
     *     ctx.setLineWidth(10)
     *     ctx.moveTo(130, 10)
     *     ctx.lineTo(220, 50)
     *     ctx.lineTo(130, 90)
     *     ctx.stroke()
     *
     *     ctx.draw()
     *     ```
     */
    setLineJoin(lineJoin: string): void
    /**
     *
     * **定义：**
     *
     * 设置线条的宽度。
     *
     * **参数：**
     *
     *   参数      |  类型     |  说明                         
     * ------------|-----------|-------------------------------
     *   pattern   |  Array    |一组描述交替绘制线段和间距（坐标空间单位）长度的数字
     *   offset    |  Number   |  虚线偏移量                   
     *
     * **例子：**
     *
     *     ```js
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     ctx.setLineDash([10, 20], 5);
     *
     *     ctx.beginPath();
     *     ctx.moveTo(0,100);
     *     ctx.lineTo(400, 100);
     *     ctx.stroke();
     *
     *     ctx.draw()
     *     ```
     */
    setLineDash(pattern: any[], offset: number): void
    /**
     *
     * **定义：**
     *
     * 设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。 当 `setLineJoin()` 为 miter 时才有效。超过最大倾斜长度的，连接处将以 lineJoin 为 bevel 来显示
     *
     * **参数：**
     *
     *   参数         |  类型     |  说明     
     * ---------------|-----------|-----------
     *   miterLimit   |  Number   |最大斜接长度
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.setMiterLimit(miterLimit)
     *     canvasContext.miterLimit = miterLimit 
     *     ```
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.beginPath()
     *     ctx.setLineWidth(10)
     *     ctx.setLineJoin('miter')
     *     ctx.setMiterLimit(1)
     *     ctx.moveTo(10, 10)
     *     ctx.lineTo(100, 50)
     *     ctx.lineTo(10, 90)
     *     ctx.stroke()
     *
     *     ctx.beginPath()
     *     ctx.setLineWidth(10)
     *     ctx.setLineJoin('miter')
     *     ctx.setMiterLimit(2)
     *     ctx.moveTo(50, 10)
     *     ctx.lineTo(140, 50)
     *     ctx.lineTo(50, 90)
     *     ctx.stroke()
     *
     *     ctx.beginPath()
     *     ctx.setLineWidth(10)
     *     ctx.setLineJoin('miter')
     *     ctx.setMiterLimit(3)
     *     ctx.moveTo(90, 10)
     *     ctx.lineTo(180, 50)
     *     ctx.lineTo(90, 90)
     *     ctx.stroke()
     *
     *     ctx.beginPath()
     *     ctx.setLineWidth(10)
     *     ctx.setLineJoin('miter')
     *     ctx.setMiterLimit(4)
     *     ctx.moveTo(130, 10)
     *     ctx.lineTo(220, 50)
     *     ctx.lineTo(130, 90)
     *     ctx.stroke()
     *
     *     ctx.draw()
     *     ```
     */
    setMiterLimit(miterLimit: number): void
    /**
     *
     * **定义：**
     *
     * 创建一个矩形。
     *
     * **Tip**: 用 `fill()` 或者 `stroke()` 方法将矩形真正的画到 canvas 中。
     *
     * **参数：**
     *
     *   参数     |  类型     |  说明          
     * -----------|-----------|----------------
     *   x        |  Number   |矩形路径左上角的x坐标
     *   y        |  Number   |矩形路径左上角的y坐标
     *   width    |  Number   | 矩形路径的宽度 
     *   height   |  Number   | 矩形路径的高度 
     *
     * **例子：**
     *
     *     ```js
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.rect(10, 10, 150, 75)
     *     ctx.setFillStyle('red')
     *     ctx.fill()
     *     ctx.draw()
     *     ```
     */
    rect(x: number, y: number, width: number, height: number): void
    /**
     *
     * **定义：**
     *
     * 填充一个矩形。
     *
     * **Tip**: 用 `setFillStyle()` 设置矩形的填充色，如果没设置默认是黑色。
     *
     * **参数：**
     *
     *   参数     |  类型     |  说明          
     * -----------|-----------|----------------
     *   x        |  Number   |矩形路径左上角的x坐标
     *   y        |  Number   |矩形路径左上角的y坐标
     *   width    |  Number   | 矩形路径的宽度 
     *   height   |  Number   | 矩形路径的高度 
     *
     * **例子：**
     *
     *     ```js
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.setFillStyle('red')
     *     ctx.fillRect(10, 10, 150, 75)
     *     ctx.draw()
     *     ```
     */
    fillRect(x: number, y: number, width: number, height: number): void
    /**
     *
     * **定义：**
     *
     * 画一个矩形(非填充)。
     *
     * **Tip**: 用 `setFillStroke()` 设置矩形线条的颜色，如果没设置默认是黑色。
     *
     * **参数：**
     *
     *   参数     |  类型     |  范围 |  说明          
     * -----------|-----------|-------|----------------
     *   x        |  Number   |       |矩形路径左上角的x坐标
     *   y        |  Number   |       |矩形路径左上角的y坐标
     *   width    |  Number   |       | 矩形路径的宽度 
     *   height   |  Number   |       | 矩形路径的高度 
     *
     * **例子：**
     *
     *     ```js
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.setStrokeStyle('red')
     *     ctx.strokeRect(10, 10, 150, 75)
     *     ctx.draw()
     *     ```
     */
    strokeRect(x: number, y: number, width: number, height: number): void
    /**
     *
     * **参数：**
     *
     *   参数     |  类型     |  说明          
     * -----------|-----------|----------------
     *   x        |  Number   |矩形区域左上角的x坐标
     *   y        |  Number   |矩形区域左上角的y坐标
     *   width    |  Number   | 矩形区域的宽度 
     *   height   |  Number   | 矩形区域的高度 
     *
     * **定义：**
     *
     *     ```html
     *     <canvas canvas-id="myCanvas" style="border: 1px solid; background: #123456;"/>
     *     ```
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.setFillStyle('red')
     *     ctx.fillRect(0, 0, 150, 200)
     *     ctx.setFillStyle('blue')
     *     ctx.fillRect(150, 0, 150, 200)
     *     ctx.clearRect(10, 10, 150, 75)
     *     ctx.draw()
     *     ```
     */
    clearRect(x: number, y: number, width: number, height: number): void
    /**
     *
     * **定义：**
     *
     * 对当前路径中的内容进行填充。默认的填充色为黑色。
     *
     * **Tip**: 如果当前路径没有闭合，`fill()` 方法会将起点和终点进行连接，然后填充，详情见例一。
     *
     * **Tip**: `fill()` 填充的的路径是从 `beginPath()` 开始计算，但是不会将 `fillRect()` 包含进去，详情见例二。
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.moveTo(10, 10)
     *     ctx.lineTo(100, 10)
     *     ctx.lineTo(100, 100)
     *     ctx.fill()
     *     ctx.draw()
     *     ```
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     // begin path
     *     ctx.rect(10, 10, 100, 30)
     *     ctx.setFillStyle('yellow')
     *     ctx.fill()
     *
     *     // begin another path
     *     ctx.beginPath()
     *     ctx.rect(10, 40, 100, 30)
     *
     *     // only fill this rect, not in current path
     *     ctx.setFillStyle('blue')
     *     ctx.fillRect(10, 70, 100, 30)
     *
     *     ctx.rect(10, 100, 100, 30)
     *
     *     // it will fill current path
     *     ctx.setFillStyle('red')
     *     ctx.fill()
     *     ctx.draw()
     *     ```
     */
    fill(): void
    /**
     *
     * **定义：**
     *
     * 画出当前路径的边框。默认颜色色为黑色。
     *
     * **Tip**: `stroke()` 描绘的的路径是从 `beginPath()` 开始计算，但是不会将 `strokeRect()` 包含进去，详情见例二。
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.moveTo(10, 10)
     *     ctx.lineTo(100, 10)
     *     ctx.lineTo(100, 100)
     *     ctx.stroke()
     *     ctx.draw()
     *     ```
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     // begin path
     *     ctx.rect(10, 10, 100, 30)
     *     ctx.setStrokeStyle('yellow')
     *     ctx.stroke()
     *
     *     // begin another path
     *     ctx.beginPath()
     *     ctx.rect(10, 40, 100, 30)
     *
     *     // only stoke this rect, not in current path
     *     ctx.setStrokeStyle('blue')
     *     ctx.strokeRect(10, 70, 100, 30)
     *
     *     ctx.rect(10, 100, 100, 30)
     *
     *     // it will stroke current path
     *     ctx.setStrokeStyle('red')
     *     ctx.stroke()
     *     ctx.draw()
     *     ```
     */
    stroke(): void
    /**
     *
     * **定义：**
     *
     * 开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边。
     *
     * **Tip**: 在最开始的时候相当于调用了一次 `beginPath()`。
     *
     * **Tip**: 同一个路径内的多次`setFillStyle()`、`setStrokeStyle()`、`setLineWidth()`等设置，以最后一次设置为准。
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     // begin path
     *     ctx.rect(10, 10, 100, 30)
     *     ctx.setFillStyle('yellow')
     *     ctx.fill()
     *
     *     // begin another path
     *     ctx.beginPath()
     *     ctx.rect(10, 40, 100, 30)
     *
     *     // only fill this rect, not in current path
     *     ctx.setFillStyle('blue')
     *     ctx.fillRect(10, 70, 100, 30)
     *
     *     ctx.rect(10, 100, 100, 30)
     *
     *     // it will fill current path
     *     ctx.setFillStyle('red')
     *     ctx.fill()
     *     ctx.draw()
     *     ```
     */
    beginPath(): void
    /**
     *
     * **定义：**
     *
     * 关闭一个路径
     *
     * **Tip**: 关闭路径会连接起点和终点。
     *
     * **Tip**: 如果关闭路径后没有调用 `fill()` 或者 `stroke()` 并开启了新的路径，那之前的路径将不会被渲染。
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.moveTo(10, 10)
     *     ctx.lineTo(100, 10)
     *     ctx.lineTo(100, 100)
     *     ctx.closePath()
     *     ctx.stroke()
     *     ctx.draw()
     *     ```
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     // begin path
     *     ctx.rect(10, 10, 100, 30)
     *     ctx.closePath()
     *
     *     // begin another path
     *     ctx.beginPath()
     *     ctx.rect(10, 40, 100, 30)
     *
     *     // only fill this rect, not in current path
     *     ctx.setFillStyle('blue')
     *     ctx.fillRect(10, 70, 100, 30)
     *
     *     ctx.rect(10, 100, 100, 30)
     *
     *     // it will fill current path
     *     ctx.setFillStyle('red')
     *     ctx.fill()
     *     ctx.draw()
     *     ```
     */
    closePath(): void
    /**
     *
     * **定义：**
     *
     * 把路径移动到画布中的指定点，不创建线条。
     *
     * **Tip**: 用 `stroke()` 方法来画线条
     *
     * **参数：**
     *
     *   参数 |  类型     |  说明       
     * -------|-----------|-------------
     *   x    |  Number   |目标位置的x坐标
     *   y    |  Number   |目标位置的y坐标
     *
     * **示例代码：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.moveTo(10, 10)
     *     ctx.lineTo(100, 10)
     *
     *     ctx.moveTo(10, 50)
     *     ctx.lineTo(100, 50)
     *     ctx.stroke()
     *     ctx.draw()
     *     ```
     */
    moveTo(x: number, y: number): void
    /**
     *
     * **定义：**
     *
     * `lineTo` 方法增加一个新点，然后创建一条从上次指定点到目标点的线。
     *
     * **Tip**: 用 `stroke()` 方法来画线条
     *
     * **参数：**
     *
     *   参数 |  类型     |  说明       
     * -------|-----------|-------------
     *   x    |  Number   |目标位置的x坐标
     *   y    |  Number   |目标位置的y坐标
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.moveTo(10, 10)
     *     ctx.rect(10, 10, 100, 50)
     *     ctx.lineTo(110, 60)
     *     ctx.stroke()
     *     ctx.draw()
     *     ```
     */
    lineTo(x: number, y: number): void
    /**
     *
     * **定义：**
     *
     * 画一条弧线。
     *
     * **Tip**: 创建一个圆可以用 `arc()` 方法指定起始弧度为0，终止弧度为 `2 * Math.PI`。
     *
     * **Tip**: 用 `stroke()` 或者 `fill()` 方法来在 canvas 中画弧线。
     *
     * **参数：**
     *
     *   参数               |  类型      |  说明                                 
     * ---------------------|------------|---------------------------------------
     *   x                  |  Number    |  圆的x坐标                            
     *   y                  |  Number    |  圆的y坐标                            
     *   r                  |  Number    |  圆的半径                             
     *   sAngle             |  Number    |  起始弧度，单位弧度（在3点钟方向）    
     *   eAngle             |  Number    |  终止弧度                             
     *   counterclockwise   |  Boolean   |可选。指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     // Draw coordinates
     *     ctx.arc(100, 75, 50, 0, 2 * Math.PI)
     *     ctx.setFillStyle('#EEEEEE')
     *     ctx.fill()
     *
     *     ctx.beginPath()
     *     ctx.moveTo(40, 75)
     *     ctx.lineTo(160, 75)
     *     ctx.moveTo(100, 15)
     *     ctx.lineTo(100, 135)
     *     ctx.setStrokeStyle('#AAAAAA')
     *     ctx.stroke()
     *
     *     ctx.setFontSize(12)
     *     ctx.setFillStyle('black')
     *     ctx.fillText('0', 165, 78)
     *     ctx.fillText('0.5*PI', 83, 145)
     *     ctx.fillText('1*PI', 15, 78)
     *     ctx.fillText('1.5*PI', 83, 10)
     *
     *     // Draw points
     *     ctx.beginPath()
     *     ctx.arc(100, 75, 2, 0, 2 * Math.PI)
     *     ctx.setFillStyle('lightgreen')
     *     ctx.fill()
     *
     *     ctx.beginPath()
     *     ctx.arc(100, 25, 2, 0, 2 * Math.PI)
     *     ctx.setFillStyle('blue')
     *     ctx.fill()
     *
     *     ctx.beginPath()
     *     ctx.arc(150, 75, 2, 0, 2 * Math.PI)
     *     ctx.setFillStyle('red')
     *     ctx.fill()
     *
     *     // Draw arc
     *     ctx.beginPath()
     *     ctx.arc(100, 75, 50, 0, 1.5 * Math.PI)
     *     ctx.setStrokeStyle('#333333')
     *     ctx.stroke()
     *
     *     ctx.draw()
     *     ```
     */
    arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise: boolean): void
    /**
     *
     * **定义：**
     *
     * 创建三次方贝塞尔曲线路径。
     *
     * **Tip**: 曲线的起始点为路径中前一个点。
     *
     * **参数：**
     *
     *   参数   |  类型     |  说明              
     * ---------|-----------|--------------------
     *   cp1x   |  Number   |第一个贝塞尔控制点的 x 坐标
     *   cp1y   |  Number   |第一个贝塞尔控制点的 y 坐标
     *   cp2x   |  Number   |第二个贝塞尔控制点的 x 坐标
     *   cp2y   |  Number   |第二个贝塞尔控制点的 y 坐标
     *   x      |  Number   |  结束点的 x 坐标   
     *   y      |  Number   |  结束点的 y 坐标   
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     // Draw points
     *     ctx.beginPath()
     *     ctx.arc(20, 20, 2, 0, 2 * Math.PI)
     *     ctx.setFillStyle('red')
     *     ctx.fill()
     *
     *     ctx.beginPath()
     *     ctx.arc(200, 20, 2, 0, 2 * Math.PI)
     *     ctx.setFillStyle('lightgreen')
     *     ctx.fill()
     *
     *     ctx.beginPath()
     *     ctx.arc(20, 100, 2, 0, 2 * Math.PI)
     *     ctx.arc(200, 100, 2, 0, 2 * Math.PI)
     *     ctx.setFillStyle('blue')
     *     ctx.fill()
     *
     *     ctx.setFillStyle('black')
     *     ctx.setFontSize(12)
     *
     *     // Draw guides
     *     ctx.beginPath()
     *     ctx.moveTo(20, 20)
     *     ctx.lineTo(20, 100)
     *     ctx.lineTo(150, 75)
     *
     *     ctx.moveTo(200, 20)
     *     ctx.lineTo(200, 100)
     *     ctx.lineTo(70, 75)
     *     ctx.setStrokeStyle('#AAAAAA')
     *     ctx.stroke()
     *
     *     // Draw quadratic curve
     *     ctx.beginPath()
     *     ctx.moveTo(20, 20)
     *     ctx.bezierCurveTo(20, 100, 200, 100, 200, 20)
     *     ctx.setStrokeStyle('black')
     *     ctx.stroke()
     *
     *     ctx.draw()
     *     ```
     */
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void
    /**
     *
     * **定义：**
     *
     * 创建二次贝塞尔曲线路径。
     *
     * **Tip**: 曲线的起始点为路径中前一个点。
     *
     * **参数：**
     *
     *   参数  |  类型     |  说明         
     * --------|-----------|---------------
     *   cpx   |  Number   |贝塞尔控制点的x坐标
     *   cpy   |  Number   |贝塞尔控制点的y坐标
     *   x     |  Number   | 结束点的x坐标 
     *   y     |  Number   | 结束点的y坐标 
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     // Draw points
     *     ctx.beginPath()
     *     ctx.arc(20, 20, 2, 0, 2 * Math.PI)
     *     ctx.setFillStyle('red')
     *     ctx.fill()
     *
     *     ctx.beginPath()
     *     ctx.arc(200, 20, 2, 0, 2 * Math.PI)
     *     ctx.setFillStyle('lightgreen')
     *     ctx.fill()
     *
     *     ctx.beginPath()
     *     ctx.arc(20, 100, 2, 0, 2 * Math.PI)
     *     ctx.setFillStyle('blue')
     *     ctx.fill()
     *
     *     ctx.setFillStyle('black')
     *     ctx.setFontSize(12)
     *
     *     // Draw guides
     *     ctx.beginPath()
     *     ctx.moveTo(20, 20)
     *     ctx.lineTo(20, 100)
     *     ctx.lineTo(200, 20)
     *     ctx.setStrokeStyle('#AAAAAA')
     *     ctx.stroke()
     *
     *     // Draw quadratic curve
     *     ctx.beginPath()
     *     ctx.moveTo(20, 20)
     *     ctx.quadraticCurveTo(20, 100, 200, 20)
     *     ctx.setStrokeStyle('black')
     *     ctx.stroke()
     *
     *     ctx.draw()
     *     ```
     */
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void
    /**
     *
     * **定义：**
     *
     * 在调用`scale`方法后，之后创建的路径其横纵坐标会被缩放。多次调用`scale`，倍数会相乘。
     *
     * **参数：**
     *
     *   参数          |  类型     |  说明                                      
     * ----------------|-----------|--------------------------------------------
     *   scaleWidth    |  Number   |横坐标缩放的倍数 (1 = 100%，0.5 = 50%，2 = 200%)
     *   scaleHeight   |  Number   |纵坐标轴缩放的倍数 (1 = 100%，0.5 = 50%，2 = 200%)
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     ctx.strokeRect(10, 10, 25, 15)
     *     ctx.scale(2, 2)
     *     ctx.strokeRect(10, 10, 25, 15)
     *     ctx.scale(2, 2)
     *     ctx.strokeRect(10, 10, 25, 15)
     *
     *     ctx.draw()
     *     ```
     */
    scale(scaleWidth: number, scaleHeight: number): void
    /**
     *
     * **定义：**
     *
     * 以原点为中心，原点可以用 translate方法修改。顺时针旋转当前坐标轴。多次调用`rotate`，旋转的角度会叠加。
     *
     * **参数：**
     *
     *   参数     |  类型     |  说明                                               
     * -----------|-----------|-----------------------------------------------------
     *   rotate   |  Number   |旋转角度，以弧度计(degrees * Math.PI/180；degrees范围为0~360)
     *
     *
     * **参数：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     ctx.strokeRect(100, 10, 150, 100)
     *     ctx.rotate(20 * Math.PI / 180)
     *     ctx.strokeRect(100, 10, 150, 100)
     *     ctx.rotate(20 * Math.PI / 180)
     *     ctx.strokeRect(100, 10, 150, 100)
     *
     *     ctx.draw()
     *     ```
     */
    rotate(rotate: number): void
    /**
     *
     * **定义：**
     *
     * 对当前坐标系的原点(0, 0)进行变换，默认的坐标系原点为页面左上角。
     *
     * **参数：**
     *
     *   参数 |  类型     |  说明      
     * -------|-----------|------------
     *   x    |  Number   |水平坐标平移量
     *   y    |  Number   |竖直坐标平移量
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     ctx.strokeRect(10, 10, 150, 100)
     *     ctx.translate(20, 20)
     *     ctx.strokeRect(10, 10, 150, 100)
     *     ctx.translate(20, 20)
     *     ctx.strokeRect(10, 10, 150, 100)
     *
     *     ctx.draw()
     *     ```
     */
    translate(x: number, y: number): void
    /**
     *
     * **定义：**
     *
     * clip() 方法从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。可以在使用 clip() 方法前通过使用 save() 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 restore() 方法）。
     *
     * **例子：**
     *
     *     ```js
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     swan.downloadFile({
     *       url: 'http://is5.mzstatic.com/image/thumb/Purple128/v4/75/3b/90/753b907c-b7fb-5877-215a-759bd73691a4/source/50x50bb.jpg',
     *       success: function(res) {
     *           ctx.save()
     *           ctx.beginPath()
     *           ctx.arc(50, 50, 25, 0, 2*Math.PI)
     *           ctx.clip()
     *           ctx.drawImage(res.tempFilePath, 25, 25)
     *           ctx.restore()
     *           ctx.draw()
     *       }
     *     })
     *     ```
     */
    clip(): void
    /**
     *
     * **定义：**
     *
     * 设置字体的字号。
     *
     * **参数：**
     *
     *   参数       |  类型     |  说明    
     * -------------|-----------|----------
     *   fontSize   |  Number   |字体的字号
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     ctx.setFontSize(20)
     *     ctx.fillText('20', 20, 20)
     *     ctx.setFontSize(30)
     *     ctx.fillText('30', 40, 40)
     *     ctx.setFontSize(40)
     *     ctx.fillText('40', 60, 60)
     *     ctx.setFontSize(50)
     *     ctx.fillText('50', 90, 90)
     *
     *     ctx.draw()
     *     ```
     */
    setFontSize(fontSize: number): void
    /**
     *
     * **定义：**
     *
     * 在画布上绘制被填充的文本。
     *
     * **参数：**
     *
     *   参数       |  类型     |  说明            
     * -------------|-----------|------------------
     *   text       |  String   |在画布上输出的文本
     *   x          |  Number   |绘制文本的左上角x坐标位置
     *   y          |  Number   |绘制文本的左上角y坐标位置
     *   maxWidth   |  Number   |需要绘制的最大宽度，可选
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     ctx.setFontSize(20)
     *     ctx.fillText('Hello', 20, 20)
     *     ctx.fillText('MINA', 100, 100)
     *
     *     ctx.draw()
     *     ```
     */
    fillText(text: string, x: number, y: number, maxWidth: number): void
    /**
     *
     * **定义：**
     *
     * 用于设置文字的对齐
     *
     * **参数：**
     *
     *   参数    |  类型     |  定义                          
     * ----------|-----------|--------------------------------
     *   align   |  String   |可选值 'left'、'center'、'right'
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.setTextAlign(align)
     *     canvasContext.textAlign = align 
     *     ```
     *
     * **示例代码：**
     *
     *     ```js
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     ctx.setStrokeStyle('red')
     *     ctx.moveTo(150, 20)
     *     ctx.lineTo(150, 170)
     *     ctx.stroke()
     *
     *     ctx.setFontSize(15)
     *     ctx.setTextAlign('left')
     *     ctx.fillText('textAlign=left', 150, 60)
     *
     *     ctx.setTextAlign('center')
     *     ctx.fillText('textAlign=center', 150, 80)
     *
     *     ctx.setTextAlign('right')
     *     ctx.fillText('textAlign=right', 150, 100)
     *
     *     ctx.draw()
     *     ```
     */
    setTextAlign(align: string): void
    /**
     *
     * **定义：**
     *
     * 用于设置文字的水平对齐
     *
     * **参数：**
     *
     *   参数           |  类型     |  定义                                   
     * -----------------|-----------|-----------------------------------------
     *   textBaseline   |  String   |可选值 'top'、'bottom'、'middle'、'normal'
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.setTextBaseline(textBaseline)
     *     canvasContext.textBaseline = textBaseline 
     *     ```
     *
     * **示例代码：**
     *
     *     ```js
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     ctx.setStrokeStyle('red')
     *     ctx.moveTo(5, 75)
     *     ctx.lineTo(295, 75)
     *     ctx.stroke()
     *
     *     ctx.setFontSize(20)
     *
     *     ctx.setTextBaseline('top')
     *     ctx.fillText('top', 5, 75)
     *
     *     ctx.setTextBaseline('middle')
     *     ctx.fillText('middle', 50, 75)
     *
     *     ctx.setTextBaseline('bottom')
     *     ctx.fillText('bottom', 120, 75)
     *
     *     ctx.setTextBaseline('normal')
     *     ctx.fillText('normal', 200, 75)
     *
     *     ctx.draw()
     *     ```
     */
    setTextBaseline(textBaseline: string): void
    /**
     *
     * **定义：**
     *
     * 绘制图像到画布。
     *
     * **参数：**
     *
     *   参数            |  类型     |  说明                         
     * ------------------|-----------|-------------------------------
     *   imageResource   |  String   |  所要绘制的图片资源           
     *   dx              |  Number   |图像的左上角在目标canvas上 X 轴的位置
     *   dy              |  Number   |图像的左上角在目标canvas上 Y 轴的位置
     *   dWidth          |  Number   |在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
     *   dHeigt          |  Number   |在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
     *   sx              |  Number   |源图像的矩形选择框的左上角 X 坐标
     *   sy              |  Number   |源图像的矩形选择框的左上角 Y 坐标
     *   sWidth          |  Number   |  源图像的矩形选择框的高度     
     *   sHeight         |  Number   |  源图像的矩形选择框的高度     
     *
     * **有三个版本的写法：**
     *
     * *   drawImage(dx, dy)
     * *   drawImage(dx, dy, dWidth, dHeight)
     * *   drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) **从 1.9.0 起支持**
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     swan.chooseImage({
     *       success: function(res){
     *         ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
     *         ctx.draw()
     *       }
     *     })
     *     ```
     */
    drawImage(dx: number, dy: number): void
    /**
     *
     * **定义：**
     *
     * 绘制图像到画布。
     *
     * **参数：**
     *
     *   参数            |  类型     |  说明                         
     * ------------------|-----------|-------------------------------
     *   imageResource   |  String   |  所要绘制的图片资源           
     *   dx              |  Number   |图像的左上角在目标canvas上 X 轴的位置
     *   dy              |  Number   |图像的左上角在目标canvas上 Y 轴的位置
     *   dWidth          |  Number   |在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
     *   dHeigt          |  Number   |在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
     *   sx              |  Number   |源图像的矩形选择框的左上角 X 坐标
     *   sy              |  Number   |源图像的矩形选择框的左上角 Y 坐标
     *   sWidth          |  Number   |  源图像的矩形选择框的高度     
     *   sHeight         |  Number   |  源图像的矩形选择框的高度     
     *
     * **有三个版本的写法：**
     *
     * *   drawImage(dx, dy)
     * *   drawImage(dx, dy, dWidth, dHeight)
     * *   drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) **从 1.9.0 起支持**
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     swan.chooseImage({
     *       success: function(res){
     *         ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
     *         ctx.draw()
     *       }
     *     })
     *     ```
     */
    drawImage(dx: number, dy: number, dWidth: number, dHeight: any): void
    /**
     *
     * **定义：**
     *
     * 绘制图像到画布。
     *
     * **参数：**
     *
     *   参数            |  类型     |  说明                         
     * ------------------|-----------|-------------------------------
     *   imageResource   |  String   |  所要绘制的图片资源           
     *   dx              |  Number   |图像的左上角在目标canvas上 X 轴的位置
     *   dy              |  Number   |图像的左上角在目标canvas上 Y 轴的位置
     *   dWidth          |  Number   |在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
     *   dHeigt          |  Number   |在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
     *   sx              |  Number   |源图像的矩形选择框的左上角 X 坐标
     *   sy              |  Number   |源图像的矩形选择框的左上角 Y 坐标
     *   sWidth          |  Number   |  源图像的矩形选择框的高度     
     *   sHeight         |  Number   |  源图像的矩形选择框的高度     
     *
     * **有三个版本的写法：**
     *
     * *   drawImage(dx, dy)
     * *   drawImage(dx, dy, dWidth, dHeight)
     * *   drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) **从 1.9.0 起支持**
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     swan.chooseImage({
     *       success: function(res){
     *         ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
     *         ctx.draw()
     *       }
     *     })
     *     ```
     */
    drawImage(sx: number, sy: number, sWidth: number, sHeight: number, dx: number, dy: number, dWidth: number, dHeight: any): void
    /**
     *
     * **定义：**
     *
     * 设置全局画笔透明度。
     *
     * **参数：**
     *
     *   参数    |  类型     |  范围  |  说明                     
     * ----------|-----------|--------|---------------------------
     *   alpha   |  Number   |  0~1   |透明度，0 表示完全透明，1 表示完全不透明
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.setGlobalAlpha(alpha)
     *     canvasContext.globalAlpha = alpha  
     *     ```
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     ctx.setFillStyle('red')
     *     ctx.fillRect(10, 10, 150, 100)
     *     ctx.setGlobalAlpha(0.2)
     *     ctx.setFillStyle('blue')
     *     ctx.fillRect(50, 50, 150, 100)
     *     ctx.setFillStyle('yellow')
     *     ctx.fillRect(100, 100, 150, 100)
     *
     *     ctx.draw()
     *     ```
     */
    setGlobalAlpha(alpha: number): void
    /**
     *
     * **定义：**
     *
     * 保存当前的绘图上下文。
     */
    save(): void
    /**
     *
     * **定义：**
     *
     * 恢复之前保存的绘图上下文。
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     // save the default fill style
     *     ctx.save() 
     *     ctx.setFillStyle('red')
     *     ctx.fillRect(10, 10, 150, 100)
     *
     *     // restore to the previous saved state
     *     ctx.restore()
     *     ctx.fillRect(50, 50, 150, 100)
     *
     *     ctx.draw()
     *     ```
     */
    restore(): void
    /**
     *
     * **定义：**
     *
     * 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
     *
     * **Tip**: 绘图上下文需要由 `swan.createCanvasContext(canvasId)` 来创建。
     *
     * **参数：**
     *
     *   参数       |  类型       |  说明                                                                                                                                       | 最低版本 
     * -------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------|----------
     *   reserve    |  Boolean    |非必填。本次绘制是否接着上一次绘制，即reserve参数为false，则在本次调用drawCanvas绘制之前native层应先清空画布再继续绘制；若reserver参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面，默认 false|          
     *   callback   |  Function   |  绘制完成后回调                                                                                                                             |  1.7.0   
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     ctx.setFillStyle('red')
     *     ctx.fillRect(10, 10, 150, 100)
     *     ctx.draw()
     *     ctx.fillRect(50, 50, 150, 100)
     *     ctx.draw()
     *     ```
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *
     *     ctx.setFillStyle('red')
     *     ctx.fillRect(10, 10, 150, 100)
     *     ctx.draw()
     *     ctx.fillRect(50, 50, 150, 100)
     *     ctx.draw(true)
     *     ```
     */
    draw(reserve?: boolean, callback?: CanvasContext.draw.Param1): void
    /**
     *
     * **定义：**
     *
     * 测量文本尺寸信息，目前仅返回文本宽度。同步接口。
     *
     * **参数：**
     *
     *   参数   |  类型     |  说明     
     * ---------|-----------|-----------
     *   text   |  String   |要测量的文本
     *
     * **返回：**
     *
     * 返回 TextMetrics 对象，结构如下：
     *
     *   参数    |  类型     |  说明    
     * ----------|-----------|----------
     *   width   |  Number   |文本的宽度
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     ctx.font = 'italic bold 20px cursive'
     *     const metrics = ctx.measureText('Hello World')
     *     console.log(metrics.width)
     *     ```
     */
    measureText(width: number): void
    /**
     *
     * **定义：**
     *
     * 该属性是设置要在绘制新形状时应用的合成操作的类型。
     *
     * **参数：**
     *
     *   属性值 |  类型     |  说明               
     * ---------|-----------|---------------------
     *   export type   |  String   |标识要使用哪种合成或混合模式操作
     *
     * **export type 支持的操作有：**
     *
     *   平台  |  操作                                                                                                                                                                                                            
     * --------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     *   安卓  |  xor, source-over, source-atop, destination-out, lighter, overlay, darken, lighten, hard-light                                                                                                                   
     *   iOS   |  xor, source-over, source-atop, destination-over, destination-out, lighter, multiply, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, saturation, luminosity   
     *
     * **Bug**: 目前安卓版本只适用于 fill 填充块的合成，用于 stroke 线段的合成效果都是 source-over
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.globalCompositeOperation = export type
     *     ```
     */
    globalCompositeOperation(): void
    /**
     *
     * **定义：**
     *
     * 根据控制点和半径绘制圆弧路径。
     *
     * **参数：**
     *
     *   属性值   |  类型     |  说明            
     * -----------|-----------|------------------
     *   x1       |  Number   |第一个控制点的 x 轴坐标
     *   y1       |  Number   |第一个控制点的 y 轴坐标
     *   x2       |  Number   |第二个控制点的 x 轴坐标
     *   y2       |  Number   |第二个控制点的 y 轴坐标
     *   radius   |  Number   |  圆弧的半径      
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.arcTo(x1, y1, x2, y2, radius)
     *     ```
     */
    arcTo(): void
    /**
     *
     * **定义：**
     *
     * 给定的 (x, y) 位置绘制文本描边的方法
     *
     * **参数：**
     *
     *   属性值     |  类型     |  说明           
     * -------------|-----------|-----------------
     *   text       |  String   |  要绘制的文本   
     *   x          |  Number   |文本起始点的 x 轴坐标
     *   y          |  Number   |文本起始点的 y 轴坐标
     *   maxWidth   |  Number   |需要绘制的最大宽度，可选
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.strokeText(text, x, y, maxWidth)
     *     ```
     */
    strokeText(): void
    /**
     *
     * **定义：**
     *
     * 设置虚线偏移量的属性
     *
     * **参数：**
     *
     *   属性值  |  类型     |  说明         
     * ----------|-----------|---------------
     *   value   |  Number   |偏移量，初始值为 0
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.lineDashOffset = value
     *     ```
     */
    lineDashOffset(): void
    /**
     *
     * **定义：**
     *
     * 对指定的图像创建模式的方法，可在指定的方向上重复元图像
     *
     * **参数：**
     *
     *   属性值       |  类型     |  说明                                                   
     * ---------------|-----------|---------------------------------------------------------
     *   image        |  String   |  重复的图像源，仅支持包内路径和临时路径                 
     *   repetition   |  String   |指定如何重复图像，有效值有: repeat, repeat-x, repeat-y, no-repeat
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.createPattern(image, repetition)
     *     ```
     *
     * **例子：**
     *
     *     ```javascript
     *     const ctx = swan.createCanvasContext('myCanvas')
     *     const pattern = ctx.createPattern('/path/to/image', 'repeat-x')
     *     ctx.fillStyle = pattern
     *     ctx.fillRect(0, 0, 300, 150)
     *     ctx.draw()
     *     ```
     */
    createPattern(): void
    /**
     *
     * **定义：**
     *
     * 设置当前字体样式的属性
     *
     * **参数：**
     *
     *   属性值  |  类型     |  说明                                                                 
     * ----------|-----------|-----------------------------------------------------------------------
     *   value   |  String   |符合 CSS font 语法的 DOMString 字符串，至少需要提供字体大小和字体族名。默认值为 10px sans-serif
     *
     * **value 支持的属性有：**
     *
     *   属性     |  说明                               
     * -----------|-------------------------------------
     *   style    |字体样式。仅支持 italic, oblique, normal
     *   weight   |  字体粗细。仅支持 normal, bold      
     *   size     |  字体大小                           
     *   family   | 字体族名。注意确认各平台所支持的字体
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.font = value
     *     ```
     */
    font(style: any, weight: any, size: any, family: any): void
    /**
     *
     * **定义：**
     *
     * 使用矩阵重新设置（覆盖）当前变换的方法
     *
     * **参数：**
     *
     *   属性值       |  类型     |  说明   
     * ---------------|-----------|---------
     *   scaleX       |  Number   | 水平缩放
     *   skewX        |  Number   | 水平倾斜
     *   skewY        |  Number   | 垂直倾斜
     *   scaleY       |  Number   | 垂直缩放
     *   translateX   |  Number   | 水平移动
     *   translateY   |  Number   | 垂直移动
     *
     * **语法：**
     *
     *     ```javascript
     *     canvasContext.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY)
     *     ```
     */
    setTransform(): void
}

export namespace getBatteryInfo {
    export type Param = {
        /**
         * 接口调用成功的回调
         */
        success: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => void
    export type ParamPropSuccessParam = {
        /**
         * 设备电量，范围 1 - 100
         */
        level: number

        /**
         * 是否正在充电中
         */
        isCharging: boolean
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}

/**
 * 获取设备电量。
 */
export function getBatteryInfo(OBJECT: getBatteryInfo.Param): void

export namespace getBatteryInfoSync {
    export type Return = {
        /**
         * 设备电量，范围 1 - 100
         */
        level: number

        /**
         * 是否正在充电中
         */
        isCharging: boolean
    }
}

/**
 * getBatteryInfo 的同步版本。
 */
export function getBatteryInfoSync(): getBatteryInfoSync.Return
