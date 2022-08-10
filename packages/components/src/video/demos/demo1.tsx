import React from 'react'
import { View, Video } from '@taror/components'

const src = 'https://b.bdstatic.com/miniapp/development_tool/Smartprogram.mp4'

const App: React.FC = () => (
    <View className='wrap'>
        <View className="card-area">
            <Video
                style={{
                    width: '100%'
                }}
                title="这是title"
                src={src}
                onPlay={e => {
                    console.log('video', e.type)
                }}
                onPause={e => {
                    console.log('video', e.type)
                }}
                onError={e => {
                    console.log('video', e.type)
                }}
                onEnded={e => {
                    console.log('video', e.type)
                }}
                onWaiting={e => {
                    console.log('video', e.type)
                }}
                onTimeUpdate={e => {
                    console.log('video', e.type)
                }}
                onFullscreenChange={e => {
                    console.log('video', e.type)
                }}
                onLoadedMetaData={e => {
                    console.log('video', e.detail)
                }}
            />
        </View>
    </View>
)

export default App
