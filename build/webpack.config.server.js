/*webpack根据是否是开发环境来配置*/

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge'); //把两个webpack配置文件融合
const baseConfig = require('./webpack.config.base') //引入config基础配置
const ExtractPlugin = require('extract-text-webpack-plugin');
const VueServerPlugin = require('vue-server-renderer/server-plugin') //打包输出json文件，vue提供的有关ssr的插件


let config;
//用merge函数把两个config配置对象融合
config = merge(baseConfig, {
    target: 'node',
    entry: path.join(__dirname, '../client/server-entry.js'),
    output: {
        libraryTarget: 'commonjs2', //设置模块的系统是commonjs
        filename: 'server-entry.js',
        path: path.join(__dirname, '../server-build')
    },
    externals: Object.keys(require('../package.json').dependencies), // 不去打包这一部分文件
    module: {
        rules: [
            {
                test: /\.styl/,
                use: ExtractPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        'stylus-loader'
                    ]
                })
            },
        ]
    },
    devtool: 'source-map',
    plugins: [
        new ExtractPlugin('styles.[Hash:8].css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        new VueServerPlugin()
    ]
});
module.exports = config
