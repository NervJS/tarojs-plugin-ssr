import React, {forwardRef} from 'react'
import {TaroHoverableProps} from '../_util/typings'
import useTaroHoverableEvents from '../_util/hooks/useTaroHoverableEvents'

export interface ViewProps extends TaroHoverableProps {
    /**
     * View 内容
     */
    children?: React.ReactNode
}

const View: React.ForwardRefRenderFunction<HTMLDivElement, ViewProps> = ({
    children,
    ...rest
}, ref) => {
    const props = useTaroHoverableEvents(rest, 'none')

    return (
        <div
            ref={ref}
            {...props}
        >
            {children}
        </div>
    )
}

export default forwardRef(View);
