import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - WMS',
    title: 'Dashboard',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/all.css',
    '~/assets/style.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth-next',
  ],
  plugins: [
    '~/plugins/axios.js',
    { src: "~/plugins/json-excel.js", mode: "client" }

  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: '/'
    baseURL: process.env.Name_api
    
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/login_check', method: 'post' },
          user: { url: '/profile', method: 'get' },
          update: { url: '/profile', method: 'put' },
        }
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          settings:{
            primary: colors.grey.darken3,
            light : colors.grey.lighten1,
            dark : colors.grey.darken3,
            grey: colors.grey,
          },
          comptabilite:{
            primary: colors.teal.accent3,
            light : colors.teal.lighten4,
            dark : colors.teal.darken3,
            teal: colors.teal,
          },
          paymentAndRH:{
            primary: colors.orange.lighten2,
            light : colors.orange.lighten4,
            dark : colors.orange.darken3,
            orange: colors.orange,
          },
          secretaireJuridique:{
            primary:colors.indigo.darken1,
            light : colors.indigo.lighten4,
            dark : colors.indigo.darken3,
            indigo: colors.indigo,
          },
          facturation:{
            primary:colors.pink.lighten3,
            light : colors.pink.lighten4,
            dark : colors.pink.darken3,
            pink: colors.pink,
          },
          documentation:{
            primary:colors.cyan.darken1,
            light : colors.cyan.lighten4,
            dark : colors.cyan.darken3,
            cyan: colors.cyan,
          },
          agendas:{
            primary:colors.blueGrey.lighten4,
            light : colors.blueGrey.lighten4,
            dark : colors.blueGrey.darken3,
            blueGrey: colors.blueGrey,
          },
        }
      },
      
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
