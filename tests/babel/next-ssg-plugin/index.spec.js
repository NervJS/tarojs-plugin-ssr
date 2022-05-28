const path = require('path')
const pluginTester = require('babel-plugin-tester').default
const nextSSGPlugin = require('tarojs-plugin-platform-nextjs/babel/taro-ssg-plugin')

const trim = s => s.join('\n').trim().replace(/^\s+/gm, '')

pluginTester({
    plugin: nextSSGPlugin,
    pluginName: 'taro-ssg-plugin',
    babelOptions: {
        plugins: ['@babel/plugin-syntax-jsx']
    },
    pluginOptions: {
        transformAll: true
    },
    fixtures: path.join(__dirname, '__fixtures__'),
    tests: [
        {
            code: trim`
                export function getStaticProps() {}
                export function getServerSideProps() {}
            `,
            error: 'You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps'
        },
        {
            code: trim`
                export function getServerSideProps() {}
                export function getStaticProps() {}
            `,
            error: 'You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps'
        },
        {
            code: trim`
                export function getStaticPaths() {}
                export function getServerSideProps() {}
            `,
            error: 'You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps'
        },
        {
            code: trim`
                export function getStaticPaths() {}
                export function getServerSideProps() {}
            `,
            error: 'You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps'
        }
    ]
})
