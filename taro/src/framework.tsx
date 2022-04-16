import {
    useRef,
    useEffect,
    Component,
    PureComponent,
    FC,
    FunctionComponent,
    ComponentClass
} from 'react'
import type {NextRouter} from 'next/router'
import type {TaroRouter} from './typings'

interface TaroInstance {
    router: TaroRouter
}

export function getCurrentInstance(nextRouter: NextRouter): TaroInstance {
    if (typeof window !== 'undefined') {
        const obj = new URLSearchParams(location.search)
        const params: Record<string, string> = Array.from(obj.entries())
            .reduce((result, [key, value]) => {
                result[key] = value
                return result
            }, {} as Record<string, string>)

        return {
            router: {
                params,
                path: location.pathname
            }
        }
    }

    if (nextRouter) {
        let params: Record<string, string> = {}
        if (nextRouter.query) {
            params = Object.keys(nextRouter.query).reduce((result, key) => {
                const value = nextRouter.query[key]
                if (typeof value === 'string') {
                    result[key] = value
                }
                return result
            }, {} as Record<string, string>)
        }

        return {
            router: {
                params,
                path: nextRouter.pathname
            }
        }
    }

    console.error('`getCurrentInstance` should be in class component when it is called on server!')

    return {
        router: {
            params: {},
            path: ''
        }
    }
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
            typeof pageInstance.onPageScroll !== 'function'
            || typeof pageInstance.onReachBottom !== 'function'
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

    if (TaroPage instanceof Component || TaroPage instanceof PureComponent) {
        return <TaroPage ref={ref} {...rest} />
    }

    return <TaroPage {...rest} />
}
