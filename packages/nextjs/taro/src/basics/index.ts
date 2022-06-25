import {fromByteArray, toByteArray} from 'base64-js'
import {unsupported} from '../_util'

/**
 * 判断智能小程序的 API ，回调，参数，组件等是否在当前版本和当前系统下可用。
 */
export const canIUse = unsupported.never('canIUse')

/**
 * 将 ArrayBuffer 对象转成 Base64 字符串
 */
export const arrayBufferToBase64 = fromByteArray

/**
 * 将 Base64 字符串转成 ArrayBuffer 对象
 */
export const base64ToArrayBuffer = toByteArray

export * from './system'
export * from './update'
export * from './debug'
export * from './performance'
