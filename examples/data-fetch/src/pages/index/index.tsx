import {useEffect, useState} from 'react'
import {request} from '@tarojs/taro'
import IndexView from './view'

function Index() {
    const [stars, setStars] = useState()

    useEffect(() => {
        (async function () {
            const res = await request({
                method: 'GET',
                url: 'https://api.github.com/repos/NervJS/taro'
            })
            setStars(res.data.stargazers_count)
        })()
    }, [])

    return <IndexView stars={stars} />
}

export default Index
