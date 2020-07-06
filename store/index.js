// export const strict = false
export const state = () => ({
  locales: ['en', 'pl'],
  locale: 'pl',
  defaultLocale: 'pl',
  hostname: undefined
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
  SET_HOST_FROM_HEADER(state, host) {
    state.hostname = host
  }
}

export const getters = {
  getLangPathPrefix: (state) => {
    let result = '/'
    if (state.locale !== state.defaultLocale) {
      result = '/' + state.locale + '/'
    }
    return result
  }
}

export const actions = {
  nuxtServerInit({ commit, getters }, { req, res }) {
    // console.log(req.headers.cookie)
    // console.log(req.headers)
    // console.log('req')
    // console.log(req.query.id)
    // console.log('res')
    // console.log(res)
    res.setHeader('myauth', 'application/json')
    console.log("getters['users/user']")
    console.log(getters['users/user'])
    // res.writeHead(301, {
    //   Location: 'http://whateverhostthiswillbe:8675/'
    // })
    // res.end()
  }
}
