import {
    setStorage,
    setStorageSync,
    getStorage,
    getStorageSync,
    removeStorage,
    removeStorageSync,
    clearStorage,
    clearStorageSync,
    getStorageInfoSync
} from './storage'

import {
    setNavigationBarColor,
    showNavigationBarLoading,
    hideNavigationBarLoading,
    setNavigationBarTitle
} from './ui/navigationBar'

import {
    switchTab,
    reLaunch,
    redirectTo,
    navigateTo,
    navigateBack
} from './router'

import {useDidShow, useDidHide, usePageScroll} from './hooks'

import {onNetworkStatusChange, getNetworkType} from './network'

import {getCurrentInstance, getCurrentPages} from './host'

export {
    setStorage,
    setStorageSync,
    getStorage,
    getStorageSync,
    removeStorage,
    removeStorageSync,
    clearStorage,
    clearStorageSync,
    getStorageInfoSync,

    setNavigationBarColor,
    showNavigationBarLoading,
    hideNavigationBarLoading,
    setNavigationBarTitle,

    useDidShow,
    useDidHide,
    usePageScroll,

    switchTab,
    reLaunch,
    redirectTo,
    navigateTo,
    navigateBack,

    onNetworkStatusChange,
    getNetworkType,

    getCurrentInstance,
    getCurrentPages
}

export default {
    setStorage,
    setStorageSync,
    getStorage,
    getStorageSync,
    removeStorage,
    removeStorageSync,
    clearStorage,
    clearStorageSync,
    getStorageInfoSync,

    setNavigationBarColor,
    showNavigationBarLoading,
    hideNavigationBarLoading,
    setNavigationBarTitle,

    useDidShow,
    useDidHide,

    switchTab,
    reLaunch,
    redirectTo,
    navigateTo,
    navigateBack,

    onNetworkStatusChange,
    getNetworkType,

    getCurrentInstance,
    getCurrentPages
}
