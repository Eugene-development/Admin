
export default {
  mode: 'universal',
  server: {
    port: 4700,
    host: '0.0.0.0'
  },


  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'red' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-lodash',
    // '~/plugins/axios',
    { src: "~/plugins/vue2-editor", ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/auth',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    babel:{
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    },

    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'https://adminexpo.com:7731/api/login', method: 'post', propertyName: 'meta.token'
          },
          user: {
            url: 'https://adminexpo.com:7731/api/me', method: 'get', propertyName: 'data'
          },
          logout: {
            url: 'https://adminexpo.com:7731/api/logout', method: 'post'
          }
        }
      }
    },
    //
    //
    //
    //
    //
    //
    //
    //
    //   // redirect: {
    //   //   login: '/auth/signin',
    //   //   home: '/'
    //   // }
  },

}
