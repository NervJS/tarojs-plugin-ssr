import Router from 'next/router'
import { limited } from '../_util'
import type * as swan from '../swan'
import type { TaroPage, CustomRoutes } from '../_util/typings'

function isAbsoluteUrl(url?: string): boolean {
    if (!url) {
        return false
    }
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
}

class TaroApp {
    pageStack: TaroPage[] = []

    customRoutes: CustomRoutes

    constructor(customRoutes: CustomRoutes) {
        this.customRoutes = customRoutes

        if (typeof window === 'undefined') {
            return
        }
        const page: TaroPage = {
            route: location.pathname
        }
        this.pageStack.push(page)

        this.getCurrentPages = limited.never(
            'getCurrentPages',
            this.getCurrentPages
        )
        this.navigateTo = limited.async('navigateTo', this.navigateTo)
        this.navigateBack = limited.async('navigateBack', this.navigateBack)
        this.redirectTo = limited.async('redirectTo', this.redirectTo)
        this.reLaunch = limited.async('reLaunch', this.reLaunch)
    }

    getCurrentPages = (): TaroPage[] => {
        return this.pageStack
    }

    navigateTo: typeof swan.navigateTo = ({ url, success, fail, complete }) => {
        if (!Router.router) {
            fail?.()
            complete?.()
            return
        }

        // Safari 14 and below throw an error when the base parameter is undefined
        // https://bugs.webkit.org/show_bug.cgi?id=216841
        const base = isAbsoluteUrl(url) ? undefined : location.origin
        const urlObj = base ? new URL(url, base) : new URL(url)

        let target = url
        if (!isAbsoluteUrl(url)) {
            const customRoute = this.customRoutes[urlObj.pathname]
            if (customRoute) {
                // 兼容多路由的情况
                if (Array.isArray(customRoute)) {
                    urlObj.pathname = customRoute[0]
                } else {
                    urlObj.pathname = customRoute
                }
            }
            target = urlObj.pathname + urlObj.search + urlObj.hash
        }

        Router.router
            .push(target)
            .then(() => {
                const page: TaroPage = {
                    route: urlObj.pathname
                }
                this.pageStack.push(page)
                success?.()
            })
            .catch(fail)
            .finally(complete)
    }

    navigateBack: typeof swan.navigateBack = ({ success, fail, complete }) => {
        if (!Router.router) {
            fail?.()
            complete?.()
            return
        }

        // Next.js internal router apis aren't support to go back twice or many times.
        // https://github.com/vercel/next.js/discussions/18333
        Router.router.back()
        this.pageStack.pop()
        success?.()
        complete?.()
    }

    redirectTo: typeof swan.redirectTo = ({ url, complete, fail, success }) => {
        if (!Router.router) {
            fail?.()
            complete?.()
            return
        }

        const base = isAbsoluteUrl(url) ? undefined : location.origin
        const urlObj = base ? new URL(url, base) : new URL(url)

        const customRoute = this.customRoutes[urlObj.pathname]
        if (customRoute) {
            // 兼容多路由的情况
            if (Array.isArray(customRoute)) {
                urlObj.pathname = customRoute[0]
            } else {
                urlObj.pathname = customRoute
            }
        }

        Router.router
            .push(urlObj.toString())
            .then(() => {
                const page: TaroPage = {
                    route: urlObj.pathname
                }
                this.pageStack.pop()
                this.pageStack.push(page)
                success?.()
            })
            .catch(fail)
            .finally(complete)
    }

    reLaunch: typeof swan.reLaunch = ({ url, complete, fail, success }) => {
        if (!Router.router) {
            fail?.()
            complete?.()
            return
        }

        const base = isAbsoluteUrl(url) ? undefined : location.origin
        const urlObj = base ? new URL(url, base) : new URL(url)

        const customRoute = this.customRoutes[urlObj.pathname]
        if (customRoute) {
            // 兼容多路由的情况
            if (Array.isArray(customRoute)) {
                urlObj.pathname = customRoute[0]
            } else {
                urlObj.pathname = customRoute
            }
        }

        Router.router
            .push(urlObj.toString())
            .then(() => {
                const page: TaroPage = {
                    route: urlObj.pathname
                }
                this.pageStack = [page]
                success?.()
            })
            .catch(fail)
            .finally(complete)
    }
}

let taroAppInstance: TaroApp

export function initTaroApp(customRoutes: CustomRoutes) {
    taroAppInstance = new TaroApp(customRoutes)
}

export function getTaroApp(): TaroApp {
    return taroAppInstance
}
