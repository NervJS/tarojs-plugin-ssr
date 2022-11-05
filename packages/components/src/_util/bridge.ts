/**
 * 配置自定义路由
 * here：https://taro-docs.jd.com/docs/config-detail#h5routercustomroutes
 */
type CustomRoutesType = Record<string, string | string[]>

export namespace navigateTo {
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
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = () => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}

type NavigateToType = (param: navigateTo.Param) => void

export namespace navigateBack {
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
    export type ParamPropSuccess = () => void
    /**
     * 接口调用失败的回调函数
     */
    export type ParamPropFail = () => void
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    export type ParamPropComplete = () => void
}

type NavigateBackType = (param?: navigateBack.Param) => void

interface BridgeConfig {
    customRoutes: CustomRoutesType
    navigateTo: NavigateToType
    navigateBack: NavigateBackType
}

class Bridge {
    private _config?: BridgeConfig

    setConfig(config: BridgeConfig) {
        this._config = config
    }

    _guard = (): BridgeConfig => {
        if (!this._config) {
            throw new Error('Bridge config is required.')
        }
        return this._config
    }

    get customRoutes(): CustomRoutesType {
        return this._guard().customRoutes
    }

    navigateTo: NavigateToType = (...args) => {
        return this._guard().navigateTo(...args)
    }

    navigateBack: NavigateBackType = (...args) => {
        return this._guard().navigateBack(...args)
    }
}

export default new Bridge()
