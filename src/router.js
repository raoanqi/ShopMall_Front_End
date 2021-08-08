import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "@/components/Login"
import Home from "@/components/Home"
import Welcome from "@/components/Welcome"
import User from "@/components/User/User"
import Role from "@/components/Permission/Role"
import Rights from "@/components/Permission/Rights"
import Goods from "@/components/Goods/Goods"
import Param from "@/components/Goods/Param"
import Classify from "@/components/Goods/Classify"
import Order from "@/components/Order/Order"
import Reports from "@/components/Statistics/Reports"


Vue.use(VueRouter)

// 路由对象
const router = new VueRouter({
    routes: [
        // 访问此路由，重定向到login页面
        {path: '/', redirect: 'login'},
        {path: '/login', component: Login},
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                {path: '/welcome', component: Welcome},
                {path: '/users', component: User},
                {path: '/roles', component: Role},
                {path: '/rights', component: Rights},
                {path: '/goods', component: Goods},
                {path: '/params', component: Param},
                {path: '/categories', component: Classify},
                {path: '/orders', component: Order},
                {path:'/reports', component: Reports}
            ]
        }
    ]
})

//设置路由守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        return next()
    }
    // 对于其他的路径，如果发现没有token，就直接跳转到login
    const token = window.sessionStorage.getItem('token')
    if (!token) {
        return next('/login')
    }
    next()
})

//导出路由对象
export default router