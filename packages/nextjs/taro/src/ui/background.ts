import promisify from 'mpromisify'
import {unsupported, limited} from '../_util'
import * as swan from '../swan'

const setBackgroundColorInternal: typeof swan.setBackgroundColor = ({backgroundColor, success, complete}) => {
    document.documentElement.style.backgroundColor = backgroundColor
    success?.()
    complete?.()
}

export const setBackgroundColor = promisify(limited._void('setBackgroundColor', setBackgroundColorInternal))

export const setBackgroundTextStyle = unsupported._void('setBackgroundColor')
