import React from 'react'
import classNames from 'classnames'
import useTaroBaseEvents from '../_util/hooks/useTaroBaseEvents'
import {TaroBaseProps} from '../_util/typings'

export interface SwiperItemProps extends TaroBaseProps {
    /**
     * 该 swiper-item 的标识符
     */
    itemId?: string

    /**
     * 内容
     */
    children?: React.ReactNode
}

const SwiperItem: React.FC<SwiperItemProps> = ({className, itemId, children, ...rest}) => {
    const props = useTaroBaseEvents(rest)

    return (
        <div
            key={itemId}
            className={classNames('swiper-slide', className)}
            {...props}
        >
            {children}
        </div>
    )
}

export default SwiperItem
