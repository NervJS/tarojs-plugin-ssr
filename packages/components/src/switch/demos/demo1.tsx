import React from 'react'
import { View, Text, Switch } from '@taror/components'
import './demo1.scss'

const App: React.FC = () => {
    const switchChange = e => {
        console.log(e.detail)
    }

    return (
        <View className='wrap'>
            <View className="card-area">
                <View className="top-description border-bottom">默认样式</View>
                <Switch checked className="init-switch" onChange={switchChange} />
                <Text className="switch-text">已开启</Text>
                <Switch className="init-switch-after" checked={false} onChange={switchChange} />
                <Text className="switch-text">已关闭</Text>
            </View>

            <View className="card-area">
                <View className="top-description border-bottom">设置checkbox样式</View>
                <Switch className="init-switch" type="checkbox" checked></Switch>
                <Text className="switch-text">已开启</Text>
                <Switch className="init-switch-after" type="checkbox"></Switch>
                <Text className="switch-text">已关闭</Text>
            </View>

            <View className="card-area">
                <View className="top-description border-bottom">列表展示</View>
                <View className="item-scroll block border-bottom">
                    <Text className="switch-text">已开启</Text>
                    <Switch checked></Switch>
                </View>

                <View className="item-scroll block">
                    <Text className="switch-text">已关闭</Text>
                    <Switch></Switch>
                </View>
            </View>
            <View className="card-area">
                <View className="top-description border-bottom">
                    <View>包含禁用选项</View>
                    <View>disabled</View>
                </View>
                <View className="item-scroll border-bottom block">
                    <Text className="switch-text">已开启</Text>
                    <Switch checked disabled color="#C3D1FF"></Switch>
                </View>
                <View className="item-scroll block">
                    <Text className="switch-text">已关闭</Text>
                    <Switch disabled></Switch>
                </View>
            </View>
            <View className="card-area">
                <View className="top-description border-bottom">
                    <View>自定义颜色</View>
                    <View>color=&quot;#00BC89&quot;</View>
                </View>
                <View className="item-scroll border-bottom block">
                    <Text className="switch-text">已开启</Text>
                    <Switch checked color="#00BC89"></Switch>
                </View>
                <View className="item-scroll block">
                    <Text className="switch-text">已关闭</Text>
                    <Switch color="#00BC89"></Switch>
                </View>
            </View>
        </View>
    )
}

export default App
