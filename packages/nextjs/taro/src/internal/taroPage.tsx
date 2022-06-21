import {
    useRef,
    useEffect,
    createElement,
    forwardRef,
    Component,
    PureComponent,
    FC,
    FunctionComponent,
    ComponentClass
} from 'react'

let forwardRefType: Symbol | undefined

function isForwardRefTypeComponent(component) {
    if (!forwardRefType) {
        forwardRefType = forwardRef(() => null).$$typeof
    }
    return component.$$typeof === forwardRefType
}

function isClassComponent(component) {
    return typeof component === 'function' && (
        component.prototype instanceof Component ||
        component.prototype instanceof PureComponent
    )
}

/**
 * 微信小程序全局 Window 配置和页面配置的公共项目
 */
interface BaseConfig {
    /**
     * 导航栏背景颜色，HexColor
     * default: #000000
     */
    navigationBarBackgroundColor?: string
    /**
     * 导航栏标题颜色，仅支持 black/white
     * default: 'white'
     */
    navigationBarTextStyle?: 'white' | 'black'
    /**
     * 导航栏标题文字内容
     */
    navigationBarTitleText?: string
    /**
     * 导航栏样式，仅支持以下值：
     * default 默认样式
     * custom 自定义导航栏
     */
    navigationStyle?: 'default' | 'custom'
    /**
     * 窗口的背景色， HexColor
     * default: #ffffff
     */
    backgroundColor?: string
    /**
     * 下拉背景字体、loading 图的样式，仅支持 dark/light
     * default: 'dark'
     */
    backgroundTextStyle?: 'dark' | 'light'
    /**
     * 顶部窗口的背景色，仅 iOS 支持
     * default: #ffffff
     */
    backgroundColorTop?: string
    /**
     * 底部窗口的背景色，仅 iOS 支持
     * default: #ffffff
     */
    backgroundColorBottom?: string
    /**
     * 是否开启下拉刷新
     * default: false
     */
    enablePullDownRefresh?: boolean
    /**
     * 页面上拉触底事件触发时距页面底部距离，单位为px
     * default: 50
     */
    onReachBottomDistance?: number
}

interface PageConfig extends BaseConfig {
    /**
     * 设置为 true 则页面整体不能上下滚动；
     * 只在页面配置中有效，无法在 app.json 中设置该项
     * default: false
     */
    disableScroll?: boolean
    /**
     * 禁止页面右滑手势返回
     * default: false
     *
     * **注意** 自微信客户端 7.0.5 开始，页面配置中的 disableSwipeBack 属性将不再生效，
     * 详情见[右滑手势返回能力调整](https://developers.weixin.qq.com/community/develop/doc/000868190489286620a8b27f156c01)公告
     * @since 微信客户端 7.0.0
     */
    disableSwipeBack?: boolean
    /**
     * 是否启用分享给好友。
     *
     * @default false
     */
    enableShareAppMessage?: boolean
    /**
     * 是否启用分享到朋友圈。
     *
     * @default false
     */
    enableShareTimeline?: boolean
}

interface TaroPageProps {
    Page: FunctionComponent<any> | ComponentClass<any>
    pageConfig?: PageConfig
}

const TaroPage: FC<TaroPageProps> = ({Page, pageConfig, ...rest}) => {
    const ref = useRef<any | null>(null)

    // 页面配置
    useEffect(() => {
        if (!pageConfig) {
            return
        }

        const documentElement = document.documentElement
        const {backgroundColor} = pageConfig

        let originBackgroundColor: string
        if (backgroundColor) {
            originBackgroundColor = getComputedStyle(documentElement).backgroundColor
            documentElement.style.backgroundColor = backgroundColor
        }

        return () => {
            if (backgroundColor) {
                documentElement.style.backgroundColor = originBackgroundColor
            }
        }
    }, [])

    // 事件订阅
    useEffect(() => {
        if (!ref.current) {
            return
        }

        const pageInstance = ref.current

        function handleScroll() {
            const scrollingElement = document.scrollingElement || document.documentElement
            const scrollTop = scrollingElement.scrollTop
            if (typeof pageInstance.onPageScroll === 'function') {
                pageInstance.onPageScroll({scrollTop})
            }

            if (typeof pageInstance.onReachBottom === 'function') {
                const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
                const clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
                if (scrollTop >= scrollHeight - clientHeight - 60) {
                    pageInstance.onReachBottom()
                }
            }
        }

        function handleResize() {
            pageInstance.onResize()
        }

        function handleVisibilityChanged() {
            if (
                document.visibilityState === 'visible' &&
                typeof pageInstance.componentDidShow === 'function'
            ) {
                pageInstance.componentDidShow()
            } else if (
                document.visibilityState !== 'visible' &&
                typeof pageInstance.componentDidHide === 'function'
            ) {
                pageInstance.componentDidHide()
            }
        }

        if (
            typeof pageInstance.onPageScroll !== 'function' ||
            typeof pageInstance.onReachBottom !== 'function'
        ) {
            document.addEventListener('scroll', handleScroll)
        }

        if (typeof pageInstance.onResize !== 'function') {
            document.addEventListener('resize', handleResize)
        }

        if (typeof pageInstance.componentDidShow === 'function') {
            pageInstance.componentDidShow()
        }

        if (
            typeof pageInstance.componentDidShow === 'function' ||
            typeof pageInstance.componentDidHide === 'function'
        ) {
            document.addEventListener('visibilitychange', handleVisibilityChanged)
        }

        return () => {
            document.removeEventListener('scroll', handleScroll)
            document.removeEventListener('resize', handleResize)
            document.removeEventListener('visibilitychange', handleVisibilityChanged)
        }
    }, [])

    const hasRef = isForwardRefTypeComponent(Page) || isClassComponent(Page)

    return createElement(Page, {
        ref: hasRef ? ref : undefined,
        ...rest
    })
}

export default TaroPage
