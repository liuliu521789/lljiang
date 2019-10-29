import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './plugins/element.js'
import axios from 'axios'
import './assets/css/global.css'
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
Vue.config.productionTip = false
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http = axios
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')