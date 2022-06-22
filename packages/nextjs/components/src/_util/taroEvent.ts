import React from 'react'
import {
    TaroMouseEvent,
    TaroTouchEvent,
    TaroEvent,
    TaroFocusEvent,
    TaroBlurEvent
} from './typings'

export function createTaroMouseEvent(taroEventType: string, reactEvent: React.TouchEvent): TaroMouseEvent {
    const {
        timeStamp,
        target,
        currentTarget,
        changedTouches,
        touches,
        preventDefault,
        stopPropagation
    } = reactEvent

    return {
        currentTarget,
        target,
        detail: {
            x: changedTouches[0].screenX,
            y: changedTouches[0].screenY
        },
        timeStamp,
        type: taroEventType,
        changedTouches,
        touches,
        preventDefault,
        stopPropagation
    }
}

export function createTaroTouchEvent(taroEventType: string, reactEvent: React.TouchEvent): TaroTouchEvent {
    const {
        timeStamp,
        target,
        currentTarget,
        changedTouches,
        touches,
        preventDefault,
        stopPropagation
    } = reactEvent

    return {
        currentTarget,
        target,
        detail: {},
        timeStamp,
        type: taroEventType,
        changedTouches,
        touches,
        preventDefault,
        stopPropagation
    }
}

export function createTaroEvent<D extends object>(taroEventType: string, eventTarget: EventTarget, detail: D): TaroEvent<D> {
    return {
        currentTarget: eventTarget,
        target: eventTarget,
        detail,
        timeStamp: Date.now(),
        type: taroEventType,
        preventDefault() { },
        stopPropagation() { }
    }
}

export function createTaroFocusEvent<T extends HTMLTextAreaElement | HTMLInputElement>(reactEvent: React.FocusEvent): TaroFocusEvent {
    const {
        timeStamp,
        target,
        currentTarget,
        preventDefault,
        stopPropagation
    } = reactEvent
    const el = target as T
    return {
        currentTarget,
        target,
        detail: {
            height: 0,
            value: el.value
        },
        timeStamp,
        type: 'focus',
        preventDefault,
        stopPropagation
    }
}

export function createTaroBlurEvent<T extends HTMLTextAreaElement | HTMLInputElement>(reactEvent: React.FocusEvent): TaroBlurEvent {
    const {
        timeStamp,
        target,
        currentTarget,
        preventDefault,
        stopPropagation
    } = reactEvent
    const el = target as T
    return {
        currentTarget,
        target,
        detail: {
            cursor: el.selectionEnd,
            value: el.value
        },
        timeStamp,
        type: 'blur',
        preventDefault,
        stopPropagation
    }
}
