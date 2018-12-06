import Vue from 'vue'

var app = new Vue({
    el: '#root',
    template: `
    <div :style="[styles]"">
        <p>{{joinedArr}}</p>
    </div>
    `,
    data: {
        isActive: false,
        arr: [1,2,3],
        html: '<span>124</span>',
        styles: {
            color: 'red',
            display: 'flex',
            appearance: 'none'
        }
    },
    computed: {
        joinedArr(){
            return this.arr.join('J');
        }
    }
})