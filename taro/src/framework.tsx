import {
    useRef,
    useEffect,
    createElement,
    Component,
    PureComponent,
    FC,
    FunctionComponent,
    ComponentClass,
    ReactElement
} from 'react'
import Router from 'next/router'
import type {TaroRouter} from './typings'

interface TaroInstance {
    router: TaroRouter
}

interface Meta {
    type: 'class' | 'func',
    component: ReactElement
}

/**
 * 在类组件中，从属性中获取 Next.js 的路由对象。
 */
export function getCurrentInstance(meta?: Meta): TaroInstance {
    const instance = {
        router: {}
    } as TaroInstance

    if (!meta) {
        if (typeof window === 'undefined') {
            Object.defineProperty(instance.router, 'params', {
                get() {
                    const nextRouter = Router.router
                    if (!nextRouter) {
                        throw new Error('Next.js router is not initialized!')
                    }
                    return Object.keys(nextRouter.query).reduce((result, key) => {
                        const value = nextRouter.query[key]
                        if (typeof value === 'string') {
                            result[key] = value
                        }
                        return result
                    }, {} as Record<string, string>)
                }
            })

            Object.defineProperty(instance.router, 'path', {
                get() {
                    const nextRouter = Router.router
                    if (!nextRouter) {
                        throw new Error('Next.js router is not initialized!')
                    }
                    return nextRouter.pathname
                }
            })

            return instance
        } else {
            throw new Error('`getCurrentInstance()` should be used in component scope!')
        }
    }

    if (meta.type === 'class') {
        if (!meta.component) {
            throw new Error('`getCurrentInstance()` cannot get component instance!')
        }

        if (!meta.component.props.router) {
            throw new Error('`getCurrentInstance()` cannot get Next.js router in props!')
        }

        Object.defineProperty(instance.router, 'params', {
            get() {
                const nextRouter = meta.component.props.router
                if (!nextRouter) {
                    throw new Error('Next.js router is not initialized!')
                }
                return Object.keys(nextRouter.query).reduce((result, key) => {
                    const value = nextRouter.query[key]
                    if (typeof value === 'string') {
                        result[key] = value
                    }
                    return result
                }, {} as Record<string, string>)
            }
        })
    
        Object.defineProperty(instance.router, 'pathname', {
            get() {
                const nextRouter = meta.component.props.router
                if (!nextRouter) {
                    throw new Error('Next.js router is not initialized!')
                }
                return nextRouter.pathname
            }
        })

        return instance
    }
    
    throw new Error('`getCurrentInstance()` cannot used in function component currently!')
}

interface TaroPage {
    route: string
}

export function getCurrentPages(): TaroPage[] {
    return []
}

export enum ENV_TYPE {
    WEB = 'WEB'
}

export function getEnv(): ENV_TYPE {
    return ENV_TYPE.WEB
}

interface TaroPageWrapperProps {
    TaroPage: FunctionComponent<any> | ComponentClass<any>
}

export const TaroPageWrapper: FC<TaroPageWrapperProps> = ({TaroPage, ...rest}) => {
    const ref = useRef<any | null>(null)

    useEffect(() => {
        if (!ref.current) {
            return
        }

        const pageInstance = ref.current

        function handleScroll() {
            const scrollingElement = document.scrollingElement || document.documentElement
            const scrollTop = scrollingElement.scrollTop
            if (typeof pageInstance.onPageScroll === 'function') {
                pageInstance.onPageScroll({scrollTop})
            }

            if (typeof pageInstance.onReachBottom === 'function') {
                const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
                const clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
                if (scrollTop >= scrollHeight - clientHeight - 60) {
                    pageInstance.onReachBottom()
                }
            }
        }

        function handleResize() {
            pageInstance.onResize()
        }

        if (
            typeof pageInstance.onPageScroll !== 'function' ||
            typeof pageInstance.onReachBottom !== 'function'
        ) {
            document.addEventListener('scroll', handleScroll)
        }

        if (typeof pageInstance.onResize !== 'function') {
            document.addEventListener('resize', handleResize)
        }

        return () => {
            document.removeEventListener('scroll', handleScroll)
            document.removeEventListener('resize', handleResize)
        }
    }, [])

    const isClassComponent = typeof TaroPage === 'function' && (
        TaroPage.prototype instanceof Component || TaroPage.prototype instanceof PureComponent)

    return createElement(TaroPage, {
        ref: isClassComponent ? ref : undefined,
        ...rest
    })
}
