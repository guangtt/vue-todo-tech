const Koa = require('koa');
const KoaBody = require('koa-body');
const apiRouter = require('./routers/api');
const creatDb = require('./db/db');
const config = require('../app.config');
const db = creatDb(config.db.appId, config.db.appKey);

const app = new Koa();
// const pageRouter = require('./routers/dev-ssr');
const isDev = process.env.NODE_ENV === 'development';

app.use(async (ctx, next) => {
    try {
        console.log(`request with path ${ctx.path}`);
        await next();
    } catch (err) {
        console.log(err);
        ctx.status = 500;
        if(isDev) {
            ctx.body = err.message;
        }else {
            ctx.body = 'please try again later'
        }
    }
})
app.use(async (ctx, next) => {
    ctx.db = db;
    await next();
})
app.use(KoaBody());
// app.use(pageRouter.routes()).use(pageRouter.allowedMethods()); // ssr学到5-3，mfs有报错，不知道怎么解决
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());


const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3333;
app.listen(PORT, HOST, () => {
    console.log(`server is listening on ${HOST}:${PORT}`)
})