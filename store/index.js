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
