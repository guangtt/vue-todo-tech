const Router = require('koa-router');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const MemoryFS = require('memory-fs'); //编译文件不会被放到磁盘里，会放到这个提供的memory里。
const webpack = require('webpack');
const VueServerRenderer = require('vue-server-renderer');

const serverRender = require('./server-render');
const serverConfig = require('../../build/webpack.config.server');

const serverCompiler = webpack(serverConfig);
const mfs = new MemoryFS();
serverCompiler.outputFileSystem = mfs; //指定webpack打包输出的文件为mfs

let bundle;
// 文件有更改，自动执行打包。
serverCompiler.watch({}, (err, stats) => {
    if(err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.log(err)); // 不是打包过程中出现的错误就会存在这里
    stats.warnings.forEach(warn => console.warn(warn));

    const bundlePath = path.join(
        serverConfig.output.path,
        'vue-srr-server-bundle.json'
    );
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
    console.log('new bundle generating...');
})
const handleSSR = async (ctx) => {
    if(!bundle) {
        ctx.body = 'wait a minute';
        return;
    }
    // 因为只渲染了html，所以其他静态文件引用的是客户端的，所以需要获取文件路径
    const clientManifestResp = await axios.get(
        'http://127.0.0.1:2002/vue-ssr-client-manifest.json'
    )
    const clientManifest = clientManifestResp.data;

    // 因为打包的只是body里的内容，所以需要模板
    const template = fs.readFileSync(
        path.join(__dirname, '../server.template.ejs')
    )
    const renderer = VueServerRenderer(
        createBundleRenderer(bundle, {
            inject: false // 不使用官方的默认操作
        })
    )
    await serverRender(ctx, renderer, template);
}
const router = new Router();
router.get('*', handleSSR);

module.exports = router;
