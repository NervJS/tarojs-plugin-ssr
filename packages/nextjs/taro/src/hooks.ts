import {useEffect, useRef} from 'react'
import {useRouter as useNextRouter} from 'next/router'
import type {TaroRouter} from './typings'

function useDepRef<T = any>(prop: T) {
    const ref = useRef(prop)

    useEffect(() => {
        ref.current = prop
    }, [prop])

    return ref
}

type DidShowCallback = () => void

export function useDidShow(callback: DidShowCallback): void {
    const ref = useDepRef<DidShowCallback>(callback)

    useEffect(() => {
        function handleVisibilityChanged() {
            if (document.visibilityState === 'visible') {
                ref.current()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChanged)
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChanged)
        }
    }, [])
}

type DidHideCallback = () => void

export function useDidHide(callback: DidHideCallback): void {
    const ref = useDepRef<DidHideCallback>(callback)

    useEffect(() => {
        function handleVisibilityChanged() {
            if (document.visibilityState !== 'visible') {
                ref.current()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChanged)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChanged)
        }
    }, [])
}

// TODO
// export function usePullDownRefresh(callback: () => void): void {
// }

type ReachBottomCallback = () => void

export function useReachBottom(callback: ReachBottomCallback): void {
    const ref = useDepRef<ReachBottomCallback>(callback)

    useEffect(() => {
        function handleScroll() {
            const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            const clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
            if (scrollTop >= scrollHeight - clientHeight - 60) {
                ref.current()
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
}

type ResizeCallback = () => void

export function useResize(callback: ResizeCallback): void {
    const ref = useDepRef<ResizeCallback>(callback)

    useEffect(() => {
        function handleResized() {
            if (document.visibilityState !== 'visible') {
                ref.current()
            }
        }

        document.addEventListener('resize', handleResized)

        return () => {
            document.removeEventListener('resize', handleResized)
        }
    }, [])
}

export function useReady(callback: () => void): void {
    useEffect(() => {
        callback()
    }, [])
}

export function useRouter(): TaroRouter {
    const nextRouter = useNextRouter()

    const params = Object.keys(nextRouter.query).reduce((result, key) => {
        const value = nextRouter.query[key]
        if (typeof value === 'string') {
            result[key] = value
        }
        return result
    }, {} as Record<string, string>)

    const path = nextRouter.pathname

    return {
        params,
        path
    }
}

type onPageScrollParam = {
    /**
     * 页面在垂直方向已滚动的距离（单位px）
     */
    scrollTop: number
}

type PageScrollCallback = (res: onPageScrollParam) => void

export function usePageScroll(callback: PageScrollCallback): void {
    const ref = useDepRef<PageScrollCallback>(callback)

    useEffect(() => {
        function handleScroll() {
            const scrollingElement = document.scrollingElement || document.documentElement
            const scrollTop = scrollingElement.scrollTop
            ref.current({scrollTop})
        }

        document.addEventListener('scroll', handleScroll)

        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])
}

export function useShareAppMessage(): void {}

export function useShareTimeline(): void {}
