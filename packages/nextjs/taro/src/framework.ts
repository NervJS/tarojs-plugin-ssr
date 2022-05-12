import {ReactElement} from 'react'
import Router from 'next/router'
import {getTaroApp} from './internal'
import type {TaroPage, TaroRouter} from './typings'

interface TaroInstance {
    router: TaroRouter
}

interface Meta {
    type: 'class' | 'func',
    component: ReactElement
}

/**
 * 在类组件中，从属性中获取 Next.js 的路由对象。
 */
export function getCurrentInstance(meta?: Meta): TaroInstance {
    const instance = {
        router: {}
    } as TaroInstance

    if (!meta) {
        if (typeof window === 'undefined') {
            throw new Error('`getCurrentInstance()` should be called in component scope!')
        }

        Object.defineProperty(instance.router, 'params', {
            get() {
                const nextRouter = Router.router
                if (!nextRouter) {
                    throw new Error('Next.js router is not initialized!')
                }
                return Object.keys(nextRouter.query).reduce((result, key) => {
                    const value = nextRouter.query[key]
                    if (typeof value === 'string') {
                        result[key] = value
                    }
                    return result
                }, {} as Record<string, string>)
            }
        })

        Object.defineProperty(instance.router, 'path', {
            get() {
                const nextRouter = Router.router
                if (!nextRouter) {
                    throw new Error('Next.js router is not initialized!')
                }
                return nextRouter.pathname
            }
        })

        return instance
    }

    if (meta.type === 'class') {
        if (!meta.component) {
            throw new Error('`getCurrentInstance()` cannot get component instance!')
        }

        if (!meta.component.props.router) {
            throw new Error('`getCurrentInstance()` cannot get Next.js router in props!')
        }

        Object.defineProperty(instance.router, 'params', {
            get() {
                const nextRouter = meta.component.props.router
                if (!nextRouter) {
                    throw new Error('Next.js router is not initialized!')
                }
                return Object.keys(nextRouter.query).reduce((result, key) => {
                    const value = nextRouter.query[key]
                    if (typeof value === 'string') {
                        result[key] = value
                    }
                    return result
                }, {} as Record<string, string>)
            }
        })
    
        Object.defineProperty(instance.router, 'pathname', {
            get() {
                const nextRouter = meta.component.props.router
                if (!nextRouter) {
                    throw new Error('Next.js router is not initialized!')
                }
                return nextRouter.pathname
            }
        })

        return instance
    }
    
    throw new Error('`getCurrentInstance()` cannot called in function component currently!')
}

export function getCurrentPages(): TaroPage[] {
    const taroApp = getTaroApp()
    return taroApp.getCurrentPages()
}

export enum ENV_TYPE {
    WEB = 'WEB'
}

export function getEnv(): ENV_TYPE {
    return ENV_TYPE.WEB
}

let designWidth: number | undefined

interface PxTransformOptions {
    designWidth: number
}

export function initPxTransform(options: PxTransformOptions): void {
    designWidth = options.designWidth
}

export function pxTransform(size: number): string {
    if (designWidth == null) {
        throw new Error('`designWidth` is not initialized')
    }

    return Math.ceil((((size / 40) * 640) / designWidth) * 10000) / 10000 + 'rem'
}
