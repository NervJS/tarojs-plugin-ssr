import promisify from 'mpromisify'

namespace getLocation {
    export type Param = {
        /**
         * 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于`swan.openLocation`的坐标
         */
        type?: string
        /**
         * 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
         */
        altitude?: boolean
        /**
         * 接口调用成功的回调函数，返回内容详见返回参数说明。
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
     * 接口调用成功的回调函数，返回内容详见返回参数说明。
     */
    export type ParamPropSuccess = (res: ParamPropSuccessParam) => any
    export type ParamPropSuccessParam = {
        /**
         * 纬度，浮点数，范围为-90~90，负数表示南纬
         */
        latitude: any
        /**
         * 经度，浮点数，范围为-180~180，负数表示西经
         */
        longitude: any
        /**
         * 速度，浮点数，单位m/s
         */
        speed: any
        /**
         * 位置的精确度
         */
        accuracy: any
        /**
         * 高度，单位 m
         */
        altitude: any
        /**
         * 垂直精度，单位 m（Android 无法获取，返回 0）
         */
        verticalAccuracy: any
        /**
         * 水平精度，单位 m
         */
        horizontalAccuracy: any
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

const getLocationInternal = ({
    type = 'wgs84',
    altitude,
    success,
    fail,
    complete
}: getLocation.Param): void => {
    const positionOptions: PositionOptions = {
        enableHighAccuracy: !!altitude, // 海拔定位需要高精度
        timeout: 3_000,
        maximumAge: 900_000
    }

    // Web端暂时仅支持GPS坐标系
    if (type.toUpperCase() !== 'WGS84') {
        fail?.({
            errMsg: 'This coordinate system type is not temporarily supported'
        })
        complete?.()
        return
    }

    if (!navigator.geolocation) {
        fail?.({
            errMsg: 'getLocation is not support'
        })
        complete?.()
        return
    }

    navigator.geolocation.getCurrentPosition(
        position => {
            const {accuracy, altitude, latitude, longitude, altitudeAccuracy} = position.coords
            const result: Taro.getLocation.SuccessCallbackResult = {
                /** 位置的精确度 */
                accuracy,
                /** 高度，单位 m */
                altitude: altitude || 0,
                /** 水平精度，单位 m */
                horizontalAccuracy: accuracy,
                /** 纬度，范围为 -90~90，负数表示南纬 */
                latitude,
                /** 经度，范围为 -180~180，负数表示西经 */
                longitude,
                /** 速度，单位 m/s */
                speed: position.coords.speed!,
                /** 垂直精度，单位 m（Android 无法获取，返回 0） */
                verticalAccuracy: altitudeAccuracy || 0,
                /** 调用结果,自动补充 */
                errMsg: ''
            }
            success(result)
            complete?.()
        },
        err => {
            fail?.({
                errMsg: err.message
            })
            complete?.()
        },
        positionOptions
    )
}

export const getLocation = promisify(getLocationInternal)
