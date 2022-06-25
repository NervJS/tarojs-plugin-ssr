import promisify from 'mpromisify'
import type * as swan from '../swan'

const vibrateShortInternal: typeof swan.vibrateShort = ({success, fail, complete}) => {
    if (typeof window === 'undefined') {
        throw new Error('`vibrateShort` cannot be called on server-side!')
    }

    if (!('vibrate' in navigator))  {
        const err = {
            errMsg: 'Your browser does not support vibrate api.'
        }
        fail?.(err)
    } else {
        navigator.vibrate(15)
        success?.()
    }
    complete?.()
}

/**
 * 使手机发生较短时间的振动（15 ms）。
 */
export const vibrateShort = promisify(vibrateShortInternal)

const vibrateLongInternal: typeof swan.vibrateShort = ({success, fail, complete}) => {
    if (typeof window === 'undefined') {
        throw new Error('`vibrateLong` cannot be called on server-side!')
    }

    if (!('vibrate' in navigator))  {
        const err = {
            errMsg: 'Your browser does not support vibrate api.'
        }
        fail?.(err)
    } else {
        navigator.vibrate(400)
        success?.()
    }
    complete?.()
}

/**
 * 使手机发生较长时间的振动（400 ms)。
 */
export const vibrateLong = promisify(vibrateLongInternal)
