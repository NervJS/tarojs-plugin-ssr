import React from 'react'
import classNames from 'classnames'

export interface MaskProps {
    className?: string
    transparent?: boolean
}

const Mask: React.FC<MaskProps> = ({className, transparent = false, children}) => (
    <div className={classNames('taro-mask', className)}>
        <div
            className={classNames({
                'taro-mask_button': !transparent,
                'taro-mask_button-transparent': transparent
            })}
        />
        <div className='taro-mask_content'>
            {children}
        </div>
    </div>
)

export default Mask
