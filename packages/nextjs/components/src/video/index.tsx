import {
    forwardRef,
    EventHandler,
    SyntheticEvent,
    CSSProperties,
    ForwardRefRenderFunction
} from 'react'

interface VideoEvent extends SyntheticEvent<HTMLVideoElement, Event> {
    detail?: Record<string, any>
}

type VideoEventHandler = EventHandler<VideoEvent>

interface VideoProps {
    className?: string;
    style?: CSSProperties;
    src: string
    duration?: number
    controls?: boolean
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
    poster?: string
    onPlay?: VideoEventHandler
    onPause?: VideoEventHandler
    onEnded?: VideoEventHandler
    onTimeUpdate?: VideoEventHandler
    onWaiting?: VideoEventHandler
    onError?: VideoEventHandler
    onProgress?: VideoEventHandler
    onLoadedMetaData?: VideoEventHandler
}

const Video: ForwardRefRenderFunction<HTMLVideoElement, VideoProps> = ({
    className,
    style,
    src,
    controls = true,
    autoplay,
    loop,
    muted,
    poster,
    onPlay,
    onPause,
    onEnded,
    onTimeUpdate,
    onWaiting,
    onError,
    onProgress,
    onLoadedMetaData
}, ref) => (
    <video
        playsInline
        ref={ref}
        className={className}
        style={style}
        src={src}
        controls={controls}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        poster={poster}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        onTimeUpdate={originEvent => {
            const event = originEvent as VideoEvent
            const target = originEvent.target as HTMLVideoElement
            event.detail = {
                currentTime: target.currentTime,
                duration: target.duration
            }
            onTimeUpdate?.(event)
        }}
        onWaiting={onWaiting}
        onError={onError}
        onProgress={onProgress}
        onLoadedMetadata={originEvent => {
            const event = originEvent as VideoEvent
            const target = originEvent.target as HTMLVideoElement
            event.detail = {
                width: target.videoWidth,
                height: target.videoHeight,
                duration: target.duration
            }
            onLoadedMetaData?.(event)
        }}
    />
)

export default forwardRef(Video)
