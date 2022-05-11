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


interface TaroPageProps {
    Page: FunctionComponent<any> | ComponentClass<any>
}

const TaroPage: FC<TaroPageProps> = ({Page, ...rest}) => {
    const ref = useRef<any | null>(null)

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
