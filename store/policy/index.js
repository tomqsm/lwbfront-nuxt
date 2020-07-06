export const state = () => ({
  cp: {
    ack: false
  }
})

export const mutations = {
  setCookiePolicy(state, value) {
    state.cp.ack = value.ack
  }
}

export const getters = {}

export const actions = {
  findCookiesPolicy({ commit }) {
    const cpack = localStorage.getItem('cpack')
    if (cpack != null && cpack === 'true') {
      commit('setCookiesPolicy', true)
    }
  }
}
