const postcss = require('postcss')

module.exports = () => {
    return {
        postcssPlugin: 'postcss-red-color',
        Once(css) {
            css.walkRules(rule => {
                const decl = { prop: 'color', value: 'red' }
                rule.append(decl)
            })
        }
    }
}

module.exports.postcss = true
