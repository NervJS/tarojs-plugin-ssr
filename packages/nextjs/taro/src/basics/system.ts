import MobileDetect from 'mobile-detect'
import promisify from 'mpromisify'
import {unsupported, limited ,isAndroid} from '../_util'
import type * as swan from '../swan'

/**
 * 跳转系统蓝牙设置页
 */
export const openSystemBluetoothSetting = unsupported._void('openSystemBluetoothSetting')

/**
 * 跳转系统微信授权管理页
 */
export const openAppAuthorizeSetting = unsupported._void('openAppAuthorizeSetting')

const getWindowInfoInternal = () => ({
    /** 设备像素比 */
    pixelRatio: window.devicePixelRatio,
    /** 屏幕宽度，单位px */
    screenWidth: window.screen.width,
    /** 屏幕高度，单位px */
    screenHeight: window.screen.height,
    /** 可使用窗口宽度，单位px */
    windowWidth: document.documentElement.clientWidth,
    /** 可使用窗口高度，单位px */
    windowHeight: document.documentElement.clientHeight,
    /** 导航栏的高度，单位px */
    navigationBarHeight: isAndroid() ? 38 : 44,
    /** 状态栏的高度，单位px */
    statusBarHeight: 0,
    /** 在竖屏正方向下的安全区域 */
    safeArea: {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0
    }
})

/**
 * 获取窗口信息
 */
export const getWindowInfo = limited.never('getWindowInfo', getWindowInfoInternal)

const getSystemSettingInternal = () => ({
    /** 蓝牙的系统开关 */
    bluetoothEnabled: false,
    /** 地理位置的系统开关 */
    locationEnabled: false,
    /** Wi-Fi 的系统开关 */
    wifiEnabled: false,
    /** 设备方向 */
    deviceOrientation: window.screen.width >= window.screen.height ? 'landscape' : 'portrait'
})

/**
 * 获取设备设置
 */
export const getSystemSetting = limited.never('getSystemSetting', getSystemSettingInternal)

const getDeviceInfoInternal = () => {
    const md = new MobileDetect(navigator.userAgent)
    return {
        /** 应用二进制接口类型（仅 Android 支持） */
        abi: '',
        /** 设备性能等级（仅Android小游戏）。取值为：-2 或 0（该设备无法运行小游戏），-1（性能未知），>=1（设备性能值，该值越高，设备性能越好，目前最高不到50） */
        benchmarkLevel: -1,
        /** 设备品牌 */
        brand: md.mobile() || '',
        /** 设备型号 */
        model: md.mobile() || '',
        /** 操作系统及版本 */
        system: md.os(),
        /** 客户端平台 */
        platform: navigator.platform
    }
}

/**
 * 获取设备设置
 */
export const getDeviceInfo = limited.never('getDeviceInfo', getDeviceInfoInternal)

const getAppBaseInfoInternal = () => {
    let isDarkMode = false
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDarkMode = true
    }

    return {
        /** 客户端基础库版本 */
        SDKVersion: '',
        /** 是否已打开调试。可通过右上角菜单或 [Taro.setEnableDebug](/docs/apis/base/debug/setEnableDebug) 打开调试。 */
        enableDebug: process.env.NODE_ENV === 'development',
        /** 当前小程序运行的宿主环境 */
        // host: { appId: '' },
        /** 微信设置的语言 */
        language: navigator.language,
        /** 微信版本号 */
        version: '',
        /** 系统当前主题，取值为light或dark，全局配置"darkmode":true时才能获取，否则为 undefined （不支持小游戏） */
        theme: isDarkMode ? 'dark' : 'light'
    }
}

/**
 * 获取微信APP基础信息
 */
export const getAppBaseInfo = limited.never('getAppBaseInfo', getAppBaseInfoInternal)

/**
 * 获取微信APP授权设置
 */
