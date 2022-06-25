import promisify from 'mpromisify'
import {limited} from '../_util'
import type * as swan from '../swan'

let globalTextArea: HTMLTextAreaElement | null = null

const setClipboardDataInternal: typeof swan.setClipboardData = ({data, success, fail, complete}) => {
    // 使用 try/catch 尝试是否支持 navigator.clipboard，如果不支持会在浏览器中看到 DOMExceptions。
    try {
        navigator.clipboard.writeText(data)
            .then(() => {
                success?.()
            })
            .catch(err => {
                fail?.({
                    errMsg: err.message
                })
            })
            .finally(() => {
                complete?.()
            })
        return
    }
    catch { }

    // 回退 textarea 和 execCommand 方案解决
    const activeElement = document.activeElement

    if (!globalTextArea) {
        globalTextArea = document.createElement('textarea')
        globalTextArea.setAttribute('aria-hidden', 'true')
        const textArea: HTMLTextAreaElement = document.body.appendChild(globalTextArea)
        textArea.style.height = '1px'
        textArea.style.width = '1px'
        textArea.style.position = 'absolute'
    }

    globalTextArea.value = data
    globalTextArea.focus()
    globalTextArea.select()

    document.execCommand('copy')

    if (activeElement instanceof HTMLElement) {
        activeElement.focus()
    }

    document.body.removeChild(globalTextArea)

    success?.()
    complete?.()
}

/**
 * 设置系统剪贴板的内容
 */
export const setClipboardData = promisify(limited.async('setClipboardData', setClipboardDataInternal))

const getClipboardDataInternal: typeof swan.getClipboardData = ({success, complete}) => {
    const res = {
        data: globalTextArea ? globalTextArea.value : ''
    }
    success?.(res)
    complete?.()
}

/**
 * 获取系统剪贴板的内容
 */
export const getClipboardData = promisify(limited.async('getClipboardData', getClipboardDataInternal))
