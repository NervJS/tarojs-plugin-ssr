import React, {forwardRef} from 'react'
import type {BaseProps} from '../_util/types'
import useBaseEvents from '../_util/hooks/useBaseEvents'

export interface SwiperItemProps extends BaseProps {
    /**
     * 该 swiper-item 的标识符
     */
    itemId?: string
}

const SwiperItem: React.ForwardRefRenderFunction<HTMLDivElement, SwiperItemProps> = ({
    className,
    style,
    children,
    ...eventProps
}, ref) => {
    const handles = useBaseEvents(eventProps)

    return (
        <div
            ref={ref}
            className={className}
            style={style}
            {...handles}
        >
            {children}
        </div>
    )
}

export default forwardRef(SwiperItem)
