import React from 'react'

export interface TaroEvent<D = object> {
    currentTarget: EventTarget
    target: EventTarget
    detail: D
    timeStamp: number
    type: string
    preventDefault(): void
    stopPropagation(): void
}

export interface TaroMouseEventDetail {
    x: number
    y: number
}
export interface TaroMouseEvent extends TaroEvent<TaroMouseEventDetail> {
    changedTouches: React.TouchList
    touches: React.TouchList
}

export interface TaroTouchEvent extends TaroEvent {
    changedTouches: React.TouchList
    touches: React.TouchList
}

export interface TaroUIEventDetail {
    scrollLeft: number
    scrollTop: number
    scrollHeight: number
    scrollWidth: number
    deltaX: number
    deltaY: number
}
export type TaroUIEvent = TaroEvent<TaroUIEventDetail>

export interface TaroInputEventDetail {
    cursor: number
    keyCode: number
    value: string
}
export type TaroInputEvent = TaroEvent<TaroInputEventDetail>

export interface TaroFocusEventDetail {
    height: number
    value: string
}
export type TaroFocusEvent = TaroEvent<TaroFocusEventDetail>

export interface TaroBlurEventDetail {
    cursor: number
    value: string
}
export type TaroBlurEvent = TaroEvent<TaroBlurEventDetail>

export interface TaroConfirmEventDetail {
    value: string
}
export type TaroConfirmEvent = TaroEvent<TaroConfirmEventDetail>

export interface TaroVideoEventDetail {
    videoId: string | undefined
}
export type TaroVideoEvent = TaroEvent<TaroVideoEventDetail>

export interface TaroSwitchEventDetail {
    checked: boolean
}
export type TaroSwitchEvent = TaroEvent<TaroSwitchEventDetail>

export interface TaroSwiperEventDetail {
    current: number
}
export type TaroSwiperEvent = TaroEvent<TaroSwiperEventDetail>

export interface TaroPickerViewEventDetail {
    value?: number[]
}
export type TaroPickerViewEvent = TaroEvent<TaroPickerViewEventDetail>

export interface TaroFormSubmitEventDetail {
    value: Record<string, unknown>
}
export type TaroFormSubmitEvent = TaroEvent<TaroFormSubmitEventDetail>

export type TaroEventHandler<E extends TaroEvent = TaroEvent> = (event: E) => void

export type TaroMouseEventHandler = TaroEventHandler<TaroMouseEvent>
export type TaroTouchEventHandler = TaroEventHandler<TaroTouchEvent>
export type TaroUIEventHandler = TaroEventHandler<TaroUIEvent>
export type TaroInputEventHandler = TaroEventHandler<TaroInputEvent>
export type TaroFocusEventHandler = TaroEventHandler<TaroFocusEvent>
export type TaroBlurEventHandler = TaroEventHandler<TaroBlurEvent>
export type TaroConfirmEventHandler = TaroEventHandler<TaroConfirmEvent>
export type TaroVideoEventHandler = TaroEventHandler<TaroVideoEvent>
export type TaroSwitchEventHanlder = TaroEventHandler<TaroSwitchEvent>
export type TaroSwiperEventHandler = TaroEventHandler<TaroSwiperEvent>
export type TaroPickerViewEventHandler = TaroEventHandler<TaroPickerViewEvent>
export type TaroFormSubmitEventHandler = TaroEventHandler<TaroFormSubmitEvent>
export type TaroFormCancelEventHandler = TaroEventHandler

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

export interface TaroBaseAttributes {
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

export interface TaroHoverableAttributes extends TaroBaseAttributes {
    /**
     * 指定按下去的样式类。当 `hover-class="none"` 时，没有点击态效果
     */
    hoverClass?: string

    /**
     * 指定是否阻止本节点的祖先节点出现点击态
     * @default false
     */
    hoverStopPropagation?: boolean

    /**
     * 按住后多久出现点击态，单位毫秒
     * @default 20
     */
    hoverStartTime?: number

    /**
     * 手指松开后点击态保留时间，单位毫秒
     * @default 70
     */
    hoverStayTime?: number
}

export interface TaroBaseProps extends TaroBaseAttributes, TaroBaseEvents { }

export interface TaroHoverableProps extends TaroHoverableAttributes, TaroBaseEvents { }
