import React, {forwardRef} from 'react'
import classNames from 'classnames'
import type {TaroEventHandler, TaroEvent, TaroHoverableProps} from '../_util/typings'
import useTaroHoverableEvents from '../_util/hooks/useTaroHoverableEvents'

interface NavigatorProps extends TaroHoverableProps {
    /**
     * 在哪个目标上发生跳转，默认当前小程序
     * @default "self"
     * @unsupported
     */
    target?: 'self' | 'miniProgram'

    /**
     * 应用内的跳转链接
     */
    url?: string

    /**
     * 跳转方式
     * @default "navigate"
     */
    openType?: 'navigate' | 'redirect' | 'switchTab' | 'navigateBack' | 'reLaunch' | 'exit'

    /**
     * 当 open-type 为 navigateBack 时有效，表示回退的层数
     * @todo
     */
    delta?: number

    /**
     * 当 target="miniProgram" 时有效，要打开的小程序 App Key
     * @unsupported
     */
    appId?: string

    /**
     * 当 target="miniProgram" 时有效，打开的页面路径，如果为空则打开首页
     * @unsupported
     */
    path?: string

    /**
     * 当target="miniProgram"时有效，需要传递给目标小程序的数据，目标小程序可在 App.onLaunch、App.onShow 中获取到这份数据
     * @unsupported
     */
    extraData?: object

    /**
     * 当target="miniProgram"时有效，要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版），
     * 仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是正式版，则打开的小程序必定是正式版。
     * @default "release"
     * @unsupported
     */
    version?: 'develop' | 'trial' | 'release'

    /**
     * 导航内容
     */
    children?: React.ReactNode

    /**
     * 当target="miniProgram"时有效，跳转小程序成功时触发 success 事件,event.detail = {errMsg: errMsg}
     * @unsupported
     */
    onSuccess?: TaroEventHandler<TaroEvent<{errMsg: string}>>

    /**
     * 当target="miniProgram"时有效，跳转小程序失败时触发 fail 事件，event.detail 同上
     */
    onFail?: TaroEventHandler<TaroEvent<{errMsg: string}>>
}

type CustomRoutes = Record<string, string>

type navigateToType = (param?: any) => void

type navigateBackType = (param?: any) => void

interface NavigatorOptions {
    customRoutes: CustomRoutes
    navigateTo: navigateToType
    navigateBack: navigateBackType
}

let customRoutes: CustomRoutes = {}

let navigateTo: navigateToType | null = null

let navigateBack: navigateBackType | null = null

export function initNavigatorComponent(opts: NavigatorOptions) {
    customRoutes = opts.customRoutes
    navigateTo = opts.navigateTo
}

function isAbsoluteUrl(url?: string): boolean {
    if (!url) {
        return false;
    }
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

const Navigator: React.ForwardRefRenderFunction<HTMLAnchorElement, NavigatorProps> = ({
    target = 'self',
    url: originUrl,
    openType = 'navigate',
    delta,
    appId,
    path,
    extraData,
    version,
    children,
    onSuccess,
    onFail,
    ...rest
}, ref) => {
    const props = useTaroHoverableEvents(rest, 'navigator-hover')

    let targetUrl = originUrl
    if (!isAbsoluteUrl(originUrl)) {
        const urlObj = new URL(originUrl, 'http://0.0.0.0')
        const customRoute = customRoutes[urlObj.pathname]
        if (customRoute) {
            urlObj.pathname = customRoute
        }
        targetUrl = urlObj.pathname + urlObj.search + urlObj.hash
    }

    return (
        <a
            {...props}
            ref={ref}
            className={classNames('taro-nav', props.className)}
            href={targetUrl}
            onClick={event => {
                event.preventDefault()
                if (target === 'self') {
                    if (openType === 'navigate') {
                        navigateTo?.({url: targetUrl})
                    } else if (openType === 'navigateBack') {
                        navigateBack?.()
                    }
                }
            }}
        >
            {children}
        </a>
    )
}

export default forwardRef(Navigator)
