export interface TaroBaseEvent<T> {
    /**
     * 事件类型
     */
    type: string

    /**
     * 事件生成时的时间戳
     */
    timeStamp: number

    /**
     * 触发事件的组件的一些属性值集合
     */
    target: EventTarget

    /**
     * 当前组件的一些属性值集合
     */
    currentTarget: EventTarget

    /**
     * 额外的信息
     */
    detail: T

    /**
     * 阻止元素发生默认的行为
     */
    preventDefault: () => void

    /**
     * 阻止事件冒泡到父元素,阻止任何父事件处理程序被执行
     */
    stopPropagation: () => void
}

export interface TaroTouchEvent extends TaroBaseEvent<{}> {}

export interface TaroMouseEvent extends TaroBaseEvent<{x: number, y: number}> {}

export interface TaroScrollEvent extends TaroBaseEvent<{
    scrollLeft: number,
    scrollTop: number,
    scrollHeight: number,
    scrollWidth: number,
    deltaX: number,
    deltaY: number
}> {}

// https://smartprogram.baidu.com/docs/develop/framework/view_incident/
export interface BaseEventPorps {
    /**
     * 是否以 catch 的形式绑定 touchmove 事件
     */
    catchMove?: boolean

    /**
     * 触摸后马上离开
     */
    onClick?: (event: TaroMouseEvent) => void

    /**
     * 触摸开始时
     */
    onTouchStart?: (event: TaroTouchEvent) => void

    /**
     * 触摸后移动时
     */
    onTouchMove?: (event: TaroTouchEvent) => void

    /**
     * 触摸后被打断时，如来电等
     */
    onTouchCancel?: (event: TaroTouchEvent) => void

    /**
     * 触摸结束时
     */
    onTouchEnd?: (event: TaroTouchEvent) => void

    /**
     * 触摸后超过 350ms 再离开，如果是指定了事件回调函数并触发了这个事件，tap 事件将不被触发
     */
    onLongPress?: (event: TaroTouchEvent) => void
}

export interface BaseProps extends BaseEventPorps {
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
