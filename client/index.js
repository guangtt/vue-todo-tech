import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

import './assets/styles/global.styl'
import createRouter from './config/router'

Vue.use(VueRouter); //让全局都能用到VueRouter
var router = createRouter();
router.beforeEach((to, from, next) => {
    // console.log('beforeEach');
    next();
    // 一般可以用来做登陆验证
    // if (to.fullPath === '/app') {
    //     next({
    //         path: '/login',
    //     })
    // } else {
    //     next();
    // }
});
router.beforeResolve((to, from, next) => {
    // console.log('beforeResolve');
    next();
});
router.afterEach((to, from, next) => {
    // console.log('afterEach');
});


// var root = document.createElement('div');
// document.body.appendChild(root);
new Vue({
    router,
    render: (h) => h(App)
}).$mount('#root'); //已经有html模板了，就可以直接挂载

