import {useState, useRef} from 'react'
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
        onTouchStart,
        onTouchCancel,
        onTouchEnd,
        ...rest
    } = useTaroBaseEvents(baseProps)

    const [hovered, setHovered] = useState(false)
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

    if (typeof hoverClass === 'undefined') {
        hoverClass = defaultHoverClass
    }

    return {
        className: classNames({
            hoverClass: hovered
        }, className),
        onTouchStart(event) {
            if (timer.current) {
                clearTimeout(timer.current)
            }
            if (hoverClass !== 'none' && !(event as any).stopHoverClass) {
                timer.current = setTimeout(() => {
                    setHovered(true)
                }, hoverStartTime)
            }
            if (hoverStopPropagation) {
                (event as any).stopHoverClass = true
            }
            onTouchStart(event)
        },
        onTouchCancel(event) {
            if (timer.current) {
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => {
                setHovered(false)
            }, hoverStayTime)
            onTouchCancel(event)
        },
        onTouchEnd(event) {
            if (timer.current) {
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => {
                setHovered(false)
            }, hoverStayTime)
            onTouchEnd(event)
        },
        ...rest
    }
}

export default useTaroHoverableEvents
