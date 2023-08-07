import {defineConfig} from 'dumi'

const BASE_PATH = '/tarojs-plugin-ssr'

export default defineConfig({
    title: 'taror',
    base: BASE_PATH,
    outputPath: 'docs-dist',
    publicPath: `${BASE_PATH}/`,
    define: {
        BASE_PATH
    },
    extraBabelPlugins: [
        [
            'import',
            {
                libraryName: '@taror/components',
                libraryDirectory: 'src',
                style: true
            }
        ]
    ],
    themeConfig: {
        carrier: 'SyMind',
        hd: {
            rules: [{ mode: 'none' }]
        }
    }
})
