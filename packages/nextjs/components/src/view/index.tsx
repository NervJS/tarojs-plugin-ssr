import React, {
    useState,
    useRef,
    forwardRef
} from 'react'
import classNames from 'classnames'

interface ViewProps {
    id?: string
    className?: string
    style?: React.CSSProperties

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

    /**
     * 是否以 catch 的形式绑定 touchmove 事件
     */
    catchMove?: boolean

    onTouchStart?: (event: React.TouchEvent<HTMLDivElement>) => void

    onTouchEnd?: (event: React.TouchEvent<HTMLDivElement>) => void

    onTouchMove?: (event: React.TouchEvent<HTMLDivElement>) => void

    onLongPress?: () => void

    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const View: React.ForwardRefRenderFunction<HTMLDivElement, ViewProps> = ({
    id,
    className,
    style,
    hoverClass = 'none',
    hoverStartTime = 400,
    hoverStayTime = 400,
    catchMove,
    children,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onLongPress,
    onClick
}, ref) => {
    const [hovered, setHovered] = useState(false)

    const hoverTimer = useRef<ReturnType<typeof setTimeout>>(null)
    const longPressTimer = useRef<ReturnType<typeof setTimeout>>(null)

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
                    clearTimeout(hoverTimer.current)
                    hoverTimer.current = setTimeout(() => {
                        setHovered(true)
                    }, hoverStartTime)
                }

                if (onTouchStart) {
                    onTouchStart(event)
                }

                if (onLongPress) {
                    longPressTimer.current = setTimeout(() => {
                        onLongPress()
                    }, 350)
                }
            }}
            onTouchMove={event => {
                clearTimeout(longPressTimer.current)

                if (onTouchMove) {
                    onTouchMove(event)
                }
            }}
            onTouchEnd={event => {
                clearTimeout(longPressTimer.current)

                clearTimeout(hoverTimer.current)
                hoverTimer.current = setTimeout(() => {
                    setHovered(false)
                }, hoverStayTime)

                if (onTouchEnd) {
                    onTouchEnd(event)
                }
            }}
            onClick={event => {
                if (catchMove) {
                    event.stopPropagation()
                    event.preventDefault()
                }
                if (onClick) {
                    onClick(event)
                }
            }}
        >
            {children}
        </div>
    )
}

export default forwardRef(View);
