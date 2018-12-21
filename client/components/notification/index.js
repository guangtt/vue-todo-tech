import Notification from './notification.vue';
import notify from './function'

export default (Vue) => {
    // 全局注册，在整个全局都可以使用这个component
    Vue.component(Notification.name, Notification);
    Vue.prototype.$notify = notify;
}