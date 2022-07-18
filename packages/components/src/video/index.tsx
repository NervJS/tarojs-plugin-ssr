import React, {useEffect, useRef, useImperativeHandle, forwardRef} from 'react'
import classNames from 'classnames'
import type {TaroBaseProps, TaroEvent, TaroEventHandler, TaroVideoEventHandler} from '../_util/typings'
import useTaroBaseEvents from '../_util/hooks/useTaroBaseEvents'
import {createTaroVideoEvent} from '../_util/taroEvent'

type ObjectFitType =
    | 'contain'
    | 'fill'
    | 'cover'

type TaroTimeUpdateEvent = TaroEvent<{
    videoId: string | undefined
    currentTime: number
    duration: number
}>

type TaroTimeUpdateEventHandler = TaroEventHandler<TaroTimeUpdateEvent>

type TaroFullscreenChangeEvent = TaroEvent<{
    videoId: string | undefined
    fullscreen: '0' | '1'
}>

type TaroFullscreenChangeEventHandler = TaroEventHandler<TaroFullscreenChangeEvent>

type TaroLoadedMetaDataEvent = TaroEvent<{
    videoId: string | undefined
    duration: number
    height: number
    width: number
}>

type TaroLoadedMetaDataEventHandler = TaroEventHandler<TaroLoadedMetaDataEvent>

export interface VideoProps extends TaroBaseProps {
    /**
     * 要播放视频的资源地址
     */
    src: string

    /**
     * 视频标题，全屏时在视频顶部展示
     * @unsupported
     */
    title?: string

    /**
     * 指定视频初始播放位置
     */
    initialTime?: number

    /**
     * 是否显示默认播放控件（播放/暂停按钮、播放进度、时间）
     * @default true
     */
    controls?: boolean

    /**
     * 是否自动播放
     * @default false
     */
    autoplay?: boolean

    /**
     * 是否循环播放
     * @default false
     */
    loop?: boolean

    /**
     * 是否静音播放
     * @default false
     */
    muted?: boolean

    /**
     * 当视频大小与 video 容器大小不一致时，视频的表现形式
     * @default "contain"
     */
    objectFit?: ObjectFitType

    /**
     * 视频封面的图片网络资源地址，如果 controls 属性值为 false 则设置 poster 无效
     */
    poster?: string

    /**
     * 在非全屏模式下，是否开启使用手势调节亮度与音量，兼容 vslide-gesture 属性
     * @default false
     * @unsupported
     */
    pageGesture?: boolean

    /**
     * 按设置的视频全屏方向进入全屏。不指定视频全屏方向时则根据设备方向判断全屏方向。0：正常竖向；90：屏幕顺时针 90 度；-90：屏幕逆时针 90 度
     * @unsupported
     */
    direction?: number

    /**
     * 若不设置，宽度大于 240 时才会显示
     * @default true
     * @unsupported
     */
    showProgress?: boolean

    /**
     * 是否显示全屏按钮
     * @default true
     * @unsupported
     */
    showFullscreenBtn?: boolean

    /**
     * 是否开启使用手势控制进度
     * @default true
     * @unsupported
     */
    enableProgressGesture?: boolean

    /**
     * 弹幕列表
     * @unsupported
     */
    danmuList?: object[]

    /**
     * 是否展示弹幕，只在初始化时有效，不能动态变更
     * @default false
     * @unsupported
     */
    enableDanmu?: boolean

    /**
     * 是否显示视频底部控制栏的播放按钮
     * @default true
     * @unsupported
     */
    showPlayBtn?: boolean

    /**
     * 是否显示视频中间的播放按钮
     * @default true
     * @unsupported
     */
    showCenterPlayBtn?: boolean

    /**
     * 是否显示静音按钮
     * @default false
     * @unsupported
     */
    showMuteBtn?: boolean

    /**
     * 非 wifi 环境下是否显示继续播放浮层
     * @default true
     * @unsupported
     */
    showNoWifiTip?: boolean

    /**
     * 非全屏模式下，是否开启亮度与音量调节手势，兼容 page-gesture 属性
     * @default true
     * @unsupported
     */
    vslideGesture?: boolean

    /**
     * 全屏模式下，是否开启亮度与音量调节手势
     * @default true
     * @unsupported
     */
    vslideGestureInFullscreen?: boolean

    /**
     * 全屏模式下，是否显示锁屏按钮
     * @default true
     * @unsupported
     */
    showLockBtn?: boolean

    /**
     * 是否开启播放手势，即双击切换播放/暂停
     * @default false
     * @unsupported
     */
    enablePlayGesture?: boolean

    /**
     * 当开始/继续播放时触发 play 事件
     */
    onPlay?: TaroVideoEventHandler

    /**
     * 当暂停播放时触发 pause 事件
     */
    onPause?: TaroVideoEventHandler

    /**
     * 当播放到末尾时触发 ended 事件
     */
    onEnded?: TaroVideoEventHandler

    /**
     * 播放进度变化时触发, 触发频率 250ms 一次
     *
     * event.detail = {currentTime, duration}
     */
    onTimeUpdate?: TaroTimeUpdateEventHandler

    /**
     * 当视频进入和退出全屏时触发
     *
     * event.detail = {fullScreen, direction}，direction取为 vertical 或 horizontal
     */
    onFullscreenChange?: TaroFullscreenChangeEventHandler

