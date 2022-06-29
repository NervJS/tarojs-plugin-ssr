import React, {forwardRef} from 'react'
import type {TaroBaseProps} from '../_util/typings'
import useTaroBaseEvents from '../_util/hooks/useTaroBaseEvents'

export interface LabelProps extends TaroBaseProps {
    /**
     * 绑定控件的 id
     */
    for?: string

    /**
     * 标签内容
     */
    children?: React.ReactNode
}

const Label: React.ForwardRefRenderFunction<HTMLLabelElement, LabelProps> = ({
    for: htmlFor,
    children,
    ...rest
}, ref) => {
    const handles = useTaroBaseEvents(rest)

    return (
        <label
            ref={ref}
            htmlFor={htmlFor}
            {...handles}
        >
            {children}
        </label>
    )
}

export default forwardRef(Label)
