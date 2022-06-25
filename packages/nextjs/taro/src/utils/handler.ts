type TCallbackManagerParam = (...arr: unknown[]) => void
interface ICallbackManagerOption {
    callback?: TCallbackManagerParam
    ctx?: any
    [key: string]: unknown
}
type TCallbackManagerListItem = (TCallbackManagerParam | ICallbackManagerOption)
type TCallbackManagerList = TCallbackManagerListItem[]

export class CallbackManager {
    callbacks: TCallbackManagerList = []

    /**
     * 添加回调
     * @param {{ callback: function, ctx: any } | function} opt
     */
    add = (opt?: TCallbackManagerListItem) => {
        if (opt) this.callbacks.push(opt)
    }

    /**
     * 移除回调
     * @param {{ callback: function, ctx: any } | function} opt
     */
    remove = (opt?: TCallbackManagerListItem) => {
        if (opt) {
            let pos = -1
            this.callbacks.forEach((callback, k) => {
                if (callback === opt) {
                    pos = k
                }
            })
            if (pos > -1) {
                this.callbacks.splice(pos, 1)
            }
        }
    }

    /**
     * 获取回调函数数量
     * @return {number}
     */
    count = () => {
        return this.callbacks.length
    }

    /**
     * 触发回调
     * @param  {...any} args 回调的调用参数
     */
    trigger = (...args: TCallbackManagerList) => {
        this.callbacks.forEach(opt => {
            if (typeof opt === 'function') {
                opt(...args)
            } else {
                const { callback, ctx } = opt
                typeof callback === 'function' && callback.call(ctx, ...args)
            }
        })
    }
}
