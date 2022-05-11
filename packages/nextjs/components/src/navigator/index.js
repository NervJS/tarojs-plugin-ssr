import {useCallback} from 'react'
import {useRouter} from 'next/router'

const Navigator = ({url, children}) => {
    const router = useRouter()

    const handleClick = useCallback(() => {
        router.push(url)
    }, [url])

    return <a href={url} onClick={handleClick}>{children}</a>
}

export default Navigator
