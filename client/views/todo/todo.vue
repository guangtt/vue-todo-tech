<template>
    <section class="real-app">
        <input
                type="text"
                class="add-input"
                autofocus="autofocus"
                placeholder="接下去要做什么？"
                @keyup.enter="addTodo"
        >
        <item
                :todo="todo"
                v-for="todo in filteredTodos"
                :key="todo.id"
                @del="deleteTodo"
        />
        <tabs
                :filter="filter"
                :todos="todos"
                @toggle="toggleFilter"
                @clearAllCompleted="clearAllCompleted"
        />
        <router-view/>
    </section>
</template>

<script>
    import Item from './item.vue'
    import Tabs from './tabs.vue'

    let id = 0
    export default {
        data() {
            return {
                todos: [],
                filter: 'all'
            }
        },
        props: ['id'],
        components: {
            Item,
            Tabs,
        },
        // 导航守卫拿不到this，也就是vue实例，要通过next函数拿取
        // 只有enter不能访问this，因为还没进来，组件还没完全被创建，所以有一个特定的回调函数和参数vm
        beforeRouteEnter(to, from, next) {
            // console.log('beforeRouteEnter todo');
            next(vm => {
                // console.log(`vm.filter is ${vm.filter}`)
            });
        },
        // 只要要切换的组件有相同的部分，就会触发update组件
        // 相同组件的切换不会触发mouted
        beforeRouteUpdate(to, from, next) {
            // console.log('beforeRouteUpdate todo');
            // console.log(this.filter);
            next();
        },
        beforeRouteLeave(to, from, next) {
            console.log('beforeRouteLeave todo');
            next();
        },
        // mounted (){
        //     console.log(this.id);
        // },
        computed: {
            filteredTodos() {
                if (this.filter === 'all') {
                    return this.todos
                }
                const completed = this.filter === 'completed'
                return this.todos.filter(todo => completed === todo.completed)
            }
        },
        methods: {
            addTodo(e) {
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false
                })
                e.target.value = ''
            },
            deleteTodo(id) {
                this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
            },
            toggleFilter(state) {
                this.filter = state
            },
            clearAllCompleted() {
                this.todos = this.todos.filter(todo => !todo.completed)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .real-app {
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }

    .add-input {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 60px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }
</style>


