import React, {useState} from 'react'
import { View, Button, Form } from '@taror/components'
import './demo1.scss'

const App: React.FC = () => {
    const [isFavor, setIsFavor] = useState(false)

    return (
        <View className="wrap">
            <View className="card-area">
                <View className="top-description border-bottom">
                    <View>主要按钮</View>
                    <View>primary</View>
                </View>
                <Button type="primary" plain={false}>
                    主按钮 normal
                </Button>
                <Button type="primary" loading>
                    主按钮 loading
                </Button>
                <Button type="primary" disabled>
                    主按钮 disabled
                </Button>
            </View>

            <View className="card-area">
                <View className="top-description border-bottom">
                    <View>次要按钮</View>
                    <View>default</View>
                </View>
                <Button type="default" plain={false}>
                    次按钮 normal
                </Button>
                <Button type="default" loading>
                    次按钮 loading
                </Button>
                <Button type="default" disabled>
                    次按钮 disabled
                </Button>
            </View>

            <View className="card-area">
                <View className="top-description border-bottom">
                    <View>警示按钮</View>
                    <View>warn</View>
                </View>
                <Button type="warn">
                    警示按钮 normal
                </Button>
                <Button type="warn" loading>
                    警示按钮 loading
                </Button>
                <Button type="warn" disabled>
                    警示按钮 disabled
                </Button>
            </View>

            <View className="card-area">
                <View className="top-description border-bottom">
                    <View>小尺寸按钮</View>
                    <View>size=&apos;mini&apos;</View>
                </View>
                <Button type="primary" size="mini">
                    按钮
                </Button>
                <Button type="default" size="mini">
                    按钮
                </Button>
                <Button type="warn" size="mini">
                    按钮
                </Button>
            </View>

            <View className="card-area">
                <View className="top-description border-bottom">
                    自定义点击态
                </View>
                <Button
                    type="primary"
                    hoverClass='none'
                    onClick={() => {
                        console.log('已点击')
                    }}
                >
                    无点击态
                </Button>
                <Button type="primary" hoverStartTime={1000}>
                    点击态延迟出现
                </Button>
                <Button type="primary" hoverStayTime={2000}>
                    点击态延迟消失
                </Button>
            </View>

            <View className="card-area">
                <View className="top-description border-bottom">
                    <View>绑定表单操作</View>
                    <View>form-type=&quot;submit/reset&quot;</View>
                </View>
                <Form
                    onSubmit={() => {
                        console.log('用户点击了submit')
                    }}
                    onReset={() => {
                        console.log('用户点击了reset')
                    }}
                >
                    <Button formType="submit" type="primary">
                        提交
                    </Button>
                    <Button formType="reset">
                        重置
                    </Button>
                </Form>
            </View>

            <View className="card-area" hoverClass="hover">
                <View className="top-description border-bottom">
                    <View>按钮父级同步出现点击态</View>
                    <View>hover-stop-propagation</View>
                </View>
                <Button
                    hoverStopPropagation
                    type="primary"
                    onClick={() => {
                        console.log('已点击')
                    }}
                >
                    点击卡片空白区域体验效果
                </Button>
            </View>

            <View className="card-area">
                <View className="top-description border-bottom">
                    自定义 Button 样式
                </View>
                <Button
                    className={isFavor ? 'Favor' : 'noFavor' }
                    onClick={() => {
                        setIsFavor(!isFavor)
                    }}
                >
                    {isFavor ? '已' : ''}关注
                </Button>
            </View>
        </View>
    )
}

export default App
