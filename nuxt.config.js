const config = require('./server/config')

module.exports = {
  ssr: false,

  srcDir: 'client/',

  telemetry: false,

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  loading: {
    color: '#0065FF'
  },

  css: [
    'element-ui/lib/theme-chalk/index.css',
    'normalize.css/normalize.css',
    './assets/styles/fonts/font-inter/stylesheet.css',
    './assets/styles/main.scss'
  ],

  plugins: [
    {
      src: '@/plugins/client',
      ssr: false
    },
    '@/plugins/element-ui',
    '@/plugins/axios',
    '@/plugins/global-components'
  ],

  buildModules: ['@nuxtjs/eslint-module'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],

  server: {
    port: config.PORT
  },

  axios: {
    baseURL: config.BASE_URL
  },

  build: {
    transpile: [/^element-ui/],

    extend(config, ctx) {}
  }
}
