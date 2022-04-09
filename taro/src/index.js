import {
    createOffscreenCanvas,
    createCanvasContext,
    canvasToTempFilePath,
    canvasPutImageData,
    canvasGetImageData
} from '@tarojs/taro-h5/dist/api/canvas'

import {
    stopAccelerometer,
    startAccelerometer,
    onAccelerometerChange,
    offAccelerometerChange
} from '@tarojs/taro-h5/dist/api/device/accelerometer'

import {checkIsOpenAccessibility} from '@tarojs/taro-h5/dist/api/device/accessibility'

import {getBatteryInfoSync, getBatteryInfo} from '@tarojs/taro-h5/dist/api/device/battery'

import {
    stopBluetoothDevicesDiscovery,
    startBluetoothDevicesDiscovery,
    openBluetoothAdapter,
    onBluetoothDeviceFound,
    onBluetoothAdapterStateChange,
    offBluetoothDeviceFound,
    offBluetoothAdapterStateChange,
    makeBluetoothPair,
    isBluetoothDevicePaired,
    getConnectedBluetoothDevices,
    getBluetoothDevices,
    getBluetoothAdapterState,
    closeBluetoothAdapter
} from '@tarojs/taro-h5/dist/api/device/bluetooth'

import {
    writeBLECharacteristicValue,
    setBLEMTU,
    readBLECharacteristicValue,
    onBLEMTUChange,
    onBLEConnectionStateChange,
    onBLECharacteristicValueChange,
    offBLEMTUChange,
    offBLEConnectionStateChange,
    offBLECharacteristicValueChange,
    notifyBLECharacteristicValueChange,
    getBLEMTU,
    getBLEDeviceServices,
    getBLEDeviceRSSI,
    getBLEDeviceCharacteristics,
    createBLEConnection,
    closeBLEConnection
} from '@tarojs/taro-h5/dist/api/device/bluetooth-ble'

import {
    onBLEPeripheralConnectionStateChanged,
    offBLEPeripheralConnectionStateChanged,
    createBLEPeripheralServer
} from '@tarojs/taro-h5/dist/api/device/bluetooth-peripheral'

import {addPhoneRepeatCalendar, addPhoneCalendar} from '@tarojs/taro-h5/dist/api/device/calendar'

// import {setClipboardData, getClipboardData} from '@tarojs/taro-h5/dist/api/device/clipboard'

import {
    stopCompass,
    startCompass,
    onCompassChange,
    offCompassChange
} from '@tarojs/taro-h5/dist/api/device/compass'

import {chooseContact, addPhoneContact} from '@tarojs/taro-h5/dist/api/device/contact'

import {getRandomValues} from '@tarojs/taro-h5/dist/api/device/crypto'

import {
    stopGyroscope,
    startGyroscope,
    onGyroscopeChange,
    offGyroscopeChange
} from '@tarojs/taro-h5/dist/api/device/gyroscope'

import {
    stopBeaconDiscovery,
    startBeaconDiscovery,
    onBeaconUpdate,
    onBeaconServiceChange,
    offBeaconUpdate,
    offBeaconServiceChange,
    getBeacons
} from '@tarojs/taro-h5/dist/api/device/iBeacon'

import {
    onKeyboardHeightChange,
    offKeyboardHeightChange,
    hideKeyboard,
    getSelectedTextRange
} from '@tarojs/taro-h5/dist/api/device/keyboard'

import {onMemoryWarning, offMemoryWarning} from '@tarojs/taro-h5/dist/api/device/memory'

import {
    stopDeviceMotionListening,
    startDeviceMotionListening,
    onDeviceMotionChange,
    offDeviceMotionChange
} from '@tarojs/taro-h5/dist/api/device/motion'

import {
    stopHCE,
    startHCE,
    sendHCEMessage,
    onHCEMessage,
    offHCEMessage,
    getNFCAdapter,
    getHCEState
} from '@tarojs/taro-h5/dist/api/device/nfc'

import {makePhoneCall} from '@tarojs/taro-h5/dist/api/device/phone'

