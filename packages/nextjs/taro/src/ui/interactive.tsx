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

class Portals<T> {
    name: string

    component?: React.ComponentType<T>

    container: HTMLDivElement

    timer?: ReturnType<typeof setTimeout>

    unmountedCallback?: () => void

    constructor(name: string) {
        this.name = name
        this.container = document.createElement('div')
    }

    registerComponent = (component: React.ComponentType<T>): void => {
        this.component = component
    }

    new = ({duration, ...rest}: T & {duration?: number}, callback?: () => void): void => {
        if (!this.component) {
            throw new Error(`\`${this.name}\` component is not registered.`)
        }

        this.destroy()
        document.body.appendChild(this.container)
        const Target = this.component

        const Container: React.FC = () => {
            useEffect(() => () => {
                this.unmountedCallback?.()
            }, [])

            return <Target {...rest as T} />
        }

        ReactDOM.render(
            <Container />,
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

    destroy = (callback?: () => void): void => {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        if (this.container) {
            ReactDOM.unmountComponentAtNode(this.container)
            this.unmountedCallback = callback
        }
    }
}

let globalToast = typeof window !== 'undefined' ? new Portals<ToastProps>('Toast') : null

/**
 * 内部方法，注册 Toast 组件
 */
export const registerToastComponent = toastComponent => {
    globalToast?.registerComponent(toastComponent)
}

const showToastInternal: typeof swan.showToast = ({title, icon, duration = 1500, success, fail, complete}) => {
    try {
        globalToast?.new(
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
    globalToast?.destroy(() => {
        success?.()
        complete?.()
    })
}

/**
 * 隐藏消息提示框。
 */
export const hideToast = promisify(limited.async('hideToast', hideToastInternal))

const showLoadingInternal: typeof swan.showLoading = ({title = '正在加载...', success, complete}) => {
    globalToast?.new(
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
    globalToast?.destroy(() => {
        success?.()
        complete?.()
    })
}

/**
 * 隐藏 loading 提示框。
 */
export const hideLoading = promisify(limited.async('hideLoading', hideLoadingInternal))

/**
 * Modal 组件必要的属性
 */
interface ModalProps {
    /**
     * Display Modal
     */
    visible?: boolean

    /**
     * 提示的标题
     */
    title?: string

    /**
     * 是否显示取消按钮
     * @default true
     */
    showCancel?: boolean

    /**
     * 取消按钮的文字，最多 4 个字符
     */
    cancelText?: string

    /**
     * 取消按钮的文字颜色，必须是 16 进制格式的颜色字符串
     * @default '#000'
     */
    cancelColor?: string

    /**
     * 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
     */
    confirmColor?: string

    /**
     * 确认按钮的文字，最多 4 个字符
     */
    confirmText?: string

    /**
     * 提示的内容
     */
    children?: React.ReactNode

    /**
     * 点击取消
     */
    onCancel?: () => void

    /**
     * 点击确定
     */
    onConfirm?: () => void
}


let globalModal = typeof window !== 'undefined' ? new Portals<ModalProps>('Modal') : null

/**
 * 内部方法，注册 Modal 组件
 */
export const registerModalComponent = modalComponent => {
    globalModal?.registerComponent(modalComponent)
}

const showModalInternal: typeof swan.showModal = ({
    title,
    content,
    showCancel,
    cancelText,
    cancelColor,
    confirmText,
    confirmColor,
    success,
    complete
}) => {
    globalModal?.new({
        title,
        children: content,
        showCancel,
        cancelText,
        cancelColor,
        confirmText,
        confirmColor,
        onCancel() {
            success?.({
                confirm: false,
                cancel: true
            })
            complete?.()
        },
        onConfirm() {
            success?.({
                confirm: true,
                cancel: false
            })
            complete?.()
        }
    })
}

/**
 * 显示模态弹窗。
 */
export const showModal = promisify(limited.async('showModal', showModalInternal))
