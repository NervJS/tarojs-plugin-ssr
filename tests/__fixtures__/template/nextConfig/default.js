let withLess = false
let reported = false
try {
    withLess = require('next-with-less')
} catch (err) {
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        TARO_ENV: 'h5',
    },
    sassOptions: {
    },
    images: {
        disableStaticImages: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    transpilePackages: [
        'taro-ui'
    ],
    webpack(config, options) {
        const {isServer, webpack} = options

        if (!isServer && !withLess && !reported) {
            const chalk = require('chalk')
            console.log(chalk.yellow('\nThe current version of Next.js cannot support Less, please feed back on the issue of github.\n'))
            reported = true
        }

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

        return config
    },
}

module.exports = withLess ? withLess(nextConfig) : nextConfig
