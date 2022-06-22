import React, {useRef, useCallback} from 'react'
import {TaroBaseProps, TaroBaseAttributes} from '../typings'
import {createTaroMouseEvent, createTaroTouchEvent} from '../taroEvent'

export interface UseTaroBaseEventsReturn extends TaroBaseAttributes {
    onTouchStart: (event: React.TouchEvent) => void
    onTouchMove: (event: React.TouchEvent) => void
    onTouchCancel: (event: React.TouchEvent) => void
    onTouchEnd: (event: React.TouchEvent) => void
}

function useTaroBaseEvents({
    catchMove,
    onClick,
    onTouchStart,
    onTouchMove,
    onTouchCancel,
    onTouchEnd,
    onLongPress,
    ...rest
}: TaroBaseProps): UseTaroBaseEventsReturn {
    const trackingTap = useRef(false)
    const startTime = useRef(0)
    const touchStartInfo = useRef<{screenX: number, screenY: number} | null>(null)
    const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    const touchHasMoved = useCallback((reactEvent: React.TouchEvent) => {
        const start = reactEvent.changedTouches[0]
        const end = touchStartInfo.current

        return Math.sqrt(Math.pow(end.screenX - start.screenX, 2) + Math.pow(end.screenY - start.screenY, 2))
    }, [])

    const handleTouchStart = useCallback((reactEvent: React.TouchEvent): void => {
        trackingTap.current = reactEvent.targetTouches.length === 1
        startTime.current = Date.now()
        touchStartInfo.current = reactEvent.changedTouches[0]
            ? {
                screenX: reactEvent.changedTouches[0].screenX,
                screenY: reactEvent.changedTouches[0].screenY,
            }
            : null

        if (onTouchStart) {
            const taroEvent = createTaroTouchEvent('touchstart', reactEvent)
            onTouchStart(taroEvent)
        }
        if (onLongPress) {
            longPressTimer.current = setTimeout(() => {
                const taroEvent = createTaroMouseEvent('longpress', reactEvent)
                onLongPress(taroEvent)
            }, 350)
        }
    }, [onTouchStart, onLongPress])

    const handleTouchMove = useCallback((reactEvent: React.TouchEvent): void => {
        if (catchMove) {
            reactEvent.preventDefault()
        }
        trackingTap.current = trackingTap.current &&
            reactEvent.targetTouches.length === 1 &&
            !touchHasMoved(reactEvent)

        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current)
        }
        if (onTouchMove) {
            const taroEvent = createTaroTouchEvent('touchmove', reactEvent)
            onTouchMove(taroEvent)
        }
    }, [touchHasMoved, onTouchMove])

    const handleTouchCancel = useCallback((reactEvent: React.TouchEvent): void => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current)
        }
        if (onTouchCancel) {
            const taroEvent = createTaroTouchEvent('touchcancel', reactEvent)
            onTouchCancel(taroEvent)
        }
    }, [onTouchCancel])

    const handleTouchEnd = useCallback((reactEvent: React.TouchEvent): void => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current)
        }
        if (onTouchEnd) {
            const taroEvent = createTaroTouchEvent('touchend', reactEvent)
            onTouchEnd(taroEvent)
        }
        const endTime = Date.now()
        if (trackingTap.current && onClick && endTime - startTime.current < 350) {
            const taroEvent = createTaroMouseEvent('tap', reactEvent)
            setTimeout(() => {
                onClick(taroEvent)
            })
            
        }
    }, [onTouchEnd, onClick])

    return {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchCancel: handleTouchCancel,
        onTouchEnd: handleTouchEnd,
        ...rest
    }
}

export default useTaroBaseEvents
