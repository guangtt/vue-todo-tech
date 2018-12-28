const Router = require('koa-router');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const MemoryFS = require('memory-fs'); //编译文件不会被放到磁盘里，会放到这个提供的memory里。
const webpack = require('webpack');
const VueServerRenderer = require('vue-server-renderer');

const serverConfig = require('../../build/webpack.config.server');

const serverCompiler = webpack(serverConfig);
const mfs = new MemoryFS();
serverCompiler.outputFileSystem = mfs; //指定webpack打包输出的文件为mfs

let bundle;
// 文件有更改，自动执行打包。
serverCompiler.watch({}, (err, stats) => {
    if(err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.log(err));
    stats.warnings.forEach(warn => console.warn(warn));
    const bundlePath = path.join(
        serverConfig.output.path,
        'vue-srr-server-bundle.json'
    );
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
})
const handleSSR = async (ctx) => {
    if(bundle) {
        ctx.body = 'wait a minute';
        return;
    }
    const template = fs.readFileSync(
        path.join(__dirname, '../server.template.ejs')
    )
    const renderer = VueServerRenderer(
        createBundleRenderer(bundle, {
            inject: false
        })
    )
}