export const requestIdleCallback = globalThis.requestIdleCallback
    || function (cb: IdleRequestCallback): number {
        const start = Date.now()
        return setTimeout(function () {
            cb({
                didTimeout: false,
                timeRemaining: function () {
                    return Math.max(0, 50 - (Date.now() - start))
                },
            })
        }, 1) as any as number
    }

export const cancelIdleCallback = self.cancelIdleCallback
    || function (id: number) {
        return clearTimeout(id)
    }
