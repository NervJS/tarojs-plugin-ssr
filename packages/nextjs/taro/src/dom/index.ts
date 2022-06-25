import {unsupported} from '../utils'
import {SelectorQuery} from './selectorQuery'

/**
 * 返回一个 SelectorQuery 对象实例
 */
export const createSelectorQuery = () => {
    if (typeof window === 'undefined') {
        throw new Error('`createSelectorQuery` cannot be called on server-side.')
    }

    return new SelectorQuery()
}

/**
 * 创建并返回一个 IntersectionObserver 对象实例。
 */
export const createIntersectionObserver = unsupported.never('createIntersectionObserver')
