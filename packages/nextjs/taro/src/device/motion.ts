import promisify from 'mpromisify'
import {CallbackManager} from '../utils/handler'
import {limited} from '../utils'
import type * as swan from '../swan'

const callbackManager = new CallbackManager()
let deviceMotionListener

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

const stopDeviceMotionListeningInternal = ({success, fail, complete}) => {
    try {
        window.removeEventListener('deviceorientation', deviceMotionListener, true)
        success?.()
    } catch (e) {
        fail?.({ errMsg: (e as any).message })
    }
    complete?.()
}

/**
 * 停止监听设备方向的变化。
 */
export const stopDeviceMotionListening = promisify(limited.async('stopDeviceMotionListening', stopDeviceMotionListeningInternal))

const getDeviceOrientationListener = interval => {
    let lock
    let timer
    return evt => {
        if (lock) return
        lock = true
        timer && clearTimeout(timer)
        callbackManager.trigger({
            alpha: evt.alpha,
            beta: evt.beta,
            gamma: evt.gamma
        })
        timer = setTimeout(() => { lock = false }, interval)
    }
}

const startDeviceMotionListeningInternal = ({interval = 'normal', success, fail, complete}) => {
    if (!window.DeviceOrientationEvent) {
        fail?.({
            errMsg: 'deviceMotion is not supported'
        })
    } else {
        try {
            const intervalObj = INTERVAL_MAP[interval]
            if (window.DeviceOrientationEvent) {
                if (deviceMotionListener) {
                    stopDeviceMotionListening()
                }
                deviceMotionListener = getDeviceOrientationListener(intervalObj.interval)
                window.addEventListener('deviceorientation', deviceMotionListener, true)
            } else {
                throw new Error('deviceMotion is not supported')
            }
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
 * 开始监听设备方向的变化。
 */
export const startDeviceMotionListening = promisify(limited.async('startDeviceMotionListening', startDeviceMotionListeningInternal))

/**
 * 监听设备方向变化事件。
 */
export const onDeviceMotionChange = callback => {
    callbackManager.add(callback)
}

/**
 * 取消监听设备方向变化事件，参数为空，则取消所有的事件监听。
 */
export const offDeviceMotionChange = callback => {
    callbackManager.remove(callback)
}
