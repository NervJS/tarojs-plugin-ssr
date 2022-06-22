import React, {
    useEffect,
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

interface TextareaProps extends TaroBaseProps {
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
     * 获取焦点
     * @default false
     */
    focus?: boolean

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

const Textarea: React.ForwardRefRenderFunction<HTMLTextAreaElement, TextareaProps> = ({
    id,
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
    cursor,
    selectionStart = -1,
    selectionEnd = -1,
    onInput,
    onFocus,
    onBlur,
    ...rest
}, ref) => {
    const props = useTaroBaseEvents(rest)

    const textAreaEl = useRef<HTMLTextAreaElement | null>(null)
    const placeholderEl = useRef<HTMLDivElement | null>(null)
    const keyCode = useRef<number | null>(null)

    useImperativeHandle(ref, () => textAreaEl.current!);

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
            id={id}
            style={style}
            className={classNames('taro-textarea', className)}
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
                    disabled={disabled}
                    maxLength={maxlength === -1 ? undefined : maxlength}
                    onInput={event => {
                        if (onInput) {
                            const {
                                timeStamp,
                                target,
                                currentTarget,
                                preventDefault,
                                stopPropagation
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
                                preventDefault,
                                stopPropagation
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
    );
}

export default forwardRef(Textarea)
