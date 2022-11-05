import promisify from 'mpromisify'
import {limited} from '../_util'
import bridge from '../bridge'

/**
 * 显示消息提示框，用以提供成功、警告和错误等反馈信息。
 */
export const showToast = promisify(limited.async('showToast', bridge.showToast))

/**
 * 隐藏消息提示框。
 */
export const hideToast = promisify(limited.async('hideToast', bridge.hideToast))

/**
 * 显示 loading 提示框, 需主动调用 hideLoading 才能关闭提示框。
 */
export const showLoading = promisify(limited.async('showLoading', bridge.showLoading))

/**
 * 隐藏 loading 提示框。
 */
export const hideLoading = promisify(limited.async('hideLoading', bridge.hideLoading))

/**
 * 显示模态弹窗。
 */
export const showModal = promisify(limited.async('showModal', bridge.showModal))
