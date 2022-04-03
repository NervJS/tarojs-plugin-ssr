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
