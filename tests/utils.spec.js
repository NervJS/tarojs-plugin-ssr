const path = require('path')
const {isDynamicRoute} = require('../src/utils')

describe('utils', () => {
    it('isDynamicRoute', () => {
        expect(isDynamicRoute('index.ts')).toEqual(false)
        expect(isDynamicRoute('[param].ts')).toEqual(true)
    })
})
