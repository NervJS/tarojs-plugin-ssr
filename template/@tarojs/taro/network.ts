namespace onNetworkStatusChange {
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
         *   unknown   |  Android下不常见的网络类型
         */
        networkType: string
    }
}

export function onNetworkStatusChange(callback: onNetworkStatusChange.Param): void {
    function handleNetworkChanged() {
        getNetworkType({
            success({ networkType }) {
                callback({
                    isConnected: networkType !== 'none',
                    networkType
                })
            }
        })
    }
    const connection = navigator.connection
    if (connection) {
        connection.addEventListener('change', handleNetworkChanged)
    } else {
        window.addEventListener('offline', handleNetworkChanged)
        window.addEventListener('online', handleNetworkChanged)
    }
}

namespace getNetworkType {
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

export function getNetworkType({ success, complete }: getNetworkType.Param): void {
    const connection = navigator.connection
    let networkType = 'unknown'
    if (connection) {
        networkType = connection.type
        if (!['none', 'wifi'].includes(networkType)) {
            networkType = 'unknown'
        }
    } else if (navigator.onLine === false) {
        networkType = 'none'
    }
    success({ networkType })
    complete?.()
}
  