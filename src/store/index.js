import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    order:[
      
    ]
  },
  mutations: {
    pushOrder(state, payload) {
      state.order.push(payload)
    }
  },
  actions: {
    addOrder(context, payload) {
      context.commit('pushOrder',payload)
    }
  },
  modules: {
  }
})
