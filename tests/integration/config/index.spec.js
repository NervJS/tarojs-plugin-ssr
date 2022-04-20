const path = require('path')
const fs = require('fs')
const {taroBuild} = require('../../taroTestUtils')

const distDir = path.resolve(__dirname, './dist')

describe('Configuration', () => {
    beforeAll(async () => {
        await taroBuild({
            cwd: __dirname
        })
    })

    it('should generate babel config', () => {
        const babelConfigPath = path.join(distDir, 'babel.config.js')
        expect(fs.existsSync(babelConfigPath)).toBe(true)
    })

    it('should generate postcss config', () => {
        const postcssConfigPath = path.join(distDir, 'postcss.config.js')
        expect(fs.existsSync(postcssConfigPath)).toBe(true)
    })

    it('should generate ts config', () => {
        const tsConfigPath = path.join(distDir, 'tsconfig.json')
        expect(fs.existsSync(tsConfigPath)).toBe(true)
    })
})
