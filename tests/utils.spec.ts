import {unIndent} from 'tarojs-plugin-platform-nextjs/lib/utils'

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
})
