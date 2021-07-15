import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  codes: '',
  asideShow: true,
  navShow: true,
  isRenderRefresh: false
}

const mutations = {
  RECEIVE_CODES(state, val) {
    state.codes = val
  },
  RECEIVE_ASIDE(state, val) {
    state.asideShow = val
  },
  RECEIVE_NAV(state, val) {
    state.navShow = val
  },
  RECEIVE_REFRESH(state, val) {
    state.isRenderRefresh = val
  }
}

const actions = {}


const getters = {}


const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

export default store
