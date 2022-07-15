import classNames from 'classnames'
import React from 'react'
import Mask from '../mask'

interface ModalProps {
    /**
     * Display Modal
     */
    visible?: boolean

    /**
     * 提示的标题
     */
    title?: string

    /**
     * 是否显示取消按钮
     * @default true
     */
    showCancel?: boolean

    /**
     * 取消按钮的文字，最多 4 个字符
     */
    cancelText?: string

    /**
     * 取消按钮的文字颜色，必须是 16 进制格式的颜色字符串
     * @default '#000'
     */
    cancelColor?: string

    /**
     * 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
     */
    confirmColor?: string

    /**
     * 确认按钮的文字，最多 4 个字符
     */
    confirmText?: string

    /**
     * 提示的内容
     */
    children?: React.ReactNode

    /**
     * 点击取消
     */
    onCancel?: () => void

    /**
     * 点击确定
     */
    onConfirm?: () => void
}

const Modal: React.FC<ModalProps> = ({
    title = '',
    visible = true,
    showCancel,
    cancelText = '取消',
    cancelColor = '#000',
    confirmText = '确定',
    confirmColor = '#000',
    children,
    onCancel,
    onConfirm
}) => (
    <Mask
        transparent
        visible={visible}
    >
        <div className='weui-dialog'>
            <div className='weui-dialog__hd'>
                <strong className='weui-dialog__title'>{title}</strong>
            </div>
            <div className='weui-dialog__bd'>
                {children}
            </div>
            <div className='weui-dialog__ft'>
                {showCancel && (
                    <a
                        className={classNames('weui-dialog__btn', 'weui-dialog__btn_default')}
                        href='#'
                        style={{
                            color: cancelColor
                        }}
                        onClick={event => {
                            event.preventDefault()
                            onCancel?.()
                        }}
                    >
                        {cancelText.substring(0, 4)}
                    </a>
                )}
                <a
                    className={classNames('weui-dialog__btn', 'weui-dialog__btn_primary')}
                    href='#'
                    style={{
                        color: confirmColor
                    }}
                    onClick={event => {
                        event.preventDefault()
                        onConfirm?.()
                    }}
                >
                    {confirmText.substring(0, 4)}
                </a>
            </div>
        </div>
    </Mask>
)

export default Modal
