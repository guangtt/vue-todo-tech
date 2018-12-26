import Router from 'vue-router';
import routes from './routes';

export default () => {
    return new Router({
        routes,
        // mode: 'history',
        // base: '/base/',
        // linkActiveClass: 'active-link', //部分匹配就会加上的class
        // linkExactActiveClass: 'exact-active-link' //完全匹配的时候才会加上的lcass
        // 如果滚动条有位置信息，那就保存现在滚动条的状态
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                return {
                    x: 0,
                    y: 0
                }
            }
        },
        // query是一个字符串
        // parseQuery(query) {
        // },
        // obj是一个对象
        // stringifyQuery(obj) {
        // },
        // 前端路由跳转时不刷新页面
        fallback: true
    });
};