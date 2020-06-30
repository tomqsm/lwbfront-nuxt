export default (context, inject) => {
  const { app, store, redirect } = context
  const blockedRoute = /\/admin\/*/g
  app.router.beforeEach((to, from, next) => {
    const user = store.getters['users/getUser']
    console.log(`beforeEach client: user: ${user}`)
    if (!user && to.path.match(blockedRoute)) {
      redirect(`${store.getters.getLangPathPrefix}login`)
    } else {
      next()
    }
  })
}
