import {isAndroid} from '../utils'

/** 菜单按钮的布局位置信息 */
interface ClientRect {
    /** 下边界坐标，单位：px */
    bottom: number
    /** 高度，单位：px */
    height: number
    /** 左边界坐标，单位：px */
    left: number
    /** 右边界坐标，单位：px */
    right: number
    /** 上边界坐标，单位：px */
    top: number
    /** 宽度，单位：px */
    width: number
}

export function getMenuButtonBoundingClientRect(): ClientRect {
    if (typeof window === 'undefined') {
        throw new Error('`getMenuButtonBoundingClientRect` cannot be called on server-side.')
    }

    const android = isAndroid()

    return {
        height: android ? 28 : 32,
        width: 0,
        top: android ? 5 : 6,
        bottom: android ? 33 : 38,
        left: window.screen.width - 10,
        right: window.screen.width - 10
    }
}
