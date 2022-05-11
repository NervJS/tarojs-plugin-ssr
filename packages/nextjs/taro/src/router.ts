import Router from 'next/router'

let customRoutes: Record<string, string> = {}

/**
 * 内部方法，由插件调用
 */
export function setCustomRoutes(routes: Record<string, string> = {}) {
    customRoutes = routes
}

export function switchTab() {
}

export function reLaunch() {
}

export function redirectTo({url, complete, fail, success}): void {
    return navigateTo({
        url,
        complete,
        fail,
        success
    })
}

namespace navigateTo {
    export type Param = {
        /**
         * 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用`?`分隔，参数键与参数值用`=`相连，不同参数用`&`分隔；如 'path?key=value&key2=value2'
         */
        url: string
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}

export function isAbsoluteUrl(url?: string): boolean {
    if (!url) {
        return false;
    }
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

export function navigateTo({url, success, fail, complete}: navigateTo.Param): void {
    const base = isAbsoluteUrl(url) ?  undefined : location.origin
    const urlObj = new URL(url, base)

    const customRoute = customRoutes[urlObj.pathname]
    if (customRoute) {
        urlObj.pathname = customRoute
    }

    Router.router?.push(urlObj.toString())
        .then(success)
        .catch(fail)
        .finally(complete)
}

namespace navigateBack {
    export type Param = {
        /**
         * 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
         *
         * @default 1
         */
        delta?: number
        /**
         * 接口调用成功的回调函数
         */
        success?: ParamPropSuccess
        /**
         * 接口调用失败的回调函数
         */
        fail?: ParamPropFail
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ParamPropComplete
    }
    /**
     * 接口调用成功的回调函数
     */
    export type ParamPropSuccess = (res: any) => any
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = (err: any) => any
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => any
}

export function navigateBack(): void {
    // Next.js internal router apis aren't support to go back twice or many times.
    // https://github.com/vercel/next.js/discussions/18333
    Router.router?.back()
}