import {scanCode} from '@tarojs/taro-h5/dist/api/device/scan'

import {
    setVisualEffectOnCapture,
    setScreenBrightness,
    setKeepScreenOn,
    onUserCaptureScreen,
    offUserCaptureScreen,
    getScreenBrightness
} from '@tarojs/taro-h5/dist/api/device/screen'

import {vibrateShort, vibrateLong} from '@tarojs/taro-h5/dist/api/device/vibrate'

import {
    stopWifi,
    startWifi,
    setWifiList,
    onWifiConnected,
    onGetWifiList,
    offWifiConnected,
    offGetWifiList,
    getWifiList,
    getConnectedWifi,
    connectWifi
} from '@tarojs/taro-h5/dist/api/device/wifi'

import {
    getNetworkType,
    onNetworkWeakChange,
    onNetworkStatusChange,
    offNetworkWeakChange,
    offNetworkStatusChange,
    getLocalIPAddress
} from  '@tarojs/taro-h5/dist/api/device/network'

import {
    createSelectorQuery,
    createIntersectionObserver
} from '@tarojs/taro-h5/dist/api/wxml'

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
    setBackgroundFetchToken,
    onBackgroundFetchData,
    getBackgroundFetchToken,
    getBackgroundFetchData
} from '@tarojs/taro-h5/dist/api/storage'

import {getMenuButtonBoundingClientRect} from '@tarojs/taro-h5/dist/api/ui/menu'

import {request} from './network'

import {
    setNavigationBarColor,
    showNavigationBarLoading,
    hideNavigationBarLoading,
    setNavigationBarTitle
} from './ui/navigation-bar'

