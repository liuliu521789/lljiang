import Vue from 'vue'
import Router from 'vue-router'
import Login from '../comments/Login.vue'
import Home from '../comments/Home.vue'
import Welcome from '../comments/welcome.vue'
import User from '../comments/user/user.vue'
import Role from '../comments/rule/roles.vue'

import Right from '../comments/right/right.vue'
import Good from '../comments/good/good.vue'
import Param from '../comments/param/param.vue'
import Category from '../comments/category/category.vue'
import Order from '../comments/order/order.vue'
import Report from '../comments/report/report.vue'

Vue.use(Router)
var router = new Router({
    routes: [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        component: Login
    }, {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [{
            path: '/rights',
            component: Right
        }, {
            path: '/goods',
            component: Good
        }, {
            path: '/params',
            component: Param
        }, {
            path: '/categories',
            component: Category
        }, {
            path: '/orders',
            component: Order
        }, {
            path: '/reports',
            component: Report
        }, {
            path: '/roles',
            component: Role
        }, {
            path: '/users',
            component: User
        }, {
            path: '/welcome',
            component: Welcome
        }, ]
    }]
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    var sessionStr = window.sessionStorage.getItem('token')
    if (!sessionStr) return next('/login')
    next()

})
export default router