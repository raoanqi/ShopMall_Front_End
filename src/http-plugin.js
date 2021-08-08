import axios from 'axios'

axios.defaults.timeout = 60000
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

axios.interceptors.request.use((config) => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})

export default {
    install: function (Vue) {
        Vue.http = axios
        Object.defineProperty(Vue.prototype, '$http', {
            value: axios
        })
    }
}