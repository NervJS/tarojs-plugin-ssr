import {easeInOutCubic} from '../_util'
import raf from '../_util/raf'
import * as swan from '../swan'

const pageScrollTo: typeof swan.pageScrollTo = ({scrollTop, duration = 300, success, complete}) => {
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

export default pageScrollTo
