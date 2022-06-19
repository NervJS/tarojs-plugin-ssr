import React from 'react'
import Mask from './mask'
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
}

const Toast = ({icon, iconSize, visible, children}) => (
    <div style={{display: visible ? 'block' : 'none'}}>
        <Mask transparent={true}/>
        <div className='weui-toast'>
            <Icon type={icon} size={iconSize} className='weui-icon_toast' />
            <p className='weui-toast_content'>{children}</p>
        </div>
    </div>
)

export default Toast
