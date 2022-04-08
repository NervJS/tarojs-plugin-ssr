const ROUTE_PARMA_REGEX = /(\S*)\/\[([^/]+?)\]$/

function resolveDynamicPagesToRewrites(dynamicPages) {
    return dynamicPages.map(page => {
        const [_, source, key] = ROUTE_PARMA_REGEX.exec(page)
        return {
            source,
            has: [
                {
                    type: 'query',
                    key,
                    value: `(?<${key}>.*)`
                }
            ],
            destination: `${source}/:${key}`
        }
    })
}

module.exports = resolveDynamicPagesToRewrites
