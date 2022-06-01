import React, {useEffect, useRef, useImperativeHandle,forwardRef} from 'react'
import classNames from 'classnames'
import type {BaseProps, TaroBaseEvent} from '../_util/types'
import useBaseEvents from '../_util/hooks/useBaseEvents'
import useMergedState from '../_util/hooks/useMergedState'

interface TaroInputEvent extends TaroBaseEvent<{
    cursor: number
    keyCode: number
    value: string
}> {}

interface TaroInputFocusEvent extends TaroBaseEvent<{
    value: string
}> {}

interface TaroInputBlurEvent extends TaroBaseEvent<{
    value: string
}> {}

interface TaroInputConfirmEvent extends TaroBaseEvent<{
    value: string
}> {}

export interface InputProps extends BaseProps {
    /**
     * 输入框的初始内容
     */
    value?: string

    /**
     * input 的类型
     * @default "text"
     */
    type?: 'text' | 'number' | 'idcard' | 'digit'

    /**
     * 是否是密码类型
     */
    password?: boolean

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
     * @default "input-placeholder"
     */
    placeholderClass?: string

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
     * 获取焦点
     */
    focus?: boolean

    /**
     * 点击键盘右下角按钮时是否保持键盘不收起
     * @default false
     */
    confirmHold?: boolean

    /**
     * 指定 focus 时的光标位置
     */
    cursor?: number

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
     * 当键盘输入时，触发input事件，event.detail = {value, cursor, keyCode}，处理函数可以直接 return 一个字符串，将替换输入框的内容
     */
    onInput?: (event: TaroInputEvent) => void

    /**
     * 输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度
     */
    onFocus?: (event: TaroInputFocusEvent) => void

    /**
     * 输入框失去焦点时触发
     *
     * event.detail = {value: value}
     */
    onBlur?: (event: TaroInputBlurEvent) => void

    /**
     * 点击完成按钮时触发
     *
     * event.detail = {value: value}
     */
    onConfirm?: (event: TaroInputConfirmEvent) => void
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
    id,
    style,
    className,
    value,
    type = 'text',
    password = false,
    placeholder,
    placeholderStyle: customPlaceholderStyle,
    placeholderClass = 'input-placeholder',
    disabled = false,
    maxlength = 140,
    focus,
    confirmHold = false,
    cursor,
    selectionStart = -1,
    selectionEnd = -1,
    onInput,
    onFocus,
    onBlur,
    onConfirm,
    ...eventProps
}, ref) => {
    const handles = useBaseEvents(eventProps)

    const inputEl = useRef<HTMLInputElement | null>(null)
    const placeholderEl = useRef<HTMLDivElement | null>(null)

    useImperativeHandle(ref, () => inputEl.current!);

    const [mergedValue, setMergedValue] = useMergedState('', {
        value
    })

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
        if (!inputEl.current) {
            return
        }
        if (focus) {
            inputEl.current.focus()
        }
        if (typeof cursor === 'number') {
            inputEl.current.setSelectionRange(cursor, cursor)
        } else if (
            typeof selectionStart === 'number' &&
            selectionStart !== -1 &&
            typeof selectionEnd === 'number' &&
            selectionEnd !== -1
        ) {
            inputEl.current.setSelectionRange(selectionStart, selectionEnd)
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
            id={id}
            style={style}
            className={classNames('taro-input', className)}
            {...handles}
        >
            <div className='taro-input__content'>
                <div
                    ref={placeholderEl}
                    className={classNames('taro-input__placeholder', placeholderClass)}
                    style={placeholderStyle}
                >
                    {placeholder}
                </div>
                <input
                    ref={inputEl}
                    className='taro-input__main'
                    value={mergedValue}
                    type={password ? 'password' : type}
                    disabled={disabled}
                    maxLength={maxlength === -1 ? undefined : maxlength}
                    onChange={event => {
                        const el = event.target
                        if (onInput) {
                            const taroEvent: TaroInputEvent = {
                                type: 'input',
                                detail: {
                                    cursor: el.selectionStart || 0,
                                    keyCode: (event.nativeEvent as any).data.charCodeAt(0),
                                    value: el.value
                                }
                            }
                            onInput(taroEvent)
                        }
                        setMergedValue(el.value)
                    }}
                    onFocus={event => {
                        if (onFocus) {
                            const el = event.target
                            const taroEvent: TaroInputFocusEvent = {
                                type: 'focus',
                                detail: {
                                    value: el.value
                                }
                            }
                            onFocus(taroEvent)
                        }
                    }}
                    onBlur={event => {
                        if (onBlur) {
                            const el = event.target
                            const taroEvent: TaroInputFocusEvent = {
                                type: 'blur',
                                detail: {
                                    value: el.value
                                }
                            }
                            onBlur(taroEvent)
                        }
                    }}
                    onKeyDown={event => {
                        if (onConfirm && 'Enter' === event.key) {
                            if (!confirmHold) {
                                (event.target as HTMLInputElement).blur()
                            }
                            const taroEvent: TaroInputFocusEvent = {
                                type: 'confirm',
                                detail: {
                                    value: mergedValue
                                }
                            }
                            onConfirm(taroEvent)
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default forwardRef(Input)
