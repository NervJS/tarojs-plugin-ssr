import promisify from 'mpromisify'
import {limited} from '../utils'
import type * as swan from '../swan'

const makePhoneCallInternal: typeof swan.makePhoneCall = ({phoneNumber, success, complete}) => {
    location.href = `tel:${phoneNumber}`
    success?.()
    complete?.()
}

export const makePhoneCall = promisify(limited.async('makePhoneCall', makePhoneCallInternal))
