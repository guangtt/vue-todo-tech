<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <!--<p>{{counter}}</p>-->
        <!--<p>{{fullName}}</p>-->
        <router-link to="/app">app</router-link>
        <router-link to="/app/test">app/test</router-link>
        <router-link to="/login">login</router-link>
        <!--<todo></todo>-->
        <transition name="fade">
            <router-view></router-view>
        </transition>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from './layout/header.vue'
    import Footer from './layout/footer.jsx'
    import Todo from './views/todo/todo.vue'
    // import Notification from './components/notification/notification.vue'

    import {
        mapState,
        mapGetters,
        mapActions,
        mapMutations
    } from 'vuex'

    export default {
        data() {
            return {
                num: 0
            }
        },
        components: {
            Header,
            Footer,
            Todo,
        },
        mounted() {
            // console.log(this.$store);
            this.updateCountASync({
                number: 5,
                time: 1000
            });
            // this.$notify({
            //     content: 'hello world',
            //     btn: 'close'
            // })
        },
        computed: {
            ...mapState({
                counter: 'count'
            }),
            ...mapGetters(['fullName'])
        },
        methods: {
            ...mapActions(['updateCountASync']),
            ...mapMutations(['updateCount'])
        }
    }
</script>

<style lang="stylus" scoped>
    #app {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }

    #cover {
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        background-color #999
        opacity .9
        z-index -1
    }
</style>


