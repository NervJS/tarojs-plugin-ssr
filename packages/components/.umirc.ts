import {defineConfig} from 'dumi'

export default defineConfig({
    title: 'taror',
    outputPath: 'docs-dist',
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
        hd: {
            rules: [{ mode: 'none' }]
        }
    }
})
