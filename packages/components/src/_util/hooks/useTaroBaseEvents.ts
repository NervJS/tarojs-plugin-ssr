import React, {useRef, useCallback} from 'react'
import {TaroBaseProps, TaroBaseAttributes} from '../typings'
import {createTaroMouseEvent, createTaroTouchEvent} from '../taroEvent'

const TOUCH_EVENT = 1
const MOUSE_EVENT = 2

const EVENT_TYPE_MAPPINGS = {
    touchstart: TOUCH_EVENT,
    touchmove: TOUCH_EVENT,
    touchend: TOUCH_EVENT,

    mousedown: MOUSE_EVENT,
    mousemove: MOUSE_EVENT,
    mouseup: MOUSE_EVENT,
    mouseleave: MOUSE_EVENT
}

export interface UseTaroBaseEventsReturn extends TaroBaseAttributes {
    onMouseDown: React.MouseEventHandler
    onTouchStart: React.TouchEventHandler

    onMouseMove: React.MouseEventHandler
    onTouchMove: React.TouchEventHandler

    onMouseUp: React.MouseEventHandler
    onTouchEnd: React.TouchEventHandler

    onMouseLeave: React.MouseEventHandler
    onTouchCancel: React.TouchEventHandler

    onClick: React.MouseEventHandler
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

    const touchHasMoved = useCallback((reactEvent: React.TouchEvent | React.MouseEvent) => {
        const start = 'targetTouches' in reactEvent ? reactEvent.targetTouches[0] : reactEvent
        const end = touchStartInfo.current!

        return Math.sqrt(Math.pow(end.screenX - start.screenX, 2) + Math.pow(end.screenY - start.screenY, 2))
    }, [])

    const handleStart = useCallback((reactEvent: React.TouchEvent | React.MouseEvent): void => {
        const eventType = EVENT_TYPE_MAPPINGS[reactEvent.type]
        if (eventType === MOUSE_EVENT && 'ontouchstart' in window) {
            return
        }

        const touches = 'targetTouches' in reactEvent ? reactEvent.targetTouches : [reactEvent]

        trackingTap.current = touches.length === 1
        startTime.current = Date.now()
        
        touchStartInfo.current = touches[0]
            ? {
                screenX: touches[0].screenX,
                screenY: touches[0].screenY
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

    const handleMove = useCallback((reactEvent: React.TouchEvent | React.MouseEvent): void => {
        if (catchMove) {
            reactEvent.preventDefault()
        }

        const eventType = EVENT_TYPE_MAPPINGS[reactEvent.type]
        if (eventType === MOUSE_EVENT && 'ontouchmove' in window) {
            return
        }

        const touches = 'targetTouches' in reactEvent ? reactEvent.targetTouches : [reactEvent]

        trackingTap.current = trackingTap.current &&
            touches.length === 1 &&
            !touchHasMoved(reactEvent)

        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current)
        }
        if (onTouchMove) {
            const taroEvent = createTaroTouchEvent('touchmove', reactEvent)
            onTouchMove(taroEvent)
        }
    }, [catchMove, touchHasMoved, onTouchMove])

    const handleEnd = useCallback((reactEvent: React.TouchEvent | React.MouseEvent): void => {
        const eventType = EVENT_TYPE_MAPPINGS[reactEvent.type]
        if (eventType === MOUSE_EVENT && 'ontouchend' in window) {
            return
        }

        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current)
        }
        if (onTouchEnd) {
            const taroEvent = createTaroTouchEvent('touchend', reactEvent)
            onTouchEnd(taroEvent)
        }
    }, [onTouchEnd])

    const handleCancel = useCallback((reactEvent: React.TouchEvent | React.MouseEvent): void => {
        const eventType = EVENT_TYPE_MAPPINGS[reactEvent.type]
        if (eventType === MOUSE_EVENT && 'ontouchcancel' in window) {
            return
        }

        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current)
        }
        if (onTouchCancel) {
            const taroEvent = createTaroTouchEvent('touchcancel', reactEvent)
            onTouchCancel(taroEvent)
        }
    }, [onTouchCancel])

    const handleClick = useCallback((reactEvent: React.TouchEvent | React.MouseEvent): void => {
        const endTime = Date.now()
        if (trackingTap.current && onClick && endTime - startTime.current < 350) {
            const taroEvent = createTaroMouseEvent('tap', reactEvent)
            onClick(taroEvent)
        }
    }, [onClick])

    return {
        onMouseDown: handleStart,
        onTouchStart: handleStart,

        onMouseMove: handleMove,
        onTouchMove: handleMove,

        onMouseUp: handleEnd,
        onTouchEnd: handleEnd,

        onMouseLeave: handleCancel,
        onTouchCancel: handleCancel,

        onClick: handleClick,

        ...rest
    }
}

export default useTaroBaseEvents
