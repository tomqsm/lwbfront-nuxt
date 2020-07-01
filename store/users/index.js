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
        })
        .catch((e) => {
          console.error('Invalid token revication.', e)
        })
    }
  }
}
