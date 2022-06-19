import React from 'react'
import classNames from 'classnames'
import type {BaseProps, TaroDomEvent} from '../_util/types'
import useBaseEvents from '../_util/hooks/useBaseEvents'
import useMergedState from '../_util/hooks/useMergedState'

interface TaroSwitchEvent extends TaroDomEvent<{
    checked: boolean
}> {}

export interface SwitchProps extends BaseProps {
    name?: string
    checked?: boolean
    type: 'switch' | 'checkbox'
    color?: string
    disabled?: boolean
    onChange?: (event: TaroSwitchEvent) => void
}

const Switch: React.ForwardRefRenderFunction<HTMLInputElement, SwitchProps> = ({
    id,
    style,
    className,
    name,
    checked = false,
    type = 'switch',
    color = '#04be02',
    disabled = false,
    onChange,
    ...eventProps
}) => {
    const handles = useBaseEvents(eventProps)

    const [mergedChecked, setMergedChecked] = useMergedState(false, {
        value: checked
    })

    const checkedStyle: React.CSSProperties = mergedChecked
        ? {
            borderColor: color,
            backgroundColor: color
        }
        : {}
    const mergedStyle: React.CSSProperties = Object.assign(checkedStyle, style)

    return (
        <input
            id={id}
            type='checkbox'
            className={classNames({
                'weui-switch': type === 'switch',
                'taro-checkbox': type === 'checkbox',
                'weui-agree__checkbox': type === 'checkbox'
            })}
            style={mergedStyle}
            checked={mergedChecked}
            name={name}
            disabled={disabled}
            onChange={event => {
                const nextChecked = event.target.checked
                setMergedChecked(nextChecked)
                if (onChange) {
                    const taroEvent: TaroSwitchEvent = {
                        type: 'change',
                        timeStamp: event.timeStamp,
                        detail: {
                            checked: nextChecked
                        },
                        target: event.target,
                        currentTarget: event.currentTarget,
                        stopPropagation: event.stopPropagation,
                        preventDefault: event.preventDefault
                    }
                    onChange(taroEvent)
                }
            }}
            {...handles}
        />
    )
}

export default Switch
