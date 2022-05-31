import React, {forwardRef} from 'react'
import classNames from 'classnames'
import type {HoverablePorps} from '../_util/types'
import useHoverableEvents from '../_util/hooks/useHoverableEvents'

export interface ViewProps extends HoverablePorps {}

const View: React.ForwardRefRenderFunction<HTMLDivElement, ViewProps> = ({
    id,
    className,
    style,
    children,
    ...eventProps
}, ref) => {
    const [hoverClass, handles] = useHoverableEvents(eventProps, 'none')

    return (
        <div
            ref={ref}
            id={id}
            className={classNames(hoverClass, className)}
            style={style}
            {...handles}
        >
            {children}
        </div>
    )
}

export default forwardRef(View);
