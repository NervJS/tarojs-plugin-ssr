import React from 'react'
import {View, Button, Navigator} from '@taror/components'

declare const BASE_PATH: string

const App: React.FC = () => (
    <View className="container">
        <Button type="primary">
            <Navigator 
                target="self" 
                openType="navigate" 
                url={`${BASE_PATH}/~demos/navigator-demo2`}
            >
                点击跳转
            </Navigator>
        </Button>
    </View>
)

export default App
