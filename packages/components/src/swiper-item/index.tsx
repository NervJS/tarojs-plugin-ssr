import React from 'react'
import classNames from 'classnames'
import {TaroBaseAttributes, TaroMouseEventHandler} from '../_util/typings'
import { createTaroMouseEvent } from '../_util/taroEvent'

export interface SwiperItemProps extends TaroBaseAttributes {
    
    /**
     * 该 swiper-item 的标识符
     */
    itemId?: string

    /**
     * 内容
     */
    children?: React.ReactNode

    /**
     * 触摸后马上离开
     */
    onClick?: TaroMouseEventHandler
}

const SwiperItem: React.FC<SwiperItemProps> = ({className, itemId, children, onClick, ...rest}) => {
    return (
        <div
            key={itemId}
            className={classNames('swiper-slide', className)}
            onClick={reactEvent => {
                const taroEvent = createTaroMouseEvent('tap', reactEvent)
                onClick?.(taroEvent)
            }}
            {...rest}
        >
            {children}
        </div>
    )
}

export default SwiperItem
