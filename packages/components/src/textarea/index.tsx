import React, {
    useEffect,
    useMemo,
    useRef,
    useImperativeHandle,
    forwardRef
} from 'react'
import classNames from 'classnames'
import type {
    TaroBaseProps,
    TaroInputEventHandler,
    TaroInputEvent,
    TaroFocusEventHandler,
    TaroBlurEventHandler
} from '../_util/typings'
import useTaroBaseEvents from '../_util/hooks/useTaroBaseEvents'
import useMergedState from '../_util/hooks/useMergedState'
import {createTaroFocusEvent, createTaroBlurEvent} from '../_util/taroEvent'
import calculateNodeHeight from './calculateNodeHeight'
import getSizingData from './getSizingData'

export interface TextareaProps extends TaroBaseProps {
    /**
     * 在表单组件中加上 name 来作为 key 
     */
    name?: string

    /**
     * 输入框的内容
     */
    value?: string

    /**
     * 是否禁用
     */
    disabled?: boolean

    /**
     * 最大输入长度，设置为 -1 的时候不限制最大长度
     * @default 140
     */
    maxlength?: number

    /**
     * 输入框为空时占位符
     */
    placeholder?: string

    /**
     * 指定 placeholder 的样式
     */
    placeholderStyle?: React.CSSProperties | string

    /**
     * 指定 placeholder 的样式类
     */
    placeholderClass?: string

    /**
     * 指定 focus 时的光标位置
     * @default -1
     */
    cursor?: number

    /**
     * 自动聚焦，调起键盘
     * 由于浏览器兼容性问题，部分浏览器中无效
     * @default false
     */
    autoFocus?: boolean

    /**
     * 设置键盘右下角按钮的文字
     * @unsupported
     */
    confirmType?: string

    /**
     * 点击键盘右下角按钮时是否保持键盘不收起
     * @default false
     * @todo
     */
    confirmHold?: boolean

    /**
     * 获取焦点
     * @default false
     */
    focus?: boolean

    /**
     * 是否自动增高，设置 autoHeight 时，style.height不生效
     * @default false
     * @todo
     */
    autoHeight?: boolean

    /**
     * 如果 Textarea 是在一个 `position:fixed` 的区域，需要显示指定属性 fixed 为 true
     * @default false
     * @unsupported
     */
    fixed?: boolean

    /**
     * 指定光标与键盘的距离（单位：px）。取 textarea 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
     * @default 0
     * @unsupported
     */
    cursorSpacing?: number

    /**
     * 是否显示键盘上方带有“完成”按钮那一栏
     * @default true
     * @unsupported
     */
    showConfirmBar?: boolean

    /**
     * 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用
     * @default -1
     */
    selectionStart?: number

    /**
     * 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用
     * @default -1
     */
    selectionEnd?: number

    /**
     * 键盘弹起时，是否自动上推页面
     * @default true
     * @unsupported
     */
    adjustPosition?: boolean

    /**
     * 当键盘输入时，触发 input 事件，event.detail = {value, keyCode, cursor}
     */
    onInput?: TaroInputEventHandler

    /**
     * 输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度
     */
    onFocus?: TaroFocusEventHandler

    /**
     * 输入框失去焦点时触发
     *
     * event.detail = {cursor, value}
     */
    onBlur?: TaroBlurEventHandler
}

