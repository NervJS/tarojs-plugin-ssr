import React from 'react'
import { View, Text } from '@taror/components'
import './demo1.scss'

const text1 = '智能    小程序(nbsp,根据字体设置的空格大小)'
const text2 = '智能    小程序(ensp,中文字符空格一半大小)'
const text3 = '智能    小程序(emsp,中文字符空格大小)'

const App: React.FC = () => (
    <View className='wrap'>
        <View className="card-area">
            <View className="top-description border-bottom">
                <View>默认</View>
                <View>selectable</View>
            </View>
            <Text
                selectable
                className="text-box text-block"
            >
                百度智能小程序(文本支持长按选择)
            </Text>
        </View>
        <View className="card-area">
            <View className="top-description border-bottom">
                <View>设置显示4个连续空格</View>
                <View>space</View>
            </View>
            <View className="text-box">
                <Text className="text-block" space="nbsp">{text1}</Text>
                <Text className="text-block" space="ensp">{text2}</Text>
                <Text className="text-block" space="emsp">{text3}</Text>
            </View>
        </View>
    </View>
)

export default App
