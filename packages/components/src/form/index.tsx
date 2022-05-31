import React, {useRef, useImperativeHandle, forwardRef} from 'react'
import type {BaseProps} from '../_util/types'
import useBaseEvents from '../_util/hooks/useBaseEvents'

interface FormSubmitEvent {
    detail: {
        value: Record<string, any>
    }
}

interface FormProps extends BaseProps {
    onSubmit: (event: FormSubmitEvent) => void
    onReset: () => void
}

const Form: React.ForwardRefRenderFunction<HTMLFormElement, FormProps> = ({
    id,
    className,
    style,
    children,
    onSubmit,
    onReset,
    ...eventProps
}, ref) => {
    const handles = useBaseEvents(eventProps)

    const form = useRef<HTMLFormElement | null>(null)

    useImperativeHandle(ref, () => form.current!)

    return (
        <form
            ref={form}
            id={id}
            className={className}
            style={style}
            onSubmit={event => {
                event.stopPropagation()
                event.preventDefault()
                if (form.current) {
                    const data = new FormData(form.current)
                    const value = {}
                    for (const [name, value] of data) {
                        value[name] = value
                    }
                    onSubmit?.({detail: {value}})
                }
            }}
            onReset={event => {
                event.stopPropagation()
                onReset?.()
            }}
            {...handles}
        >
          {children}
        </form>
    )
}

export default forwardRef(Form)
