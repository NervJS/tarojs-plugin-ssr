import React, {
    useRef,
    useMemo,
    forwardRef
} from 'react'
import FormContext, {FormContextProps} from './formContext'

interface FormSubmitEvent {
    detail: {
        value: Record<string, unknown>
    }
}

interface FormProps {
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
    onSubmit: (event: FormSubmitEvent) => void
    onReset: () => void
}

const Form: React.ForwardRefRenderFunction<HTMLFormElement, FormProps> = ({
    className,
    style,
    children,
    onSubmit,
    onReset
}, ref) => {
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
            ref={ref}
            className={className}
            style={style}
            onSubmit={event => {
                event.preventDefault()
                values.current = {}
                for (const fn of listeners.current) {
                    fn()
                }
                onSubmit?.({detail: {value: values.current}})
            }}
            onReset={event => {
                event.stopPropagation()
                onReset?.()
            }}
        >
            <FormContext.Provider value={context}>
                {children}
            </FormContext.Provider>
        </form>
    )
}

export default forwardRef(Form)
