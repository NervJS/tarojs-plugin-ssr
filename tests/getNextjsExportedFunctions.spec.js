const path = require('path')
const getNextjsExportedFunctions = require('../src/getNextjsExportedFunctions')

describe('getNextjsExportedFunctions', () => {
    it('function declaration', () => {
        const funcFilePath = path.resolve(__dirname, './__fixtures__/getNextjsExportedFunctions/function.js')
        const functions = getNextjsExportedFunctions(funcFilePath)
        expect(functions).toEqual(['getStaticPaths', 'getStaticProps'])
    })

    it('variable declarator', () => {
        const funcFilePath = path.resolve(__dirname, './__fixtures__/getNextjsExportedFunctions/variable.js')
        const functions = getNextjsExportedFunctions(funcFilePath)
        expect(functions).toEqual(['getStaticPaths', 'getStaticProps'])
    })
})
