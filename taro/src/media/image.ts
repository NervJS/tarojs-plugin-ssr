namespace chooseImage {
    export type Param = {
        /**
         * 最多可以选择的图片张数，默认9
         */
        count?: number
        /**
         * original 原图，compressed 压缩图，默认二者都有
         */
        sizeType?: string[]
        /**
         * album 从相册选图，camera 使用相机，默认二者都有
         */
        sourceType?: string[]
        /**
         * 成功则返回图片的本地文件路径列表 tempFilePaths
         */
        success: ParamPropSuccess
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
     * 成功则返回图片的本地文件路径列表 tempFilePaths
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 图片的本地文件路径列表
         */
        tempFilePaths: string[]
        /**
         * 图片的本地文件列表，每一项是一个 File 对象
         *
         */
        tempFiles: ParamPropSuccessParamPropTempFiles
    }
    /**
     * 图片的本地文件列表，每一项是一个 File 对象
     */
    export type ParamPropSuccessParamPropTempFiles = ParamPropSuccessParamPropTempFilesItem[]
    export type ParamPropSuccessParamPropTempFilesItem = {
        /**
         * 本地文件路径
         */
        path: string
        /**
         * 本地文件大小，单位：B
         */
        size: number
    }
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}

/**
 * 从本地相册选择图片或使用相机拍照。
 *
 * **示例代码：**
 *
 *     ```javascript
 *     Taro.chooseImage({
 *       count: 1, // 默认9
 *       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
 *       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
 *       success: function (res) {
 *         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
 *         var tempFilePaths = res.tempFilePaths
 *       }
 *     })
 *     ```
 * 
 */
export function chooseImage({
    count = 1,
    success,
    complete,
    sourceType = ['album', 'camera']
}: chooseImage.Param): void {
    const result: chooseImage.ParamPropSuccessParam = {
        tempFilePaths: [],
        tempFiles: []
    }

    const el = document.createElement('input')
    el.setAttribute('type', 'file')
    if (count > 1) {
        el.setAttribute('multiple', 'multiple')
    }
    if (Array.isArray(sourceType) && sourceType.length) {
        el.setAttribute('capture', sourceType.join(','))
    }
    el.setAttribute('accept', 'image/*')
    el.setAttribute('style', 'position: fixed; top: -4000px; left: -3000px; z-index: -300;')
    document.body.appendChild(el)

    el.onchange = e => {
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
