import { temporarilyNotSupport } from '../utils'
import { SelectorQuery } from './selectorQuery'

export const createSelectorQuery = () => {
    if (typeof window === 'undefined') {
        throw new Error('`createSelectorQuery` cannot be called on server-side.')
    }

    return new SelectorQuery()
}

export const createIntersectionObserver = temporarilyNotSupport('createIntersectionObserver')
