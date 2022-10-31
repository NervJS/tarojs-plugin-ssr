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

    it('static routing', () => {
        const page = path.join(pagesDir, 'pages/me/index/index.js')
        expect(fs.existsSync(page)).toBe(true)
        const code = fs.readFileSync(page, 'utf-8')
        expect(code.includes('import Page from \'../../../../src/pages/me/index\'')).toBe(true)
    })

    it('fattern dynamic routing', () => {
        const page1 = path.join(pagesDir, 'pages/index/index/[id].js')
        const page2 = path.join(pagesDir, 'pages/index/index.js')
        expect(fs.existsSync(page1)).toBe(true)
        expect(fs.existsSync(page2)).toBe(false)
        const code1 = fs.readFileSync(page1, 'utf-8')
        expect(code1.includes('import Page from \'../../../../src/pages/index/[id].js\'')).toBe(true)
        expect(code1.includes('export {getServerSideProps} from \'../../../../src/pages/index/[id].js\'')).toBe(true)
    })

    it('nesting dynamic routing', () => {
        const page1 = path.join(pagesDir, 'pages/comment/index/[id]/[comment].js')
        const page2 = path.join(pagesDir, 'pages/comment/index/[id]/index/index.js')
        const page3 = path.join(pagesDir, 'pages/comment/index/index.js')
        expect(fs.existsSync(page1)).toBe(true)
        expect(fs.existsSync(page2)).toBe(true)
        expect(fs.existsSync(page3)).toBe(false)

        const code1 = fs.readFileSync(page1, 'utf-8')
        const code2 = fs.readFileSync(page2, 'utf-8')
        expect(code1.includes('import Page from \'../../../../../src/pages/comment/[id]/[comment].js\'')).toBe(true)
        expect(code1.includes('export {getServerSideProps} from \'../../../../../src/pages/comment/[id]/[comment].js\'')).toBe(true)
        expect(code2.includes('import Page from \'../../../../../../src/pages/comment/[id]/index.js\'')).toBe(true)
        expect(code2.includes('export {getServerSideProps} from \'../../../../../../src/pages/comment/[id]/index.js\'')).toBe(true)
    })

    it('custom routes', () => {
        const page1 = path.join(pagesDir, 'post/[id].js')
        const page2 = path.join(pagesDir, 'post/index.js')
        expect(fs.existsSync(page1)).toBe(true)
        expect(fs.existsSync(page2)).toBe(false)
    })
})
