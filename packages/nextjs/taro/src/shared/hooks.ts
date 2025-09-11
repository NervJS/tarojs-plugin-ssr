import { Events } from "./event-emitter"
import { isFunction } from './is'

// Note: @tarojs/runtime 不依赖 @tarojs/taro, 所以不能改为从 @tarojs/taro 引入 (可能导致循环依赖)
type TFunc = (...args: any[]) => any

export enum HOOK_TYPE {
  SINGLE,
  MULTI,
  WATERFALL
}

interface Hook {
  type: HOOK_TYPE
  initial?: TFunc | null
}

interface Node {
  next: Node
  context?: any
  callback?: TFunc
}

export function TaroHook (type: HOOK_TYPE, initial?: TFunc): Hook {
  return {
    type,
    initial: initial || null
  }
}

export class TaroHooks<T extends Record<string, TFunc> = any> extends Events {
  hooks: Record<keyof T, Hook>

  constructor (hooks: Record<keyof T, Hook>, opts?) {
    super(opts)
    this.hooks = hooks
    for (const hookName in hooks) {
      const { initial } = hooks[hookName]
      if (isFunction(initial)) {
        this.on(hookName, initial)
      }
    }
  }

  private tapOneOrMany<K extends Extract<keyof T, string>> (hookName: K, callback: T[K] | T[K][]) {
    const list = isFunction(callback) ? [callback] : callback
    list.forEach(cb => this.on(hookName, cb))
  }

  tap<K extends Extract<keyof T, string>> (hookName: K, callback: T[K] | T[K][]) {
    const hooks = this.hooks
    const { type, initial } = hooks[hookName]
    if (type === HOOK_TYPE.SINGLE) {
      this.off(hookName)
      this.on(hookName, isFunction(callback) ? callback : callback[callback.length - 1])
    } else {
      initial && this.off(hookName, initial)
      this.tapOneOrMany(hookName, callback)
    }
  }

  call<K extends Extract<keyof T, string>> (hookName: K, ...rest: Parameters<T[K]>): ReturnType<T[K]> | undefined {
    const hook = this.hooks[hookName]
    if (!hook) return

    const { type } = hook

    const calls = this.callbacks
    if (!calls) return

    const list = calls[hookName] as { tail: Node, next: Node }

    if (list) {
      const tail = list.tail
      let node: Node = list.next
      let args = rest
      let res

      while (node !== tail) {
        res = node.callback?.apply(node.context || this, args)
        if (type === HOOK_TYPE.WATERFALL) {
          const params: any = [res]
          args = params
        }
        node = node.next
      }
      return res
    }
  }

  isExist (hookName: string) {
    return Boolean(this.callbacks?.[hookName])
  }
}

type ITaroHooks = {
    getEventCenter: (EventsClass: typeof Events) => Events
}

export const hooks = new TaroHooks<ITaroHooks>({
    getEventCenter: TaroHook(HOOK_TYPE.SINGLE, Events => new Events())
})