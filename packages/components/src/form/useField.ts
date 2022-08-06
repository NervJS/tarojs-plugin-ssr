import {useContext, useEffect} from 'react'
import FormContext from './formContext'

function useField(name: string | undefined, value: any): void {
    const formContext = useContext(FormContext)
    
    useEffect(() => {
        if (!formContext) {
            return
        }
        const unsubscribe = formContext.subscribe(() => {
            formContext.collect(name, value)
        })
        return unsubscribe
    }, [name, value])
}

export default useField
