import {useEffect, useState} from 'react'
import {request} from '@tarojs/taro'
import IndexView from './view';

function Index() {
  const [reactions, setReactions] = useState([])

  useEffect(() => {
    (async function() {
        const res = await request({
            url: 'https://api.github.com/graphql',
            method: 'POST',
            header: {
                Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
            },
            data: {
                query: `query {
                repository(owner:"vercel", name:"reactions") {
                issue(number:1) {
                    reactionGroups {
                    content
                    users(first: 0) {
                        totalCount
                    }
                    }
                }
                }
            }`
            }
        })

        const reactions = res.data.data.repository.issue.reactionGroups
            .map(item => item.users.totalCount)
        setReactions(reactions)
    })()
  }, [])

  return <IndexView reactions={reactions} />
}

export default Index
