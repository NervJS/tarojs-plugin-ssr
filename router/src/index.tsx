import {forwardRef, ForwardRefExoticComponent, ComponentClass} from 'react'
import {useRouter} from 'next/router'

export function withRouter(
    ComposedComponent: ComponentClass
): ForwardRefExoticComponent<any> {
    const WithRouterWrapper = forwardRef<ComponentClass, any>((props, ref) => {
        const router = useRouter()
        return <ComposedComponent ref={ref} router={router} {...props} />
    })

    if (process.env.NODE_ENV !== 'production') {
        const name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown'
        WithRouterWrapper.displayName = `withRouter(${name})`
    }

    return WithRouterWrapper
}
