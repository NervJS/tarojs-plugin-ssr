import {easeInOutCubic} from '../_util'
import raf from '../raf'

namespace pageScrollTo {
    export type Param = {
        /**
         * 滚动到页面的目标位置（单位px）
         */
        scrollTop: number
        /**
         * 滚动动画的时长，默认300ms，单位 ms
         */
        duration?: number
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = () => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}

function pageScrollTo({scrollTop, duration = 300, success, complete}: pageScrollTo.Param): void {
    const pageYOffset = window.pageYOffset
    const startTime = Date.now()

    const frameFunc = () => {
        const timestamp = Date.now()
        const time = timestamp - startTime
        const nextScrollTop = easeInOutCubic(time > duration ? duration : time, pageYOffset, scrollTop, duration)
        window.scrollTo(window.pageXOffset, nextScrollTop)
        if (time < duration) {
            raf(frameFunc)
        } else {
            success?.()
            complete?.()
        }
    }
    raf(frameFunc)
}

export default pageScrollTo
