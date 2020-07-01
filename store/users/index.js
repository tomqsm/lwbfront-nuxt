export const state = () => ({
  email: null,
  password: null,
  user: null
})

export const mutations = {
  setEmail(state, email) {
    state.email = email
  },
  setPassword(state, password) {
    state.password = password
  },
  setUser(state, data) {
    if (data) {
      if (!state.user) {
        state.user = {}
      }
      // xa is the jwt token needed for a logout
      const { uid, email, emailVerified, refreshToken, xa } = data.user
      state.user = { uid, email, emailVerified, refreshToken, xa }
    } else {
      state.user = data
    }
  },
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (authUser && claims) {
      const { uid, email, emailVerified, refreshToken, xa } = authUser
      // eslint-disable-next-line camelcase
      const { auth_time, exp } = claims
      state.user = {
        uid,
        email,
        emailVerified,
        refreshToken,
        auth_time,
        exp,
        xa
      }
    }
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
  },
  isAuthenticated: (state) => {
    return state.user ? state.user.xa != null : false
  }
}

export const actions = {
  signInWithEmailAndPassword({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$fireAuth
        .signInWithEmailAndPassword(data.email, data.password)
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.user) {
        this.$axios
          .$post(
            'https://europe-west3-lwb-system.cloudfunctions.net/rest-widgets/api/signout',
            { uid: state.user.uid },
            {
              headers: {
                Authorization: `Bearer ${state.user.xa}`
              }
            }
          )
          .then((result) => {
            commit('setUser', null)
            commit('setEmail', null)
            commit('setPassword', null)
            resolve(result)
          })
          .catch((e) => {
            console.error('Invalid token revocation.', e)
            reject(e)
          })
      }
    })
  }
}
