'use strict'

jest.autoMockOff()
const defineTest = require('jscodeshift/dist/testUtils').defineTest

const tests = [
    'basic',
    'no-plugins',
    'transformed'
]

tests.forEach(test => {
    defineTest(
        __dirname,
        'transform',
        {
            quote: 'single'
        },
        test
    )
})
