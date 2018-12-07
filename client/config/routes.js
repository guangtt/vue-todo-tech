// import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
    {
        path: '/',
        redirect: '/app'
    },
    {
        // path: '/app/:id',
        path: '/app',
        // props: true, // 把id作为props属性直接传入Todo组件
        name: 'app',
        // 可以在routes对象中拿到的信息
        meta: {
            title: 'this is title meta'
        },
        beforeEnter(to, from, next) {
            // console.log('beforeEnter app');
            next();
        },
        component: () => import('../views/todo/todo.vue'), // 需要用到这个组件的时候再加载，需要babel插件
        children: [
            {
                path: 'test',
                component: Login,
                beforeEnter(to, from, next) {
                    // console.log('beforeEnter app/test');
                    next();
                },
            }
        ]
    },
    {
        path: '/login',
        component: Login,
        children: [
            {
                path: 'test',
                component: Login
            }
        ]
    }
    // {
    //     path: '/login/exact',
    //     component: Login
    // }
]