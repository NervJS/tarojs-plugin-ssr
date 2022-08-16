import React, {useState} from 'react'
import { View, Input } from '@taror/components'
import './demo1.scss'

const App: React.FC = () => {
    const [numberValue, setNumberValue] = useState('')
    const [cardValue, setCardValue] = useState('')
    const [digitValue, setDigitValue] = useState('')
    const [inputValue, setInputValue] = useState('')

    return (
        <View className='wrap'>
            <View className="card-area">
                <View className="top-description border-bottom">基础用法</View>
                <Input className="normalInput" placeholder="请在此输入标题" />
            </View>

            <View className="card-area">
                <View className="top-description border-bottom">自定义输入控制</View>
                <View className="list-area border-bottom">
                    <View className="list-item-key-4">自动聚焦</View>
                    <View className="list-item-value">
                        <Input
                            focus
                            placeholder='focus="true"'
                            selectionStart={3}
                            selectionEnd={7}
                            confirmHold={false}
                            onFocus={e => {
                                console.log(e.detail)
                            }}
                        />
                    </View>
                </View>

                <View className="list-area border-bottom">
                    <View className="list-item-key-4">控制长度</View>
                    <View className="list-item-value">
                        <Input
                            cursor={100}
                            placeholder='maxlength="10"'
                            maxlength={10}
                            onBlur={() => {
                                console.log('普通input失焦事件')
                            }}
                            onConfirm={() => {
                                console.log('点击确定')
                            }}
                        />
                    </View>
                </View>

                <View className="list-area border-bottom">
                    <View className="list-item-key-4">禁用</View>
                    <View className="list-item-value">
                        <Input disabled placeholder='disabled="true"' />
                    </View>
                </View>

                <View className="list-area">
                    <View className="list-item-key-4">带有内容</View>
                    <View className="list-item-value">
                        <Input value='value="{= value =}"' />
                    </View>
                </View>
            </View>

            <View className="card-area">
                <View className="top-description border-bottom">自定义输入内容</View>

                <View className="list-area border-bottom">
                    <View className="list-item-key-4">文本</View>
                    <View className="list-item-value">
                        <Input
                            type="text"
                            placeholder='type="text"' />
                    </View>
                </View>

                <View className="list-area border-bottom">
                    <View className="list-item-key-4">数字</View>
                    <View className="list-item-value">
                        <Input
                            type="number"
                            placeholder='type="number"'
                            value={numberValue}
                            onInput={e => {
                                const value = e.detail.value
                                setNumberValue(value.replace(/[^\d]/g, ''))
                            }}
                        />
                    </View>
                </View>

                <View className="list-area border-bottom">
                    <View className="list-item-key-4">身份证</View>
                    <View className="list-item-value">
                        <Input
                            type="idcard"
                            adjust-position="true"
                            placeholder='type="idcard"'
                            onInput={e => {
                                const value = e.detail.value
                                setCardValue(value.replace(/[^((^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$))]/g, ''))
                            }}
                            value={cardValue}
                        />
                    </View>
                </View>

                <View className="list-area">
                    <View className="list-item-key-4">小数</View>
                    <View className="list-item-value">
                        <Input
                            type="digit"
                            placeholder='type="digit"'
                            onInput={e => {
                                const value = e.detail.value
                                const res = value.replace(/[^(^(\-|\\+)?\d+(\\.\d+)?$)]/g, '')
                                setDigitValue(res)
                            }}
                            value={digitValue}
                        />
                    </View>
                </View>
            </View>

            <View className="card-area">
                <View className="top-description border-bottom">
                    <View>自定义占位符颜色</View>
                    <View>
                        placeholder-style=
                        color:&quot;#3388FF&quot;
                    </View>
                </View>
                <Input
                    className="normalInput"
                    placeholderClass="placeholder"
                    placeholderStyle="color:#3388FF"
                    placeholder="请在此输入"
                />
            </View>

            <View className="card-area">
                <View className="top-description">
                    <View>实时获取输入值</View>
                    <View>bindinput=&quot;bindKeyInput&quot;</View>
                </View>
                <View className="textarea">{inputValue}</View>
                <Input
                    className="normalInput"
                    placeholder="请在此输入内容"
                    onInput={e => {
                        setInputValue(e.detail.value)
                    }}
                />
            </View>
        </View>
    )
}

export default App
