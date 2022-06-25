import promisify from 'mpromisify'
import {CallbackManager} from '../_util/handler'
import {limited} from '../_util'
import type * as swan from '../swan'

const callbackManager = new CallbackManager()
let compassListener

const stopCompassInternal: typeof swan.stopCompass = ({success, fail, complete}) => {
    try {
        window.removeEventListener('deviceorientation', compassListener, true)
        success?.()
    } catch (err) {
        fail?.({
            errMsg: err.message
        })
    }
    complete?.()
}

/**
 * 停止监听罗盘数据
 */
export const stopCompass = promisify(limited.async('stopCompass', stopCompassInternal))

const getDeviceOrientationListener = interval => {
    let lock
    let timer
    return evt => {
        if (lock) return
        lock = true
        timer && clearTimeout(timer)
        callbackManager.trigger({
            direction: 360 - evt.alpha
        })
        timer = setTimeout(() => { lock = false }, interval)
    }
}

const startCompassInternal: typeof swan.startCompass = ({success, fail, complete}) => {
    if (!window.DeviceOrientationEvent) {
        fail?.({
            errMsg: 'compass is not supported'
        })
    } else {
        try {
            if (compassListener) {
                stopCompass()
            }
            compassListener = getDeviceOrientationListener(200)
            window.addEventListener('deviceorientation', compassListener, true)
            success?.()
        } catch (err) {
            fail?.({
                errMsg: err.message
            })
        }
    }
    complete?.()
}

/**
 * 开始监听罗盘数据
 */
export const startCompass = promisify(limited.async('startCompass', startCompassInternal))

/**
 * 监听罗盘数据变化事件。频率：5 次/秒，接口调用后会自动开始监听，可使用 wx.stopCompass 停止监听。
 */
export const onCompassChange = callback => {
    callbackManager.add(callback)
}

/**
 * 取消监听罗盘数据变化事件，参数为空，则取消所有的事件监听。
 */
export const offCompassChange = callback => {
    callbackManager.remove(callback)
}
