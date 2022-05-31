import React, {forwardRef} from 'react'
import classNames from 'classnames'
import type {BaseProps} from '../_util/types'
import useBaseEvents from '../_util/hooks/useBaseEvents'

export interface IconProps extends BaseProps {
    /**
     * 图标
     */
    type?: string
    
    /**
     * icon 的大小（单位：px）
     */
    size?: number

    /**
     * icon 的颜色
     */
    color?: string
}

const Icon: React.ForwardRefRenderFunction<HTMLElement, IconProps> = ({
    id,
    style,
    className,
    type,
    size = 30,
    color,
    ...eventProps
}, ref) => {
    const handles = useBaseEvents(eventProps)

    const mergedStyle: React.CSSProperties = Object.assign({}, style, {
        fontSize: size ? `${size}px` : undefined,
        color
    })

    return (
        <i
            ref={ref}
            id={id}
            style={mergedStyle}
            className={classNames({
                ['weui-icon-' + type]: type !== 'loading',
                'weui-loading': type === 'loading'
            }, className)}
            {...handles}
        />
    )
}

export default forwardRef(Icon)
