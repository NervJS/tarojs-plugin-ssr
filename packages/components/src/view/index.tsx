import React, {useState, useRef, forwardRef} from 'react'
import classNames from 'classnames'
import type {BaseProps} from '../_util/types'
import useEvents from '../_util/hooks/useEvents'

export interface ViewProps extends BaseProps {
    /**
     * 指定按下去的样式类。当 `hover-class="none"` 时，没有点击态效果
     * @default none
     */
    hoverClass?: string

    /**
     * 指定是否阻止本节点的祖先节点出现点击态
     * @default false
     */
    hoverStopPropagation?: boolean

    /**
     * 按住后多久出现点击态，单位毫秒
     * @default 50
     */
    hoverStartTime?: number

    /**
     * 手指松开后点击态保留时间，单位毫秒
     * @default 400
     */
    hoverStayTime?: number
}

const View: React.ForwardRefRenderFunction<HTMLDivElement, ViewProps> = ({
    id,
    className,
    style,
    hoverClass = 'none',
    hoverStartTime = 50,
    hoverStayTime = 400,
    children,
    ...eventProps
}, ref) => {
    const [hovered, setHovered] = useState(false)
    const {
        onTouchStart,
        onTouchCancel,
        onTouchEnd,
        ...events
    } = useEvents(eventProps)
    const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    return (
        <div
            ref={ref}
            id={id}
            className={classNames({
                [hoverClass]: hovered
            }, className)}
            style={style}
            onTouchStart={event => {
                if (hoverClass !== 'none') {
                    if (hoverTimer.current) {
                        clearTimeout(hoverTimer.current)
                    }
                    hoverTimer.current = setTimeout(() => {
                        setHovered(true)
                    }, hoverStartTime)
                }
                onTouchStart(event)
            }}
            onTouchCancel={event => {
                if (hoverTimer.current) {
                    clearTimeout(hoverTimer.current)
                }
                hoverTimer.current = setTimeout(() => {
                    setHovered(false)
                }, hoverStayTime)
                onTouchCancel(event)
            }}
            onTouchEnd={event => {
                if (hoverTimer.current) {
                    clearTimeout(hoverTimer.current)
                }
                hoverTimer.current = setTimeout(() => {
                    setHovered(false)
                }, hoverStayTime)
                onTouchEnd(event)
            }}
            {...events}
        >
            {children}
        </div>
    )
}

export default forwardRef(View);
