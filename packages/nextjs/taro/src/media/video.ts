import promisify from 'mpromisify'
import {limited} from '../_util'
import type * as swan from '../swan'

const chooseVideoInternal: typeof swan.chooseVideo = ({
    sourceType = ['album', 'camera'],
    success,
    complete
}) => {
    const result: swan.chooseImage.ParamPropSuccessParam = {
        tempFilePaths: [],
        tempFiles: []
    }

    const el = document.createElement('input')
    el.setAttribute('type', 'file')
    if (Array.isArray(sourceType) && sourceType.length) {
        el.setAttribute('capture', sourceType.join(','))
    }
    el.setAttribute('accept', 'video/*')
    el.setAttribute('style', 'position: fixed; top: -4000px; left: -3000px; z-index: -300;')
    document.body.appendChild(el)

    el.onchange = e => {
        const target = e.target as HTMLInputElement
        const file = target.files ? Array.from(target.files)[0] : null
        if (!file) {
            return
        }
        const video = document.createElement('video')
        const blob = new Blob([file], {
            type: file.type
        })
        const url = URL.createObjectURL(blob)
        // 尝试获取视频的宽高信息
        video.onloadedmetadata = function () {
            const result = {
                tempFilePath: url,
                duration: video.duration,
                size: file.size,
                height: video.videoHeight,
                width: video.videoWidth
            }
            success?.(result)
            complete?.()
        }
        video.src = url
    }
    const event = document.createEvent('MouseEvents')
    event.initEvent('click', true, true)
    el.dispatchEvent(event)
}

export const chooseVideo = promisify(limited.async('chooseVideo', chooseVideoInternal))

class VideoContext implements swan.VideoContext {
    videoId?: string

    videoEl: HTMLVideoElement | null

    constructor(id) {
        this.videoId = id;
        if (this.videoId) {
            this.videoEl = document.querySelector(`#${this.videoId}`)
        }
    }

    play() {
        if (this.videoEl) {
            this.videoEl.play()
        }
    }

    pause() {
        if (this.videoEl) {
            this.videoEl.pause()
        }
    }

    seek(position) {
        if (this.videoEl) {
            this.videoEl.currentTime = position
        }
    }

    stop() {
        if (this.videoEl) {
            this.videoEl.currentTime = 0
            this.videoEl.pause()
        }
    }

    sendDanmu() { }

    playbackRate(rate) {
        if (this.videoEl) {
            this.videoEl.playbackRate = rate
        }
    }

    requestFullScreen() {
        if (this.videoEl) {
            this.videoEl.requestFullscreen()
        }
    }

    exitFullScreen() {
        document.exitFullscreen()
    }

    showStatusBar() { }

    hideStatusBar() { }
}

const createVideoContextInternal: typeof swan.createVideoContext = id => {
    return new VideoContext(id)
}

export const createVideoContext = limited.never('createVideoContext', createVideoContextInternal)
