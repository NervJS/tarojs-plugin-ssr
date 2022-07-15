import React, {useState} from 'react'
import Mask from '../mask'
import Swiper from '../swiper'
import SwiperItem from '../swiper-item'

interface PreviewProps {
    /**
     * 当前显示图片的链接，不填则默认为 urls 的第一张
     */
    defaultCurrent?: string

    /**
     * 需要预览的图片链接列表
     */
    urls: string[]

    /**
     * 关闭时触发
     */
    onClose?: () => void;
}

const Preview: React.FC<PreviewProps> = ({defaultCurrent, urls, onClose}) => {
    const [current, setCurrent] = useState(() => {
        if (defaultCurrent) {
            const index = urls.indexOf(defaultCurrent)
            return index !== -1 ? index : 0
        }
        return 0
    })

    return (
        <Mask onClick={onClose}>
            <Swiper
                className='taro-preview_swiper'
                current={current}
                onChange={event => {
                    setCurrent(event.detail.current)
                }}
            >
                {urls.map((url, index) => (
                    <SwiperItem
                        key={`${index}_${url}`}
                        className='taro-preview_swiper-item'
                    >
                        <img className='taro-preview_img' src={url} />
                    </SwiperItem>
                ))}
            </Swiper>

            <div className='taro-preview_pagination'>
                {current + 1}/{urls.length}
            </div>
        </Mask>
    )
}

export default Preview
