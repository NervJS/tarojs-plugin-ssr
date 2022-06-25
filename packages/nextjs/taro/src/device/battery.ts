import promisify from 'mpromisify'
import type * as swan from '../swan'
import {unsupported} from '../utils'

/**
 * getBatteryInfo 的同步版本。
 */
export const getBatteryInfoSync = unsupported.never('getBatteryInfoSync')

export const getBatteryInfoInternal: typeof swan.getBatteryInfo = ({success, fail, complete}) => {
    if (!('getBattery' in navigator)) {
        const err = {
            errMsg: 'Your browser does not support getting battery info.'
        }
        fail?.(err)
        complete?.()
        return
    }

    (navigator as any).getBattery()
        .then(({charging, level}) => {
            success({
                isCharging: charging,
                level: Number(level || 0) * 100
            })
        })
        .catch(err => {
            fail?.(err)
            complete?.()
        })
}

/**
 * 获取设备电量。
 */
export const getBatteryInfo = promisify(getBatteryInfoInternal)
