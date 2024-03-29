import React from 'react'
import Swiper from 'swiper'
import {
    TaroMouseEvent,
    TaroTouchEvent,
    TaroEvent,
    TaroFocusEvent,
    TaroBlurEvent,
    TaroConfirmEvent,
    TaroVideoEvent,
    TaroSwitchEvent,
    TaroSwiperEvent,
    TaroPickerViewEvent,
    TaroFormSubmitEvent
} from './typings'

export function createTaroMouseEvent(taroEventType: string, reactEvent: React.TouchEvent | React.MouseEvent): TaroMouseEvent {
    const {
        timeStamp,
        target,
        currentTarget
    } = reactEvent

    const changedTouches = 'changedTouches' in reactEvent
        ? reactEvent.changedTouches
        : [reactEvent] as unknown as React.TouchList

    const touches = 'touches' in reactEvent
        ? reactEvent.touches
        : [reactEvent] as unknown as React.TouchList

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
        preventDefault: () => reactEvent.preventDefault(),
        stopPropagation: () => reactEvent.stopPropagation()
    }
}

export function createTaroTouchEvent(taroEventType: string, reactEvent: React.TouchEvent | React.MouseEvent): TaroTouchEvent {
    const {
        timeStamp,
        target,
        currentTarget
    } = reactEvent

    const changedTouches = 'changedTouches' in reactEvent
        ? reactEvent.changedTouches
        : [reactEvent] as unknown as React.TouchList

    const touches = 'touches' in reactEvent
        ? reactEvent.touches
        : [reactEvent] as unknown as React.TouchList

    return {
        currentTarget,
        target,
        detail: {},
        timeStamp,
        type: taroEventType,
        changedTouches,
        touches,
        preventDefault: () => reactEvent.preventDefault(),
        stopPropagation: () => reactEvent.stopPropagation()
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
        currentTarget
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
        preventDefault: () => reactEvent.preventDefault(),
        stopPropagation: () => reactEvent.stopPropagation()
    }
}

export function createTaroBlurEvent<T extends HTMLTextAreaElement | HTMLInputElement>(reactEvent: React.FocusEvent): TaroBlurEvent {
    const {
        timeStamp,
        target,
        currentTarget
    } = reactEvent
    const el = target as T
    return {
        currentTarget,
        target,
        detail: {
            cursor: el.selectionEnd || 0,
            value: el.value
        },
        timeStamp,
        type: 'blur',
        preventDefault: () => reactEvent.preventDefault(),
        stopPropagation: () => reactEvent.stopPropagation()
    }
}

export function createTaroConfirmEvent<T extends HTMLTextAreaElement | HTMLInputElement>(reactEvent: React.KeyboardEvent): TaroConfirmEvent {
    const {
        timeStamp,
        target,
        currentTarget
    } = reactEvent
    const el = target as T
    return {
        currentTarget,
        target,
        detail: {
            value: el.value
        },
        timeStamp,
        type: 'confirm',
        preventDefault: () => reactEvent.preventDefault(),
        stopPropagation: () => reactEvent.stopPropagation()
    }
}

export function createTaroVideoEvent(taroEventType: string, reactEvent: React.SyntheticEvent<HTMLVideoElement>): TaroVideoEvent {
    const {
        timeStamp,
        target,
        currentTarget
    } = reactEvent
    return {
        currentTarget,
        target,
        detail: {
            videoId: currentTarget.id
        },
        timeStamp,
        type: taroEventType,
        preventDefault: () => reactEvent.preventDefault(),
        stopPropagation: () => reactEvent.stopPropagation()
    }
}

export function createTaroSwitchEvent(reactEvent: React.SyntheticEvent<HTMLInputElement>): TaroSwitchEvent {
    const {
        timeStamp,
        target,
        currentTarget
    } = reactEvent
    return {
        currentTarget,
        target,
        detail: {
            checked: currentTarget.checked
        },
        timeStamp,
        type: 'change',
        preventDefault: () => reactEvent.preventDefault(),
        stopPropagation: () => reactEvent.stopPropagation()
    }
}

export function createTaroSwiperEvent(taroEventType: string, swiper: Swiper): TaroSwiperEvent {
    const {
        el,
        realIndex
    } = swiper

    return {
        currentTarget: el,
        target: el,
        detail: {
            current: realIndex
        },
        timeStamp: Date.now(),
        type: taroEventType,
        preventDefault() { },
        stopPropagation() { }
    }
}

export function createTaroPickerViewEvent(el: HTMLDivElement, value: number[]): TaroPickerViewEvent {
    return {
        currentTarget: el,
        target: el,
        detail: {
            value
        },
        timeStamp: Date.now(),
        type: 'change',
        preventDefault() { },
        stopPropagation() { }
    }
}

export function createTaroFormSubmitEvent(el: HTMLFormElement, value: Record<string, unknown>): TaroFormSubmitEvent {
    return {
        currentTarget: el,
        target: el,
        detail: {
            value
        },
        timeStamp: Date.now(),
        type: 'submit',
        preventDefault() { },
        stopPropagation() { }
    }
}
