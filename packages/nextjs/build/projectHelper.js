const path = require("path");

function getPluginProjectPath(...filePath) {
    const root = path.resolve(__dirname, "..");
    return path.join(root, ...filePath);
}

function getTaroProjectPath(...filePath) {
    const root = path.resolve(__dirname, "../taro");
    return path.join(root, ...filePath);
}

function getRouterProjectPath(...filePath) {
    const root = path.resolve(__dirname, "../router");
    return path.join(root, ...filePath);
}

function getAresProjectPath(...filePath) {
    const root = path.resolve(__dirname, "../ares");
    return path.join(root, ...filePath);
}

function getComponentsProjectPath(...filePath) {
    const root = path.resolve(__dirname, "../components");
    return path.join(root, ...filePath);
}

module.exports = {
    getPluginProjectPath,
    getTaroProjectPath,
    getRouterProjectPath,
    getAresProjectPath,
    getComponentsProjectPath,
};
