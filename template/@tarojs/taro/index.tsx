import type {NextRouter} from 'next/router';

interface TaroRouter {
    params: Record<string, string>
    path: string
}

interface TaroInstance {
    router: TaroRouter | null
}

function getCurrentInstance(nextRouter?: NextRouter): TaroInstance {
    if (typeof window !== 'undefined') {
        const obj = new URLSearchParams(location.search)
        const params: Record<string, string> = Array.from(obj.entries())
            .reduce((result, [key, value]) => {
                result[key] = value
                return result
            }, {} as Record<string, string>)

        return {
            router: {
                params,
                path: location.pathname
            }
        }
    }

    if (nextRouter) {
        let params: Record<string, string> = {}
        if (nextRouter.query) {
            params = Object.keys(nextRouter.query).reduce((result, key) => {
                const value = nextRouter.query[key]
                if (typeof value === 'string') {
                    result[key] = value
                }
                return result
            }, {} as Record<string, string>)
        }

        return {
            router: {
                params,
                path: nextRouter.pathname
            }
        }
    }

    throw new Error('An error occurred while calling `getCurrentInstance`')
}

function navigateBack() {
    console.log('TODO: navigateBack')
}

function getStorageSync(key: string): any | undefined {
    console.log('TODO: getStorageSync')
}

export default {
    getCurrentInstance,
    navigateBack,

    getStorageSync
}
