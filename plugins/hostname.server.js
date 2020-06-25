export default (context, inject) => {
  const { req, store } = context
  const hostname = req.headers.host
  store.commit('SET_HOST_FROM_HEADER', hostname)
}
