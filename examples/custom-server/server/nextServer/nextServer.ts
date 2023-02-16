import createNext from 'next'
import { join } from 'path'

// 判断是否为开发环境
const dev = process.env.NODE_ENV !== 'production'

const dir = join(__dirname, '../../')

console.log('nextjs start', [dir, dev])

// 初始化 app
export const nextServer = createNext({ dev, dir })

export const requestHandler = nextServer.getRequestHandler()

export default nextServer
