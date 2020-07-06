import axios from 'axios'
export default (context, inject) => {
  const checkLang = (path) => {
    const locales = store.state.locales
    const found = locales.find((item) =>
      path.toString().startsWith(`/${item}/`)
    )
    return found ? `/${found}/login` : '/login'
  }
  const { app, store, redirect } = context

  const isAuthenticated = store.getters['users/isAuthenticated'] // this is false
  const blockedRoute = /\/admin\/*/g
  app.router.beforeEach((to, from, next) => {
    const xa = to.query.id
    if (xa) {
      axios
        .post(
          'https://europe-west3-lwb-system.cloudfunctions.net/rest-widgets/api/verify',
          { uid: 'state.user.uid' },
          {
            headers: {
              Authorization: `Bearer ${xa}`
            }
          }
        )
        .then((result) => {
          console.log('result')
          console.log(result)
          store.commit('users/setUser', {
            user: {
              xa
            }
          })
        })
        .catch((e) => {
          // http call to revoke token
          console.error('Invalid token revocation.', e)
        })
    }
    if (!isAuthenticated && to.path.match(blockedRoute)) {
      redirect(checkLang(to.path))
    } else {
      next()
    }
  })
  return store.getters['users/isAuthenticated']
}
