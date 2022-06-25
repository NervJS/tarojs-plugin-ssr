import promisify from 'mpromisify'
import type * as swan from '../swan'

const makePhoneCallInternal: typeof swan.makePhoneCall = ({phoneNumber, success, complete}) => {
    if (typeof window === 'undefined') {
        throw new Error('`makePhoneCall` cannot be called on server-side!')
    }

    location.href = `tel:${phoneNumber}`
    success?.()
    complete?.()
}

export const makePhoneCall = promisify(makePhoneCallInternal)
