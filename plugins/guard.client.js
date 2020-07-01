export default (context, inject) => {
  const { app, store, redirect } = context
  const blockedRoute = /\/admin\/*/g
  app.router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['users/isAuthenticated']
    console.log(`is user authenticated: ${isAuthenticated}`)
    if (!isAuthenticated && to.path.match(blockedRoute)) {
      redirect(`${store.getters.getLangPathPrefix}login`)
    } else {
      next()
    }
  })
}
