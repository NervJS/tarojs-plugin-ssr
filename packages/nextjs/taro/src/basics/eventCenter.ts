/**
 * Taro事件中心代理类
 * 实现客户端懒加载@tarojs/runtime中的eventCenter
 * 解决从@tarojs/taro导入的eventCenter为空的问题
 */
import promisify from 'mpromisify'
import { limited } from '../_util'

// 单例实例
let instance: EventCenterProxy

interface EventCenterProxy {
    ready: boolean
    eventCenter: any
    pendingCalls: any[]
}

class EventCenterProxy {
    constructor() {
        if (instance) {
            return instance
        }

        this.ready = false
        this.eventCenter = null
        this.pendingCalls = []
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        instance = this
    }

    // 获取单例实例
    static getInstance() {
        if (!instance) {
            instance = new EventCenterProxy()
        }
        return instance
    }

    // 加载真实eventCenter
    async loadEventCenter() {
        try {
            const { eventCenter } = await import('@tarojs/runtime')
            this.eventCenter = eventCenter
            this.ready = true

            // 执行所有待处理的调用
            this.pendingCalls.forEach(({ method, args, resolve }) => {
                resolve(this.eventCenter[method](...args))
            })
            this.pendingCalls = []
        } catch (error) {
            console.error('加载eventCenter失败:', error)
            // 失败时也执行待处理调用，避免阻塞
            this.pendingCalls.forEach(({ reject }) => reject(error))
            this.pendingCalls = []
        }
    }

    // 创建代理方法
    createProxyMethod(method) {
        return (...args) => {
            if (this.ready) {
                return this.eventCenter[method](...args)
            }

            return new Promise((resolve, reject) => {
                this.pendingCalls.push({ method, args, resolve, reject })
                const loadEventCenter = promisify(
                    limited.async('loadEventCenter', this.loadEventCenter)
                )
                loadEventCenter() // 触发加载
            })
        }
    }

    // 代理方法
    on = this.createProxyMethod('on')
    off = this.createProxyMethod('off')
    trigger = this.createProxyMethod('trigger')
    once = this.createProxyMethod('once')
}

// 导出代理类和单例实例
export const eventCenter = EventCenterProxy.getInstance()
