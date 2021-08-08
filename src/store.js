import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        menuList: []
    },
    mutations: {
        setMenuListMutation(state, res) {
            state.menuList = res.data
        }
    },
    actions: {
        async getMenuListAction(context) {
            const {data: res} = await Vue.http.get(`menus`)
            context.commit('setMenuListMutation', res)
        }
    },
    getters: {}
})

export default store