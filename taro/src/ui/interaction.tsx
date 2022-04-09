import ReactDOM from 'react-dom'
import {Toast} from '../../../components'

namespace showToast {
    export type Param = {
        /**
         * 提示的内容
         */
        title: string
        /**
         * 图标，有效值 "success", "loading", "none"
         *
         * **icon有效值：**
         *
         *   有效值    |  说明                                 | 最低版本
         * ------------|---------------------------------------|----------
         *   success   |显示成功图标，此时 title 文本最多显示 7 个汉字长度。默认值|
         *   loading   |显示加载图标，此时 title 文本最多显示 7 个汉字长度。|
         *   none      |不显示图标，此时 title 文本最多可显示两行|  1.9.0
         */
        icon?: 'success' | 'loading' | 'none'
        /**
         * 自定义图标的本地路径，image 的优先级高于 icon
         */
        image?: string
        /**
         * 提示的延迟时间，单位毫秒，默认：1500
         */
        duration?: number
        /**
         * 是否显示透明蒙层，防止触摸穿透，默认：false
         */
        mask?: boolean
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
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}

export function showToast() {

}

export function hideToat() {

}

namespace showLoading {
    export type Param = {
        /**
         * 提示的内容
         */
        title: string
        /**
         * 是否显示透明蒙层，防止触摸穿透，默认：false
         */
        mask?: boolean
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
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}

let toastContainer: HTMLDivElement | null = null

export function showLoading({title = '正在加载...'}: showLoading.Param) {
    if (toastContainer) {
        return
    }
    toastContainer = document.createElement('div')
    document.body.appendChild(toastContainer)
    ReactDOM.render(
        <Toast
            show
            icon='loading'
            iconSize='large'
        >
            {title}
        </Toast>,
        toastContainer
    )
}

export function hideLoading() {
    if (toastContainer) {
        ReactDOM.unmountComponentAtNode(toastContainer)
        toastContainer = null
    }
}