    /**
     * 视频出现缓冲时触发
     */
    onWaiting?: TaroVideoEventHandler

    /**
     * 视频播放出错时触发
     */
    onError?: TaroVideoEventHandler

    /**
     * 视频元数据加载完成时触发。event.detail = {width, height, duration}
     */
    onLoadedMetaData?: TaroLoadedMetaDataEventHandler
}

const Video: React.ForwardRefRenderFunction<HTMLVideoElement, VideoProps> = ({
    id,
    className,
    style,
    src,
    initialTime,
    controls = true,
    autoplay = false,
    loop = false,
    muted = false,
    objectFit = 'contain',
    poster,
    onPlay,
    onPause,
    onEnded,
    onTimeUpdate,
    onFullscreenChange,
    onWaiting,
    onError,
    onLoadedMetaData,

    // unsupported props
    title,
    pageGesture,
    direction,
    showProgress,
    showFullscreenBtn,
    enableProgressGesture,
    danmuList,
    enableDanmu,
    showPlayBtn,
    showCenterPlayBtn,
    showMuteBtn,
    showNoWifiTip,
    vslideGesture,
    vslideGestureInFullscreen,
    showLockBtn,
    enablePlayGesture,

    ...rest
}, ref) => {
    const props = useTaroBaseEvents(rest)

    const isFirstPaly = useRef(true)
    const video = useRef<HTMLVideoElement | null>(null)

    useImperativeHandle(ref, () => video.current!)

    useEffect(() => {
        if (!video.current || !onFullscreenChange) {
            return
        }

        function handle(event) {
            let fullscreen: '1' | '0' = '0'
            if ('webkitFullscreenElement' in document) {
                fullscreen = (document as any).webkitFullscreenElement === video.current ? '1' : '0'
            } else {
                fullscreen = document.fullscreenElement === video.current ? '1' : '0'
            }
            const {
                timeStamp,
                target,
                currentTarget
            } = event
            const taroEvent: TaroFullscreenChangeEvent = {
                type: 'fullscreenchange',
                detail: {
                    videoId: id,
                    fullscreen
                },
                timeStamp,
                target,
                currentTarget,
                preventDefault: () => event.preventDefault(),
                stopPropagation: () => event.stopPropagation()
            }
            onFullscreenChange?.(taroEvent)
        }
        const videoEl = video.current
        videoEl.addEventListener('webkitfullscreenchange', handle)
        videoEl.addEventListener('fullscreenchange', handle)

        return () => {
            videoEl.removeEventListener('webkitfullscreenchange', handle)
            videoEl.removeEventListener('fullscreenchange', handle)
        }
    }, [id, onFullscreenChange])

    const mergedStyle: React.CSSProperties = Object.assign({
        objectFit
    }, style)

    return (
        <video
            ref={video}
            id={id}
            className={classNames('video-js', className)}
            style={mergedStyle}
            playsInline
            src={src}
            controls={controls}
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
            poster={poster}
            onPlay={event => {
                if (video.current && isFirstPaly.current && initialTime) {
                    isFirstPaly.current = false
                    video.current.currentTime = initialTime
                }
                if (onPlay) {
                    const taroEvent = createTaroVideoEvent('play', event)
                    onPlay(taroEvent)
                }
            }}
            onPause={event => {
                if (onPause) {
                    const taroEvent = createTaroVideoEvent('pause', event)
                    onPause(taroEvent)
                }
            }}
            onEnded={event => {
                if (onEnded) {
                    const taroEvent = createTaroVideoEvent('ended', event)
                    onEnded(taroEvent)
                }
            }}
            onTimeUpdate={event => {
                if (onTimeUpdate) {
                    const videoEl = video.current!
                    const {
                        timeStamp,
                        target,
                        currentTarget,
                        preventDefault,
                        stopPropagation
                    } = event
                    const taroEvent: TaroTimeUpdateEvent = {
                        type: 'timeupdate',
                        detail: {
                            videoId: id,
                            currentTime: videoEl.currentTime,
                            duration: videoEl.duration
                        },
                        timeStamp,
                        target,
                        currentTarget,
                        preventDefault,
                        stopPropagation
                    }
                    onTimeUpdate(taroEvent)
                }
            }}
            onWaiting={event => {
                if (onWaiting) {
                    const taroEvent = createTaroVideoEvent('waiting', event)
                    onWaiting(taroEvent)
                }
            }}
            onError={event => {
                if (onError) {
                    const taroEvent = createTaroVideoEvent('error', event)
                    onError(taroEvent)
                }
            }}
            onLoadedMetadata={event => {
                if (onLoadedMetaData) {
                    const videoEl = video.current!
                    const {
                        timeStamp,
                        target,
                        currentTarget
                    } = event
                    const taroEvent: TaroLoadedMetaDataEvent = {
                        type: 'loadedmetadata',
                        detail: {
                            videoId: id,
                            duration: videoEl.duration,
                            height: videoEl.videoHeight,
                            width: videoEl.videoWidth
                        },
                        timeStamp,
                        target,
                        currentTarget,
                        preventDefault: () => event.preventDefault(),
                        stopPropagation: () => event.stopPropagation()
                    }
                    onLoadedMetaData(taroEvent)
                }
            }}
            {...props}
        />
    )
}

export default forwardRef(Video)