import {
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

    stopAccelerometer,
    startAccelerometer,
    onAccelerometerChange,
    offAccelerometerChange,

    checkIsOpenAccessibility,

    getBatteryInfoSync,
    getBatteryInfo,

    stopBluetoothDevicesDiscovery,
    startBluetoothDevicesDiscovery,
    openBluetoothAdapter,
    onBluetoothDeviceFound,
    onBluetoothAdapterStateChange,
    offBluetoothDeviceFound,
    offBluetoothAdapterStateChange,
    makeBluetoothPair,
    isBluetoothDevicePaired,
    getConnectedBluetoothDevices,
    getBluetoothDevices,
    getBluetoothAdapterState,
    closeBluetoothAdapter,

    writeBLECharacteristicValue,
    setBLEMTU,
    readBLECharacteristicValue,
    onBLEMTUChange,
    onBLEConnectionStateChange,
    onBLECharacteristicValueChange,
    offBLEMTUChange,
    offBLEConnectionStateChange,
    offBLECharacteristicValueChange,
    notifyBLECharacteristicValueChange,
    getBLEMTU,
    getBLEDeviceServices,
    getBLEDeviceRSSI,
    getBLEDeviceCharacteristics,
    createBLEConnection,
    closeBLEConnection,

    onBLEPeripheralConnectionStateChanged,
    offBLEPeripheralConnectionStateChanged,
    createBLEPeripheralServer,

    addPhoneRepeatCalendar,
    addPhoneCalendar,

    // setClipboardData,
    // getClipboardData,

    stopCompass,
    startCompass,
    onCompassChange,
    offCompassChange,

    chooseContact,
    addPhoneContact,

    getRandomValues,

    stopGyroscope,
    startGyroscope,
    onGyroscopeChange,
    offGyroscopeChange,

    stopBeaconDiscovery,
    startBeaconDiscovery,
    onBeaconUpdate,
    onBeaconServiceChange,
    offBeaconUpdate,
    offBeaconServiceChange,
    getBeacons,

    onKeyboardHeightChange,
    offKeyboardHeightChange,
    hideKeyboard,
    getSelectedTextRange,

    onMemoryWarning,
    offMemoryWarning,

    stopDeviceMotionListening,
    startDeviceMotionListening,
    onDeviceMotionChange,
    offDeviceMotionChange,

    stopHCE,
    startHCE,
    sendHCEMessage,
    onHCEMessage,
    offHCEMessage,
    getNFCAdapter,
    getHCEState,

    makePhoneCall,

    scanCode,

    setVisualEffectOnCapture,
    setScreenBrightness,
    setKeepScreenOn,
    onUserCaptureScreen,
    offUserCaptureScreen,
    getScreenBrightness,

    vibrateShort,
    vibrateLong,

    stopWifi,
    startWifi,
    setWifiList,
    onWifiConnected,
    onGetWifiList,
    offWifiConnected,
    offGetWifiList,
    getWifiList,
    getConnectedWifi,
    connectWifi,

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
    setBackgroundFetchToken,
    onBackgroundFetchData,
    getBackgroundFetchToken,
    getBackgroundFetchData,

    getMenuButtonBoundingClientRect,

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

    getCurrentInstance,
    getCurrentPages,
    getEnv,
    ENV_TYPE
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

    stopAccelerometer,
    startAccelerometer,
    onAccelerometerChange,
    offAccelerometerChange,

    checkIsOpenAccessibility,

    getBatteryInfoSync,
    getBatteryInfo,

    stopBluetoothDevicesDiscovery,
    startBluetoothDevicesDiscovery,
    openBluetoothAdapter,
    onBluetoothDeviceFound,
    onBluetoothAdapterStateChange,
    offBluetoothDeviceFound,
    offBluetoothAdapterStateChange,
    makeBluetoothPair,
    isBluetoothDevicePaired,
    getConnectedBluetoothDevices,
    getBluetoothDevices,
    getBluetoothAdapterState,
    closeBluetoothAdapter,

    writeBLECharacteristicValue,
    setBLEMTU,
    readBLECharacteristicValue,
    onBLEMTUChange,
    onBLEConnectionStateChange,
    onBLECharacteristicValueChange,
    offBLEMTUChange,
    offBLEConnectionStateChange,
    offBLECharacteristicValueChange,
    notifyBLECharacteristicValueChange,
    getBLEMTU,
    getBLEDeviceServices,
    getBLEDeviceRSSI,
    getBLEDeviceCharacteristics,
    createBLEConnection,
    closeBLEConnection,

    onBLEPeripheralConnectionStateChanged,
    offBLEPeripheralConnectionStateChanged,
    createBLEPeripheralServer,
    addPhoneRepeatCalendar,
    addPhoneCalendar,

    // setClipboardData,
    // getClipboardData,

    stopCompass,
    startCompass,
    onCompassChange,
    offCompassChange,

    chooseContact,
    addPhoneContact,

    getRandomValues,

    stopGyroscope,
    startGyroscope,
    onGyroscopeChange,
    offGyroscopeChange,

    stopBeaconDiscovery,
    startBeaconDiscovery,
    onBeaconUpdate,
    onBeaconServiceChange,
    offBeaconUpdate,
    offBeaconServiceChange,
    getBeacons,

    onKeyboardHeightChange,
    offKeyboardHeightChange,
    hideKeyboard,
    getSelectedTextRange,

    onMemoryWarning,
    offMemoryWarning,

    stopDeviceMotionListening,
    startDeviceMotionListening,
    onDeviceMotionChange,
    offDeviceMotionChange,

    stopHCE,
    startHCE,
    sendHCEMessage,
    onHCEMessage,
    offHCEMessage,
    getNFCAdapter,
    getHCEState,

    makePhoneCall,

    scanCode,

    setVisualEffectOnCapture,
    setScreenBrightness,
    setKeepScreenOn,
    onUserCaptureScreen,
    offUserCaptureScreen,
    getScreenBrightness,

    vibrateShort,
    vibrateLong,

    stopWifi,
    startWifi,
    setWifiList,
    onWifiConnected,
    onGetWifiList,
    offWifiConnected,
    offGetWifiList,
    getWifiList,
    getConnectedWifi,
    connectWifi,

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
    setBackgroundFetchToken,
    onBackgroundFetchData,
    getBackgroundFetchToken,
    getBackgroundFetchData,

    getMenuButtonBoundingClientRect,

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

    getCurrentInstance,
    getCurrentPages,
    getEnv,
    ENV_TYPE
}
