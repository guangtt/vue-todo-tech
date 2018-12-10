<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <button @click="notify">just</button>
        <!--<p>{{counter}}</p>-->
        <!--<p>{{fullName}}</p>-->
        <!--<router-link to="/app">app</router-link>-->
        <!--<router-link to="/app/test">app/test</router-link>-->
        <!--<router-link to="/login">login</router-link>-->
        <!--<router-link to="/login/exact">login exact</router-link>-->
        <!--<todo></todo>-->
        <transition name="fade">
            <router-view></router-view>
        </transition>
        <router-view name="a"></router-view>
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
        },
        computed: {
            ...mapState({
                counter: 'count'
            }),
            ...mapGetters(['fullName'])
        },
        methods: {
            ...mapActions(['updateCountASync']),
            ...mapMutations(['updateCount']),
            notify() {
                this.$notify({
                    content: 'hello justin',
                    btn: ++this.num + 'close'
                })
            }
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


