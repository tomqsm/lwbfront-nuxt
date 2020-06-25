// eslint-disable-next-line nuxt/no-cjs-in-config
const bodyParser = require('body-parser')

// eslint-disable-next-line nuxt/no-cjs-in-config
const env = require('./config')

console.log(env)
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Systemy webowe programowane w najnowszych technologiach, skrojone ma miarę potrzeb biznesowych funkcjonalnie i wydajnie.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#7cfc00', throttle: 0, height: '4px' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/global-components.js',
    '~/plugins/today.client.js',
    '~/plugins/guard.client.js',
    '~/plugins/guard.server.js',
    '~/plugins/hostname.server.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: { baseUrl: process.env.baseUrl },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    terser: {
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  },

  router: {
    middleware: ['i18n']
  },
  generate: {
    routes: ['/', '/about', '/en', '/en/about', '/login', '/pl/login']
  },
  /* env usage: process.env.baseUrl */
  env: env.default.parsed,

  serverMiddleware: [bodyParser.json(), '~/api']
}
