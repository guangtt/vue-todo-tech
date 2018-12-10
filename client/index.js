import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'
// 引入全局注册notification的index.js，就可以在全局使用
import Notification from './components/notification/index'
Vue.use(Notification);

Vue.use(Vuex);
Vue.use(VueRouter); //让全局都能用到VueRouter
var router = createRouter();
var store = createStore();


// 监测第一个方法改变的值，返回给第二个方法
// store.watch((state) => {
//     return state.count + 1
// }, (newCount) => {
//     console.log('new count watched', newCount);
// });
// 监听目前正在被调用的mutation
// store.subscribe((mutation, state) => {
//     console.log(mutation.type)
//     console.log(mutation.payload)
// });
// 监听目前正在被调用的action
// store.subscribeAction((action, state) => {
//     console.log(action.type);
//     console.log(action.payload);
// })

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
    store,
    render: (h) => h(App)
}).$mount('#root'); //已经有html模板了，就可以直接挂载

