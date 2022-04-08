function pascalCase(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-(\w)/g, (m, n) => n.toUpperCase())
}

const req = require.context('../components/src', true, /^\.\/[^_][\w-]+\/style\/index\.(j|t)sx?$/)

req.keys().forEach(mod => {
    let v = req(mod)
    if (v && v.default) {
        v = v.default
    }
    const match = mod.match(/^\.\/([^_][\w-]+)\/index\.(?:j|t)sx?$/)
    if (match && match[1]) {
        if (match[1] === 'message' || match[1] === 'notification') {
            // message & notification should not be capitalized
            exports[match[1]] = v
        } else {
            exports[pascalCase(match[1])] = v
        }
    }
})

module.exports = require('../components/src')
