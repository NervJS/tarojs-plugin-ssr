import promisify from 'mpromisify'
import {limited} from './utils'
import type * as swan from './swan'

const getLocationInternal: typeof swan.getLocation = ({
    type = 'wgs84',
    altitude,
    success,
    fail,
    complete
}) => {
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
            const result: swan.getLocation.ParamPropSuccessParam = {
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
                verticalAccuracy: altitudeAccuracy || 0
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

export const getLocation = promisify(limited.async('getLocation', getLocationInternal))
