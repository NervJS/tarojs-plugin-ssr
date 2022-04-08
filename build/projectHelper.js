const path = require('path')

function getProjectPath(...filePath) {
    const root = path.resolve(__dirname, '../components')
    return path.join(root, ...filePath)
}

module.exports = {
    getProjectPath
}
