export default (context, inject) => {
  const { app, store, redirect } = context
  const user = store.state.users.user
  const blockedRoute = /\/admin\/*/g
  app.router.beforeEach((to, from, next) => {
    if (!user && to.path.match(blockedRoute)) {
      redirect(`${store.getters.getLangPathPrefix}login`)
    } else {
      next()
    }
  })
}
