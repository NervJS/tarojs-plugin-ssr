import { CallbackManager, MethodHandler } from '../utils/handler'
import { unsupported } from '../utils'

function getConnection() {
    // @ts-ignore
    return navigator.connection || navigator.mozConnection || navigator.webkitConnection || navigator.msConnection
}

export const getNetworkType = (options = {} as any) => {
    const connection = getConnection()
    const { success, fail, complete } = options
    const handle = new MethodHandler({ name: 'getNetworkType', success, fail, complete })

    let networkType = 'unknown'
    // 浏览器不支持获取网络状态
    if (!connection) {
        return handle.success({networkType})
    }

    // Supports only the navigator.connection.type value which doesn't match the latest spec.
    // https://www.davidbcalhoun.com/2010/using-navigator-connection-android/
    if (!isNaN(Number(connection.type))) {
        switch (connection.type) {
            // @ts-ignore
            case connection.WIFI:
                networkType = 'wifi'
                break
            // @ts-ignore
            case connection.CELL_3G:
                networkType = '3g'
                break
            // @ts-ignore
            case connection.CELL_2G:
                networkType = '2g'
                break
            default:
                // ETHERNET, UNKNOWN
                networkType = 'unknown'
        }
    } else if (connection.type) {
        // @ts-ignore
        networkType = connection.type // Only supports the type value.
        // @ts-ignore
    } else if (connection.effectiveType) {
        // @ts-ignore
        networkType = connection.effectiveType
    }

    return handle.success({ networkType })
}

const networkStatusManager = new CallbackManager()

const networkStatusListener = async () => {
    const { networkType } = await getNetworkType()
    const isConnected = networkType !== 'none'
    const obj = { isConnected, networkType }
    networkStatusManager.trigger(obj)
}

/**
 * 监听弱网状态变化事件。
 */
export const onNetworkWeakChange = unsupported._void('onNetworkWeakChange')

export const onNetworkStatusChange = callback => {
    networkStatusManager.add(callback)
    const connection = getConnection()
    if (connection && networkStatusManager.count() === 1) {
        connection.addEventListener('change', networkStatusListener)
    }
}

/**
 * 取消监听弱网状态变化事件。
 */
export const offNetworkWeakChange = unsupported._void('offNetworkStatusChange')

export const offNetworkStatusChange = callback => {
    networkStatusManager.remove(callback)
    const connection = getConnection()
    if (connection && networkStatusManager.count() === 0) {
        connection.removeEventListener('change', networkStatusListener)
    }
}

/**
 * 获取局域网 IP 地址
 */
export const getLocalIPAddress = unsupported.never('getLocalIPAddress')
