import React, {useEffect, useRef, useImperativeHandle, forwardRef} from 'react'
import classNames from 'classnames'
import type {BaseProps, TaroBaseEvent} from '../_util/types'
import useBaseEvents from '../_util/hooks/useBaseEvents'

type ObjectFitType =
    | 'contain'
    | 'fill'
    | 'cover'

interface TaroVideoEvent extends TaroBaseEvent<{videoId: string | undefined}> {}

interface TaroVideoTimeUpdateEvent extends TaroBaseEvent<{
    videoId: string | undefined
    currentTime: number
    duration: number
}> {}

interface TaroVideoFullscreenChangeEvent extends TaroBaseEvent<{
    videoId: string | undefined
    fullscreen: '0' | '1'
}> {}

interface TaroVideoLoadedMetaData extends TaroBaseEvent<{
    videoId: string | undefined
    duration: number
    height: number
    width: number
}> {}

export interface VideoProps extends BaseProps {
    /**
     * 要播放视频的资源地址
     */
    src: string

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
     * 当开始/继续播放时触发 play 事件
     */
    onPlay?: (event: TaroVideoEvent) => void

    /**
     * 当暂停播放时触发 pause 事件
     */
    onPause?: (event: TaroVideoEvent) => void

    /**
     * 当播放到末尾时触发 ended 事件
     */
    onEnded?: (event: TaroVideoEvent) => void

    /**
     * 播放进度变化时触发, 触发频率 250ms 一次
     *
     * event.detail = {currentTime, duration}
     */
    onTimeUpdate?: (event: TaroVideoTimeUpdateEvent) => void

    /**
     * 当视频进入和退出全屏时触发
     *
     * event.detail = {fullScreen, direction}，direction取为 vertical 或 horizontal
     */
    onFullscreenChange?: (event: TaroVideoFullscreenChangeEvent) => void

    /**
     * 视频出现缓冲时触发
     */
    onWaiting?: (event: TaroVideoEvent) => void

    /**
     * 视频播放出错时触发
     */
    onError?: (event: TaroVideoEvent) => void

    /**
     * 视频元数据加载完成时触发。event.detail = {width, height, duration}
     */
    onLoadedMetaData?: (event: TaroVideoLoadedMetaData) => void
}

const Video: React.ForwardRefRenderFunction<HTMLVideoElement, VideoProps> = ({
    id,
    className,
    style,
    children,
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
    ...eventProps
}, ref) => {
    const handles = useBaseEvents(eventProps)
    const isFirstPaly = useRef(false)

    const video = useRef<HTMLVideoElement | null>(null)

    useImperativeHandle(ref, () => video.current!)

    useEffect(() => {
        if (!video.current || !onFullscreenChange) {
            return
        }

        function handle() {
            const fullscreen = (document as any).webkitFullscreenElement === video.current
            ? '1'
            : '0'
            const taroEvent: TaroVideoFullscreenChangeEvent = {
                type: 'fullscreenchange',
                detail: {
                    videoId: id,
                    fullscreen
                }
            }
            onFullscreenChange!(taroEvent)
        }
        const videoEl = video.current
        videoEl.addEventListener('webkitfullscreenchange', handle)

        return () => {
            videoEl.removeEventListener('webkitfullscreenchange', handle)
        }
    }, [onFullscreenChange])

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
            onPlay={() => {
                if (video.current && isFirstPaly.current && initialTime) {
                    video.current.currentTime = initialTime
                }
                if (onPlay) {
                    const taroEvent: TaroVideoEvent = {
                        type: 'play',
                        detail: {
                            videoId: id
                        }
                    }
                    onPlay(taroEvent)
                }
            }}
            onPause={() => {
                if (onPause) {
                    const taroEvent: TaroVideoEvent = {
                        type: 'pause',
                        detail: {
                            videoId: id
                        }
                    }
                    onPause(taroEvent)
                }
            }}
            onEnded={() => {
                if (onEnded) {
                    const taroEvent: TaroVideoEvent = {
                        type: 'ended',
                        detail: {
                            videoId: id
                        }
                    }
                    onEnded(taroEvent)
                }
            }}
            onTimeUpdate={() => {
                if (onTimeUpdate) {
                    const videoEl = video.current!
                    const taroEvent: TaroVideoTimeUpdateEvent = {
                        type: 'timeupdate',
                        detail: {
                            videoId: id,
                            currentTime: videoEl.currentTime,
                            duration: videoEl.duration
                        }
                    }
                    onTimeUpdate(taroEvent)
                }
            }}
            onWaiting={() => {
                if (onWaiting) {
                    const taroEvent: TaroVideoEvent = {
                        type: 'waiting',
                        detail: {
                            videoId: id
                        }
                    }
                    onWaiting(taroEvent)
                }
            }}
            onError={() => {
                if (onError) {
                    const taroEvent: TaroVideoEvent = {
                        type: 'error',
                        detail: {
                            videoId: id
                        }
                    }
                    onError(taroEvent)
                }
            }}
            onLoadedMetadata={() => {
                if (onLoadedMetaData) {
                    const videoEl = video.current!
                    const taroEvent: TaroVideoLoadedMetaData = {
                        type: 'loadedmetadata',
                        detail: {
                            videoId: id,
                            duration: videoEl.duration,
                            height: videoEl.videoHeight,
                            width: videoEl.videoWidth
                        }
                    }
                    onLoadedMetaData(taroEvent)
                }
            }}
            {...handles}
        />
    )
}

export default forwardRef(Video)
