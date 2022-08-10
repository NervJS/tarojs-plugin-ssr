import React, {useState} from 'react'
import { View, Button } from '@taror/components'
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
                <Button type="primary" plain="false">
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
                <Button type="default" plain="false">
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
                    onChange={() => {
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
                    <View>绑定开放能力</View>
                    <View style="width: 1.8rem;">打开开发者工具、扫描二维码体验完整能力</View>
                </View>
                <Button type="primary" className="middle-btn" open-type="share">触发用户分享</Button>
                <Button type="primary" className="middle-btn" open-type="getUserInfo" bindgetuserinfo="getUserInfo">获取用户信息</Button>
                <Button type="primary" className="middle-btn" onClick="navToGetUserInfo">获取用户信息示例</Button>
                <Button type="primary" className="middle-btn" open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">获取用户手机号</Button>
                <Button type="primary" className="middle-btn" onClick="navToGetPhoneNumber">获取用户手机号示例</Button>
                <Button type="primary" className="middle-btn" open-type="openSetting" bindopensetting="openSetting">打开授权设置页</Button>
                <Button type="primary" className="middle-btn" open-type="chooseAddress" bindchooseAddress="chooseAddress">选择用户收货地址</Button>
                <Button type="primary" className="middle-btn" open-type="chooseInvoiceTitle" bindchooseInvoiceTitle="chooseInvoiceTitle">选择用户发票抬头</Button>
                <Button type="primary" className="middle-btn" contact open-type="contact" bindcontact="contact">打开客服对话</Button>
                <Button type="primary" className="middle-btn" contact open-type="login" bindlogin="login">登录</Button>
                <Button type="primary" className="middle-btn" open-type="subscribe" template-id="BD0003" subscribe-id="8026" bindsubscribe="subscribe">订阅消息</Button>
            </View>

            {/* <View className="card-area">
                <View className="top-description border-bottom">
                    <View>绑定表单操作</View>
                    <View>form-type="submit/reset"</View>
                </View>
                <form bindsubmit="submit" bindreset="reset">
                    <Button form-type="submit" type="primary">
                        提交
                    </Button>
                    <Button form-type="reset">
                        重置
                    </Button>
                </form>
            </View>

            <View className="card-area" hover-className="hover">
                <View className="top-description border-bottom">
                    <View>按钮父级同步出现点击态</View>
                    <View>hover-stop-propagation</View>
                </View>
                <Button type="primary" hover-stop-propagation="true" onClick="tap">
                    点击卡片空白区域体验效果
                </Button>
            </View>

            <View className="card-area">
                <View className="top-description border-bottom">
                    自定义 Button 样式
                </View>
                <Button className="{{isFavor ? 'Favor' : 'noFavor' }}" bindtap="tapChange">
                    {isFavor? '已': ''}关注
                </Button>
            </View>

            <View className="card-area">
                <View className="top-description border-bottom">
                    同时绑定开放能力、普通点击事件
                </View>
                <Button type="primary" open-type="getPhoneNumber" bindgetuserinfo="getPhoneNumber" bindtap="tap">获取用户手机号</Button>
            </View> */}
        </View>
    )
}

export default App
