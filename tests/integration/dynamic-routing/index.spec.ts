import * as path from 'path'
import * as fs from 'fs'
import {taroBuild} from '../../taroTestUtils'

const distDir = path.resolve(__dirname, './dist')

describe('Dynamic routing', () => {
    beforeAll(async () => {
        await taroBuild({
            cwd: __dirname
        })
    })

    it('fattern dynamic routing', () => {
        const page = path.join(distDir, 'dist/pages/index/[id].js')
        expect(fs.existsSync(page)).toBe(true)
    })

    // it('nesting dynamic routing', () => {
    //     const babelConfigPath = path.join(distDir, 'babel.config.js')
    //     expect(fs.existsSync(babelConfigPath)).toBe(true)
    // })
})
