import Vue from 'vue'

var child = {
    template: '<div>son</div>',
    inject: ['yeye'],
    mounted() {
        console.log(this.yeye);
    }
};
var component = {
    name: 'comp',
    components: {
        child
    },
    template: `
    <div>
        <p :style="style">This is component</p>
        <slot :style="style" name="footer"></slot> <!-- slot的class无效-->
        <slot :text="text" number="11"></slot>
        <child></child>
    </div>
    `,
    data() {
        return {
            style: {
                color: 'red'
            },
            text: 'aaa'
        }
    }
};

new Vue({
    el: '#root',
    // 跨层级，例如爷爷和孙子组件的通信。但是通过这个方式向外传递的属性只渲染一次，官方没有提供响应式。
    provide() {
        return {
            yeye: this
        }
    },
    components: {
        compOne: component
    },
    template: `
    <comp-one ref="comp">
        <p slot="footer" ref="footer">this is footer</p>
        <p slot-scope="props">{{props.number}}{{props.text}}</p>
    </comp-one>
    `,
});