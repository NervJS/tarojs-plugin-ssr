const resolveDynamicPagesToRewrites = require('../src/resolveDynamicPagesToRewrites')

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
