import {FC} from 'react'

interface WebViewEvent {
    src: string
}

interface WebViewProps {
    src: string
    onLoad?: (event: WebViewEvent) => void
    onError?: (event: WebViewEvent) => void
}

const WebView: FC<WebViewProps> = ({src, onLoad, onError}) => (
    <iframe
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

export default WebView
