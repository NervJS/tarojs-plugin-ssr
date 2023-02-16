import {useState, useRef, useEffect} from 'react'

export default function useMergedState<T, R = T>(
    defaultStateValue?: T | (() => T),
    option?: {
        defaultValue?: T | (() => T);
        value?: T;
        onChange?: (value: T, prevValue?: T) => void;
        postState?: (value?: T) => T;
    }
): [R, (value: T) => void] {
    const {defaultValue, value, onChange, postState} = option || {}
    const [innerValue, setInnerValue] = useState<T | undefined>(() => {
        if (value !== undefined) {
            return value
        }
        if (defaultValue !== undefined) {
            return defaultValue instanceof Function
                ? defaultValue()
                : defaultValue
        }

        return defaultStateValue instanceof Function
            ? defaultStateValue()
            : defaultStateValue
    })
    useEffect(() => {
        setInnerValue(value)
    }, [value])

    const mergedValue = postState ? postState(innerValue) : innerValue

    function triggerChange(newValue: T) {
        setInnerValue(newValue)
        if (mergedValue !== newValue && onChange) {
            onChange(newValue, mergedValue)
        }
    }

    // Effect of reset value to `undefined`
    const firstRenderRef = useRef(true)
    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false

            return
        }

        if (value === undefined) {
            setInnerValue(value)
        }
    }, [value])

    return [mergedValue as unknown as R, triggerChange]
}
