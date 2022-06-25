import promisify from 'mpromisify'
import {limited} from '../_util'
import type * as swan from '../swan'

const canvasToTempFilePathInternal: typeof swan.canvasToTempFilePath = ({
    canvasId,
    fileType,
    quality,
    success,
    fail,
    complete
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

    try {
        const dataURL = canvas.toDataURL(`image/${fileType || 'png'}`, quality)
        success?.({
            tempFilePath: dataURL
        })
    } catch (err) {
        fail?.({
            errMsg: err.message
        })
    }
    complete?.()
}

/**
 * 把当前画布指定区域的内容导出生成指定大小的图片。在 draw() 回调里调用该方法才能保证图片导出成功。
 * @todo 暂未支持尺寸相关功能
 */
export const canvasToTempFilePath = promisify(limited.async('canvasToTempFilePath', canvasToTempFilePathInternal))
