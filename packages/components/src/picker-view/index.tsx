import React from 'react'
import type {
    TaroBaseProps,
    TaroPickerViewEventHandler
} from '../_util/typings'
import useTaroBaseEvents from '../_util/hooks/useTaroBaseEvents'
import toArray from '../_util/children/toArray'
import Wheel from './wheel'

const classPrefix = 'taro-picker-view'

interface PickerViewProps extends TaroBaseProps {
    /**
     * 数组中的数字依次表示 picker-view 内的 picker-view-colume 选择的第几项（下标从 0 开始），数字大于 picker-view-column 可选项长度时，选择最后一项
     * @default []
     */
    value?: number[]

    /**
     * 设置选择器中间选中框的样式
     */
    indicatorStyle?: string

    /**
     * 设置选择器中间选中框的类名
     */
    indicatorClass?: string

    /**
     * 设置蒙层的样式
     */
    maskStyle?: string

    /**
     * 设置蒙层的类名
     */
    maskClass?: string

    /**
     * 选择器标题，建议标题控制在 12 个中文汉字长度内，避免出现截断现象, 截断部分将以 ... 形式展示
     */
    title?: string

    /**
     * 子项目
     */
    children?: React.ReactNode

    /**
     * 当滚动选择，value 改变时触发 change 事件，event.detail = {value: value};value 为数组，表示 picker-view 内的 picker-view-column 当前选择的是第几项（下标从 0 开始）
     */
    onChange?: TaroPickerViewEventHandler
}

const PickerView: React.FC<PickerViewProps> = ({
    value,
    indicatorStyle,
    indicatorClass,
    maskStyle,
    maskClass,
    title,
    children,
    onChange,
    ...rest
}) => {
    const props = useTaroBaseEvents(rest)
    
    const columns = toArray(children)

    return (
        <div
            className={classPrefix}
            {...props}
        >
            {!!title && <div className={`${classPrefix}_title`}>{title}</div>}
            <div className={`${classPrefix}_wrapper`}>
                {columns.map((column, index) => (
                    <Wheel
                        key={index}
                        onSelect={() => {}}
                    >
                        {column.props.children}
                    </Wheel>
                ))}
            </div>
        </div>
    )
}

export default PickerView
