<template>
    <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
        <div class="notification" :style="style" v-show=visible @mouseenter="clearTimer" @mouseleave="createTimer">
            <span class="content">{{content}}</span>
            <a @click="handleClose" class="btn" href="javascript:void(0)">{{ btn }}</a>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Notification',
        props: {
            content: {
                type: String,
                required: true
            },
            btn: {
                type: String,
                default: '关闭'
            }
        },
        data() {
            return {
                visible: true
            }
        },
        computed: {
            style() {
                return {}
            }
        },
        methods: {
            handleClose(e) {
                e.preventDefault();
                this.$emit('close');
            },
            afterLeave() {
                this.$emit('closed');
            },
            afterEnter() {

            },
            clearTimer() {

            },
            createTimer() {

            }

        }
    }
</script>

<style scoped>
    .notification {
        display: flex;
        background-color: #303030;
        color: rgba(255, 255, 255, 1);
        align-items: center;
        padding: 20px;
        position: fixed;
        min-width: 280px;
        flex-wrap: wrap;
        transition: all .3s;
    }

    .content {
        padding: 0;
    }

    .btn {
        color: #ff4081;
        padding-left: 24px;
        margin-left: auto;
        cursor: pointer;
    }
</style>