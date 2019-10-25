import Vue from 'vue'
import Router from 'vue-router'
import Login from '../comments/Login.vue'
import Home from '../comments/Home.vue'

Vue.use(Router)


const router = new Router({
    routes: [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        component: Login
    }, {
        path: '/home',
        component: Home
    }]
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    const sessionStr = window.sessionStorage.getItem('mytoken')
    if (!sessionStr) return next('/login')
    next()

})