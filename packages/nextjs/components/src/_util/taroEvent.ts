import React from 'react'
import {TaroMouseEvent, TaroTouchEvent} from './typings'

export function createTaroMouseEvent(taroEventType: string, reactEvent: React.TouchEvent): TaroMouseEvent {
    const {
        timeStamp,
        target,
        currentTarget,
        changedTouches,
        touches
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
        touches
    }
}

export function createTaroTouchEvent(taroEventType: string, reactEvent: React.TouchEvent): TaroTouchEvent {
    const {
        timeStamp,
        target,
        currentTarget,
        changedTouches,
        touches
    } = reactEvent

    return {
        currentTarget,
        target,
        detail: {},
        timeStamp,
        type: taroEventType,
        changedTouches,
        touches
    }
}
