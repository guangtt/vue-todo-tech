import Vue from 'vue'

var app = new Vue({
    el: '#root',
    template: '<div ref="text">{{text}}</div>', //解析为render方法
    data: {
        text: 0
    },
    beforeCreate () {
        console.log(this.$el, 'beforeCreate')
    },
    // 对数据的操作在created和mounted都行
    created () {
        console.log(this.$el, 'created')
    },
    beforeMount () {
        console.log(this.$el, 'beforeMount')
    },
    // render在beforeMount和mounted之间执行，优先级最高
    // render (h) {
    //     return h('div', {}, this.text)
    // },
    // 对DOM节点进行的操作一般在mounted
    mounted () {
        console.log(this.$el, 'mouted')
    },
    beforeUpdate () {
        console.log('beforeUpdate')
    },
    updated () {
        console.log('updated')
    },
    beforeDestroy () {
        console.log('beforeDestroy')
    },
    destroyed () {
        console.log('destroy')
    },
})

// setInterval(()=>{
//     app.text += 1;
// }, 2000)
// setTimeout(() => {
//     app.$destroy(); // 销毁组件
// }, 1000)