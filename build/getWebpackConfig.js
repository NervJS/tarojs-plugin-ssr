const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {getComponentsProjectPath} = require('./projectHelper')

function getWebpackConfig(useESModules) {
    const babelConfig = require('./getBabelCommonConfig')(useESModules)

    const config = {
        mode: 'production',

        entry: {
            lilin: [path.resolve(__dirname, './webpackEntry.js')]
        },

        devtool: 'source-map',

        output: {
            path: getComponentsProjectPath('./dist/'),
            filename: '[name].js',
            library: 'lilin',
            libraryTarget: 'umd'
        },

        resolve: {
            extensions: [
                '.ts',
                '.tsx',
                '.js',
                '.jsx',
                '.json'
            ]
        },

        externals: {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            }
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: babelConfig
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: babelConfig
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: ['autoprefixer']
                                },
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.s(a|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: ['autoprefixer']
                                },
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'resolve-url-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/inline'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/inline'
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        ]
    }

    return config
}

module.exports = getWebpackConfig
