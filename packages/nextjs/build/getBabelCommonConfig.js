const resolve = require.resolve

module.exports = useESModules => {
    const plugins = [
        [
            resolve('@babel/plugin-transform-typescript'),
            {
                isTSX: true
            }
        ],
        [
            resolve('@babel/plugin-transform-runtime'),
            {
                useESModules,
                version: '^7.10.4'
            }
        ]
    ]

    return {
        presets: [
            [resolve('@babel/preset-react'), {runtime: 'automatic'}],
            [
                resolve('@babel/preset-env'),
                {
                    modules: useESModules ? false : 'commonjs',
                    targets: {
                        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11']
                    }
                }
            ]
        ],
        plugins
    }
}
