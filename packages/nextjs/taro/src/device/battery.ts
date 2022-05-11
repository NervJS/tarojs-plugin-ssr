import { temporarilyNotSupport } from '../utils'
import { MethodHandler } from '../utils/handler'


export const getBatteryInfoSync = temporarilyNotSupport('getBatteryInfoSync')

export const getBatteryInfo = async ({success, fail, complete} = {} as any) => {
    const handle = new MethodHandler({ name: 'getBatteryInfo', success, fail, complete })
    try {
        // @ts-ignore
        const battery = await navigator.getBattery?.()
        return handle.success({
            isCharging: battery.charging,
            level: Number(battery.level || 0) * 100
        })
    } catch (error) {
        return handle.fail({
            errMsg: error?.message || error
        })
    }
}
