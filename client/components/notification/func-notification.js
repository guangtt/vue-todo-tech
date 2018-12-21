import Notification from './notification.vue'

//对于notification组件的额外属性，用于动态创建notification组件
export default {
    extends: Notification, //extends,继承父组件（相当于复制粘贴）
    computed: {
        style() {
            return {
                position: 'fixed',
                right: '20px',
                bottom: `${this.verticalOffset}px`
            }
        }
    },
    mounted (){
        this.createTimer();
    },
    data() {
        return {
            verticalOffset: 0,
            autoClose: 5000,
            height: 0,
            visible: false
        }
    },
    methods: {
        createTimer() {
            if(this.autoClose){
                this.timer = setTimeout(() => {
                    this.visible = false;
                }, this.autoClose)
            }
        },
        clearTimer() {
            if(this.timer){
                clearTimeout(this.timer);
            }
        },
        afterEnter() {
            this.height = this.$el.offsetHeight;
        }
    },
    // 销毁组件前销毁计时器
    beforeDestroy() {
        this.clearTimer();
    }
}