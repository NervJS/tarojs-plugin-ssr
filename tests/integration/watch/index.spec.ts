import * as path from 'path'
import * as fs from 'fs'
import * as child_process from 'child_process'
import {taroDev, killApp} from '../../taroTestUtils'

jest.setTimeout(1000 * 60 * 2)

const inputSrcDir = path.resolve(__dirname, './src')
const outputDir = path.resolve(__dirname, './dist')

const indexPageCode1 = `
const Index = () => 'hello, world!'
export default Index
`
const indexPageCode2 = `
import {useEffect} from 'react'
const Index = () => {
    useEffect(() => {
        console.log('mounted')
    }, [])
    return 'hello, world!'
}
export default Index
`
const indexFilePath = path.join(inputSrcDir, 'pages/index/index.js')

const outputSrcDir = path.join(outputDir, 'src')
const outputIndexPageFile = path.join(outputSrcDir, 'pages/index/index.js')

function waitFileChange(app: child_process.ChildProcess): Promise<string> {
    return new Promise((resolve, reject) => {
        let didResolve = false

        function handleStdout(data) {
            const message = data.toString()
            if (/File was (changed|added|removed).*/i.test(message)) {
                if (!didResolve) {
                    didResolve = true
                    resolve(message)
                    app.stderr.off('data', handleStderr)
                }
            }
        }

        function handleStderr(data) {
            const message = data.toString()
            reject(message)
            app.stdin.off('data', handleStdout)
        }

        app.stdout.on('data', handleStdout)
        app.stderr.once('data', handleStderr)
    })
}

let app: child_process.ChildProcess | null = null

describe('Watch', () => {
    beforeAll(async () => {
        if (!fs.existsSync(indexFilePath)) {
            const dir = path.dirname(indexFilePath)
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {recursive: true})
            }
            fs.writeFileSync(indexFilePath, indexPageCode1, 'utf-8')
        }
        if (fs.existsSync(outputDir)) {
            fs.rmSync(outputDir, {recursive: true})
        }
        app = await taroDev({
            cwd: __dirname,
            bootupMarker: /Watching for file changes.../i
        })
    })

    afterAll(async () => {
        if (app) {
            killApp(app)
        }
        if (fs.existsSync(indexFilePath)) {
            fs.rmSync(indexFilePath, {recursive: true})
        }
    })

    it('change file', async () => {
        fs.writeFileSync(indexFilePath, indexPageCode2, 'utf-8')
        await waitFileChange(app)
        expect(fs.existsSync(outputIndexPageFile)).toBe(true)
        const outputCode = fs.readFileSync(outputIndexPageFile, 'utf-8')
        expect(outputCode).toBe(indexPageCode2)
    })

    it('remove file', async () => {
        fs.rmSync(indexFilePath)
        await waitFileChange(app)
        expect(fs.existsSync(outputIndexPageFile)).toBe(false)
    })

    it('new file', async () => {
        const inputCode = `
            function sayHello(name) {
                console.log('hello, ' + name)
            }
            export default hello
        `
        const inputFilePath = path.join(inputSrcDir, 'sayHello.js')
        const outputFilePath = path.join(outputSrcDir, 'sayHello.js')
        fs.writeFileSync(inputFilePath, inputCode, 'utf-8')
        await waitFileChange(app)
        expect(fs.existsSync(outputFilePath)).toBe(true)
        expect(fs.readFileSync(outputFilePath, 'utf-8')).toBe(inputCode)

        fs.rmSync(inputFilePath)
        await waitFileChange(app)
        expect(fs.existsSync(outputFilePath)).toBe(false)
    })

    it('new h5 file', async () => {
        fs.writeFileSync(indexFilePath, indexPageCode1, 'utf-8')
        const h5IndexFilePath = path.join(inputSrcDir, 'pages/index/index.h5.js')
        fs.writeFileSync(h5IndexFilePath, indexPageCode2, 'utf-8')
        await waitFileChange(app)
        expect(fs.existsSync(outputIndexPageFile)).toBe(true)
        expect(fs.readFileSync(outputIndexPageFile, 'utf-8')).toBe(indexPageCode2)

        fs.rmSync(h5IndexFilePath)
        await waitFileChange(app)
        expect(fs.readFileSync(outputIndexPageFile, 'utf-8')).toBe(indexPageCode1)
    })
})
