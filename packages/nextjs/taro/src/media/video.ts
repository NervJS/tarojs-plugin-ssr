import type * as swan from '../swan'

class VideoContext implements swan.VideoContext {
    videoId?: string

    el: HTMLVideoElement | null

    constructor(id) {
        this.videoId = id;
        if (this.videoId) {
            this.el = document.querySelector(`#${this.videoId}`)
        }
    }

    play() {
        if (this.el) {
            this.el.play()
        }
    }

    pause() {
        if (this.el) {
            this.el.pause()
        }
    }

    seek(position) {
        if (this.el) {
            this.el.currentTime = position
        }
    }

    stop() {
        if (this.el) {
            this.el.currentTime = 0
            this.el.pause()
        }
    }

    sendDanmu() { }

    playbackRate(rate) {
        if (this.el) {
            this.el.playbackRate = rate
        }
    }

    requestFullScreen() {
        if (this.el) {
            this.el.requestFullscreen()
        }
    }

    exitFullScreen() {
        document.exitFullscreen()
    }

    showStatusBar() { }

    hideStatusBar() { }
}

export const createVideoContext: typeof swan.createVideoContext = id => {
    return new VideoContext(id)
}
