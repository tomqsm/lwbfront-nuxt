export default (context, inject) => {
  const { app, store, redirect } = context
  const blockedRoute = /\/admin\/*/g
  app.router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['users/isAuthenticated']
    console.log(`is user authenticated: ${isAuthenticated}`)
    const isPathBlocked = to.path.match(blockedRoute)
    if (!isAuthenticated && isPathBlocked) {
      redirect(`${store.getters.getLangPathPrefix}login`)
    } else if (isAuthenticated && isPathBlocked && !to.query.id) {
      next({ path: to.path, query: { id: store.getters['users/getUser'].xa } })
    } else {
      next()
    }
  })
}
