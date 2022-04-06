import {createSelectorQuery} from '@tarojs/taro-h5/src/api/wxml'

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

import {request, onNetworkStatusChange, getNetworkType} from './network'

import {
    getCurrentInstance,
    getCurrentPages,
    getEnv,
    ENV_TYPE
} from './host'

export {
    createSelectorQuery,

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

    request,
    onNetworkStatusChange,
    getNetworkType,

    getCurrentInstance,
    getCurrentPages
}

export default {
    createSelectorQuery,

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

    request,
    onNetworkStatusChange,
    getNetworkType,

    getCurrentInstance,
    getCurrentPages,
    getEnv,
    ENV_TYPE
}
