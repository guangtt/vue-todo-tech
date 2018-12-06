import Vue from 'vue'

var app = new Vue({
    el: '#root',
    template: `
    <div>
        <p v-pre>{{text}}</p> <!-- v-pre代表不解析内容 -->
        <p v-once>{{text}}</p> <!-- v-once代表只渲染一次 -->
        <p v-if="active">hello Justin</p>
        <p v-if="text == 1">Hello Netease</p>
        <p v-else>0&1?</p>  <!-- v-else会找最近的v-if做适配 -->
        <input type="text" v-model.number.trim="text">
    </div> 
    `,
    data: {
        text: 0,
        active: true
    },
})