/* eslint-disable react/prop-types */
import React, { memo, useMemo } from 'react'
import * as R from 'ramda'
import Head from 'next/head'
import w from 'next-page-transition'

import './app.scss'

import { slide, DIRECTIONS } from './lib/next-page-transition/slide'
import { useFoucFix } from './lib/hooks/useFoucFix' // 修复css被过早删除导致动画塌陷

const TRANSITION_TIMEOUT = 200

const wrapper = w({
    containerProps: {
        style: {
            position: 'relative',
            height: '100%'
        }
    }
})

let customRouteIndex = 0
let customRouteType = 'advance'

const PWAHead = ({ tdk }) => {
    const { title = '', description = '' } = tdk || {}
    return (
        <>
            <meta name="application-name" content="PWA App" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="default"
            />
            <meta name="apple-mobile-web-app-title" content={title} />
            <meta name="description" content={description} />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta
                name="msapplication-config"
                content="/icons/browserconfig.xml"
            />
            <meta name="msapplication-TileColor" content="#2B5797" />
            <meta name="msapplication-tap-highlight" content="no" />
            <meta name="theme-color" content="#000000" />

            <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
            <link
                rel="apple-touch-icon"
                sizes="152x152"
                href="/icons/touch-icon-ipad.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/icons/touch-icon-iphone-retina.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="167x167"
                href="/icons/touch-icon-ipad-retina.png"
            />

            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/icons/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/icons/favicon-16x16.png"
            />
            <link rel="manifest" href="/manifest.json" />
            <link
                rel="mask-icon"
                href="/icons/safari-pinned-tab.svg"
                color="#5bbad5"
            />
            <link rel="shortcut icon" href="/favicon.ico" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:url" content="https://yourdomain.com" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta
                name="twitter:image"
                content="https://yourdomain.com/icons/android-chrome-192x192.png"
            />
            <meta name="twitter:creator" content="@DavidWShadow" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content="PWA App" />
            <meta property="og:url" content="https://yourdomain.com" />
            <meta
                property="og:image"
                content="https://yourdomain.com/icons/apple-touch-icon.png"
            />
        </>
    )
}

const App = props => {
    const { Component, customRoutes, router } = props
    const { pathname } = router || {}

    const pageProps = useMemo(() => {
        if (typeof window !== 'undefined') {
            // todo：pageProps 目前通过getServerSideProps获取，单无法跨页面，暂时先用__NEXT_DATA__解决
            return window['__NEXT_DATA__'].props.pageProps
        }
        return props.pageProps
    }, [props.pageProps])

    const { tdk } = pageProps || {}
    const { title = '', description = '', keywords = '' } = tdk || {}

    useFoucFix()

    const routerType = useMemo(() => {
        const routeIndex = R.findIndex(
            R.includes(pathname),
            R.values(customRoutes)
        )
        if (routeIndex >= 0) {
            if (routeIndex > customRouteIndex) {
                customRouteType = 'advance'
            }
            if (routeIndex < customRouteIndex) {
                customRouteType = 'back'
            }
            customRouteIndex = routeIndex
        }
        return customRouteType
    }, [customRoutes, pathname])

    const Trans = useMemo(() => {
        if (routerType === 'back') {
            return wrapper(
                Component,
                slide(TRANSITION_TIMEOUT, DIRECTIONS.LEFT)
            )
        }
        if (routerType === 'advance') {
            return wrapper(
                Component,
                slide(TRANSITION_TIMEOUT, DIRECTIONS.RIGHT)
            )
        }
        const TransComponent = ({ pageProps }) => (
            <Component {...pageProps}></Component>
        )
        return TransComponent
    }, [routerType, Component])

    return (
        <>
            <Head>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />
                <meta name="360-fullscreen" content="true" />

                <meta name="full-screen" content="yes" />
                <meta name="x5-fullscreen" content="true" />
                <meta name="browsermode" content="application" />
                <meta name="x5-page-mode" content="app" />
                <meta content="telephone=no" name="format-detection" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <PWAHead {...tdk} />
                <title>{title}</title>
            </Head>

            <Trans
                {...{
                    pageProps: {
                        pageProps,
                        router,
                        routerType,
                        customRoutes
                    }
                }}
            />
        </>
    )
}

export default memo(App)
