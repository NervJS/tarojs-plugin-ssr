import React, {useRef, useCallback} from 'react'
import {EventPorps, TaroMouseEvent, TaroTouchEvent} from '../types'

function toTaroMouseEvent(uiEvent: React.MouseEvent) {
    const {
        timeStamp,
        target,
        currentTarget,
        preventDefault,
        stopPropagation,
        pageX,
        pageY
    } = uiEvent
    const taroEvent: TaroMouseEvent = {
        type: 'tap',
        timeStamp,
        target,
        currentTarget,
        detail: {
            x: pageX,
            y: pageY
        },
        preventDefault,
        stopPropagation
    }
    return taroEvent
}

function toTaroTouchEvent(uiEvent: React.TouchEvent) {
    const {
        timeStamp,
        target,
        currentTarget,
        preventDefault,
        stopPropagation
    } = uiEvent
    const taroEvent: TaroTouchEvent = {
        type: 'tap',
        timeStamp,
        target,
        currentTarget,
        detail: {},
        preventDefault,
        stopPropagation
    }
    return taroEvent
}

interface EventHandles {
    onClick: (event: React.MouseEvent) => void
    onTouchStart: (event: React.TouchEvent) => void
    onTouchMove: (event: React.TouchEvent) => void
    onTouchCancel: (event: React.TouchEvent) => void
    onTouchEnd: (event: React.TouchEvent) => void
}

function useEvents({
    onClick,
    onTouchStart,
    onTouchMove,
    onTouchCancel,
    onTouchEnd,
    onLongPress
}: EventPorps): EventHandles {
    const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isPressed = useRef(false)

    const handleClick = useCallback((uiEvent: React.MouseEvent): void => {
        if (onClick && isPressed.current === false) {
            const taroEvent = toTaroMouseEvent(uiEvent)
            onClick(taroEvent)
        }
    }, [onClick])

    const handleTouchStart = useCallback((uiEvent: React.TouchEvent): void => {
        const taroEvent = toTaroTouchEvent(uiEvent)

        if (onTouchStart) {
            onTouchStart(taroEvent)
        }

        if (onLongPress) {
            isPressed.current = false
            longPressTimer.current = setTimeout(() => {
                taroEvent.timeStamp = performance.now()
                onLongPress(taroEvent)
                isPressed.current = true
            }, 350)
        }
    }, [onTouchStart, onLongPress])

    const handleTouchMove = useCallback((uiEvent: React.TouchEvent): void => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current)
        }
        if (onTouchMove) {
            const taroEvent = toTaroTouchEvent(uiEvent)
            onTouchMove(taroEvent)
        }
    }, [onTouchMove])

    const handleTouchCancel = useCallback((uiEvent: React.TouchEvent): void => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current)
        }
        if (onTouchCancel) {
            const taroEvent = toTaroTouchEvent(uiEvent)
            onTouchCancel(taroEvent)
        }
    }, [onTouchCancel])

    const handleTouchEnd = useCallback((uiEvent: React.TouchEvent): void => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current)
        }
        if (onTouchEnd) {
            const taroEvent = toTaroTouchEvent(uiEvent)
            onTouchEnd(taroEvent)
        }
    }, [onTouchCancel])

    return {
        onClick: handleClick,
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchCancel: handleTouchCancel,
        onTouchEnd: handleTouchEnd
    }
}

export default useEvents
