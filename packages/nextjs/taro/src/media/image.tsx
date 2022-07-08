import ReactDOM from 'react-dom'
import promisify from 'mpromisify'
import {limited, unsupported} from '../_util'
import {createInput} from '../_util/dom'
import type * as swan from '../swan'

const chooseImageInternal: typeof swan.chooseImage = ({
    count = 1,
    success,
    complete,
    sourceType = ['album', 'camera']
}) => {
    const el = createInput(sourceType)
    if (count > 1) {
        el.setAttribute('multiple', 'multiple')
    }
    el.setAttribute('accept', 'image/*')

    el.onchange = e => {
        const result: swan.chooseImage.ParamPropSuccessParam = {
            tempFilePaths: [],
            tempFiles: []
        }
        const target = e.target as HTMLInputElement
        const files = target.files ? Array.from(target.files) : []
        for (const file of files) {
            const blob = new Blob([file], {
                type: file.type
            })
            const url = URL.createObjectURL(blob)
            result.tempFilePaths.push(url)
            result.tempFiles?.push({
                path: url,
                size: file.size
            })
        }

        success(result)
        complete?.()
    }

    const event = document.createEvent('MouseEvents')
    event.initEvent('click', true, true)
    el.dispatchEvent(event)
}

/**
 * 从本地相册选择图片或使用相机拍照。
 *
 * @example
 * ```javascript
 * Taro.chooseImage({
 *   count: 1, // 默认9
 *   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
 *   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
 *   success: function (res) {
 *     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
 *     var tempFilePaths = res.tempFilePaths
 *   }
 * })
 * ```
 */
export const chooseImage = promisify(limited.async('chooseImage', chooseImageInternal))

interface PreviewProps {
    /**
     * 当前显示图片的链接，不填则默认为 urls 的第一张
     */
    defaultCurrent?: string

    /**
     * 需要预览的图片链接列表
     */
    urls: string[]

    /**
     * 关闭时触发
     */
    onClose?: () => void;
}

type PreviewType = React.ComponentType<PreviewProps>

let Preview: PreviewType | null = null

/**
 * 内部方法，注册预览组件
 */
export function registerPreviewComponent(Target: PreviewType): void {
    Preview = Target
}

let previewContainer: HTMLDivElement | null = null

const previewImageInternal: typeof swan.previewImage = ({
    current,
    urls,
    success,
    fail,
    complete
}) => {
    if (!Preview) {
        if (process.env.NODE_ENV === 'development') {
            console.error('`Preview` component is not registered.')
        }
        return
    }

    if (previewContainer) {
        return
    }

    if (!urls) {
        fail?.({
            errMsg: 'The urls param is required.'
        })
        complete?.()
        return
    }

    previewContainer = document.createElement('div')
    document.body.appendChild(previewContainer)
    ReactDOM.render(
        <Preview
            defaultCurrent={current}
            urls={urls}
            onClose={() => {
                ReactDOM.unmountComponentAtNode(previewContainer!)
                previewContainer = null
            }}
        />,
        previewContainer
    )
    success?.({})
}

/**
 * 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。
 *
 * @example
 * ```javascript
 * Taro.previewImage({
 *   current: '', // 当前显示图片的http链接
 *   urls: [] // 需要预览的图片http链接列表
 * })
 * ```
 */
export  const previewImage = promisify(limited.async('previewImage', previewImageInternal))

/**
 * 获取图片信息
 *
 * **示例代码：**
 *
 * ```javascript
 * Taro.getImageInfo({
 *   src: 'images/a.jpg',
 *   success: export function (res) {
 *     console.log(res.width)
 *     console.log(res.height)
 *   }
 * })
 *
 * Taro.chooseImage({
 *   success: export function (res) {
 *     Taro.getImageInfo({
 *       src: res.tempFilePaths[0],
 *       success: export function (res) {
 *         console.log(res.width)
 *         console.log(res.height)
 *       }
 *     })
 *   }
 * })
 * ```
 */
const getImageInfoInternal: typeof swan.getImageInfo = ({
    src,
    success,
    fail,
    complete
}) => {
    fetch(src)
        .then(res => res.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob)
            const image = new Image()
            image.onload = () => {
                success?.({
                    width: image.naturalWidth,
                    height: image.naturalHeight,
                    path: url,
                    orientation: 'up',
                    type: blob.type
                })
                complete?.()
            }
            image.onerror = (e: any) => {
                fail?.({
                    errMsg: e.message
                })
                complete?.()
            }
            image.src = url
        })
        .catch(err => {
            fail?.({
                errMsg: err.message
            })
            complete?.()
        })
}

export const getImageInfo = limited.async('getImageInfo', getImageInfoInternal)

export const saveImageToPhotosAlbum = unsupported.async('saveImageToPhotosAlbum')

export const compressImage = unsupported.async('compressImage')
