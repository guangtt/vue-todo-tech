import Vue from 'vue'

var compOne = {
    props: [
        'value1',
    ],
    template:  `
    <div>
        <input type="text" @input="handleInput1" :value="value1">
        hello value1
    </div>
    `,
    methods: {
        handleInput1(e) {
            this.$emit('input', e.target.value)
        }
    }
};
var compTwo = {
    props: [
        'value2'
    ],
    // 通过model属性可以直接在父组件直接写v-model属性(子组件书写方式没变),更加方便也更加直观
    model: {
        prop: 'value2',
        event: 'change'
    },
    template:  `
    <div>
        <input type="text" @input="handleInput2" :value="value2">
        hello value2
    </div>
    `,
    methods: {
        handleInput2(e) {
            this.$emit('change', e.target.value)
        }
    }
};
new Vue({
    components: {
        compOne,
        compTwo
    },
    el: '#root',
    data: {
        value1: 'value1',
        value2: 'value2'
    },
    // 两种子组件实现v-model的方法
    template: `
        <div>
            <comp-one @input="value1 = arguments[0]" :value1="value1"></comp-one>
            <comp-two v-model="value2"></comp-two>
        </div>
    `
})