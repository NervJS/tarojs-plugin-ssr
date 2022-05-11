import classNames from 'classnames'
import Mask from '../mask'
import Icon from '../icon'

const Toast = ({className, style, show, icon, iconSize, children}) => (
    <div style={{display: show ? 'block' : 'none'}}>
        <Mask transparent />
        <div
            className={classNames('weui-toast', {
                [className]: className
            })}
            style={style}
        >
            <Icon
                className='weui-icon_toast'
                value={icon}
                size={iconSize}
            />
            <p className='weui-toast_content'>{children}</p>
        </div>
    </div>
)

export default Toast
