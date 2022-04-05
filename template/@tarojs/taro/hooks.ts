import {useEffect} from 'react';

export function useDidShow(callback: () => void): void {
    useEffect(() => {
        callback()
    }, [])
}

export function useDidHide(callback: () => void): void {
    useEffect(() => {
        return () => {
            callback()
        }
    }, [])
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
            const scrollTop = scrollingElement.scrollTop;
            callback({scrollTop})
        }

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [])
}
