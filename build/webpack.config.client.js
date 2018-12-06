/*webpack根据是否是开发环境来配置*/

const path = require('path')
const HTMLPlugin = require('html-webpack-plugin'); //打包出一个html文件，使得整个项目有个html入口
const webpack = require('webpack')
const merge = require('webpack-merge'); //把两个webpack配置文件融合
const ExtractPlugin = require('extract-text-webpack-plugin')

const baseConfig = require('./webpack.config.base') //引入config基础配置
const isDev = process.env.NODE_ENV === 'development'

let config;
const devServer = {
    port: 2002,
    host: 'localhost',
    overlay: {
        errors: true,
    },
    historyApiFallback: { // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
        index: '/index.html' //与output的publicPath有关(HTMLplugin生成的html默认为index.html)
    },
    hot: true
};
const defaultPluins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin({
        template: path.join(__dirname, 'template.html') //为生成的html文件设置模板
    })
];

if (isDev) {
    //用merge函数把两个config配置对象融合
    config = merge(baseConfig, {
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
        plugins: defaultPluins.concat([
            new webpack.HotModuleReplacementPlugin(),
            // new webpack.NoEmitOnErrorsPlugin()
        ])
    });
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/index.js'),
            // vendor: ['vue']
        },
        output:{
            filename: '[name].[chunkhash:8].js'
        },
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
        // 把公用代码单独打包成文件
        optimization: {
            splitChunks: {
                chunks: 'all'
            },
            runtimeChunk: true
        },
        plugins: defaultPluins.concat([
            new ExtractPlugin('styles.[Hash:8].css'),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'vendor'
            // }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'runtime'
            // })
        ])
    })
}

module.exports = config
