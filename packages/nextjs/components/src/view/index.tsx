import React, {forwardRef} from 'react'
import classNames from 'classnames'
import {TaroHoverableProps} from '../_util/typings'
import useTaroHoverableEvents from '../_util/hooks/useTaroHoverableEvents'

export interface ViewProps extends TaroHoverableProps {
    /**
     * View 内容
     */
    children?: React.ReactNode
}

const View: React.ForwardRefRenderFunction<HTMLDivElement, ViewProps> = ({
    id,
    className,
    style,
    children,
    ...events
}, ref) => {
    const [hoverClass, props] = useTaroHoverableEvents(events, 'none')

    return (
        <div
            ref={ref}
            id={id}
            className={classNames(hoverClass, className)}
            style={style}
            {...props}
        >
            {children}
        </div>
    )
}

export default forwardRef(View);
