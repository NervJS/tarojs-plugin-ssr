import React, {forwardRef} from 'react'
import classNames from 'classnames'
import type {TaroBaseProps} from '../_util/typings'
import useTaroBaseEvents from '../_util/hooks/useTaroBaseEvents'

export interface TextProps extends TaroBaseProps {
    /**
     * 显示连续空格
     * @default false
     */
    space: false | 'ensp' | 'emsp' | 'nbsp'

    /**
     * 文本是否可选
     * @default false
     */
    selectable: boolean

    /**
     * 文本内容
     */
    children?: React.ReactNode
}

const Text: React.ForwardRefRenderFunction<HTMLDivElement, TextProps> = ({
    id,
    className,
    style,
    space = false,
    selectable = false,
    children,
    ...rest
}, ref) => {
    const props = useTaroBaseEvents(rest)

    if (typeof children === 'string') {
        if (space === 'nbsp') {
            children = children.replace(/ /g, ' ')
        } else if (space === 'ensp') {
            children = children.replace(/ /g, ' ')
        } else if (space === 'emsp') {
            children = children.replace(/ /g, ' ')
        }
    }

    return (
        <span
            ref={ref}
            className={classNames(
                'taro-text',
                {'taro-text_selectable': selectable},
                className
            )}
            {...props}
        >
            {children}
        </span>
    )
}

export default forwardRef(Text)
