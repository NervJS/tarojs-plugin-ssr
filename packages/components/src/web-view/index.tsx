import {forwardRef, ForwardRefRenderFunction} from 'react'

export interface WebViewEvent {
    src: string
}

export interface WebViewProps {
    src: string
    onLoad?: (event: WebViewEvent) => void
    onError?: (event: WebViewEvent) => void
}

const WebView: ForwardRefRenderFunction<HTMLIFrameElement, WebViewProps> = ({src, onLoad, onError}, ref) => (
    <iframe
        ref={ref}
        className='taro-webview'
        onLoad={event => {
            event.stopPropagation()
            onLoad?.({src})
        }}
        onError={event => {
            event.stopPropagation()
            onError?.({src})
        }}
        src={src}
    />
)

export default forwardRef(WebView)
