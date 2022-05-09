import {useRef, FC} from 'react'

interface FormSubmitEvent {
    detail: {
        value: Record<string, any>
    }
}

interface FormProps {
    onSubmit: (event: FormSubmitEvent) => void
    onReset: () => void
}

const Form: FC<FormProps> = ({children, onSubmit, onReset}) => {
    const form = useRef<HTMLFormElement>(null)

    return (
        <form
            ref={form}
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

export default Form
