export const state = () => ({
  email: null,
  password: null,
  user: null
})

export const mutations = {
  updateEmail(state, email) {
    state.email = email
  },
  updatePassword(state, password) {
    state.password = password
  },
  setUser(state, data) {
    const { uid, email, emailVerified, refreshToken } = data
    state.user = { uid, email, emailVerified, refreshToken }
  },
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    const { uid, email, emailVerified, refreshToken } = authUser
    // eslint-disable-next-line camelcase
    const { auth_time, exp } = claims
    state.user = { uid, email, emailVerified, refreshToken, auth_time, exp }
  }
}

export const getters = {
  getUser: (state) => {
    return state.user
  },
  getEmail: (state) => {
    return state.email
  },
  getPassword: (state) => {
    return state.password
  }
}

export const actions = {
  signInWithEmailAndPassword({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$fireAuth
        .signInWithEmailAndPassword(data.email, data.password)
        .then((data) => {
          resolve(data)
          // commit('updatePassword', '')
          // commit('updateEmail', '')
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
