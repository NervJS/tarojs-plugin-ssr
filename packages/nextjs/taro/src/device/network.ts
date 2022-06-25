import promisify from 'mpromisify'
import {CallbackManager} from '../_util/handler'
import {unsupported} from '../_util'
import type * as swan from '../swan'

function getConnection(): NetworkInformation {
    // @ts-ignore
    return navigator.connection || navigator.mozConnection || navigator.webkitConnection || navigator.msConnection
}

const getNetworkTypeInernal: typeof swan.getNetworkType = ({success, complete}) => {
    const connection = getConnection()
    let networkType = 'unknown'
    // 浏览器不支持获取网络状态
    if (connection) {
        // Supports only the navigator.connection.type value which doesn't match the latest spec.
        // https://www.davidbcalhoun.com/2010/using-navigator-connection-android/
        if (!isNaN(Number(connection.type))) {
            switch (connection.type) {
                case (connection as any).WIFI:
                    networkType = 'wifi'
                    break
                case (connection as any).CELL_3G:
                    networkType = '3g'
                    break
                case (connection as any).CELL_2G:
                    networkType = '2g'
                    break
                default:
                    // ETHERNET, UNKNOWN
                    networkType = 'unknown'
                    break;
            }
        } else if (connection.type) {
            networkType = connection.type // Only supports the type value.
        } else if ((connection as any).effectiveType) {
            networkType = (connection as any).effectiveType
        }
    }
    success?.({networkType})
    complete?.()
}

export const getNetworkType = promisify(getNetworkTypeInernal)

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
