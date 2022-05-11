import * as path from 'path'
import * as fs from 'fs'
import ejs from 'ejs'

const nextConfigEjsPath = require.resolve('tarojs-plugin-platform-nextjs/template/next.config.ejs')
const template = fs.readFileSync(nextConfigEjsPath, 'utf-8')

const fixturesDir = path.resolve(__dirname, '../__fixtures__/template/nextConfig')

describe('next.config.ejs', () => {
    it('default', () => {
        const ejsData = {
            env: null,
            defineConstants: null,
            additionalData: null,
            rewrites: null
        }
        const result = ejs.render(template, ejsData)
        const expected = fs.readFileSync(path.join(fixturesDir, 'default.js'), 'utf-8')
        expect(result).toEqual(expected)
    })

    it('basic', () => {
        const ejsData = {
            env: {
                NUMBER: 1
            },
            defineConstants: {
                STRING: JSON.stringify('this is string'),
                'process.env.GITHUB_TOKEN': JSON.stringify('this is github token')
            },
            additionalData: 'body { background-color: red; }',
            rewrites: null
        }
        const result = ejs.render(template, ejsData)
        const expected = fs.readFileSync(path.join(fixturesDir, 'basic.js'), 'utf-8')
        expect(result).toEqual(expected)
    })
})
