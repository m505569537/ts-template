const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const modifyVars = require('./config/modifyVars');

module.exports = (env) => {
    let config = {
        mode: env == 'development' ? 'development' : 'production',
        entry: {
            app: './src/index.js'
        },
        output: {
            filename: env == 'development' ? 'js/[name].dev.js' : '[name].[chunkhash:8].js',
            chunkFilename: env == 'development' ? 'js/[name].dev.js' : '[name].[chunkhash:8].js',
            path: path.resolve(__dirname, 'dist')
        },
        devServer: {
            hot: true,
            open: true,
            port: 8080,
            contentBase: './dist/',
            compress: true,
            quiet: true
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.(css|less)$/,
                    use: [
                        'css-hot-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                javascriptEnabled: true,
                                sourceMap: true,
                                modifyVars
                            }
                        }
                    ]
                },
                {
                    test: /\.js[x]?$/,
                    // 支持javascript按需加载antd
                    use: {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                ['import', {
                                    libraryName: 'antd',
                                    libraryDirectory: 'lib',
                                    style: true
                                }]
                            ]
                        }
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.ts[x]?$/,
                    // 支持typescript按需加载antd
                    loader: "awesome-typescript-loader",
                    options: {
                        useCache: true,
                        useBabel: false,
                        getCustomTransformers: () => ({
                            before: [tsImportPluginFactory({
                                libraryName: 'antd',
                                libraryDirectory: 'lib',
                                style: true
                            })]
                        })
                    }

                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                title: '',
                filename: 'index.html',
                template: 'index.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyCSS: true
                }
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env)
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: env == 'development' ? 'css/[name].dev.css' : '[name].[chunkhash:8].css',
                chunkFilename: env == 'development' ? 'css/[name].dev.css' : '[name].[chunkhash:8].css'
            })
        ],
        devtool: 'cheap-eval-source-map',
        optimization: {
            splitChunks: {
                chunks: 'all',
                name: 'vendor'
            }
        }
    };

    return config;
};