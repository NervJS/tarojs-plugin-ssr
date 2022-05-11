import React from 'react'
import classNames from 'classnames'

const Mask = ({className, transparent = false}) => (
    <div
        className={classNames({
            'weui-mask': !transparent,
            'weui-mask_transparent': transparent
        }, className)}
    />
)

export default Mask
