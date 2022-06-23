import {useState, useRef, useCallback} from 'react'
import classNames from 'classnames'
import {TaroHoverableProps} from '../typings'
import useTaroBaseEvents, {UseTaroBaseEventsReturn} from './useTaroBaseEvents'

interface UseTaroHoverableEventsReturn extends UseTaroBaseEventsReturn { }

function useTaroHoverableEvents(
    {
        className,
        hoverClass,
        hoverStopPropagation = false,
        hoverStartTime = 50,
        hoverStayTime = 400,
        ...baseProps
    }: TaroHoverableProps,
    defaultHoverClass?: string
): UseTaroHoverableEventsReturn {
    const {
        onMouseDown,
        onTouchStart,
        onMouseUp,
        onTouchEnd,
        onMouseLeave,
        onTouchCancel,
        ...rest
    } = useTaroBaseEvents(baseProps)

    const [hovered, setHovered] = useState(false)
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

    if (typeof hoverClass === 'undefined') {
        hoverClass = defaultHoverClass
    }

    const handleStart = useCallback((reactEvent: React.TouchEvent | React.MouseEvent): void => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        if (hoverClass !== 'none' && !(event as any).stopHoverClass) {
            timer.current = setTimeout(() => {
                setHovered(true)
            }, hoverStartTime)
        }
        if (hoverStopPropagation) {
            (reactEvent as any).stopHoverClass = true
        }
    }, [])

    const handleEnd = useCallback((): void => {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            setHovered(false)
        }, hoverStayTime)
    }, [])

    const handleMouseDown = useCallback((reactEvent: React.MouseEvent): void => {
        if (!('ontouchstart' in window)) {
            handleStart(reactEvent)
        }
        onMouseDown(reactEvent)
    }, [handleStart, onMouseDown])

    const handleTouchStart = useCallback((reactEvent: React.TouchEvent): void => {
        handleStart(reactEvent)
        onTouchStart(reactEvent)
    }, [handleStart, onTouchStart])

    const handleMouseUp = useCallback((reactEvent: React.MouseEvent): void => {
        if (!('ontouchend' in window)) {
            handleEnd()
        }
        onMouseUp(reactEvent)
    }, [handleEnd, onMouseUp])

    const handleTouchEnd = useCallback((reactEvent: React.TouchEvent): void => {
        handleEnd()
        onTouchEnd(reactEvent)
    }, [handleEnd, onTouchEnd])

    const handleMouseLeave = useCallback((reactEvent: React.MouseEvent): void => {
        if (!('ontouchcancel' in window)) {
            handleEnd()
        }
        onMouseLeave(reactEvent)
    }, [handleEnd, onMouseLeave])

    const handleTouchCancel = useCallback((reactEvent: React.TouchEvent): void => {
        handleEnd()
        onTouchCancel(reactEvent)
    }, [handleEnd, onTouchCancel])

    return {
        className: classNames({
            hoverClass: hovered
        }, className),
        onMouseDown: handleMouseDown,
        onTouchStart: handleTouchStart,

        onMouseUp: handleMouseUp,
        onTouchEnd: handleTouchEnd,

        onMouseLeave: handleMouseLeave,
        onTouchCancel: handleTouchCancel,

        ...rest
    }
}

export default useTaroHoverableEvents
