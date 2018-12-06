import Vue from 'vue'

var component = {
    props: {
        newtext: Number
    },
    data() {
        return {
            text: 'old'
        }
    },
    mounted() {
        console.log(this.$parent.$options.name);
    },
    template: '<div>{{newtext}}{{text}}This is component</div>'
};
var component2 = {
    // 在组件内继承另一个组件, 其实就是复制粘贴所有属性，而不是有链
    extends: component,
    data() {
        return {
            text: 1
        }
    },
    mounted() {
        console.log(this.$parent.$options.name);
    }
};
var parent = new Vue({
    name: 'parent'
});
new Vue({
    // parent必须是vue实例
    parent: parent,
    name: 'rooter',
    el: '#root',
    components: {
        // 可以是一个对象
        component2, // === component2: component2
    },
    template: '<component2></component2>'
});
// 基于组件来初始化
// var compF = Vue.extend(component);
// new compF({
//     el: '#root',
//     // 只能改变值
//     propsData: {
//         newtext: 2002
//     },
//     // data会自动叠加，已有的属性覆盖
//     data: {
//         text: 'new'
//     },
//     //mounted函数内容会自动叠加
//     mounted() {
//         console.log('compF mounted');
//     },
// });