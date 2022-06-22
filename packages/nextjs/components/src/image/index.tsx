import React, {
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef
} from 'react'
import classNames from 'classnames'
import type {TaroBaseProps, TaroEvent, TaroEventHandler} from '../_util/typings'
import useTaroBaseEvents from '../_util/hooks/useTaroBaseEvents'
import useIntersection from '../_util/hooks/useIntersection'
import {createTaroEvent} from '../_util/taroEvent'

type ModeType =
    | 'scaleToFill'
    | 'aspectFit'
    | 'aspectFill'
    | 'heightFix'
    | 'widthFix'
    | 'top'
    | 'bottom'
    | 'center'
    | 'left'
    | 'right'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right'

export interface ImageProps extends TaroBaseProps {
    /**
     * 图片资源地址
     */
    src?: string

    /**
     * 图片裁剪、缩放的模式
     * @default "scaleToFill"
     */
    mode?: ModeType

    /**
     * 图片懒加载。只针对 page 与 scroll-view 下的 image 有效
     * @default false
     */
    lazyLoad?: boolean
    
    /**
     * 当错误发生时，发布到 AppService 的事件名，事件对象
     */
    onError?: TaroEventHandler<TaroEvent<{errMsg: string}>>

    /**
     * 当图片载入完毕时，发布到 AppService 的事件名，事件对象
     */
    onLoad?: TaroEventHandler<TaroEvent<{height: number, width: number}>>
}

const Image: React.ForwardRefRenderFunction<HTMLDivElement, ImageProps> = ({
    id,
    className,
    style,
    src,
    mode = 'scaleToFill',
    lazyLoad = false,
    onError,
    onLoad,
    ...events
}, ref) => {
    const props = useTaroBaseEvents(events)

    const [setRef, isIntersected] = useIntersection<HTMLDivElement>({
        rootMargin: '50px',
        disabled: !lazyLoad
    })

    const div = useRef<HTMLDivElement | null>(null)

    useImperativeHandle(ref, () => div.current!)

    let isLazy = lazyLoad
    if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
        isLazy = false
    }
    const isVisible = !isLazy || isIntersected

    useEffect(() => {
        if (src && (onLoad || onError)) {
            const img = new window.Image()
            img.src = src
            img.onerror = () => {
                if (onError) {
                    const detail = {
                        errMsg: 'something wrong'
                    }
                    const taroEvent = createTaroEvent('error', div.current, detail)
                    onError(taroEvent)
                }
            }
            img.onload = () => {
                if (onLoad) {
                    const detail = {
                        height: img.height,
                        width: img.width
                    }
                    const taroEvent = createTaroEvent('load', div.current, detail)
                    onLoad(taroEvent)
                }
            }
        }
    }, [src])

    return (
        <div
            className={classNames('taro-img', className)}
            style={style}
            {...props}
        >
            <div
                ref={el => {
                    div.current = el
                    setRef(el)
                }}
                id={id}
                className={classNames({
                    'taro-img__scale-to-fill': mode === 'scaleToFill',
                    'taro-img__aspect-fit': mode === 'aspectFit',
                    'taro-img__aspect-fill': mode === 'aspectFill',
                    'taro-img__width-fix': mode === 'widthFix',
                    'taro-img__height-fix': mode === 'heightFix',
                    'taro-img__top': mode === 'top',
                    'taro-img__bottom': mode === 'bottom',
                    'taro-img__center': mode === 'center',
                    'taro-img__left': mode === 'left',
                    'taro-img__right': mode === 'right',
                    'taro-img__top-left': mode === 'top left',
                    'taro-img__top-right': mode === 'top right',
                    'taro-img__bottom-left': mode === 'bottom left',
                    'taro-img__bottom-right': mode === 'bottom right'
                })}
                style={{
                    backgroundImage: isVisible && src ? `url(${src})` : undefined
                }}
            />
        </div>
    )
}

export default forwardRef(Image)
