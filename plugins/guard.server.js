export default (context, inject) => {
  const checkLang = (path) => {
    const locales = store.state.locales
    const found = locales.find((item) =>
      path.toString().startsWith(`/${item}/`)
    )
    return found ? `/${found}/login` : '/login'
  }
  const { app, store, redirect } = context
  const user = store.state.users.user
  const blockedRoute = /\/admin\/*/g
  app.router.beforeEach((to, from, next) => {
    if (!user && to.path.match(blockedRoute)) {
      redirect(checkLang(to.path))
    } else {
      next()
    }
  })
}
