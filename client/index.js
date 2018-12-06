import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

import './assets/styles/global.styl'
import createRouter from './config/router'

Vue.use(VueRouter); //让全局都能用到VueRouter
var router = createRouter();
// var root = document.createElement('div');
// document.body.appendChild(root);
new Vue({
    router,
    render: (h) => h(App)
}).$mount('#root'); //已经有html模板了，就可以直接挂载

