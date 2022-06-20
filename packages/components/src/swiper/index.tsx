import React, {useEffect, forwardRef} from 'react'
import {Swiper as InternalSwiper, SwiperSlide, useSwiper} from 'swiper/react/swiper-react'
import classNames from 'classnames'
import type {BaseProps} from '../_util/types'
import useBaseEvents from '../_util/hooks/useBaseEvents'
import useMergedState from '../_util/hooks/useMergedState'
import toArray from '../_util/children/toArray'
import type {SwiperItemProps} from '../swiper-item'

/**
 * 指定 swiper 切换缓动动画类型
 */
interface EasingFunction {
    /**
     * 默认缓动函数
     */
    default
    /**
     * 线性动画
     */
    linear
    /**
     * 缓入动画
     */
    easeInCubic
    /**
     * 缓出动画
     */
    easeOutCubic
    /**
     * 缓入缓出动画
     */
    easeInOutCubic
}

interface SwiperProps extends BaseProps {
    /**
     * 是否显示面板指示点
     * @default false
     */
    indicatorDots?: boolean

    /**
     * 指示点颜色
     * @default "rgba(0, 0, 0, .3)"
     */
    indicatorColor?: string

    /**
     * 当前选中的指示点颜色
     * @default "#000000"
     */
    indicatorActiveColor?: string

    /**
     * 是否自动切换
     * @default false
     */
    autoplay?: boolean

    /**
     * 当前所在滑块的 index
     * @default 0
     */
    current?: number

    /**
     * 当前所在滑块的 item-id ，不能与 current 被同时指定
     * @default ""
     */
    currentItemId?: string

    /**
     * 自动切换时间间隔
     * @default 5000
     */
    interval?: number

    /**
     * 滑动动画时长
     * @default 500
     */
    duration?: number

    /**
     * 是否采用衔接滑动
     * @default false
     */
    circular?: boolean

    /**
     * 滑动方向是否为纵向
     * @default false
     */
    vertical?: boolean

    /**
     * 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
     * @default "0px"
     */
    previousMargin?: string

    /**
     * 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
     * @default "0px"
     */
    nextMargin?: string

    /**
     * 当 swiper-item 的个数大于等于 2，关闭 circular 并且开启 previous-margin 或 next-margin 的时候，可以指定这个边距是否应用到第一个、最后一个元素
     * @default false
     * @supported weapp
     */
    snapToEdge?: boolean

    /**
     * 同时显示的滑块数量
     * @default 1
     */
    displayMultipleItems?: number

    /**
     * 是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息
     * @default false
     */
    skipHiddenItemLayout?: boolean

    /**
     * 指定 swiper 切换缓动动画类型
     * @default "default"
     */
    easingFunction?: keyof EasingFunction

    // /**
    //  * current 改变时会触发 change 事件
    //  */
    // onChange?: CommonEventFunction<SwiperProps.onChangeEventDetail>

    // /**
    //  * swiper-item 的位置发生改变时会触发 transition 事件
    //  */
    // onTransition?: CommonEventFunction<SwiperProps.onTransitionEventDetail>

    // /**
    //  * 动画结束时会触发 animationfinish 事件
    //  */
    // onAnimationFinish?: SwiperProps['onChange']

    /**
     * 是否禁止用户 touch 操作
     * @default false
     */
    disableTouch?: boolean

    /**
     * swiper-item
     */
    children?: React.ReactNode
}

const Swiper: React.ForwardRefRenderFunction<HTMLDivElement, SwiperProps> = ({
    id,
    className,
    style,
    indicatorDots = false,
    indicatorColor,
    indicatorActiveColor,
    autoplay,
    current,
    currentItemId,
    interval = 5000,
    duration = 500,
    circular = false,
    vertical = false,
    previousMargin = '0px',
    nextMargin = '0px',
    snapToEdge = false,
    displayMultipleItems = 1,
    skipHiddenItemLayout = false,
    easingFunction = 'default',
    // onChange?: CommonEventFunction<SwiperProps.onChangeEventDetail>
    // onTransition?: CommonEventFunction<SwiperProps.onTransitionEventDetail>
    // onAnimationFinish?: SwiperProps['onChange']
    // disableTouch?: boolean
    children,
    ...eventProps
}, ref) => {
    const swiper = useSwiper()

    const handles = useBaseEvents(eventProps)

    const [mergedCurrent, setMergedCurrent] = useMergedState(0, {
        value: current
    })

    const items = toArray(children) as React.ReactElement<SwiperItemProps>[]

    const slides = items.map(child => {
        const itemId = child.props.itemId
        return (
            <SwiperSlide key={itemId}>
                {child}
            </SwiperSlide>
        )
    })

    const pagination = items.map((_, i) => {
        const clx = classNames('weui-swiper__pagination-bullet', {
            active: i === mergedCurrent
        });
        return <span className={clx} key={i}></span>
    })

    useEffect(() => {
        if (!swiper) {
            return
        }
        if (typeof current === 'number') {
            swiper.slideTo(current)
        }
    }, [swiper, current])

    useEffect(() => {
        if (!swiper) {
            return
        }
        if (typeof currentItemId !== 'string') {
            return
        }
        const index = items.findIndex(child => child.props.itemId === currentItemId)
        if (index === -1) {
            return
        }
        swiper.slideTo(index)
    }, [swiper, currentItemId])

    return (
        <div
            ref={ref}
            id={id}
            className={className}
            style={style}
            {...handles}
        >
            <InternalSwiper
                tabIndex={mergedCurrent}
                spaceBetween={0}
                slidesPerView={1}
                onActiveIndexChange={event => {
                    setMergedCurrent(event.activeIndex)
                }}
            >
                {slides}
            </InternalSwiper>
            {pagination}
        </div>
    )
}

export default forwardRef(Swiper)
