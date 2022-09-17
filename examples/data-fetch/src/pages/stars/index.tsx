import {useEffect, useState} from 'react'
import {request} from '@tarojs/taro'
import IndexView from './view';

function TarojsPluginPlatformNextjsStarsView() {
  const [stars, setStars] = useState()

  useEffect(() => {
    (async function() {
      const res = await request({
        method: 'GET',
        url: 'https://api.github.com/repos/NervJS/tarojs-plugin-platform-nextjs'
      })
      setStars(res.data.stargazers_count)
    })()
  }, [])

  return <IndexView stars={stars} />
}

export default TarojsPluginPlatformNextjsStarsView
