import React from 'react'
import { View, Icon } from '@taror/components'
import './demo1.scss'

const smallDefault = [
    'success',
    'info',
    'warn',
    'waiting',
    'setting',
    'top',
    'search',
    'personal',
    'download',
    'clear',
    'close',
    'cancel',
    'success_no_circle',
    'checkboxSelected',
    'radioSelected',
    'radioUnselect',
    'loadingGrey'
]

const colors = [
    '#3388FF', '#F7534F', '#FF6600', '#000000'
]

const sizes = [
    40, 34, 30, 24, 22, 18, 16
]

const App: React.FC = () => (
    <View className='wrap'>
        <View className="card-area">
            <View className="top-description border-bottom">自定义icon类型</View>
            <View className="icon-area">
                {smallDefault.map(type => (
                    <View key={type} className="icon-item">
                        <Icon type={type} />
                        <View className="icon-text"> {type}</View>
                    </View>
                ))}
            </View>
        </View>
        <View className="card-area">
            <View className="top-description border-bottom">自定义icon大小</View>
            <View className="icon-area">
                {sizes.map(size => (
                    <View key={size} className="icon-item">
                        <Icon type="success" size={size} />
                        <View className="icon-text">{size}px</View>
                    </View>
                ))}
            </View>
        </View>
        <View className="card-area">
            <View className="top-description border-bottom">自定义icon颜色</View>
            <View className="icon-area">
                {colors.map(color => (
                    <View key={color} className="icon-item">
                        <Icon type="success" size={25} color={color} className="icon-color" />
                        <View className="icon-text">{color}</View>
                    </View>
                ))}
            </View>
        </View>
    </View>
)

export default App
