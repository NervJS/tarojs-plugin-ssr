import React, {forwardRef} from 'react'
import classNames from 'classnames'
import type {BaseProps, TaroDomEvent} from '../_util/types'
import useBaseEvents from '../_util/hooks/useBaseEvents'

interface TaroWebViewMessageEvent extends TaroDomEvent<{
    data: any
}> {}

interface TaroWebViewLoadEvent extends TaroDomEvent<{
    src: string
}> {}

interface TaroWebViewErrorEvent extends TaroDomEvent<{
    src: string
}> {}

export interface WebViewProps extends BaseProps {
    /**
     * webview 指向网页的链接。可打开关联的公众号的文章，其它网页需登录小程序管理后台配置业务域名
     */
    src: string

    /**
     * 网页向小程序 postMessage 时，会在特定时机（小程序后退、组件销毁、分享）触发并收到消息。e.detail = { data }
     */
    onMessage?: (event: TaroWebViewMessageEvent) => void

    /**
     * 网页加载成功时候触发此事件。e.detail = { src }
     */
    onLoad?: (event: TaroWebViewLoadEvent) => void

    /**
     * 网页加载失败的时候触发此事件。e.detail = { src }
     */
    onError?: (event: TaroWebViewErrorEvent) => void
}

const WebView: React.ForwardRefRenderFunction<HTMLIFrameElement, WebViewProps> = ({
    id,
    className,
    style,
    src,
    onMessage,
    onLoad,
    onError,
    ...eventProps
}, ref) => {
    const handles = useBaseEvents(eventProps)

    return (
        <iframe
            ref={ref}
            id={id}
            className={classNames('taro-webview', className)}
            style={style}
            onLoad={event => {
                if (onLoad) {
                    const taroEvent: TaroWebViewLoadEvent = {
                        type: 'load',
                        timeStamp: event.timeStamp,
                        detail: {
                            src
                        },
                        target: event.target,
                        currentTarget: event.currentTarget,
                        stopPropagation: event.stopPropagation,
                        preventDefault: event.preventDefault
                    }
                    onLoad(taroEvent)
                }
            }}
            onError={event => {
                if (onError) {
                    const taroEvent: TaroWebViewLoadEvent = {
                        type: 'error',
                        timeStamp: event.timeStamp,
                        detail: {
                            src
                        },
                        target: event.target,
                        currentTarget: event.currentTarget,
                        stopPropagation: event.stopPropagation,
                        preventDefault: event.preventDefault
                    }
                    onError(taroEvent)
                }
            }}
            src={src}
            {...handles}
        />
    )
}

export default forwardRef(WebView);
