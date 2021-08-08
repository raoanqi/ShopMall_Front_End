import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from "@/router"
import HttpPlugin from '@/http-plugin'
import catchError from "@/catchError"
import store from "@/store"

import './assets/style/common.less'

Vue.use(ElementUI)
Vue.use(HttpPlugin)

Vue.prototype.$catchHttpError = catchError

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
