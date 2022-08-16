import React from 'react'
import classNames from 'classnames'
import {View, Image} from '@taror/components'
import './demo1.scss'

type ModeType =
    | 'scaleToFill'
    | 'aspectFit'
    | 'aspectFill'
    | 'heightFix'
    | 'widthFix'
    | 'top'
    | 'bottom'
    | 'center'
    | 'left'
    | 'right'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right'

const scaleArray: {mode: ModeType, text: string, hasBackgroud?: number}[] = [
    {
        mode: 'scaleToFill',
        text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
    },
    {
        mode: 'aspectFit',
        text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来',
        hasBackgroud: 1
    },
    {
        mode: 'aspectFill',
        text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来'
    },
    {
        mode: 'widthFix',
        text: 'widthFix：宽度不变，高度自动变化，保持原图宽高比不变'
    },
    {
        mode: 'heightFix',
        text: 'heightFix：高度不变，宽度自动变化，保持原图宽高比不变'
    }
]

const cutArray: {mode: ModeType, text: string}[] = [
    {
        mode: 'top',
        text: 'top：不缩放图片，只显示图片的顶部区域'
    },
    {
        mode: 'bottom',
        text: 'bottom：不缩放图片，只显示图片的底部区域'
    },
    {
        mode: 'center',
        text: 'center：不缩放图片，只显示图片的中间区域'
    },
    {
        mode: 'left',
        text: 'left：不缩放图片，只显示图片的左边区域'
    },
    {
        mode: 'right',
        text: 'right：不缩放图片，只显示图片的右边边区域'
    },
    {
        mode: 'top left',
        text: 'top left：不缩放图片，只显示图片的左上边区域'
    },
    {
        mode: 'top right',
        text: 'top right：不缩放图片，只显示图片的右上边区域'
    },
    {
        mode: 'bottom left',
        text: 'bottom left：不缩放图片，只显示图片的左下边区域'
    },
    {
        mode: 'bottom right',
        text: 'bottom right：不缩放图片，只显示图片的右下边区域'
    }
]

const src = 'https://b.bdstatic.com/miniapp/images/demo-dog.png'

const App: React.FC = () => {
    const handleClick = e => {
        console.log('image 发生 tap 事件', e)
    }

    const handleError = e => {
        console.log('image 发生 error 事件，携带值为', e.detail.errMsg)
    }

    const handleLoad = e => {
        console.log('image 加载成功', e.type)
    }

    return (
        <View className='wrap'>
            <View className="mode-title mode-title-first">
                <View className="mode-title-line-left"></View>
                <View className="mode-title-text">自定义缩放模式</View>
                <View className="mode-title-line-right"></View>
            </View>
            {scaleArray.map(item => (
                <View key={item.mode} className="card-area">
                    <Image
                        className={classNames('image-area', {
                            'back-ground': item.hasBackgroud == 1
                        })}
                        data-name={item.mode}
                        image-menu-prevent="true"
                        mode={item.mode}
                        src={src}
                        onClick={handleClick}
                        onError={handleError}
                        onLoad={handleLoad}
                    />
                    <View className="bottom-description">{item.text}</View>
                </View>
            ))}
            <View className="mode-title mode-title-first">
                <View className="mode-title-line-left" />
                <View className="mode-title-text">不缩放图片，自定义裁切模式</View>
                <View className="mode-title-line-right" />
            </View>
            {cutArray.map(item => (
                <View key={item.mode} className="card-area">
                    <Image
                        className="image-area"
                        data-name="{{item.mode}}"
                        lazy-load="true"
                        image-menu-prevent="true"
                        mode={item.mode}
                        src={src}
                        onClick={handleClick}
                        onError={handleError}
                        onLoad={handleLoad}
                    />
                    <View className="bottom-description">{item.text}</View>
                </View>
            ))}
            <View className="card-area">
                <View className="top-description border-bottom">可放动图</View>
                <Image
                    mode="aspectFill"
                    className="image-custom"
                    src="https://b.bdstatic.com/searchbox/icms/searchbox/img/image-gif.gif"
                />
            </View>
        </View>
    )
}

export default App
