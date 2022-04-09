const path = require('path')

function getComponentsProjectPath(...filePath) {
    const root = path.resolve(__dirname, '../components')
    return path.join(root, ...filePath)
}

function getTaroProjectPath(...filePath) {
    const root = path.resolve(__dirname, '../taro')
    return path.join(root, ...filePath)
}

module.exports = {
    getComponentsProjectPath,
    getTaroProjectPath
}
