const customNextConfig = require("./config/next.config.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
    ...customNextConfig,
    env: {
        TARO_ENV: "h5"
    },
    sassOptions: {},
    images: {
        disableStaticImages: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    webpack(config, options) {
        const { isServer, webpack } = options;

        config.module.rules.push({
            test: /\.(bmp|gif|jpg|jpeg|png|svg)$/,
            exclude: /node_modules/,
            use: {
                loader: "url-loader",
                options: {
                    name: "[name].[ext]",
                    limit: 10240, // 1mb
                    publicPath: "/_next/static/",
                    outputPath: `${isServer ? "../" : ""}static/`
                }
            }
        });
        for (let i = 0; i < config.plugins.length; i++) {
            const plugin = config.plugins[i];
            if (plugin.constructor.name === "DefinePlugin") {
                config.plugins[i] = new webpack.DefinePlugin({
                    ...plugin.definitions
                });
            }
        }

        if (customNextConfig.webpack) {
            customNextConfig.webpack(config, options);
        }
        return config;
    },
    async rewrites() {
        return {
            beforeFiles: []
        };
    }
};

module.exports = nextConfig;
