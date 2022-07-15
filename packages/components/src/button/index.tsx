import React, {forwardRef} from 'react'
import classNames from 'classnames'
import type {TaroBaseProps} from '../_util/typings'
import useTaroHoverableEvents from '../_util/hooks/useTaroHoverableEvents'

type SizeType = 'default' | 'mini'

type ButtonType = 'primary' | 'default' | 'warn'

type ButtonFormType = 'buttonclick' | 'submit' | 'reset'

export interface ButtonProps extends TaroBaseProps {
    /**
     * 按钮的大小
     * @default default
     */
    size?: SizeType

    /**
     * 按钮的样式类型
     * @default default
     */
    type?: ButtonType

    /**
     * 按钮是否镂空，背景色透明
     * @default false
     */
    plain?: boolean

    /**
     * 是否禁用
     * @default false
     */
    formType?: ButtonFormType

    /**
     * 指定按下去的样式类。当 `hover-class="none"` 时，没有点击态效果
     * @default button-hover
     */
    hoverClass?: string

    /**
     * 指定是否阻止本节点的祖先节点出现点击态
     * @default false
     */
    hoverStopPropagation?: boolean

    /**
     * 按住后多久出现点击态，单位毫秒
     * @default 20
     */
    hoverStartTime?: number

    /**
     * 手指松开后点击态保留时间，单位毫秒
     * @default 70
     */
    hoverStayTime?: number

    /**
     * 是否禁用
     * @default false
     */
    disabled?: boolean

    /**
     * 名称前是否带 loading 图标
     * @default false
     */
    loading?: boolean

    /**
     * 按钮内容
     */
    children?: React.ReactNode
}

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = ({
    size = 'default',
    type = 'default',
    plain = false,
    formType = 'buttonclick',
    disabled = false,
    loading = false,
    children,
    ...rest
}, ref) => {
    const {className, ...props} = useTaroHoverableEvents(rest)

    return (
        <button
            ref={ref}
            className={classNames(
                'weui-btn',
                {
                    'weui-btn_mini': size === 'mini',
                    'weui-btn_primary': type === 'primary' && !plain,
                    'weui-btn_default': type === 'default' && !plain,
                    'weui-btn_warn': type === 'warn',
                    'weui-btn_plain-primary': type === 'primary' && plain,
                    'weui-btn_plain-default': type === 'default' && plain,
                    'weui-btn_disabled': disabled && !plain,
                    'weui-btn_plain-disabled': disabled && plain
                },
                className
            )}
            type={formType !== 'buttonclick' ? formType : undefined}
            {...props}
        >
            {loading && <i className='weui-loading' />}
            {children}
        </button>
    )
}

export default forwardRef(Button)
