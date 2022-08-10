import React, {useEffect, useRef, useMemo} from 'react'
import classNames from 'classnames'
import SwiperCore, {Autoplay, SwiperOptions} from 'swiper'
import {createTaroSwiperEvent} from '../_util/taroEvent'
import useMergedState from '../_util/hooks/useMergedState'
import toArray from '../_util/children/toArray'
import {TaroBaseProps, TaroSwiperEventHandler} from '../_util/typings'

SwiperCore.use([Autoplay])

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

interface SwiperProps extends TaroBaseProps {
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

    /**
     * current 改变时会触发 change 事件
     */
    onChange?: TaroSwiperEventHandler

    /**
     * swiper-item 的位置发生改变时会触发 transition 事件
     */
    onTransition?: TaroSwiperEventHandler

    /**
     * 动画结束时会触发 animationfinish 事件
     */
    onAnimationFinish?: TaroSwiperEventHandler

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

const Swiper: React.FC<SwiperProps> = ({
    id,
    className,
    style,
    indicatorDots = false,
    indicatorColor = 'rgba(0, 0, 0, .3)',
    indicatorActiveColor = '#333',
    autoplay,
    current,
    // currentItemId,
    interval = 5000,
    duration = 500,
    circular = false,
    vertical = false,
    // previousMargin = '0px',
    // nextMargin = '0px',
    // snapToEdge = false,
    displayMultipleItems = 1,
    // skipHiddenItemLayout = false,
    // easingFunction = 'default',
    children,
    onChange,
    onAnimationFinish
}) => {
    const swiperElRef = useRef<HTMLDivElement | null>(null)
    const swiperRef = useRef<SwiperCore | null>(null)

    const onChangeRef = useRef<TaroSwiperEventHandler | undefined>(onChange)
    const onAnimationFinishRef = useRef<TaroSwiperEventHandler | undefined>(onAnimationFinish)
    
    const [mergedCurrent, setMergedCurrent] = useMergedState(0, {
        defaultValue: current
    })

    useEffect(() => {
        if (!swiperElRef.current) {
            return
        }

        const options: SwiperOptions = {
            direction: vertical ? 'vertical' : 'horizontal',
            loop: circular,
            slidesPerView: displayMultipleItems,
            initialSlide: mergedCurrent,
            speed: duration,
            observer: true,
            observeParents: true,
            on: {
                slideChange(swiper) {
                    const taroEvent = createTaroSwiperEvent('change', swiper)
                    setMergedCurrent(taroEvent.detail.current)
                    onChangeRef.current?.(taroEvent)
                },
                transitionEnd(swiper) {
                    const taroEvent = createTaroSwiperEvent('animationfinish', swiper)
                    onAnimationFinishRef.current?.(taroEvent)
                }
            }
        }

        if (autoplay) {
            options.autoplay = {
                delay: interval,
                stopOnLastSlide: true,
                disableOnInteraction: false
            }
        }

        const swiper = swiperRef.current = new SwiperCore(swiperElRef.current, options)

        return () => {
            swiper.destroy()
        }
    }, [])

    useEffect(() => {
        const swiper = swiperRef.current
        if (!swiper) {
            return
        }
        if (autoplay) {
            swiper.autoplay.start()
        } else {
            swiper.autoplay.stop()
        }
    }, [autoplay])

    const items = useMemo(() => toArray(children), [children])

    return (
        <div
            ref={swiperElRef}
            id={id}
            style={style}
            className={classNames('swiper-container', className)}
        >
            <div className='swiper-wrapper'>
                {children}
            </div>
           {indicatorDots && (
                <div
                    className={classNames('taro-swiper__dots', {
                        'taro-swiper__dots-vertical': vertical,
                        'taro-swiper__dots-horizontal': !vertical
                    })}
                >
                    {items.map((_, index) => (
                        <div
                            key={index}
                            className='taro-swiper__dot'
                            style={{
                                backgroundColor: mergedCurrent === index
                                    ? indicatorActiveColor
                                    : indicatorColor
                            }}
                        />
                    ))}
                </div>
           )}
        </div>
    )
}

export default Swiper
