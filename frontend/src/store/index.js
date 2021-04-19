import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    token: '',
  },
  mutations: {
    LOGOUT(state) {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      state.token = '';
      state.userId= '';
    }
  },
  actions: {
  },
  modules: {
  }
})
