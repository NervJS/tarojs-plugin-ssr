import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

class Image extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false
        }
        this.observer = null
    }

    componentDidMount() {
        const {lazyLoad, src} = this.props;
        if (lazyLoad) {
            this.observer = new IntersectionObserver(entries => {
                // 异步 api 关系
                if (entries[entries.length - 1].isIntersecting) {
                    this.setState({ isLoaded: true }, () => {
                        ReactDOM.findDOMNode(this).children[0].src = src
                    })
                }
            }, {
                rootMargin: '300px 0px'
            })
            this.observer.observe(this.imgRef)
        }
    }

    componentWillUnmount() {
        this.observer?.disconnect()
    }

    imageOnLoad = event => {
        const {onLoad} = this.props
        Object.defineProperty(event, 'detail', {
            enumerable: true,
            writable: true,
            value: {
                width: this.imgRef.width,
                height: this.imgRef.height
            }
        })
        onLoad?.(event)
    }

    render() {
        const {
            className,
            src,
            style,
            mode,
            onError,
            lazyLoad,
            imgProps,
            ...reset
        } = this.props
        const cls = classNames(
            'taro-img',
            {
                'taro-img__widthfix': mode === 'widthFix',
                'taro-img__heightfix': mode === 'heightFix'
            },
            className
        )
        const imgCls = classNames(
            'taro-img__mode-' +
            (mode || 'scaleToFill').toLowerCase().replace(/\s/g, '')
        )

        return (
            <div className={cls} style={style} {...reset}>
                {lazyLoad ? (
                    <img
                        ref={img => (this.imgRef = img)}
                        className={imgCls}
                        data-src={src}
                        onLoad={this.imageOnLoad}
                        onError={onError}
                        {...imgProps}
                    />
                ) : (
                    <img
                        ref={img => (this.imgRef = img)}
                        className={imgCls}
                        src={src}
                        onLoad={this.imageOnLoad}
                        onError={onError}
                        {...imgProps}
                    />
                )}
            </div>
        )
    }
}

export default Image
