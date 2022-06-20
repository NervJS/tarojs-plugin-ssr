import React, {forwardRef} from 'react'
import classNames from 'classnames'
import type {HoverablePorps} from '../_util/types'
import useHoverableEvents from '../_util/hooks/useHoverableEvents'

export interface NavigatorProps extends HoverablePorps {
    /**
     * 应用内的跳转链接
     */
    url?: string

    /**
     * 导航内容
     */
    children?: React.ReactNode
}

const Navigator: React.ForwardRefRenderFunction<HTMLAnchorElement, NavigatorProps> = ({
    id,
    style,
    className,
    url,
    children,
    ...eventProps
}, ref) => {
    const [hoverClass, handles] = useHoverableEvents(eventProps, 'none')

    return (
        <a
            ref={ref}
            id={id}
            style={style}
            className={classNames(hoverClass, 'taro-nav', className)}
            href={url}
            {...handles}
        >
            {children}
        </a>
    )
}

export default forwardRef(Navigator)
