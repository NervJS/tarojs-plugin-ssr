import promisify from 'mpromisify'
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
    if (typeof window === 'undefined') {
        throw new Error('`canvasGetImageData` does nothing on the server-side.')
    }

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

    try {
        const ctx = canvas.getContext('2d')
        const imageData = ctx.getImageData(x, y, width, height)
        const data = new Uint8ClampedArray(imageData.data)
        success?.({
            width,
            height,
            data
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
export const canvasGetImageData = promisify(canvasGetImageDataInternal)
