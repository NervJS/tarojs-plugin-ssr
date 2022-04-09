import { temporarilyNotSupport } from '../utils'
import { SelectorQuery } from './selectorQuery'

export const createSelectorQuery = () => {
    return new SelectorQuery()
}

export const createIntersectionObserver = temporarilyNotSupport('createIntersectionObserver')