const Textarea: React.ForwardRefRenderFunction<HTMLDivElement, TextareaProps> = ({
    style,
    className,
    name,
    value,
    placeholder,
    placeholderStyle: customPlaceholderStyle,
    placeholderClass = 'input-placeholder',
    disabled = false,
    maxlength = 140,
    focus,
    autoHeight,
    cursor,
    autoFocus,
    selectionStart = -1,
    selectionEnd = -1,
    onInput,
    onFocus,
    onBlur,

    // unsupported props
    confirmType,
    confirmHold,
    fixed,
    cursorSpacing,
    showConfirmBar,
    adjustPosition,

    ...rest
}, ref) => {
    const props = useTaroBaseEvents(rest)

    const el = useRef<HTMLDivElement | null>(null)
    const textAreaEl = useRef<HTMLTextAreaElement | null>(null)
    const placeholderEl = useRef<HTMLDivElement | null>(null)
    const keyCode = useRef<number | null>(null)

    useImperativeHandle(ref, () => el.current!)

    const [mergedValue, setMergedValue] = useMergedState('', {
        value
    })

    const mergedStyle = useMemo<React.CSSProperties | undefined>(() => {
        if (!textAreaEl.current) {
            return
        }
        const sizingData = getSizingData(textAreaEl.current)
        if (!sizingData) {
            return
        }
        const [height] = calculateNodeHeight(sizingData, mergedValue)
        if (!autoHeight || typeof height !== 'number') {
            return style
        }
        const heightStyle: React.CSSProperties = {height: `${height}px`}
        if (style) {
            return {
                ...style,
                ...heightStyle
            }
        }
        return heightStyle
    }, [mergedValue, autoHeight, style])

    useEffect(() => {
        if (!placeholderEl.current) {
            return
        }
        if (typeof customPlaceholderStyle === 'string') {
            placeholderEl.current.setAttribute('style', customPlaceholderStyle)
        } else {
            placeholderEl.current.setAttribute('style', '')
        }
    }, [customPlaceholderStyle])

    useEffect(() => {
        if (!textAreaEl.current) {
            return
        }
        if (focus) {
            textAreaEl.current.focus()
        }
        if (typeof cursor === 'number') {
            textAreaEl.current.setSelectionRange(cursor, cursor)
        } else if (
            typeof selectionStart === 'number' &&
            selectionStart !== -1 &&
            typeof selectionEnd === 'number' &&
            selectionEnd !== -1
        ) {
            textAreaEl.current.setSelectionRange(selectionStart, selectionEnd)
        }
    }, [])

    const placeholderStyle: React.CSSProperties = Object.assign(
        {
            display: mergedValue ? 'none' : 'block'
        },
        typeof customPlaceholderStyle === 'object'
            ? customPlaceholderStyle
            : undefined
    )

    return (
        <div
            ref={el}
            className={classNames('taro-textarea', className)}
            style={mergedStyle}
            {...props}
        >
            <div className='taro-textarea__content'>
                <div
                    ref={placeholderEl}
                    className={classNames('taro-textarea__placeholder', placeholderClass)}
                    style={placeholderStyle}
                >
                    {placeholder}
                </div>
                <textarea
                    ref={textAreaEl}
                    className='taro-textarea__main'
                    name={name}
                    value={mergedValue}
                    autoFocus={autoFocus}
                    disabled={disabled}
                    maxLength={maxlength === -1 ? undefined : maxlength}
                    onInput={event => {
                        if (onInput) {
                            const {
                                timeStamp,
                                target,
                                currentTarget
                            } = event
                            const el = event.target as HTMLTextAreaElement
                            const taroEvent: TaroInputEvent = {
                                currentTarget,
                                target,
                                detail: {
                                    cursor: el.selectionStart || 0,
                                    keyCode: keyCode.current!,
                                    value: el.value
                                },
                                timeStamp,
                                type: 'input',
                                preventDefault: () => event.preventDefault(),
                                stopPropagation: () => event.stopPropagation()
                            }
                            onInput(taroEvent)
                        }
                    }}
                    onChange={event => {
                        setMergedValue(event.target.value)
                    }}
                    onFocus={event => {
                        if (onFocus) {
                            const taroEvent = createTaroFocusEvent(event)
                            onFocus(taroEvent)
                        }
                    }}
                    onBlur={event => {
                        if (onBlur) {
                            const taroEvent = createTaroBlurEvent(event)
                            onBlur(taroEvent)
                        }
                    }}
                    onKeyDown={event => {
                        keyCode.current = event.keyCode
                    }}
                />
            </div>
        </div>
    )
}

export default forwardRef(Textarea)
