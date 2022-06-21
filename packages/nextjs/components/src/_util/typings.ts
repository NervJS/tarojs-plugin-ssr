import React from 'react'

export interface TaroEvent<D = object> {
    currentTarget: EventTarget
    target: EventTarget
    detail: D
    timeStamp: number
    type: string
}

export interface TaroMouseEventDetail {
    x: number
    y: number
}

export interface TaroMouseEvent extends TaroEvent<TaroMouseEventDetail> {
    changedTouches: React.TouchList
    touches: React.TouchList
}

export interface TaroTouchEventDetail {}

export interface TaroTouchEvent extends TaroEvent<TaroTouchEventDetail> {
    changedTouches: React.TouchList
    touches: React.TouchList
}

export type TaroEventHandler<E extends TaroEvent<any>> = (event: E) => void

export type TaroMouseEventHandler = TaroEventHandler<TaroMouseEvent>
export type TaroTouchEventHandler = TaroEventHandler<TaroTouchEvent>

export interface TaroBaseEvents {
    /**
     * 是否以 catch 的形式绑定 touchmove 事件
     */
    catchMove?: boolean

    /**
     * 触摸后马上离开
     */
    onClick?: TaroMouseEventHandler

    /**
     * 触摸开始时
     */
    onTouchStart?: TaroTouchEventHandler

    /**
     * 触摸后移动时
     */
    onTouchMove?: TaroTouchEventHandler

    /**
     * 触摸后被打断时，如来电等
     */
    onTouchCancel?: TaroTouchEventHandler

    /**
     * 触摸结束时
     */
    onTouchEnd?: TaroTouchEventHandler

    /**
     * 触摸后超过 350ms 再离开，如果是指定了事件回调函数并触发了这个事件，tap 事件将不被触发
     */
    onLongPress?: TaroMouseEventHandler
}

export interface TaroBaseProps extends TaroBaseEvents {
    /**
     * 组件唯一标示
     */
    id?: string

    /**
     * 组件类名
     */
    className?: string

    /**
     * 组件的内联样式
     */
    style?: React.CSSProperties
}
