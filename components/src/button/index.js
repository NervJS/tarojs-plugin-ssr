import React from 'react'
import omit from 'omit.js'
import classNames from 'classnames'

class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false,
            touch: false
        }
    }

    componentWillUnmount() {
        clearTimeout(this.startTimer)
        clearTimeout(this.endTimer)
    }

    render() {
        const {
            innerRef,
            children,
            disabled,
            className,
            style,
            onClick,
            onTouchStart,
            onTouchEnd,
            hoverClass = 'button-hover',
            hoverStartTime = 20,
            hoverStayTime = 70,
            size,
            plain,
            loading = false,
            type = 'default'
        } = this.props
        const cls = className || classNames(
            'weui-btn',
            {
                [`${hoverClass}`]: this.state.hover && !disabled && hoverClass !== 'none',
                [`weui-btn_plain-${type}`]: plain,
                [`weui-btn_${type}`]: !plain && type,
                'weui-btn_mini': size === 'mini',
                'weui-btn_loading': loading,
                'weui-btn_disabled': disabled
            }
        )

        const _onTouchStart = e => {
            this.setState(() => ({
                touch: true
            }))
            if (hoverClass && hoverClass !== 'none' && !disabled) {
                this.startTimer = setTimeout(() => {
                    if (this.state.touch) {
                        this.setState(() => ({
                            hover: true
                        }))
                    }
                }, hoverStartTime)
            }
            onTouchStart && onTouchStart(e)
        }
        const _onTouchEnd = e => {
            this.setState(() => ({
                touch: false
            }))
            if (hoverClass && hoverClass !== 'none' && !disabled) {
                this.endTimer = setTimeout(() => {
                    if (!this.state.touch) {
                        this.setState(() => ({
                            hover: false
                        }))
                    }
                }, hoverStayTime)
            }
            onTouchEnd && onTouchEnd(e)
        }

        return (
            <button
                {...omit(this.props, ['innerRef', 'hoverClass', 'onTouchStart', 'onTouchEnd'])}
                ref={innerRef}
                className={cls}
                style={style}
                onClick={onClick}
                disabled={disabled}
                onTouchStart={_onTouchStart}
                onTouchEnd={_onTouchEnd}
            >
                {loading && <i class='weui-loading' />}
                {children}
            </button>
        )
    }
}

export default React.forwardRef((props, ref) => <Button innerRef={ref} {...props} />);
