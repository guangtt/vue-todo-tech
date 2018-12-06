import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '/app',
        component: Todo,
        name: 'app',
        // 可以在routes对象中拿到的信息
        meta: {
        },
        children: [
            {
                path: 'test',
                component: Login
            }
        ]
    },
    {
        path: '/login',
        component: Login
    },
    // {
    //     path: '/login/exact',
    //     component: Login
    // }
]