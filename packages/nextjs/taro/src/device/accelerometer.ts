import promisify from 'mpromisify'
import {limited} from '../_util'
import {CallbackManager} from '../_util/handler'
import type * as swan from '../swan'

const callbackManager = new CallbackManager()
let devicemotionListener

const stopAccelerometerInternal: typeof swan.stopAccelerometer = ({success, fail, complete}) => {
    try {
        window.removeEventListener('devicemotion', devicemotionListener, true)
        success?.()
    } catch (err) {
        fail?.(err)
    }
    complete?.()
}

/**
 * 停止监听加速度数据。
 */
export const stopAccelerometer = promisify(limited.async('stopAccelerometer', stopAccelerometerInternal))

const INTERVAL_MAP = {
    game: {
        interval: 20,
        frequency: 50
    },
    ui: {
        interval: 60,
        frequency: 16.67
    },
    normal: {
        interval: 200,
        frequency: 5
    }
}

const getDevicemotionListener = interval => {
    let lock
    let timer
    return evt => {
        if (lock) return
        lock = true
        timer && clearTimeout(timer)
        callbackManager.trigger({
            x: evt.acceleration.x || 0,
            y: evt.acceleration.y || 0,
            z: evt.acceleration.z || 0
        })
        timer = setTimeout(() => { lock = false }, interval)
    }
}

const startAccelerometerInternal: typeof swan.startAccelerometer = ({interval = 'normal', success, fail, complete}) => {
    if (window.DeviceMotionEvent) {
        const err = {
            errMsg: 'accelerometer is not supported'
        }
        fail?.(err)
    } else {
        try {
            const intervalObj = INTERVAL_MAP[interval]
            if (devicemotionListener) {
                stopAccelerometer()
            }
            devicemotionListener = getDevicemotionListener(intervalObj.interval)
            window.addEventListener('devicemotion', devicemotionListener, true)
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
 * 开始监听加速度数据。
 */
export const startAccelerometer = promisify(limited.async('startAccelerometer', startAccelerometerInternal))

/**
 * 监听加速度数据事件。频率根据 Taro.startAccelerometer() 的 interval 参数。可使用 Taro.stopAccelerometer() 停止监听。
 */
export const onAccelerometerChange = callback => {
    callbackManager.add(callback)
}

/**
 * 取消监听加速度数据事件，参数为空，则取消所有的事件监听
 */
export const offAccelerometerChange = callback => {
    callbackManager.remove(callback)
}
