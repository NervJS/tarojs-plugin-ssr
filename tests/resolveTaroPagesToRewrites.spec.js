const resolveTaroPagesToRewrites = require('../src/resolveTaroPagesToRewrites')

it('resolveTaroPagesToRewrites', () => {
    const rewrites = resolveTaroPagesToRewrites(
        {
            '/pages/home/index': '/wiki',
            '/pages/search/index':'/wiki/search'
        }
    )

    expect(rewrites).toEqual([
        {
            source: '/wiki',
            destination: '/pages/home'
        },
        {
            source: '/wiki/search',
            destination: '/pages/search'
        }
    ])
})