export const getAppAuthorizeSetting = () => ({
    /** 允许微信使用相册的开关（仅 iOS 有效） */
    albumAuthorized: 'not determined',
    /** 允许微信使用蓝牙的开关（仅 iOS 有效） */
    bluetoothAuthorized: 'not determined',
    /** 允许微信使用摄像头的开关 */
    cameraAuthorized: 'not determined',
    /** 允许微信使用定位的开关 */
    locationAuthorized: 'not determined',
    /** 定位准确度。true 表示模糊定位，false 表示精确定位（仅 iOS 有效） */
    locationReducedAccuracy: false,
    /** 允许微信使用麦克风的开关 */
    microphoneAuthorized: 'not determined',
    /** 允许微信通知的开关 */
    notificationAuthorized: 'not determined',
    /** 允许微信通知带有提醒的开关（仅 iOS 有效） */
    notificationAlertAuthorized: 'not determined',
    /** 允许微信通知带有标记的开关（仅 iOS 有效） */
    notificationBadgeAuthorized: 'not determined',
    /** 允许微信通知带有声音的开关（仅 iOS 有效） */
    notificationSoundAuthorized: 'not determined',
    /** 允许微信使用日历的开关 */
    phoneCalendarAuthorized: 'not determined'
})

const getSystemInfoSyncInternal = () => {
    const windowInfo = getWindowInfoInternal()
    const systemSetting = getSystemSettingInternal()
    const deviceInfo = getDeviceInfo()
    const appBaseInfo = getAppBaseInfoInternal()
    const appAuthorizeSetting = getAppAuthorizeSetting()
    delete deviceInfo.abi

    return {
        ...windowInfo,
        ...systemSetting,
        ...deviceInfo,
        ...appBaseInfo,
        /** 用户字体大小（单位px）。以微信客户端「我-设置-通用-字体大小」中的设置为准 */
        fontSizeSetting: 2,
        /** 允许微信使用相册的开关（仅 iOS 有效） */
        albumAuthorized: appAuthorizeSetting.albumAuthorized === 'authorized',
        /** 允许微信使用摄像头的开关 */
        cameraAuthorized: appAuthorizeSetting.cameraAuthorized === 'authorized',
        /** 允许微信使用定位的开关 */
        locationAuthorized: appAuthorizeSetting.locationAuthorized === 'authorized',
        /** 允许微信使用麦克风的开关 */
        microphoneAuthorized: appAuthorizeSetting.microphoneAuthorized === 'authorized',
        /** 允许微信通知的开关 */
        notificationAuthorized: appAuthorizeSetting.notificationAuthorized === 'authorized',
        /** 允许微信通知带有提醒的开关（仅 iOS 有效） */
        notificationAlertAuthorized: appAuthorizeSetting.notificationAlertAuthorized === 'authorized',
        /** 允许微信通知带有标记的开关（仅 iOS 有效） */
        notificationBadgeAuthorized: appAuthorizeSetting.notificationBadgeAuthorized === 'authorized',
        /** 允许微信通知带有声音的开关（仅 iOS 有效） */
        notificationSoundAuthorized: appAuthorizeSetting.notificationSoundAuthorized === 'authorized',
        /** 允许微信使用日历的开关 */
        phoneCalendarAuthorized: appAuthorizeSetting.phoneCalendarAuthorized === 'authorized',
        /** `true` 表示模糊定位，`false` 表示精确定位，仅 iOS 支持 */
        locationReducedAccuracy: appAuthorizeSetting.locationReducedAccuracy,
        /** 小程序当前运行环境 */
        environment: ''
    }
}

/**
 * 获取设备设置
 */
export const getSystemInfoSync = limited.never('getSystemInfoSync', getSystemInfoSyncInternal)

const getSystemInfoInternal: typeof swan.getSystemInfo = ({success, complete}) => {
    const info = getSystemInfoSyncInternal()
    success?.(info)
    complete?.()
}

/**
 * 获取系统信息
 */
 export const getSystemInfoAsync = promisify(limited.never('getSystemInfoAsync', getSystemInfoInternal))

/**
 * 获取系统信息
 */
export const getSystemInfo = promisify(limited.never('getSystemInfo', getSystemInfoInternal))
