import React, {useState} from 'react'
import {View, Text, Swiper, SwiperItem, Switch} from '@taror/components'
import './demo1.scss'

const swiperList = [
    {
        className: 'color-a',
        value: 'A'
    },
    {
        className: 'color-b',
        value: 'B'
    },
    {
        className: 'color-c',
        value: 'C'
    }
]

const App: React.FC = () => {
    const [switchIndicateStatus, setSwitchIndicateStatus] = useState(true)
    const [switchAutoPlayStatus, setSwitchAutoPlayStatus] = useState(false)

    return (
        <View className='wrap'>
            <View className="card-area">
            <Swiper
                className="swiper"
                indicatorDots={switchIndicateStatus}
                indicatorColor="rgba(0,0,0,0.30)"
                indicatorActiveColor="#fff"
                autoplay={switchAutoPlayStatus}
                current={0}
                // interval="{{autoPlayInterval}}"
                // duration="{{switchDuration}}"
                // circular="true"
                // vertical="{{switchVerticalStatus}}"
                // previous-margin="0px"
                // next-margin="0px"
                // display-multiple-items="1"
                // onChange="swiperChange"
                // bind:animationfinish="animationfinish"
            >
                {swiperList.map(item => (
                    <SwiperItem
                        key={item.value}
                        className={item.className}
                        itemId={item.value}
                    >
                        <View className="swiper-item">{item.value}</View>
                    </SwiperItem>
                ))}
            </Swiper>

            <View className="item-scroll border-bottom">
                <Text className="switch-text-before">指示点</Text>
                <Switch
                    className="init-switch"
                    checked={switchIndicateStatus}
                    onChange={() => {
                        setSwitchIndicateStatus(!switchIndicateStatus)
                    }}
                >
                </Switch>
            </View>

            <View className="item-scroll border-bottom">
                <Text className="switch-text-before">自动切换</Text>
                <Switch
                    className="init-switch"
                    checked={switchAutoPlayStatus}
                    onChange={() => {
                        setSwitchAutoPlayStatus(!switchAutoPlayStatus)
                    }}
                >
                </Switch>
            </View>

                {/* <View className="item-scroll">
                    <Text className="switch-text-before">纵向滑动</Text>
                    <Switch
                        checked="{{switchVerticalStatus}}"
                        bind:change="switchVertical"
                        className="init-switch">
                    </Switch>
                </View>
            </View>
            <View className="card-area">
                <View className="top-description border-bottom">
                    <View>滑块切换时长</View>
                    <View>{{ switchDuration }}ms</View>
                </View>
                <Slider
                    className="slider"
                    min="300"
                    max="1500"
                    value="{{switchDuration}}"
                    bind:change="changeSwitchDuration">
                </Slider>
            </View>
            <View className="card-area">
                <View className="top-description border-bottom">
                    <View>自动切换时间间隔</View>
                    <View>{{ autoPlayInterval }}ms</View>
                </View>
                <Slider
                    className="slider"
                    min="1000"
                    max="5000"
                    value="{{autoPlayInterval}}"
                    bind:change="changeAutoPlayInterval">
                </Slider>
            </View>
            <View className="card-area">
                <View className="top-description">自定义底部切换圆点</View>
                <View className="swiper-wrap">
                    <Swiper
                        className="swiper-custom"
                        autoplay="auto"
                        interval="3000"
                        duration="500"
                        current="{{swiperCurrent}}"
                        bindchange="swiperChangeCustom">
                        <SwiperItem s-for="{{slider}}">
                            <image className="swiper-img" src="{{item.imageUrl}}"></image>
                        </SwiperItem>
                    </Swiper>
                    <View className="dots">
                        <View s-for="{{slider}}" className="dot {{index == swiperCurrent ? ' active' : ''}}"></View>
                    </View>
                </View>
            </View>
            <View className="card-area">
                <View className="top-description">模拟 tabs 组件功能</View>
                <View className="swiper-tab">
                    <View className="swiper-box">
                        <View
                            className="tab-item {{currentTab==0 ? 'on' : ''}}"
                            data-current="0"
                            bindtap="swiperNav"
                        >
                            全部
                        </View>
                        <View
                            className="tab-item {{currentTab==1 ? 'on' : ''}}"
                            data-current="1"
                            bindtap="swiperNav"
                        >
                            服务通知
                        </View>
                        <View
                            className="tab-item {{currentTab==2 ? 'on' : ''}}"
                            data-current="2"
                            bindtap="swiperNav"
                        >
                            系统通知
                        </View>
                        <View
                            className="tab-item {{currentTab==3 ? 'on' : ''}}"
                            data-current="3"
                            bindtap="swiperNav"
                        >
                            评论
                        </View>
                        <View
                            className="tab-item {{currentTab==4 ? 'on' : ''}}"
                            data-current="4"
                            bindtap="swiperNav"
                        >
                            其他
                        </View>
                    </View>
                </View>
                <Swiper className="swiper-content" current="{{currentTab}}" duration="200" bindchange="bindchange">
                    <SwiperItem className="swiper-item">
                        <View>我是全部</View>
                    </SwiperItem>
                    <SwiperItem className="swiper-item">
                        <View>我是服务通知</View>
                    </SwiperItem>
                    <SwiperItem className="swiper-item">
                        <View>我是系统通知</View>
                    </SwiperItem>
                    <SwiperItem className="swiper-item">
                        <View>我是评论</View>
                    </SwiperItem>
                    <SwiperItem className="swiper-item">
                        <View>我是其他</View>
                    </SwiperItem>
                </Swiper> */}
            </View>
        </View>
    )
}

export default App
