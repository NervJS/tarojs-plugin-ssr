import {
    // debug
    setEnableDebug,
    getRealtimeLogManager,
    getLogManager,

    getWindowInfo,
    getSystemSetting,
    getDeviceInfo,
    getAppBaseInfo,
    getAppAuthorizeSetting,
    getSystemInfoSync,
    getSystemInfoAsync,
    getSystemInfo
} from './basics'

import {
    createOffscreenCanvas,
    createCanvasContext,
    canvasToTempFilePath,
    canvasPutImageData,
    canvasGetImageData
} from './canvas'

import {
    // accelerometer
    stopAccelerometer,
    startAccelerometer,
    onAccelerometerChange,
    offAccelerometerChange,

    // battery
    getBatteryInfoSync,
    getBatteryInfo,

    // clipboard
    setClipboardData,
    getClipboardData,

    // compass
    stopCompass,
    startCompass,
    onCompassChange,
    offCompassChange,

    // motion
    stopDeviceMotionListening,
    startDeviceMotionListening,
    onDeviceMotionChange,
    offDeviceMotionChange,

    // phone
    makePhoneCall,

    // vibrate
    vibrateShort,
    vibrateLong,

    // network
    getNetworkType,
    onNetworkWeakChange,
    onNetworkStatusChange,
    offNetworkWeakChange,
    offNetworkStatusChange,
    getLocalIPAddress
} from './device'

import {
    createSelectorQuery,
    createIntersectionObserver
} from './dom'

import {
    setStorageSync,
    setStorage,
    revokeBufferURL,
    removeStorageSync,
    removeStorage,
    getStorageSync,
    getStorageInfoSync,
    getStorageInfo,
    getStorage,
    createBufferURL,
    clearStorageSync,
    clearStorage
} from './dataCache'

import {request} from './network'

import {
    registerToastComponent,
    showToast,
    hideToat,
    showLoading,
    hideLoading
} from './ui/interaction'

import {
    setNavigationBarColor,
    showNavigationBarLoading,
    hideNavigationBarLoading,
    setNavigationBarTitle
} from './ui/navigationBar'

import pageScrollTo from './ui/pageScrollTo'

import {
    switchTab,
    reLaunch,
    redirectTo,
    navigateTo,
    navigateBack
} from './router'

import {
    useDidShow,
    useDidHide,
    useReachBottom,
    useResize,
    useReady,
    useRouter,
    usePageScroll,
    useShareAppMessage,
    useShareTimeline
} from './hooks'

import {
    getCurrentInstance,
    getCurrentPages,
    getEnv,
    ENV_TYPE,
    initPxTransform,
    pxTransform,
    nextTick
} from './framework'

import {chooseImage, registerPreviewComponent, previewImage} from './media/image'

import {uploadFile} from './network/upload'

import {getLocation} from './location'

import {getMenuButtonBoundingClientRect} from './ui/menu'

import {initTaroApp, TaroPage} from './internal'

export {
    setEnableDebug,
    getRealtimeLogManager,
    getLogManager,

    getWindowInfo,
    getSystemSetting,
    getDeviceInfo,
    getAppBaseInfo,
    getAppAuthorizeSetting,
    getSystemInfoSync,
    getSystemInfoAsync,
    getSystemInfo,

    createOffscreenCanvas,
    createCanvasContext,
    canvasToTempFilePath,
    canvasPutImageData,
    canvasGetImageData,

    stopAccelerometer,
    startAccelerometer,
    onAccelerometerChange,
    offAccelerometerChange,

    getBatteryInfoSync,
    getBatteryInfo,

    setClipboardData,
    getClipboardData,

    stopCompass,
    startCompass,
    onCompassChange,
    offCompassChange,

    stopDeviceMotionListening,
    startDeviceMotionListening,
    onDeviceMotionChange,
    offDeviceMotionChange,

    makePhoneCall,

    vibrateShort,
    vibrateLong,

    getNetworkType,
    onNetworkWeakChange,
    onNetworkStatusChange,
    offNetworkWeakChange,
    offNetworkStatusChange,
    getLocalIPAddress,

    createSelectorQuery,
    createIntersectionObserver,

    setStorageSync,
    setStorage,
    revokeBufferURL,
    removeStorageSync,
    removeStorage,
    getStorageSync,
    getStorageInfoSync,
    getStorageInfo,
    getStorage,
    createBufferURL,
    clearStorageSync,
    clearStorage,

    registerToastComponent,
    showToast,
    hideToat,
    showLoading,
    hideLoading,

    setNavigationBarColor,
    showNavigationBarLoading,
    hideNavigationBarLoading,
    setNavigationBarTitle,

    pageScrollTo,

    useDidShow,
    useDidHide,
    useReachBottom,
    useResize,
    useReady,
    useRouter,
    usePageScroll,
    useShareAppMessage,
    useShareTimeline,

    switchTab,
    reLaunch,
    redirectTo,
    navigateTo,
    navigateBack,

    request,

    getCurrentInstance,
    getCurrentPages,
    getEnv,
    ENV_TYPE,
    initPxTransform,
    pxTransform,
    nextTick,

    chooseImage,
    registerPreviewComponent,
    previewImage,

    uploadFile,

    getLocation,

    getMenuButtonBoundingClientRect,

    initTaroApp,
    TaroPage
}

export default {
    setEnableDebug,
    getRealtimeLogManager,
    getLogManager,

    getWindowInfo,
    getSystemSetting,
    getDeviceInfo,
    getAppBaseInfo,
    getAppAuthorizeSetting,
    getSystemInfoSync,
    getSystemInfoAsync,
    getSystemInfo,

    createOffscreenCanvas,
    createCanvasContext,
    canvasToTempFilePath,
    canvasPutImageData,
    canvasGetImageData,

    stopAccelerometer,
    startAccelerometer,
    onAccelerometerChange,
    offAccelerometerChange,

    getBatteryInfoSync,
    getBatteryInfo,

    setClipboardData,
    getClipboardData,

    stopCompass,
    startCompass,
    onCompassChange,
    offCompassChange,

    stopDeviceMotionListening,
    startDeviceMotionListening,
    onDeviceMotionChange,
    offDeviceMotionChange,

    makePhoneCall,

    vibrateShort,
    vibrateLong,

    getNetworkType,
    onNetworkWeakChange,
    onNetworkStatusChange,
    offNetworkWeakChange,
    offNetworkStatusChange,
    getLocalIPAddress,

    createSelectorQuery,
    createIntersectionObserver,

    setStorageSync,
    setStorage,
    revokeBufferURL,
    removeStorageSync,
    removeStorage,
    getStorageSync,
    getStorageInfoSync,
    getStorageInfo,
    getStorage,
    createBufferURL,
    clearStorageSync,
    clearStorage,

    registerToastComponent,
    showToast,
    hideToat,
    showLoading,
    hideLoading,

    setNavigationBarColor,
    showNavigationBarLoading,
    hideNavigationBarLoading,
    setNavigationBarTitle,

    pageScrollTo,

    useDidShow,
    useDidHide,
    useReachBottom,
    useResize,
    useReady,
    useRouter,
    usePageScroll,
    useShareAppMessage,
    useShareTimeline,

    switchTab,
    reLaunch,
    redirectTo,
    navigateTo,
    navigateBack,

    request,

    getCurrentInstance,
    getCurrentPages,
    getEnv,
    ENV_TYPE,
    initPxTransform,
    pxTransform,
    nextTick,

    chooseImage,
    registerPreviewComponent,
    previewImage,

    uploadFile,

    getLocation,

    getMenuButtonBoundingClientRect,

    initTaroApp,
    TaroPage
}
