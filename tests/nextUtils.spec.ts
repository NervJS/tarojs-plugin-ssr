import * as path from 'path'
import {getNextExportedFunctions, resolveDynamicPagesToRewrites, isDynamicRoute} from '../src/nextUtils'

describe('next uitls', () => {
    describe('getNextExportedFunctions', () => {
        it('function declaration', () => {
            const funcFilePath = path.resolve(__dirname, './__fixtures__/getNextExportedFunctions/function.js')
            const functions = getNextExportedFunctions(funcFilePath)
            expect(functions).toEqual(['getStaticPaths', 'getStaticProps'])
        })

        it('variable declarator', () => {
            const funcFilePath = path.resolve(__dirname, './__fixtures__/getNextExportedFunctions/variable.js')
            const functions = getNextExportedFunctions(funcFilePath)
            expect(functions).toEqual(['getStaticPaths', 'getStaticProps'])
        })

        it('named declarator', () => {
            const funcFilePath = path.resolve(__dirname, './__fixtures__/getNextExportedFunctions/named.js')
            const functions = getNextExportedFunctions(funcFilePath)
            expect(functions).toEqual(['getStaticPaths', 'getStaticProps'])
        })
    })

    it('resolveDynamicPagesToRewrites', () => {
        const rewrites = resolveDynamicPagesToRewrites(['/home/[param]'])

        expect(rewrites).toEqual([
            {
                source: '/home',
                has: [
                    {
                        type: 'query',
                        key: 'param',
                        value: '(?<param>.*)'
                    }
                ],
                destination: `/home/:param`
            }
        ])
    })

    it('isDynamicRoute', () => {
        expect(isDynamicRoute('index.ts')).toEqual(false)
        expect(isDynamicRoute('[param].ts')).toEqual(true)
    })
});
