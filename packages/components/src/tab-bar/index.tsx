import React, { useState, useEffect, useMemo } from 'react'
import bridge, { PagePathChangeListener } from '../_util/bridge'
import { ensureLeadingSlash } from '../_util/url'
import uniqueId from '../_util/uniqueId'
import Navigator from '../navigator'

interface TabBarItem {
    /**
     * 页面路径，必须在 pages 中先定义
     */
    pagePath: string

    /**
     * tab 上按钮文字
     */
    text: string

    /**
     * 图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px，不支持网络图片。
     * 当 position 为 top 时，不显示 icon。
     */
    iconPath?: string

    /**
     * 选中时的图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px，不支持网络图片。
     * 当 position 为 top 时，不显示 icon。
     */
    selectedIconPath?: string
}

export interface TabBarProps {
    /**
     * tab 上的文字默认颜色，仅支持十六进制颜色
     */
    color: string

    /**
     * tab 上的文字选中时的颜色，仅支持十六进制颜色
     */
    selectedColor: string

    /**
     * tab 的背景色，仅支持十六进制颜色
     */
    backgroundColor: string

    /**
     * tabbar 上边框的颜色， 仅支持 black / white
     * @default "black"
     */
    borderStyle?: 'black' | 'white'

    /**
     * tab 的列表，详见 list 属性说明，最少 2 个、最多 5 个 tab
     */
    list: TabBarItem[]
}

const TabBar: React.FC<TabBarProps> = ({color, backgroundColor, borderStyle = 'black', selectedColor, list: originList}) => {
    const [currentPagePath, setCurrentPagePath] = useState<string | undefined>()

    useEffect(() => {
        setCurrentPagePath(bridge.getCurrentPagePath())

        const handlePagePathChange: PagePathChangeListener = path => {
            setCurrentPagePath(path)
        }
        bridge.onPagePathChange(handlePagePathChange)

        return () => {
            bridge.offPagePathChange(handlePagePathChange)
        }
    }, [])

    const list = useMemo(() => originList.map(({pagePath, ...rest}) => ({
        ...rest,
        pagePath: ensureLeadingSlash(pagePath),
        key: uniqueId()
    })), [originList])

    if (list.length < 2) {
        return null
    }

    return (
        <div
            className='taro-tab-bar'
            style={{
                color,
                backgroundColor,
                borderColor: borderStyle
            }}
        >
            {list.slice(0, 5).map(({key, pagePath, text, iconPath, selectedIconPath}) => {
                const selected = currentPagePath === pagePath

                return (
                    <Navigator
                        key={key}
                        className='taro-tab-bar__item'
                        style={{
                            color: selected ? selectedColor : color
                        }}
                        openType='navigate'
                        url={pagePath}
                    >
                        <div
                            className='taro-tab-bar__icon'
                            style={{
                                backgroundImage: `url(${selected ? iconPath : selectedIconPath})`
                            }}
                        />
                        <div className='taro-tab-bar__text'>{text}</div>
                    </Navigator>
                )
            })}
        </div>
    )
}

export default TabBar
