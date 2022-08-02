import * as fs from 'fs'
import * as path from 'path'
import {Bundler, BundleResult} from 'scss-bundle'

interface TaroSassOptions {
    resource?: string | string[]
    projectDirectory?: string
    data?: string
}

/**
 * Return bundled sass content.
 */
async function getBundleResult(url: string, projectDirectory?: string): Promise<BundleResult> {
    let bundler: Bundler = new Bundler()
    if (projectDirectory) {
        bundler = new Bundler(undefined, projectDirectory)
    }
    const res = await bundler.bundle(url)
    return res
}

/**
 * Return bundled sass content, but input resource can be a single string or an array.
 */
async function getBundleContent(resource: string | string[], projectDirectory?: string): Promise<string> {
    let result = ''
    if (typeof resource === 'string') {
        const res = await getBundleResult(resource, projectDirectory)
        result = res.bundledContent || ''
    } else if (Array.isArray(resource)) {
        for (const url of resource) {
            const res = await getBundleResult(url, projectDirectory)
            result += res.bundledContent || ''
        }
    }
    return result
}

/**
 * Check if global imported sass file exists.
 */
function checkPath(resource: string | string[], rootDir: string | undefined) {
    if (Array.isArray(resource)) {
        resource.forEach(item => {
            const url = rootDir ? path.resolve(rootDir, item) : item
            if (!fs.existsSync(url)) {
                throw new Error(`全局注入 scss 文件路径错误: ${url}`)
            }
        })
    } else if (typeof resource === 'string') {
        const url = rootDir ? path.resolve(rootDir, resource) : resource
        if (!fs.existsSync(url)) {
            throw new Error(`全局注入 scss 文件路径错误: ${url}`)
        }
    }
}

/**
 * Return the merged sass options.
 */
async function getNextSassOptions(sass: TaroSassOptions): Promise<string> {
    const {data, resource, projectDirectory} = sass

    let additionalData = ''
    if (resource) {
        checkPath(resource, projectDirectory)
        const content = await getBundleContent(resource, projectDirectory)
        additionalData += content
    }
    if (data) {
        additionalData += data
    }

    return additionalData
}

export default getNextSassOptions
