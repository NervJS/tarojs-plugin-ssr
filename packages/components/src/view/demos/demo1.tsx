import React from 'react'
import { View, Text } from '@taror/components'
import '@taror/components/src/view/style'
import './demo1.scss'

const App: React.FC = () => (
    <View className='wrap'>
        <View className="card-area">
            <View className="top-description border-bottom">横向布局</View>
            <View className='rowlike'>
                <View className='item color-a'
                    hoverClass='hover'
                    hoverStopPropagation={false}
                    hoverStartTime={100}
                    hoverStayTime={200}
                >
                    <Text>A</Text>
                </View>
                <View className='item color-b'>
                    <Text>B</Text>
                </View>
                <View className='item color-c'>
                    <Text>C</Text>
                </View>
            </View>
        </View>

        <View className="card-area">
            <View className="top-description border-bottom">横向布局</View>
            <View className='collike'>
                <View className='item color-a'
                    hoverClass='hover'
                    hoverStopPropagation={false}
                    hoverStartTime={100}
                    hoverStayTime={200}
                >
                    <Text>A</Text>
                </View>
                <View className='item color-b'>
                    <Text>B</Text>
                </View>
                <View className='item color-c'>
                    <Text>C</Text>
                </View>
            </View>
        </View>
    </View>
)

export default App
