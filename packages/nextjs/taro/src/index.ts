import {
    getWindowInfo,
    getSystemSetting,
    getDeviceInfo,
    getAppBaseInfo,
    getAppAuthorizeSetting,
    getSystemInfoSync,
    getSystemInfoAsync,
    getSystemInfo
} from './base'

import {
    createOffscreenCanvas,
    createCanvasContext,
    canvasToTempFilePath,
    canvasPutImageData,
    canvasGetImageData
} from './canvas'

import {setClipboardData, getClipboardData} from './device/clipboard'

import {
    stopCompass,
    startCompass,
    onCompassChange,
    offCompassChange
} from './device/compass'

import {
    stopDeviceMotionListening,
    startDeviceMotionListening,
    onDeviceMotionChange,
    offDeviceMotionChange
} from './device/motion'

import {makePhoneCall} from './device/phone'

import {vibrateShort, vibrateLong} from './device/vibrate'

import {
    getNetworkType,
    onNetworkWeakChange,
    onNetworkStatusChange,
    offNetworkWeakChange,
    offNetworkStatusChange,
    getLocalIPAddress
} from  './device/network'

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
    clearStorage,
} from './storage'

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

import {
    chooseImage
} from './media/image'

import {uploadFile} from './network/upload'

import {getLocation} from './location'

import {getMenuButtonBoundingClientRect} from './ui/menu'

import {initTaroApp, TaroPage} from './internal'

export {
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

    uploadFile,

    getLocation,

    getMenuButtonBoundingClientRect,

    initTaroApp,
    TaroPage
}

export default {
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

    uploadFile,

    getLocation,

    getMenuButtonBoundingClientRect,

    initTaroApp,
    TaroPage
}
