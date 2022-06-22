import React from 'react'
import {TaroMouseEvent, TaroTouchEvent, TaroEvent} from './typings'

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
        preventDefault() {},
        stopPropagation() {}
    }
}
