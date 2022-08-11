import React, {useState} from 'react'
import { View, ScrollView } from '@taror/components'
import './demo1.scss'

const order = ['one', 'two', 'three']

const App: React.FC = () => {
    const [scrollTop, setScrollTop] = useState(0)
    const [scrollIntoView, setScrollIntoView] = useState('one')
    const [scrollLeft, setScrollLeft] = useState(0)

    return (
        <View className='wrap'>
                <View className="card-area">
                <View className="top-description">纵向滚动</View>
                <ScrollView
                    scrollY
                    scrollWithAnimation
                    className="scroll-view"
                    upperThreshold={1}
                    lowerThreshold={1}
                    scrollTop={scrollTop}
                    scrollIntoView={scrollIntoView}
                    onScrollToUpper={() => {
                        console.log('到顶了')
                    }}
                    onScrollToLower={() => {
                        console.log('到底了')
                    }}
                    onScroll={e => {
                        console.log('获取滚动事件的详细信息e.detail：', e.detail)
                        // 此处只做对scrollTop值的监听，不需要使用setData对视图层发起更新
                        setScrollTop(e.detail.scrollTop)
                    }}
                >
                    <View id="one" className="color-a">A</View>
                    <View id="two" className="color-b">B</View>
                    <View id="three" className="color-c">C</View>
                </ScrollView>
                <View className="page-section-btns">
                    <View
                        className="next-page"
                        onClick={() => {
                            for (let i = 0; i < order.length; ++i) {
                                console.log(order[i], scrollIntoView)
                                if (order[i] === scrollIntoView) {
                                    const next = (i + 1) % order.length
                                    setScrollIntoView(order[next])
                                }
                            }
                        }}
                    >
                        下一页
                    </View>
                    <View
                        onClick={() => {
                            setScrollTop(scrollTop + 10)
                        }}
                    >
                        滚动
                    </View>
                    <View
                        className="scroll-to-top"
                        onClick={() => {
                            setScrollTop(0)
                        }}
                    >
                        回顶部
                    </View>
                </View>
            </View>

            <View className="card-area">
                <View className="top-description">横向滚动</View>
                <ScrollView
                    scrollX
                    className="scroll-view"
                    scrollLeft={scrollLeft}
                    upperThreshold={1}
                    lowerThreshold={1}
                    onScrollToUpper={() => {
                        console.log('到最左边了')
                    }}
                    onScrollToLower={() => {
                        console.log('到最右边了')
                    }}
                    onScroll={e => {
                        console.log('获取滚动事件的详细信息e.detail：', e.detail)
                        // 此处只做对scrollTop值的监听，不需要使用setData对视图层发起更新
                        setScrollLeft(e.detail.scrollTop)
                    }}
                >
                    <View id="four" className="color-a row-view">A</View>
                    <View id="five" className="color-b row-view">B</View>
                    <View id="six" className="color-c row-view">C</View>
                </ScrollView>
            </View>
        </View>
    )
}

export default App
