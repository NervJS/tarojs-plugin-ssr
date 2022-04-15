import {useEffect} from 'react'
import {useRouter as useNextRouter} from 'next/router'
import {getCurrentInstance} from './framework'
import type {TaroRouter} from './typings'

export function useDidShow(callback: () => void): void {
    useEffect(() => {
        function handleVisibilityChanged() {
            if (document.visibilityState === 'visible') {
                callback()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChanged)
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChanged)
        }
    }, [])
}

export function useDidHide(callback: () => void): void {
    useEffect(() => {
        function handleVisibilityChanged() {
            if (document.visibilityState !== 'visible') {
                callback()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChanged)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChanged)
        }
    }, [])
}

// export function usePullDownRefresh(callback: () => void): void {
// }

export function useReachBottom(callback: () => void): void {
    useEffect(() => {
        function handleScroll() {
            const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            const clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)

            if (scrollTop >= scrollHeight - clientHeight - 60) {
                callback()
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
}

export function useResize(callback: () => void): void {
    useEffect(() => {
        function handleResized() {
            if (document.visibilityState !== 'visible') {
                callback()
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
    return getCurrentInstance(nextRouter).router
}

type onPageScrollParam = {
    /**
     * 页面在垂直方向已滚动的距离（单位px）
     */
    scrollTop: number
}

export function usePageScroll(callback: (res: onPageScrollParam) => void): void {
    useEffect(() => {
        function handleScroll() {
            const scrollingElement = document.scrollingElement || document.documentElement
            const scrollTop = scrollingElement.scrollTop
            callback({scrollTop})
        }

        document.addEventListener('scroll', handleScroll)

        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])
}
