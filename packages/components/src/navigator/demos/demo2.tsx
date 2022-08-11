import React from 'react'
import {View, Button, Navigator} from '@taror/components'

const App: React.FC = () => (
    <View className='wrap'>
        <View className="card-area">
            <Button type="primary">
            <Navigator
                target="self"
                openType="navigateBack"
                delta={1}
            >
                返回上一页面
            </Navigator>
        </Button>
        </View>
    </View>
)

export default App
