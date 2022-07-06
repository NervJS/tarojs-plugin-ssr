import promisify from 'mpromisify'
import {limited} from '../_util'
import type * as swan from '../swan'

const canvasGetImageDataInternal: typeof swan.canvasGetImageData = ({
    canvasId,
    success,
    fail,
    complete,
    x,
    y,
    width,
    height
}) => {
    if (typeof canvasId !== 'string') {
        fail?.({
            errMsg: `The canvasId param is required.`
        })
        complete?.()
        return
    }

    const canvas = document.querySelector(`canvas[canvas-id="${canvasId}"]`) as HTMLCanvasElement
    if (!canvas) {
        fail?.({
            errMsg: `Cannot find canvas by using canvasId: ${canvasId}.`
        })
        complete?.()
        return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
        fail?.({
            errMsg: 'Your browser does not support canvas api.'
        })
        complete?.()
        return
    }

    try {
        const imageData = ctx.getImageData(x, y, width, height)
        success?.({
            width,
            height,
            data: imageData.data
        })
    } catch (err) {
        fail?.({
            errMsg: err.message
        })
    }
    complete?.()
}

/**
 * 获取 canvas 区域隐含的像素数据。
 */
export const canvasGetImageData = promisify(limited.async('canvasGetImageData', canvasGetImageDataInternal))
