import classNames from 'classnames'

const Icon = ({className, value, size, primary}) => (
    <i
        className={classNames({
            ['weui-icon-' + value]: value !== 'loading',
            'weui-icon_msg': size === 'large' && !primary,
            'weui-icon_msg-primary': size === 'large' && primary,
            'weui-loading': value === 'loading'
        }, className)}
    />
)

export default Icon
