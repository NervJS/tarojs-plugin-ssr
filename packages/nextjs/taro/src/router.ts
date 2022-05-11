import promisify from 'mpromisify'
import {getTaroApp} from './internal'

export function switchTab() {
}

export function reLaunch(param: swan.reLaunch.Param) {
    const taroApp = getTaroApp()
    return promisify(taroApp.reLaunch)(param)
}

export function redirectTo(param: swan.redirectTo.Param) {
    const taroApp = getTaroApp()
    return promisify(taroApp.redirectTo)(param)
}

export function navigateTo(param: swan.navigateTo.Param) {
    const taroApp = getTaroApp()
    return promisify(taroApp.navigateTo)(param)
}

export function navigateBack(param: swan.navigateBack.Param) {
    const taroApp = getTaroApp()
    return promisify(taroApp.navigateBack)(param)
}
