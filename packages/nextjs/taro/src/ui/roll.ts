import promisify from 'mpromisify'
import {easeInOutCubic, limited} from '../_util'
import raf from '../_util/raf'
import * as swan from '../swan'

const pageScrollToInternal: typeof swan.pageScrollTo = ({scrollTop, duration = 300, success, complete}) => {
    const pageYOffset = window.pageYOffset
    const startTime = Date.now()

    const frameFunc = () => {
        const timestamp = Date.now()
        const time = timestamp - startTime
        const nextScrollTop = easeInOutCubic(time > duration ? duration : time, pageYOffset, scrollTop, duration)
        window.scrollTo(window.pageXOffset, nextScrollTop)
        if (time < duration) {
            raf(frameFunc)
        } else {
            success?.()
            complete?.()
        }
    }
    raf(frameFunc)
}

export const pageScrollTo = promisify(limited.async('pageScrollTo', pageScrollToInternal))
