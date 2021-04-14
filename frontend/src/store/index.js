import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    email: '',
    token: '',
  },
  mutations: {
    LOGOUT(state) {
      state.token = '';
      state.userId= '';
      state.email= '';
    }
  },
  actions: {
  },
  modules: {
  }
})
