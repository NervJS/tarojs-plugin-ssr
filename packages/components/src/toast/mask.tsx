import React from 'react'
import classNames from 'classnames'

export interface MaskProps {
    className?: string
    transparent?: boolean
}

const Mask: React.FC<MaskProps> = ({className, transparent = false}) => (
    <div
        className={classNames({
            'weui-mask': !transparent,
            'weui-mask_transparent': transparent
        }, className)}
    />
)

export default Mask
