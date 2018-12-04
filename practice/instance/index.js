import Vue from 'vue'

const app = new Vue({
    el: '#root',
    template: '<div>this is {{text}} and {{obj.a}}</div>',
    data: {
        text: 1,
        content: 'hello justin',
        obj: {

        }
    },
    watch: {
        // 如果两个地方都监听同一个属性，那事件会自动叠加
        text(newText, oldText) { }
    }
});
setInterval(()=>{
    // app.$data.text += 1; // app.$data.text === app.text
    app.$set(app.obj, 'a', 1); // 本来对象没有属性时，可以用$set方法重新创建
    // app.$delete(); // 安全删除掉属性，确保删除能触发视图的更新
    // $nextTick表示在dom节点刷新完毕之后
    // app.$nextTick(function () {
    //
    // });
}, 1000)
// app.$mount('#root');
// console.log(app.$data); // obj
// console.log(app.$data.text == app.text); // true
// console.log(app.$root === app); // true
// app.$watch('text', (newText, oldText)=>{
//      console.log(`${newText} : ${oldText}`);
// })
// app.$forceUpdate(); // 让组件强制重新渲染一次
