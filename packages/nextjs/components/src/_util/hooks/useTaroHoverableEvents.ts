import {useState, useRef} from 'react'
import {TaroHoverableEvents} from '../typings'
import useTaroBaseEvents from './useTaroBaseEvents'

type UseTaroHoverableEventsReturn = [
    string | undefined,
    ReturnType<typeof useTaroBaseEvents>
]

function useTaroHoverableEvents(
    {
        hoverClass,
        hoverStopPropagation = false,
        hoverStartTime = 50,
        hoverStayTime = 400,
        ...baseEvents
    }: TaroHoverableEvents,
    defaultHoverClass?: string
): UseTaroHoverableEventsReturn {
    const {
        onTouchStart,
        onTouchCancel,
        onTouchEnd,
        ...rest
    } = useTaroBaseEvents(baseEvents)

    const [hovered, setHovered] = useState(false)
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

    if (typeof hoverClass === 'undefined') {
        hoverClass = defaultHoverClass
    }

    const props: ReturnType<typeof useTaroBaseEvents> = {
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
        props
    ]
}

export default useTaroHoverableEvents
