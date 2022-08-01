import * as path from 'path'
import * as fs from 'fs'
import {taroBuild} from '../../taroTestUtils'

const distDir = path.resolve(__dirname, './dist')
const pagesDir = path.join(distDir, 'pages')

describe('Dynamic routing', () => {
    beforeAll(async () => {
        await taroBuild({
            cwd: __dirname
        })
    })

    it('fattern dynamic routing', () => {
        const page1 = path.join(pagesDir, 'pages/index/index/[id].js')
        const page2 = path.join(pagesDir, 'pages/index/index.js')
        expect(fs.existsSync(page1)).toBe(true)
        expect(fs.existsSync(page2)).toBe(false)
    })

    it('nesting dynamic routing', () => {
        const page1 = path.join(pagesDir, 'pages/comment/index/[id]/[comment].js')
        const page2 = path.join(pagesDir, 'pages/comment/index/[id]/index.js')
        const page3 = path.join(pagesDir, 'pages/comment/index/index.js')
        expect(fs.existsSync(page1)).toBe(true)
        expect(fs.existsSync(page2)).toBe(true)
        expect(fs.existsSync(page3)).toBe(false)
    })

    it('custom routes', () => {
        const page1 = path.join(pagesDir, 'post/[id].js')
        const page2 = path.join(pagesDir, 'post/index.js')
        expect(fs.existsSync(page1)).toBe(true)
        expect(fs.existsSync(page2)).toBe(false)
    })
})
