import React from 'react'
import bridge from '@taror/components/_util/bridge'
import { View, TabBar } from '@taror/components'

bridge.setConfig({
    getCustomRoutes() {
        return {}
    },
    getCurrentPagePath() {
        return location.pathname
    },
    onPagePathChange() {
    },
    offPagePathChange() {
    },
    navigateTo() { },
    navigateBack() { }
})

const list = [
    {
        pagePath: 'tarojs-plugin-platform-nextjs/~demos/tab-bar-demo1',
        text: '首页',
        iconPath:'/images/API_normal.png',
        selectedIconPath:'/images/API_selected.png'
    },
    {
        pagePath: 'api/api',
        text: '详情',
        iconPath:'/images/component_normal.png',
        selectedIconPath:'/images/component_selected.png'
    }
]

const App: React.FC = () => {
    return (
        <View className='wrap'>
            <View className="card-area">
                <View className="top-description border-bottom">默认样式</View>
                <TabBar
                    color="#000000"
                    selectedColor="#6495ed"
                    backgroundColor="#ffffff"
                    list={list}
                />
            </View>
        </View>
    )
}

export default App
