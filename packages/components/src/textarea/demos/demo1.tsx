import React from 'react'
import { View, Textarea } from '@taror/components'
import './demo1.scss'

const App: React.FC = () => {
    const handleInput = e => {
        console.log('input - e:', e)
    }

    return (
        <View className='wrap'>
            <View className="card-area">
                <View className="top-description border-bottom">
                    <View>输入区高度自适应</View>
                    <View>auto-height</View>
                </View>
                <Textarea autoHeight maxlength={-1} onInput={handleInput} />
            </View>
            <View className="card-area">
                <View className="top-description border-bottom">
                    <View>自动聚焦</View>
                    <View>auto-focus</View>
                </View>
                <Textarea
                    autoFocus
                    style={{
                        height: '112px'
                    }}
                    maxlength={-1}
                    disabled={false}
                    placeholder="超过输入高度，会出现滚动条"
                    placeholderClass="plh"
                    cursor={-1}
                    onFocus={e => {
                        console.log('focus - e:', e)
                    }}
                    onBlur={e => {
                        console.log('blur - e:', e)
                    }}
                    onInput={handleInput}
                />
            </View>
        </View>
    )
}

export default App
