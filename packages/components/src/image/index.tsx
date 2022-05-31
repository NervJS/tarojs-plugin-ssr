import React, {
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef
} from 'react'
import classNames from 'classnames'
import type {BaseProps, TaroBaseEvent} from '../_util/types'
import useBaseEvents from '../_util/hooks/useBaseEvents'
import useIntersection from '../_util/hooks/useIntersection'

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

interface TaroImageLoadEvent extends TaroBaseEvent<{height: number, width: number}> {}

interface TaroImageErrorEvent extends TaroBaseEvent<{errMsg: string}> {}

export interface ImageProps extends BaseProps {
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
    onError?: (event: TaroImageErrorEvent) => void

    /**
     * 当图片载入完毕时，发布到 AppService 的事件名，事件对象
     */
    onLoad?: (event: TaroImageLoadEvent) => void
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
    ...eventProps
}, ref) => {
    const handles = useBaseEvents(eventProps)

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
    const mergedStyle = Object.assign({
        backgroundImage: isVisible && src ? `url(${src})` : undefined
    }, style)

    useEffect(() => {
        if (src && (onLoad || onError)) {
            const img = new window.Image()
            img.src = src
            img.onerror = () => {
                const taroEvent: TaroImageErrorEvent = {
                    type: 'error',
                    detail: {
                        errMsg: 'something wrong'
                    }
                }
                if (onError) {
                    onError(taroEvent)
                }
            }
            img.onload = () => {
                const taroEvent: TaroImageLoadEvent = {
                    type: 'load',
                    detail: {
                        height: img.height,
                        width: img.width
                    }
                }
                if (onLoad) {
                    onLoad(taroEvent)
                }
            }
        }
    }, [src])

    return (
        <div
            ref={el => {
                div.current = el
                setRef(el)
            }}
            id={id}
            className={classNames('taro-img', {
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
            }, className)}
            style={mergedStyle}
            {...handles}
        />
    )
}

export default forwardRef(Image)
