import React, {forwardRef} from 'react'
import classNames from 'classnames'
import type {TaroBaseProps} from '../_util/typings'
import useTaroBaseEvents from '../_util/hooks/useTaroBaseEvents'

export interface IconProps extends TaroBaseProps {
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
    style,
    className,
    type,
    size = 30,
    color,
    ...rest
}, ref) => {
    const props = useTaroBaseEvents(rest)

    const mergedStyle: React.CSSProperties = Object.assign({}, style, {
        fontSize: size ? `${size}px` : undefined,
        color
    })

    return (
        <i
            ref={ref}
            style={mergedStyle}
            className={classNames({
                ['weui-icon-' + type]: type !== 'loading',
                'weui-loading': type === 'loading'
            }, className)}
            {...props}
        />
    )
}

export default forwardRef(Icon)
