import {
    useRef,
    useImperativeHandle,
    forwardRef,
    ForwardRefRenderFunction,
    CSSProperties
} from 'react'

interface FormSubmitEvent {
    detail: {
        value: Record<string, unknown>
    }
}

interface FormProps {
    className?: string
    style?: CSSProperties
    onSubmit: (event: FormSubmitEvent) => void
    onReset: () => void
}

const Form: ForwardRefRenderFunction<HTMLFormElement, FormProps> = ({
    className,
    style,
    children,
    onSubmit,
    onReset
}, ref) => {
    const form = useRef<HTMLFormElement>(null)

    useImperativeHandle(ref, () => form.current!)

    return (
        <form
            ref={form}
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
        >
          {children}
        </form>
    )
}

export default forwardRef(Form)
