// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
const getBabelConfig = () => {
    if (process.env.TARO_SSR !== "true") {
        return require("./babel.mini.config");
    }
    return {
        presets: [
            [
                "tarojs-plugin-platform-nextjs/babel/after",
                {
                    taroPages: ["/pages/index/index", "/pages/stars/index"]
                }
            ],
            "next/babel",
            [
                "tarojs-plugin-platform-nextjs/babel/before",
                {
                    nextAppFilePath: "pages/_app.jsx",
                    outputAppFilePath: "src/app.tsx"
                }
            ]
        ]
    };
};
module.exports = getBabelConfig();
