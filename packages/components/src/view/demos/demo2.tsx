import React from 'react'
import { View, Text } from '@taror/components'
import '@taror/components/src/view/style'
import './demo2.scss'

const App: React.FC = () => (
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
)

export default App
