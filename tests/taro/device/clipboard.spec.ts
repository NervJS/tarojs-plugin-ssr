/**
 * @jest-environment jsdom
 */

 import {getClipboardData} from 'tarojs-plugin-platform-nextjs/taro'

it('storage', async () => {
    const {data: data1} = await getClipboardData()
    expect(data1).toBe('')
})
