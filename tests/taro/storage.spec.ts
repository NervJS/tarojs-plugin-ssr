/**
 * @jest-environment jsdom
 */

import {
    getStorageSync,
    getStorage,
    setStorageSync,
    setStorage,
    clearStorageSync,
    clearStorage
} from 'tarojs-plugin-platform-nextjs/taro'

it('storage', async () => {
    const data1 = getStorageSync('foo')
    expect(data1).toBe('')

    const {data: data2} = await getStorage({key: 'foo'})
    expect(data2).toBe('')

    setStorageSync('foo', 'bar')
    const data3 = getStorageSync('foo')
    expect(data3).toBe('bar')
    const {data: data4} = await getStorage({key: 'foo'})
    expect(data4).toBe('bar')

    clearStorageSync('foo')
    const {data: data5} = await getStorage({key: 'foo'})
    expect(data5).toBe('')

    await setStorage({key: 'foo', data: 6})
    const data6 = getStorageSync('foo')
    expect(data6).toBe(6)
    const {data: data7} = await getStorage({key: 'foo'})
    expect(data7).toBe(6)

    await clearStorage({key: 'foo'})
    const {data: data8} = await getStorage({key: 'foo'})
    expect(data8).toBe('')
})
