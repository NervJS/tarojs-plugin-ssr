import promisify from 'mpromisify'
import type * as swan from '../swan'
import {unsupported} from '../utils'

/**
 * getBatteryInfo 的同步版本。
 */
export const getBatteryInfoSync = unsupported.never('getBatteryInfoSync')

export const getBatteryInfoInternal: typeof swan.getBatteryInfo = ({success, fail, complete}) => {
    if (typeof window === 'undefined') {
        throw new Error('`getBatteryInfo` cannot be called on server-side!')
    }

    if (!('getBattery' in navigator)) {
        const err = {
            errMsg: 'Your browser does not support getting battery info.'
        }
        fail?.(err)
        complete?.()
    } else {
        (navigator as any).getBattery()
            .then(({charging, level}) => {
                success({
                    isCharging: charging,
                    level: Number(level || 0) * 100
                })
            })
            .catch(err => {
                fail?.({
                    errMsg: err.message
                })
            })
            .finally(() => {
                complete?.()
            })
    }
}

/**
 * 获取设备电量。
 */
export const getBatteryInfo = promisify(getBatteryInfoInternal)
