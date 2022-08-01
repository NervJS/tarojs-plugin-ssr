import { Dirent, promises } from 'fs'
import * as path from 'path'
import { SCRIPT_EXTS } from '../constants'
import { resolveScriptPath } from '../utils'
import {recursiveReadDir} from './recursiveReadDir'
import {isDynamicPage} from './isDynamicPage'

export async function findDynamicRoutePages(dir: string): Promise<string[]> {
    const pages: string[] = []

    const result = await promises.readdir(dir, { withFileTypes: true })

    await Promise.all(
        result.map(async (part: Dirent) => {
            const absolutePath = path.join(dir, part.name)

            if (part.isDirectory() && isDynamicPage(part.name)) {
                const result = await recursiveReadDir(
                    absolutePath,
                    new RegExp(`\\.(?:${SCRIPT_EXTS.map(ext => ext.substring(1)).join('|')})$`)
                )
                for (const routePage of result) {
                    pages.push(`/${part.name}${routePage}`)
                }
                return
            }

            if (part.isFile()) {
                const ext = path.extname(part.name)
                if (SCRIPT_EXTS.includes(ext) && isDynamicPage(path.basename(part.name, ext))) {
                    pages.push(`/${part.name}`)
                }
            }
        })
    )

    return pages
}


interface RouteInfo {
    origin: string,
    route: string
    file: string
    dynamic: boolean
}

export async function getNextPageInfos(
    sourcePath: string,
    taroPages: string[],
    customRoutes: Record<string, string | string[]>
): Promise<RouteInfo[]> {
    const routePages: RouteInfo[] = []
    for (const taroPage of taroPages) {
        const taroPageFile = resolveScriptPath(path.join(sourcePath, taroPage))
        const taroPageDir = path.dirname(taroPageFile)

        let taroRoute = customRoutes[taroPage] || taroPage
        if (Array.isArray(taroRoute)) {
            taroRoute = taroRoute[0]
        }

        const dynamicRoutePages = await findDynamicRoutePages(taroPageDir)
        if (dynamicRoutePages.length) {
            for (const page of dynamicRoutePages) {
                const ext = path.extname(page)
                const absolutePath = path.join(taroPageDir, page)
                routePages.push({
                    origin: taroPage,
                    route: taroRoute + page.substring(0, page.length - ext.length),
                    file: absolutePath.replace(sourcePath, ''),
                    dynamic: true
                })
            }
        } else {
            routePages.push({
                origin: taroPage,
                route: taroRoute,
                file: taroPageFile.replace(sourcePath, ''),
                dynamic: false
            })
        }
    }
    return routePages
}
