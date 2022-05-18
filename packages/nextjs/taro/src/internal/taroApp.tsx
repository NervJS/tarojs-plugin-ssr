import Router from 'next/router'
import swan from '../swan'
import type {TaroPage, CustomRoutes} from '../typings'

function isAbsoluteUrl(url?: string): boolean {
    if (!url) {
        return false;
    }
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
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
    }

    getCurrentPages = (): TaroPage[] => {
        if (typeof window === 'undefined') {
            throw new Error('`getCurrentPages` cannot called on server-side!')
        }
        return this.pageStack
    }

    navigateTo = ({url, success, fail, complete}: swan.navigateTo.Param): void => {
        if (typeof window === 'undefined') {
            throw new Error('`navigateTo` cannot called on server-side!')
        }

        if (!Router.router) {
            fail()
            complete()
            return
        }

        const base = isAbsoluteUrl(url) ?  undefined : location.origin
        const urlObj = new URL(url, base)
    
        const customRoute = this.customRoutes[urlObj.pathname]
        if (customRoute) {
            urlObj.pathname = customRoute
        }

        Router.router.push(urlObj.toString())
            .then(() => {
                const page: TaroPage = {
                    route: urlObj.pathname
                }
                this.pageStack.push(page)
                success()
            })
            .catch(fail)
            .finally(complete)
    }

    navigateBack = ({success, fail, complete}: swan.navigateBack.Param): void => {
        if (typeof window === 'undefined') {
            throw new Error('`navigateBack` cannot called on server-side!')
        }

        if (!Router.router) {
            fail()
            complete()
            return
        }

        // Next.js internal router apis aren't support to go back twice or many times.
        // https://github.com/vercel/next.js/discussions/18333
        Router.router.back()
        this.pageStack.pop()
        success()
        complete()
    }

    redirectTo = ({url, complete, fail, success}: swan.redirectTo.Param): void => {
        if (typeof window === 'undefined') {
            throw new Error('`redirectTo` cannot called on server-side!')
        }

        if (!Router.router) {
            fail()
            complete()
            return
        }

        const base = isAbsoluteUrl(url) ?  undefined : location.origin
        const urlObj = new URL(url, base)
    
        const customRoute = this.customRoutes[urlObj.pathname]
        if (customRoute) {
            urlObj.pathname = customRoute
        }
    
        Router.router.push(urlObj.toString())
            .then(() => {
                const page: TaroPage = {
                    route: urlObj.pathname
                }
                this.pageStack.pop()
                this.pageStack.push(page)
                success()
            })
            .catch(fail)
            .finally(complete)
    }

    reLaunch = ({url, complete, fail, success}: swan.reLaunch.Param): void => {
        if (typeof window === 'undefined') {
            throw new Error('`reLaunch` cannot called on server-side!')
        }

        if (!Router.router) {
            fail()
            complete()
            return
        }

        const base = isAbsoluteUrl(url) ?  undefined : location.origin
        const urlObj = new URL(url, base)
    
        const customRoute = this.customRoutes[urlObj.pathname]
        if (customRoute) {
            urlObj.pathname = customRoute
        }
    
        Router.router.push(urlObj.toString())
            .then(() => {
                const page: TaroPage = {
                    route: urlObj.pathname
                }
                this.pageStack = [page]
                success()
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
