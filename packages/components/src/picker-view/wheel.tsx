import React, {memo, useEffect, useMemo, useRef} from 'react'
import {useSpring, animated} from '@react-spring/web'
import {useDrag} from '@use-gesture/react'
import isEqual from 'lodash/isEqual'
import toArray from '../_util/children/toArray'

const classPrefix = 'taro-picker-view'

function bound(
    position: number,
    min: number | undefined,
    max: number | undefined
): number {
    let ret = position
    if (min !== undefined) {
        ret = Math.max(position, min)
    }
    if (max !== undefined) {
        ret = Math.min(ret, max)
    }
    return ret
}

function rubberband(
    distance: number,
    dimension: number,
    constant: number
): number {
    return (distance * dimension * constant) / (dimension + constant * distance)
}

function rubberbandIfOutOfBounds(
    position: number,
    min: number,
    max: number,
    dimension: number,
    constant = 0.15
): number {
    if (constant === 0) return bound(position, min, max)
    if (position < min)
        return -rubberband(min - position, dimension, constant) + min
    if (position > max)
        return +rubberband(position - max, dimension, constant) + max
    return position
}  

interface WheelProps {
    value?: number
    children?: React.ReactNode
    onSelect?: (index: number) => void
}

const WheelInternal: React.FC<WheelProps> = ({
    value,
    children,
    onSelect
}) => {
    const [{y}, api] = useSpring(() => ({
        from: {y: 0},
        config: {
            tension: 400,
            mass: 0.8
        }
    }))

    const items = useMemo(() => toArray(children), [children])
    
    const draggingRef = useRef(false)

    const rootRef = useRef<HTMLDivElement>(null)
    const itemHeight = useRef<number>(0)

    useEffect(() => {
        if (rootRef.current) {
            itemHeight.current = rootRef.current.offsetHeight / items.length
        }
    }, [items])

    useEffect(() => {
        if (draggingRef.current || value == null || value < 0) {
            return
        }
        const min = -((items.length - 1) * itemHeight.current)
        const finalPosition = value * -itemHeight.current
        api.start({
            y: finalPosition < min ? min : finalPosition,
            immediate: y.goal !== finalPosition
        })
      }, [items, value])

    function scrollSelect(index: number): void {
        const finalPosition = index * -itemHeight.current
        api.start({ y: finalPosition })
        onSelect?.(index)
    }

    useDrag(
        state => {
            state.event.stopPropagation()

            if (!itemHeight.current) {
                return
            }

            draggingRef.current = true
            const min = -((items.length - 1) * itemHeight.current)
            const max = 0
            if (state.last) {
                draggingRef.current = false
                const position =
                    state.offset[1] + state.velocity[1] * state.direction[1] * 50
                const targetIndex = min < max
                    ? -Math.round(bound(position, min, max) / itemHeight.current)
                    : 0
                scrollSelect(targetIndex)
            } else {
                const position = state.offset[1]
                api.start({
                    y: rubberbandIfOutOfBounds(
                        position,
                        min,
                        max,
                        itemHeight.current * 50,
                        0.2
                    )
                })
            }
        },
        {
            asix: 'y',
            from: () => [0, y.get()],
            filterTaps: true,
            pointer: {touch: true},
            target: rootRef
        }
    )

    return (
        <div className={`${classPrefix}_column`}>
            <animated.div
                ref={rootRef}
                className={`${classPrefix}_column-wheel`}
                style={{translateY: y}}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`${classPrefix}_column-item`}
                        onClick={() => {
                            draggingRef.current = true
                            scrollSelect(index)
                        }}
                    >
                        {item}
                    </div>
                ))}
            </animated.div>
        </div>
    )
}

const Wheel = memo(WheelInternal, (prev, next) => {
    return prev.value === next.value &&
        isEqual(prev.children, next.children) &&
        prev.onSelect === next.onSelect
})

export default Wheel
