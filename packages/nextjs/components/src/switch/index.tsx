import React from 'react'
import classNames from 'classnames'
import type {TaroBaseProps, TaroSwitchEventHanlder} from '../_util/typings'
import {createTaroSwitchEvent} from '../_util/taroEvent'
import useTaroBaseEvents from '../_util/hooks/useTaroBaseEvents'
import useMergedState from '../_util/hooks/useMergedState'

export interface SwitchProps extends TaroBaseProps {
    name?: string
    checked?: boolean
    type: 'switch' | 'checkbox'
    color?: string
    disabled?: boolean
    onChange?: TaroSwitchEventHanlder
}

const Switch: React.ForwardRefRenderFunction<HTMLInputElement, SwitchProps> = ({
    style,
    className,
    name,
    checked = false,
    type = 'switch',
    color = '#04be02',
    disabled = false,
    onChange,
    ...rest
}) => {
    const props = useTaroBaseEvents(rest)

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
            type='checkbox'
            className={classNames({
                'weui-switch': type === 'switch',
                'weui-agree__checkbox': type === 'checkbox'
            })}
            style={mergedStyle}
            checked={mergedChecked}
            name={name}
            disabled={disabled}
            onChange={event => {
                setMergedChecked(event.target.checked)
                if (onChange) {
                    const taroEvent = createTaroSwitchEvent(event)
                    onChange(taroEvent)
                }
            }}
            {...props}
        />
    )
}

export default Switch
