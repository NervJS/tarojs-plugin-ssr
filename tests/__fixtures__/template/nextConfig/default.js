
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

        return config
    },
}

module.exports = nextConfig
