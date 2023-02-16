const { host, port, basePath } = require("./constant");

module.exports = {
    env: {
        NODE_ENV: '"development"'
    },
    defineConstants: {},
    mini: {},
    h5: {},
    next: {
        devServer: {
            port,
            host,
            open: `http://${host}:${port}${basePath}`
        }
    }
};
