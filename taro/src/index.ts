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
    setCustomRoutes,
    switchTab,
    reLaunch,
    redirectTo,
    navigateTo,
    navigateBack
} from './router'

import {useDidShow, useDidHide, usePageScroll} from './hooks'

import {
    getCurrentInstance,
    getCurrentPages,
    getEnv,
    ENV_TYPE
} from './framework'

export {
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
    usePageScroll,

    setCustomRoutes,
    switchTab,
    reLaunch,
    redirectTo,
    navigateTo,
    navigateBack,

    request,

    getCurrentInstance,
    getCurrentPages,
    getEnv,
    ENV_TYPE
}

export default {
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

    switchTab,
    reLaunch,
    redirectTo,
    navigateTo,
    navigateBack,

    request,

    getCurrentInstance,
    getCurrentPages,
    getEnv,
    ENV_TYPE
}
