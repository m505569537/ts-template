const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { ModuleFederationPlugin } = webpack.container;

module.exports = {
  mode: 'development',
  // 配置入口文件
  entry: './src/index.tsx',
  // 配置出口
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash:6].js',
    chunkFilename: 'chunks/[name].[contenthash:6].js',
    publicPath: 'auto' // 'auto' 或者 '/' ，这个属性对于请求外部资源非常重要，如果路径错误，会报404错误
  },
  // 解析
  resolve: {
    // 省略扩展名
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // 设置路径别名
    alias: {}
  },
  devServer: {
    port: 2335,
    hot: true,
  },
  module: {
    rules: [
      {
        // 配置 ts 和 js文件 loader
        test: /\.(t|j)sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              [
                // 配置按需加载
                'import', {
                  libraryName: 'antd',
                  style: true
                }
              ]
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(c|le)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:6]'
              }
            }
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 自动生成html模板，内部实现了html文件的解析，否则需要添加额外的loader来处理html文件
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css',
      chunkFilename: 'css/[id].[contenthash:6].css',
      ignoreOrder: true
    })
  ]
}