import React, {useRef, forwardRef} from 'react'
import classNames from 'classnames'
import type {BaseProps} from '../_util/types'
import useBaseEvents from '../_util/hooks/useBaseEvents'

export interface ProgressProps extends BaseProps {
    /**
     * 百分比 0~100
     */
    percent?: number

    /**
     * 在进度条右侧显示百分比
     * @default false
     */
    showInfo?: boolean

    /**
     * 圆角大小
     * @default 0
     */
    borderRadius?: number | string

    /**
     * 右侧百分比字体大小
     * @default 16
     */
    fontSize?: number | string

    /**
     * 进度条线的宽度
     * @default 6
     */
    strokeWidth?: number | string

    /**
     * 进度条颜色 (请使用 activeColor)
     * @default "#09BB07"
     */
    color?: string

    /**
     * 已选择的进度条的颜色
     * @default "#09BB07"
     */
    activeColor?: string

    /**
     * 未选择的进度条的颜色
     * @default "#EBEBEB"
     */
    backgroundColor?: string

    /**
     * 进度条从左往右的动画
     * @default false
     */
    active?: boolean

    /**
     * backwards: 动画从头播
     *
     * forwards: 动画从上次结束点接着播
     * @default backwards
     */
    activeMode?: 'backwards' | 'forwards'

    /**
     * 进度增加 1% 所需毫秒数
     * @default 30
     */
    duration?: number
}
    
const Progress: React.ForwardRefRenderFunction<HTMLDivElement, ProgressProps> = ({
    id,
    style,
    className,
    percent = 0,
    showInfo = false,
    borderRadius = 0,
    fontSize = 16,
    strokeWidth = 6,
    color = '#09BB07',
    activeColor = '#09BB07',
    backgroundColor = '#EBEBEB',
    active = false,
    activeMode = 'backwards',
    duration = 30,
    ...eventProps
}, ref) => {
    const handles = useBaseEvents(eventProps)

    const prePercent = useRef(percent)

    const num = percent > 100
        ? 100
        : percent < 0
            ? 0
            : percent

    const animationStyle: React.CSSProperties = active
        ? {
            transitionProperty: 'transform',
            transitionDuration: activeMode === 'forwards'
                ? `${(num / 1e3) * (duration - prePercent.current)}s`
                : `${(num / 1e3) * duration}s`,
        }
        : {}

    return (
        <div
            ref={ref}
            id={id}
            style={style}
            className={classNames('weui-progress', className)}
            {...handles}
        >
            <div
                className='weui-progress__bar'
                style={{
                    height: typeof strokeWidth === 'number' ? `${strokeWidth}px` : strokeWidth,
                    borderRadius: borderRadius ? `${borderRadius}px` : undefined,
                    backgroundColor
                }}
            >
                <div
                    className='weui-progress__inner-bar'
                    style={{
                        transform: `scaleX(${num}%)`,
                        backgroundColor: activeColor,
                        ...animationStyle
                    }}
                />
            </div>
            {showInfo && (
                <span
                    className='weui-progress__opr'
                    style={{
                        fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
                    }}
                >
                    {num}%
                </span>
            )}
        </div>
    );
}

export default forwardRef(Progress)
