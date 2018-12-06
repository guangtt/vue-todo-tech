import Vue from 'vue'

var app = new Vue({
    el: '#root',
    template: `
    <div >
        <p>{{wholeName}}</p>
        <p>{{getName()}}</p>
        <p>{{number}}</p>
        <p>{{fullName}}</p>
        <p><input type="text" v-model="number"></p>
        <p><input type="text" v-model="firstName"></p>
        <p><input type="text" v-model="obj.a"></p>
    </div>
    `,
    data: {
        firstName: 'Huang',
        lastName: 'Ming Hao',
        number: 0,
        fullName: '',
        obj: {
            a: 122
        }
    },
    // computed只有在依赖的数据发生改变时才会重新计算
    computed: {
        wholeName (){
            // console.log('hello computed');
            return `${this.firstName} ${this.lastName}`;
        }
    },
    // methods在每次渲染时都会重新计算
    methods: {
        getName (){
            // console.log('hello methods');
            return `${this.firstName} ${this.lastName}`;
        }
    },
    // watch只有在依赖属性发生改变的时候才执行，最开始不会初始化计算
    watch: {
        // firstName (newName, oldName){
        //     this.fullName = `${newName} && ${oldName}`
        // }
        obj: {
            handler (){
                console.log('obj.a changed');
            },
            immediate: true,  // 执行初始化计算
            // deep: true // 监听对象里的所有子属性，消耗性能较大，可以通过直接监听子属性
        }
    }
})