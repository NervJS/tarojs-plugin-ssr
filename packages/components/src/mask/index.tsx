import React from 'react'
import classNames from 'classnames'

export interface MaskProps {
    /**
     * 类名
     */
    className?: string

    /**
     * 是否可见
     * 
     * @default true
     */
    visible?: boolean

    /**
     * 背景是否透明
     * 
     * @default false
     */
    transparent?: boolean

    /**
     * 蒙层内容
     */
    children?: React.ReactNode

    /**
     * 点击蒙层自身触发
     */
    onClick?: () => void
}

const Mask: React.FC<MaskProps> = ({className, visible = true, transparent = false, children, onClick}) => {
    if (!visible) {
        return null
    }

    return (
        <div className={classNames('taro-mask', className)}>
            <div
                className={classNames({
                    'taro-mask_button': !transparent,
                    'taro-mask_button-transparent': transparent
                })}
                onClick={onClick}
            />
            {children}
        </div>
    )
}

export default Mask
