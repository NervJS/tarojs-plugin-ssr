import { temporarilyNotSupport } from '../utils'
import { SelectorQuery } from './selectorQuery'

export const createSelectorQuery = () => {
    if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
        throw new Error('`createSelectorQuery` cannot be called on server-side.')
    }

    return new SelectorQuery()
}

export const createIntersectionObserver = temporarilyNotSupport('createIntersectionObserver')
