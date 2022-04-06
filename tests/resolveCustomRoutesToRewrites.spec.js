const resolveCustomRoutesToRewrites = require('../src/resolveCustomRoutesToRewrites')

it('resolveCustomRoutesToRewrites', () => {
    const rewrites = resolveCustomRoutesToRewrites({
        '/pages/home/index': '/wiki',
        '/pages/search/index':'/wiki/search'
    })

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
