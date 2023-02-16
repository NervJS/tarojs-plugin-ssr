import { Router } from 'express'
import { join } from 'path'
import { parse } from 'url'
import { nextServer, requestHandler } from './nextServer'

const nextHandler = (req: any, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    if (
        pathname &&
        (pathname === '/sw.js' ||
            /^\/(workbox|worker|fallback)-\w+\.js$/.test(pathname))
    ) {
        const filePath = join(__dirname, '.next', pathname)
        return nextServer.serveStatic(req, res, filePath)
    }

    // 注意只有h5特性才能通过pageProps传入前端页面
    req.fue = {
        props: {}
    }

    return requestHandler(req, res, parsedUrl)
}

export const nextRouter = Router()

nextRouter.use(nextHandler)

export default nextRouter
