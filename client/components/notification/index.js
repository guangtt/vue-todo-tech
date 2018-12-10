import Notification from './notification.vue';
import notify from './function'

// 全局注册，在整个全局都可以使用这个component
export default (Vue) => {
    Vue.component(Notification.name, Notification);
    Vue.prototype.$notify = notify;
}