import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    identity:''
  },
  mutations: {
    changeiden(state,payload){
      // console.log(payload.identity);
      state.identity=payload.identity
      // console.log(state.identity);
    }
  },
  actions: {
  },
  modules: {
  }
})
