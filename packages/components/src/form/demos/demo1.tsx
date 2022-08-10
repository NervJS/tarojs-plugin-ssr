import React from 'react'
import { Form, View, Text, Switch, Input, Button } from '@taror/components'
import './demo1.scss'

const App: React.FC = () => {

    const handleFormSubmit = e => {
        console.log('表单发生了submit事件，携带数据为：', e.detail.value)
    }

    const handleFormReset = e => {
        console.log('表单发生了', e.type)
    }

    return (
        <View className='wrap'>
            <Form onSubmit={handleFormSubmit} onReset={handleFormReset}>
                <View className="card-area">
                    <View className="top-description border-bottom">开关选择器</View>
                    <View className="item-scroll">
                        <Text className="switch-Text">开关</Text>
                        <Switch name="switch" />
                    </View>
                </View>
                <View className="card-area">
                    <View className="top-description border-bottom">单项选择器</View>
                    {/* <radio-group name="radio-group">
                        <radio className="block border-bottom" value="radio1">单选项一</radio>
                        <radio className="block" value="radio2">单选项二</radio>
                    </radio-group> */}
                </View>
                <View className="card-area">
                    <View className="top-description border-bottom">多项选择器</View>
                    {/* <checkbox-group name="checkbox">
                        <Label className="block border-bottom">
                            <checkbox value="checkbox1">多选项一</checkbox>
                        </Label>
                        <Label className="block border-bottom">
                            <checkbox value="checkbox2">多选项二</checkbox>
                        </Label> 
                        <Label className="block">
                            <checkbox value="checkbox3">多选项三</checkbox>
                        </Label>
                    </checkbox-group> */}
                </View>
                <View className="card-area">
                    <View className="top-description border-bottom">滑块选择器</View>
                    {/* <slider className="slider" activeColor="#3388FF" block-size="20" name="slider"></slider> */}
                </View>
                <View className="card-area">
                    <View className="top-description border-bottom">输入框</View>
                    <Input name="input" className="ipt" placeholder="请在此输入" />
                </View>
                <View className="card-area">
                    <View className="top-description border-bottom">提交表单</View>
                    <Button formType="submit" type="primary">提交</Button>
                    <Button formType="reset">清空</Button>
                </View>
            </Form>
            <View className="mode-title mode-title-first">
                <View className="mode-title-line-left"></View>
                <View className="mode-title-Text">模板类型表单</View>
                <View className="mode-title-line-right"></View>
            </View>
            <Form 
                reportSubmit
                reportType="subscribe"
                templateId="BD0003"
                subscribeId="8026"
                onSubmit="reportFormSubmit"
                onReset="reportFormReset">
                <View className="card-area">
                    <View className="top-description border-bottom">reportType为subscribe</View>
                    <Button formType="submit" type="primary">点击触发</Button>
                </View>
            </Form>
            <Form 
                reportSubmit
                reportType="default"
                onSubmit="reportFormSubmit"
                onReset="reportFormReset">
                <View className="card-area">
                    <View className="top-description border-bottom">reportType为default</View>
                    <Button formType="submit" type="primary">点击触发</Button>
                </View>
            </Form>
        </View>
    )
}

export default App
