import {createContext} from 'react'

export interface FormContextProps {
    subscribe(cb: () => void): void
    collect(name: string | undefined, value: any)
}

const FormContext = createContext<FormContextProps | null>(null)

export default FormContext
