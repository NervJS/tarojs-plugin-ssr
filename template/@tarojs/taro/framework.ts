import type {NextRouter} from 'next/router';

interface TaroRouter {
    params: Record<string, string>
    path: string
}

interface TaroInstance {
    router: TaroRouter | null
}

export function getCurrentInstance(nextRouter?: NextRouter): TaroInstance {
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

    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    console.error('`getCurrentInstance` should be in class component when it is called on server!')

    return {
        router: {
            params: {},
            path: ''
        }
    }
}

interface TaroPage {
    route: string
}

export function getCurrentPages(): TaroPage[] {
    return []
}

export enum ENV_TYPE {
    WEB = 'WEB'
}

export function getEnv(): ENV_TYPE {
    return ENV_TYPE.WEB
}
