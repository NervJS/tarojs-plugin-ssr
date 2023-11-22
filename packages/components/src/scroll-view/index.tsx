import React, {useImperativeHandle, useRef, useEffect, forwardRef} from 'react'
import classNames from 'classnames'
import type {TaroBaseProps, TaroUIEventHandler, TaroUIEvent} from '../_util/typings'
import useTaroBaseEvents from '../_util/hooks/useTaroBaseEvents'

export interface ScrollViewProps extends TaroBaseProps {
    /**
     * 允许横向滚动
     * @default false
     */
    scrollX?: boolean

    /**
     * 允许纵向滚动
     * @default false
     */
    scrollY?: boolean

    /**
     * 距顶部/左边多远时（单位px），触发 scrolltoupper 事件
     * @default 50
     */
    upperThreshold?: number

    /**
     * 距底部/右边多远时（单位px），触发 scrolltolower 事件
     * @default 50
     */
    lowerThreshold?: number

    /**
     * 设置竖向滚动条位置
     */
    scrollTop?: number

    /**
     * 设置横向滚动条位置
     */
    scrollLeft?: number

    /**
     * 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
     */
    scrollIntoView?: string

    /**
     * 指定 scroll-into-view 目标节点在视口内的位置
     * @default start
     */
    scrollIntoViewAlignment?: ScrollLogicalPosition;

    /**
     * 在设置滚动条位置时使用动画过渡
     * @default false
     */
    scrollWithAnimation?: boolean

    /**
     * iOS 点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向
     * @default false
     */
    enableBackToTop?: boolean

    /**
     * 滚动区域的内容
     */
    children?: React.ReactNode

    /**
     * 滚动到顶部/左边，会触发 scrolltoupper 事件
     */
    onScrollToUpper?: TaroUIEventHandler

    /**
     * 滚动到底部/右边，会触发 scrolltolower 事件
     */
    onScrollToLower?: TaroUIEventHandler

    /**
     * 滚动时触发
     * `event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}`
     */
    onScroll?: TaroUIEventHandler

}

const ScrollView: React.ForwardRefRenderFunction<HTMLDivElement, ScrollViewProps> = ({
    className,
    scrollX,
    scrollY,
    upperThreshold = 50,
    lowerThreshold = 50,
    scrollTop,
    scrollLeft,
    scrollIntoView,
    scrollIntoViewAlignment = 'start',
    scrollWithAnimation,
    // TODO: 待实现
    // enableBackToTop,
    children,
    onScrollToUpper,
    onScrollToLower,
    onScroll,
    ...rest
}, ref) => {
    const el = useRef<HTMLDivElement | null>(null)
    const lastTop = useRef(0)
    const lastLeft = useRef(0)
    const props = useTaroBaseEvents(rest)

    useImperativeHandle(ref, () => el.current!)

    useEffect(() => {
        if (el.current) {
            const {scrollTop, scrollLeft} = el.current
            lastTop.current = scrollTop
            lastLeft.current = scrollLeft
        }
    }, [])

    useEffect(() => {
        if (
            el.current &&
            scrollY &&
            typeof scrollTop === 'number' &&
            scrollTop !== lastTop.current
        ) {
            el.current.scrollTo({
                top: scrollTop,
                behavior: scrollWithAnimation ? 'smooth' : 'auto'
            })
        }
    }, [scrollTop])

    useEffect(() => {
        if (
            el.current &&
            scrollX &&
            typeof scrollLeft === 'number' &&
            scrollTop !== lastLeft.current
        ) {
            el.current.scrollTo({
                left: scrollLeft,
                behavior: scrollWithAnimation ? 'smooth' : 'auto'
            })
        }
    }, [scrollLeft])

    useEffect(() => {
        if (!el.current || !scrollIntoView) {
            return
        }
        const node = el.current.querySelector(`#${scrollIntoView}`)

        if (!node) {
            return
        }

        node.scrollIntoView({
            behavior: scrollWithAnimation ? 'smooth' : 'auto',
            block: scrollY ? (scrollIntoViewAlignment || 'center') : 'center',
            inline: scrollX ? (scrollIntoViewAlignment || 'center') : 'center'
        })
    }, [scrollIntoView, scrollIntoViewAlignment, scrollWithAnimation, scrollX, scrollY])

    function createTaroUIEvent(taroEventType: string, reactEvent: React.UIEvent): TaroUIEvent {
        const {
            timeStamp,
            target,
            currentTarget
        } = reactEvent

        const {scrollLeft, scrollTop, scrollHeight, scrollWidth} = target as HTMLDivElement
        const taroEvent: TaroUIEvent = {
            type: taroEventType,
            timeStamp,
            target,
            currentTarget,
            detail: {
                scrollLeft,
                scrollTop,
                scrollHeight,
                scrollWidth,
                deltaX: lastLeft.current - scrollLeft,
                deltaY: lastTop.current - scrollTop
            },
            preventDefault: () => reactEvent.preventDefault(),
            stopPropagation: () => reactEvent.stopPropagation()
        }
        return taroEvent
    }

    return (
        <div
            {...props}
            ref={el}
            className={classNames(
                'taro-scroll',
                {
                    'taro-scroll-view__scroll-x': scrollX,
                    'taro-scroll-view__scroll-y': scrollY
                },
                className
            )}
            onScroll={event => {
                if (onScroll) {
                    const taroEvent = createTaroUIEvent('scroll', event)
                    onScroll(taroEvent)
                }
                const {
                    offsetWidth,
                    offsetHeight,
                    scrollLeft,
                    scrollTop,
                    scrollHeight,
                    scrollWidth
                } = el.current!
                if (onScrollToLower) {
                    if (
                        (scrollY && offsetHeight + scrollTop + lowerThreshold >= scrollHeight) ||
                        (scrollX && offsetWidth + scrollLeft + lowerThreshold >= scrollWidth)
                    ) {
                        const taroEvent = createTaroUIEvent('scrolltolower', event)
                        onScrollToLower(taroEvent)
                    }
                }
                if (onScrollToUpper) {
                    if (
                        (scrollY && scrollTop <= upperThreshold) ||
                        (scrollX && scrollLeft <= upperThreshold)
                    ) {
                        const taroEvent = createTaroUIEvent('scrolltoupper', event)
                        onScrollToUpper(taroEvent)
                    }
                }
                lastTop.current = scrollTop
                lastLeft.current = scrollLeft
            }}
        >
            {children}
        </div>
    )
}

export default forwardRef(ScrollView)
