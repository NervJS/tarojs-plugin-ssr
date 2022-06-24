import React from 'react'
import classNames from 'classnames'
import Mask from '../mask'
import Icon from '../icon'

export interface ToastProps {
    /**
     * Toast 图标
     */
    icon?: string

    /**
     * Toast 图标大小
     */
    iconSize?: number

    /**
     * Display toast
     */
    visible?: boolean

    /**
     * Toast 内容
     */
    children?: React.ReactNode
}

const Toast: React.FC<ToastProps> = ({icon, iconSize, visible, children}) => (
    <div style={{display: visible ? 'block' : 'none'}}>
        <Mask transparent />
        <div
            className={classNames('taro-toast', {
                'taro-toast_none': !icon
            })}
        >
            {!!icon && <Icon className='taro-toast_icon' type={icon} size={iconSize} />}
            <p className='taro-toast_content'>{children}</p>
        </div>
    </div>
)

export default Toast
