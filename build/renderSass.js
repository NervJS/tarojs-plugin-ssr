const path = require('path')
const util = require('util')
const sass = require('sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')

function renderSass(sassFile, config = {}) {
    const { cwd = process.cwd() } = config
    const resolvedSassFile = path.resolve(cwd, sassFile)

    const sassOpts = {
        file: resolvedSassFile
    }
    return util.promisify(sass.render)(sassOpts)
        .then(result => postcss([autoprefixer]).process(result.css, { from: undefined }))
        .then(r => r.css)
}

module.exports = renderSass
