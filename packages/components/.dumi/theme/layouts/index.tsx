import React, { useState, useEffect, useContext } from 'react'
import type { IPreviewerComponentProps } from 'dumi/theme'
import { context, getDemoUrl } from 'dumi/theme'
import type { IRouteComponentProps } from '@umijs/types'
import Device from 'dumi-theme-mobile/es/components/Device'
import { ACTIVE_MSG_TYPE } from 'dumi-theme-mobile/es/builtins/Previewer'
import 'dumi-theme-mobile/es/style/layout.less'
import Layout from '../components/layout'
import './index.scss'

const MobileLayout: React.FC<IRouteComponentProps> = ({ children, ...props }) => {
    const {
        config: { mode, exportStatic },
        demos,
        meta,
    } = useContext(context)
    const [demo, setDemo] = useState<IPreviewerComponentProps | null>(null)
    const hasMobilePreviewer = meta.hasPreviewer && meta.mobile !== false

    useEffect(() => {
        const handler = (ev: any) => {
            if (ev.data.type === ACTIVE_MSG_TYPE) {
                const data = JSON.parse(ev.data.value)

                // get auto-generated demo url if there is no custom url
                if (!data.demoUrl) {
                    data.demoUrl = getDemoUrl(data.identifier, exportStatic && exportStatic.htmlSuffix)
                }

                setDemo(data)
            }
        }

        window.addEventListener('message', handler)

        return () => window.removeEventListener('message', handler)
    }, [])

    // clear demoId when route changed
    useEffect(() => {
        setDemo(null)
    }, [props.location.pathname])

    // render toc to side menu by default
    if (hasMobilePreviewer && meta.toc !== false && meta.toc === undefined) {
        meta.toc = 'menu'
    }

    return (
        <Layout {...props}>
            <div className="__dumi-default-mobile-content">
                <article>{children}</article>
                {hasMobilePreviewer && demo?.simulator !== false && (
                    // render via builtin device simulator
                    <Device className="__dumi-default-mobile-content-device" url={demo?.demoUrl} />
                )}
                {demo?.simulator === false && (
                    // render demo directly (for custom compiletime)
                    <div className="__dumi-default-device" data-mode={mode}>
                        {React.createElement(demos[demo.identifier].component)}
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default MobileLayout
