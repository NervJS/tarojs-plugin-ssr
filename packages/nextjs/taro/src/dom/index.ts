import {unsupported, limited} from '../_util'
import {SelectorQuery} from './selectorQuery'

const createSelectorQueryInternal = () => new SelectorQuery()

/**
 * 返回一个 SelectorQuery 对象实例
 */
export const createSelectorQuery = limited.never('createSelectorQuery', createSelectorQueryInternal)

/**
 * 创建并返回一个 IntersectionObserver 对象实例。
 */
export const createIntersectionObserver = unsupported.never('createIntersectionObserver')
