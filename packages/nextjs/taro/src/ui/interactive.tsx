import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import promisify from 'mpromisify'
import {limited} from '../_util'
import * as swan from '../swan'

/**
 * Toast 组件必要的属性
 */
interface ToastProps {
    /**
     * Toast 图标
     */
    icon?: string

    /**
     * Toast 图标大小
     */
    iconSize?: number

    /**
     * Display toast
     */
    visible?: boolean

    /**
     * Toast 内容
     */
    children?: React.ReactNode
}

type ToastComponentType = React.ComponentType<ToastProps>

class GlobalToast {
    component?: ToastComponentType

    container?: HTMLDivElement

    timer?: ReturnType<typeof setTimeout>

    unmountedCallback?: () => void

    constructor() {
        this.container = document.createElement('div')
    }

    registerToastComponent(toastComponent: ToastComponentType): void {
        this.component = toastComponent
    }

    new({duration, ...rest}: ToastProps & {duration?: number}, callback?: () => void): void {
        if (!this.component) {
            throw new Error('`Toast` component is not registered.')
        }

        this.destroy()
        document.body.appendChild(this.container)
        const Toast = this.component

        const ToastContainer: React.FC = () => {
            useEffect(() => () => {
                this.unmountedCallback?.()
            }, [])

            return <Toast visible {...rest} />
        }

        ReactDOM.render(
            <Toast visible {...rest} />,
            this.container,
            () => {
                callback?.()
                if (typeof duration === 'number') {
                    setTimeout(() => {
                        this.destroy()
                    }, duration)
                }
            }
        )
    }

    destroy(callback?: () => void): void {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container)
            this.unmountedCallback = callback
        }
    }
}

let globalToast = typeof window !== 'undefined' ? new GlobalToast() : null

/**
 * 内部方法，注册 Toast 组件
 */
export const registerToastComponent = toastComponent => {
    globalToast?.registerToastComponent(toastComponent)
}

const showToastInternal: typeof swan.showToast = ({title, icon, duration = 1500, success, fail, complete}) => {
    try {
        globalToast.new(
            {
                icon: icon === 'none' ? undefined : icon,
                children: title,
                duration
            },
            () => {
                success?.()
                complete?.()
            }
        )
    } catch (error) {
        fail?.({
            errMsg: error.message
        })
        complete?.()
    }
}

/**
 * 显示消息提示框，用以提供成功、警告和错误等反馈信息。
 */
export const showToast = promisify(limited.async('showToast', showToastInternal))

const hideToastInternal: typeof swan.hideToast = ({success, complete}) => {
    globalToast.destroy(() => {
        success?.()
        complete?.()
    })
}

/**
 * 隐藏消息提示框。
 */
export const hideToast = promisify(limited.async('hideToast', hideToastInternal))

const showLoadingInternal: typeof swan.showLoading = ({title = '正在加载...', success, complete}) => {
    globalToast.new(
        {
            icon: 'loading',
            children: title
        },
        () => {
            success?.()
            complete?.()
        }
    )
}

/**
 * 显示 loading 提示框, 需主动调用 hideLoading 才能关闭提示框。
 */
export const showLoading = promisify(limited.async('showLoading', showLoadingInternal))

const hideLoadingInternal: typeof swan.hideLoading = ({success, complete}) => {
    globalToast.destroy(() => {
        success?.()
        complete?.()
    })
}

/**
 * 隐藏 loading 提示框。
 */
export const hideLoading = promisify(limited.async('hideLoading', hideLoadingInternal))
