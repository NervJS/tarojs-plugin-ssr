const withLess = require('next-with-less')

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        TARO_ENV: 'h5',
        "NUMBER": 1,
    },
    sassOptions: {
        additionalData: "body { background-color: red; }"
    },
    images: {
        disableStaticImages: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    webpack(config, options) {
        const {isServer, webpack} = options
        config.module.rules.push({
            test: /\.(bmp|gif|jpg|jpeg|png|svg)$/,
            exclude: /node_modules/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    limit: 10240, // 1mb
                    publicPath: '/_next/static/',
                    outputPath: `${isServer ? '../' : ''}static/`
                }
            }
        })
        for (let i = 0; i < config.plugins.length; i++) {
            const plugin = config.plugins[i]
            if (plugin.constructor.name === 'DefinePlugin') {
                config.plugins[i] = new webpack.DefinePlugin({
                    "STRING": "this is string",
                    "process.env.GITHUB_TOKEN": "this is github token",
                    ...plugin.definitions
                })
            }
        }

        return config
    },
}

module.exports = withLess(nextConfig)
