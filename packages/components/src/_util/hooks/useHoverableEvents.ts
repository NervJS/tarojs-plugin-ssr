import {useState, useRef} from 'react'
import {HoverableEventPorps} from '../types'
import useBaseEvents from './useBaseEvents'

type UseHoverableEventsReturn = [
    string | undefined,
    ReturnType<typeof useBaseEvents>
]

function useHoverableEvents(
    {
        hoverClass,
        hoverStopPropagation = false,
        hoverStartTime = 50,
        hoverStayTime = 400,
        ...eventsProps
    }: HoverableEventPorps,
    defaultHoverClass?: string
): UseHoverableEventsReturn {
    const {
        onTouchStart,
        onTouchCancel,
        onTouchEnd,
        ...rest
    } = useBaseEvents(eventsProps)

    const [hovered, setHovered] = useState(false)
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

    if (typeof hoverClass === 'undefined') {
        hoverClass = defaultHoverClass
    }

    const handles: ReturnType<typeof useBaseEvents> = {
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

    return [
        hovered ? hoverClass : undefined,
        handles
    ]
}

export default useHoverableEvents
