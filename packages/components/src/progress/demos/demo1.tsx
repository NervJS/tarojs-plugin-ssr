import React, {useState} from 'react'
import { View, Progress } from '@taror/components'
import './demo1.scss'

const App: React.FC = () => (
    <View className='wrap'>
        <View className="card-area">
            <View className="top-description border-bottom">默认样式</View>
            <Progress className="progress" percent={20} />
        </View>
        <View className="card-area">
            <View className="top-description border-bottom">
                <View>显示当前百分比</View>
                <View>show-info</View>
            </View>
            <Progress showInfo active className="progress" percent={40} fontSize={13} activeColor="#3c76ff" />
        </View>

        <View className="card-area">
            <View className="top-description border-bottom">
                <View>设置颜色</View>
                <View>activeColor=&quot;#00BC89&quot;</View>
            </View>
            <Progress active className="progress" percent={60} activeColor="#00BC89" backgroundColor="#E6E6E6" />
        </View>
        <View className="card-area">
            <View className="top-description border-bottom">
                <View>设置宽度、外圆角</View>
                <View>border-radius=&quot;90&quot; stroke-width=&quot;7&quot;</View>
            </View>
            <Progress active className="progress" percent={60} borderRadius={90} stroke-width="7" backgroundColor="#E6E6E6" />
        </View>
        <View className="card-area">
            <View className="top-description border-bottom">
                设置宽度、内圆角
            </View>
            <Progress active className="inner-progress" percent={60} backgroundColor="#E6E6E6" strokeWidth={7} />
        </View>
        <View className="card-area">
            <View className="top-description border-bottom">显示动画</View>
            <Progress active className="progress" duration={10} percent={70} color="#38f" activeMode="backwards" />
            <Progress active className="progress" percent={80} color="#38f" activeMode="forwards" />
        </View>
    </View>
)

export default App
