import React, {
    useRef,
    useMemo,
    forwardRef,
    useImperativeHandle
} from 'react'
import type {TaroFormSubmitEventHandler, TaroFormCancelEventHandler} from '../_util/typings'
import {createTaroEvent, createTaroFormSubmitEvent} from '../_util/taroEvent'
import FormContext, {FormContextProps} from './formContext'

interface FormProps {
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
    onSubmit: TaroFormSubmitEventHandler
    onReset: TaroFormCancelEventHandler
}

const Form: React.ForwardRefRenderFunction<HTMLFormElement, FormProps> = ({
    className,
    style,
    children,
    onSubmit,
    onReset
}, ref) => {
    const form = useRef<HTMLFormElement | null>(null)

    useImperativeHandle(ref, () => form.current!)

    const listeners = useRef<(() => void)[]>([])
    const values = useRef<Record<string, any>>({})

    const context = useMemo<FormContextProps>(() => ({
        subscribe(fn) {
            listeners.current.push(fn)
            return () => {
                for (let i = 0; i < listeners.current.length; i++) {
                    if (listeners.current[i] === fn) {
                        listeners.current.splice(i, 1)
                        return
                    }
                }
            }
        },
        collect(name, value) {
            if (name) {
                values.current[name] = value
            }
        }
    }), [])

    return (
        <form
            ref={form}
            className={className}
            style={style}
            onSubmit={event => {
                event.preventDefault()
                values.current = {}
                for (const fn of listeners.current) {
                    fn()
                }
                const taroEvent = createTaroFormSubmitEvent(form.current!, values.current)
                onSubmit?.(taroEvent)
            }}
            onReset={event => {
                event.stopPropagation()
                const taroEvent = createTaroEvent('reset', event.target, {})
                onReset?.(taroEvent)
            }}
        >
            <FormContext.Provider value={context}>
                {children}
            </FormContext.Provider>
        </form>
    )
}

export default forwardRef(Form)
