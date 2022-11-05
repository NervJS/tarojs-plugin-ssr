import React from 'react'
import bridge from '@taror/components/_util/bridge'
import { View, TabBar } from '@taror/components'

bridge.setConfig({
    customRoutes: { },
    navigateTo() { },
    navigateBack() { }
})

const list = [
    {
        pagePath: 'component/component',
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
                <TabBar color="#000000" list={list} />
            </View>
        </View>
    )
}

export default App
