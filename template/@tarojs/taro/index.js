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

import {useDidShow, useDidHide} from './hooks'

import getCurrentInstance from './getCurrentInstance'

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

    switchTab,
    reLaunch,
    redirectTo,
    navigateTo,
    navigateBack,

    getCurrentInstance
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

    getCurrentInstance
}
