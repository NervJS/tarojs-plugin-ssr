export const requestIdleCallback = (typeof globalThis !== 'undefined') && globalThis.requestIdleCallback
    || function (cb: IdleRequestCallback): number {
        const start = Date.now()
        return setTimeout(function () {
            cb({
                didTimeout: false,
                timeRemaining: function () {
                    return Math.max(0, 50 - (Date.now() - start))
                }
            })
        }, 1) as unknown as number
    }

export const cancelIdleCallback = (typeof globalThis !== 'undefined') && globalThis.cancelIdleCallback
    || function (id: number) {
        return clearTimeout(id)
    }
