import * as path from 'path'
import {getNextExportedFunctions, resolveDynamicPagesToRewrites, isDynamicRoute} from 'tarojs-plugin-platform-nextjs/lib/nextUtils'

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
        const rewrites1 = resolveDynamicPagesToRewrites(['/post/[id]'])
        expect(rewrites1).toEqual([
            {
                source: '/post',
                has: [
                    {
                        type: 'query',
                        key: 'id',
                        value: '(?<id>.*)'
                    }
                ],
                destination: '/post/:id'
            }
        ])
        const rewrites2 = resolveDynamicPagesToRewrites(['/post/[id]/[comment]'])
        expect(rewrites2).toEqual([
            {
                source: '/post',
                has: [
                    {
                        type: 'query',
                        key: 'id',
                        value: '(?<id>.*)'
                    },
                    {
                        type: 'query',
                        key: 'comment',
                        value: '(?<comment>.*)'
                    }
                ],
                destination: '/post/:id/:comment'
            }
        ])
        const rewrites3 = resolveDynamicPagesToRewrites(['/post/[id]/index'])
        expect(rewrites3).toEqual([
            {
                source: '/post',
                has: [
                    {
                        type: 'query',
                        key: 'id',
                        value: '(?<id>.*)'
                    }
                ],
                destination: '/post/:id'
            }
        ])
    })

    it('isDynamicRoute', () => {
        expect(isDynamicRoute('index.ts')).toEqual(false)
        expect(isDynamicRoute('[param].ts')).toEqual(true)
    })
})
