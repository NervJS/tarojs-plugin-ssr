const config = {
    projectName: "data",
    date: "2022-4-16",
    designWidth: 375,
    deviceRatio: {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2,
        375: 2 / 1
    },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: [
        [
            "tarojs-plugin-platform-nextjs",
            {
                copyFile: false, // 不同步文件
                runNextjs: false, // 不运行NEXT脚本
                buildScripts: "build:ssr", // 执行自定义脚本
                devScripts: "dev:ssr", // 执行自定义脚本
                browser: true, // 自动打开浏览器
                useConfigName: "next"
            }
        ]
    ],
    defineConstants: {},
    copy: {
        patterns: [],
        options: {}
    },
    framework: "react",
    mini: {
        postcss: {
            pxtransform: {
                enable: true,
                config: {}
            },
            url: {
                enable: true,
                config: {
                    limit: 1024 // 设定转换尺寸上限
                }
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: "module", // 转换模式，取值为 global/module
                    generateScopedName: "[name]__[local]___[hash:base64:5]"
                }
            }
        }
    },
    next: {
        publicPath: "/",
        staticDirectory: "static",
        router: {
            mode: "browser",
            customRoutes: {
                "/pages/index/index": ["/", "/home"],
                "/pages/post/index": "/post"
            }
        }
    }
};

module.exports = function(merge) {
    if (process.env.NODE_ENV === "development") {
        return merge({}, config, require("./dev"));
    }
    return merge({}, config, require("./prod"));
};
