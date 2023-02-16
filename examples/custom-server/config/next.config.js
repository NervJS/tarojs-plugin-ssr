const { patchWebpackConfig } = require("next-global-css");

const { MultiPlatformPlugin } = require("@tarojs/runner-utils");

const withPWA = require("next-pwa")({
    disable: true,
    dest: "public"
});

const { basePath } = require("./constant");

/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ["zh-cn-hans"],
        defaultLocale: "zh-cn-hans"
    },
    basePath,
    typescript: {
        ignoreBuildErrors: true
    },
    webpack(config, options) {
        patchWebpackConfig(config, options);

        config.resolve.plugins = [
            ...config.resolve.plugins,
            new MultiPlatformPlugin("described-resolve", "resolve", {
                include: [
           
                ]
            })
        ];

        return config;
    }
};

module.exports = withPWA(nextConfig);
