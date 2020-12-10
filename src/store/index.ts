import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 实现数据共享，但是不持久化
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null') // 当前登录用户
  },
  mutations: {
    // 修改state，必须经过mutation
    setUser(state, payload) {
      state.user = JSON.parse(payload)

      // 将user数据持久化,注意！本地存储 只能存储字符串
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
