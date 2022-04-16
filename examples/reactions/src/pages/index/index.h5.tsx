import {request} from '@tarojs/taro'

export {default} from './view';

export async function getStaticProps() {
    // {
    //   "data": {
    //     "repository": {
    //       "issue": {
    //         "reactionGroups": [
    //           { "content": "THUMBS_UP", "users": { "totalCount": 0 } },
    //           { "content": "THUMBS_DOWN", "users": { "totalCount": 0 } },
    //           { "content": "LAUGH", "users": { "totalCount": 0 } },
    //           { "content": "HOORAY", "users": { "totalCount": 0 } },
    //           { "content": "CONFUSED", "users": { "totalCount": 0 } },
    //           { "content": "HEART", "users": { "totalCount": 0 } },
    //           { "content": "ROCKET", "users": { "totalCount": 0 } },
    //           { "content": "EYES", "users": { "totalCount": 0 } }
    //         ]
    //       }
    //     }
    //   }
    // }
    let res
    try {
        res = await request({
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
    } catch(error) {
        console.error(error)
        throw new Error('Failed to fetch API')
    }

    const reactions = res.data.data.repository.issue.reactionGroups
        .map(item => item.users.totalCount)

    return {
        props: {
            reactions
        },
        revalidate: 1
    }
}
