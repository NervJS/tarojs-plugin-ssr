const path = require('path')
const {unIndent, isDynamicRoute} = require('../src/utils')

describe('utils', () => {
    it('unIndent', () => {
        expect(unIndent`
            function (a, b) {
                return a + b
            }
        `).toEqual('function (a, b) {\n    return a + b\n}')

        const a = 'a'
        const b = 'b'
        expect(unIndent`
            function (${a}, ${b}) {
                return ${a} + ${b}
            }
        `).toEqual('function (a, b) {\n    return a + b\n}')
    })

    it('isDynamicRoute', () => {
        expect(isDynamicRoute('index.ts')).toEqual(false)
        expect(isDynamicRoute('[param].ts')).toEqual(true)
    })
})
