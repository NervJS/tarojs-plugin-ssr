import {useCallback} from 'react'
import {useRouter} from 'next/router'

const Navigator = ({url, children}) => {
    const router = useRouter()

    const handleClick = useCallback(event => {
        event.preventDefault()
        router.push(url)
    }, [url])

    return (
        <a
            className='taro-nav'
            href={url}
            onClick={handleClick}
        >
            {children}
        </a>
    )
}

export default Navigator
