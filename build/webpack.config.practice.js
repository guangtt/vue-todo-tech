/*webpack根据是否是开发环境来配置*/

const path = require('path')
const HTMLPlugin = require('html-webpack-plugin'); //生成html文件
const webpack = require('webpack')
const merge = require('webpack-merge'); //把两个webpack配置文件融合
const baseConfig = require('./webpack.config.base') //引入config基础配置

let config;
const devServer = {
    port: 8009,
    host: 'localhost',
    overlay: {
        errors: true,
    },
    hot: true
};
const defaultPluins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"'
        }
    }),
    new HTMLPlugin({
        template: path.join(__dirname, './template.html')
    })
];
//用merge函数把两个config配置对象融合
config = merge(baseConfig, {
    entry: path.join(__dirname, '../practice/index.js'),
    module: {
        rules: [
            {
                test: /\.styl/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    'stylus-loader'
                ]
            }
        ]
    },
    devtool: '#cheap-module-eval-source-map',
    devServer,
    // import Vue from 'vue' , 指定专门版本的vue文件
    resolve: {
        alias: {
            'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
        }
    },
    plugins: defaultPluins.concat([
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin()
    ])
});
module.exports = config
