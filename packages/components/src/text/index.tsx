import React, {forwardRef} from 'react'
import classNames from 'classnames'
import type {BaseProps} from '../_util/types'
import useBaseEvents from '../_util/hooks/useBaseEvents'

export interface TextProps extends BaseProps {
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
}

const Text: React.ForwardRefRenderFunction<HTMLDivElement, TextProps> = ({
    id,
    className,
    style,
    space = false,
    selectable = false,
    children,
    ...eventProps
}, ref) => {
    const handles = useBaseEvents(eventProps)

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
                {'taro-text__selectable': selectable},
                className
            )}
            {...handles}
        >
            {children}
        </span>
    )
}

export default forwardRef(Text)
