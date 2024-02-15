const pkg = require('./package')
const axios = require('axios')
const blokToken = 'PGIIyJWyqDeHmjyTKcX60Qtt'
const startsWith = ''

const resourceTypes = 'page'
const mainUrl = 'https://delos.com'

const config = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Wellness Solutions & Products for Healthy Spaces | Delos',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'google-site-verification', content: 'vjP-rZM3zj8cHL0l8XgcSEGMuQRxdDP0A6wsKu2CPtE' },
      // {
      //   hid: 'description',
      //   name: 'description',
      //   content: 'Delos is committed to wellness where we live, work, travel, and learn with evidence-based solutions to promote healthier living indoors.'
      // },
      // {
      //   hid: 'og:type',
      //   property: 'og:type',
      //   content: 'website'
      // },
      // {
      //   hid: 'og:url',
      //   property: 'og:url',
      //   content: 'https://delos.com/'
      // },
      // {
      //   hid: 'og:title',
      //   property: 'og:title',
      //   content: 'Wellness Solutions &amp; Products for Healthy Spaces'
      // },
      // {
      //   hid: 'og:description',
      //   property: 'og:description',
      //   content: 'Delos is committed to wellness where we live, work, travel, and learn with evidence-based solutions to promote healthier living indoors.'
      // },
      // {
      //   hid: 'og:image',
      //   property: 'og:image',
      //   content: 'https://a.storyblok.com/f/101818/1200x628/a655dfb670/delos-social-image.jpeg'
      // },
      // {
      //   hid: 'twitter:card',
      //   name: 'twitter:card',
      //   content: 'summary_large_image'
      // },
      // {
      //   hid: 'twitter:site',
      //   name: 'twitter:site',
      //   content: '@delosliving'
      // },
      // {
      //   hid: 'twitter:title',
      //   name: 'twitter:title',
      //   content: 'Wellness Solutions &amp; Products for Healthy Spaces'
      // },
      // {
      //   hid: 'twitter:description',
      //   name: 'twitter:description',
      //   content: 'Delos is committed to wellness where we live, work, travel, and learn with evidence-based solutions to promote healthier living indoors.'
      // },
      // {
      //   hid: 'twitter:image',
      //   name: 'twitter:image',
      //   content: 'https://a.storyblok.com/f/101818/1200x628/a655dfb670/delos-social-image.jpeg'
      // }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // { rel: 'stylesheet', href: 'https://use.typekit.net/pqu3pyy.css' }

      // { rel: 'stylesheet', href: 'https://unpkg.com/ringo-styleguide/dist/css/min/main.css' }
    ],
    script: [
      {
        src: '//js.hsforms.net/forms/v2.js',
        type: 'text/javascript',
        charset: 'utf-8'
      }
      // {
      //   src: 'https://www.googletagmanager.com/gtag/js?id=G-CM92SCBHTD',
      //   type: 'text/javascript',
      //   async: true
      // },
      // {
      //   innerHTML: 'window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag(\'js\', new Date()); gtag(\'config\', \'G-CM92SCBHTD\');',
      //   type: 'text/javascript',
      //   charset: 'utf-8'
      // }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },

  env: {
    baseUrl: process.env.NODE_ENV == 'production' ? mainUrl : 'http://localhost:3000',
    prodUrl: mainUrl,
    mainUrl: mainUrl
  },

  /*
  ** Customize the loading screen
  */
  loading: '~/src/components/Elements/Loading',

  /*
  ** Global CSS
  */
  css: [
    '~/src/assets/scss/main.scss'
  ],

  /*
  ** Build configuration
  */
  build: {
    extend (config, ctx) {
      config.optimization = {
        minimize: true
      }
    },
    postcss: [
      require('autoprefixer')({
        browsers: ['> 5%']
      })
    ],
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: process.env.NODE_ENV == 'production' ? true : false,
        minifyJS: process.env.NODE_ENV == 'production' ? true : false,
        // minifyJS: false, // disabled for debugging an issue on netlify
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    },
    babel: {
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator'
      ]
    }
  },

  router: {
    base: '/',
    routeNameSplitter: '/',
    middleware: ['setCacheVersion', 'languageDetection']
  },

  /*
  ** Make client available everywhere via Nuxt plugins
  */
  plugins: [
    '~/plugins/components',
    '~/plugins/filters',
    '~/plugins/directives',
    '~/plugins/vue-scrollto',
    '~/plugins/vue-resize.js',
    '~/plugins/vue-match-heights',
    '~/plugins/HubSpotAttribution',
    '~/plugins/delos-resource-hub'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['bootstrap-vue/nuxt', { css: false }],
    ['storyblok-nuxt',
      { accessToken: blokToken, cacheProvider: 'memory' }
    ],
    ['@nuxtjs/google-tag-manager', { id: 'GTM-PR4PZBL' }],
    '@nuxtjs/sitemap'
    // ['nuxt-facebook-pixel-module', {
    //   track: 'PageView',
    //   pixelId: '1608678962535511',
    //   disabled: false
    // }],
    // ['nuxt-twitter-pixel-module', {
    //   track: 'PageView',
    //   pixelId: 'nycqq'
    // }],
    // ['nuxt-linkedin-pixel-module', {
    //   track: 'PageView',
    //   partnerId: '64694',
    //   disabled: false
    // }]
  ],

  sitemap: {
    hostname: mainUrl,
    trailingSlash: true
  },

  generate: {
    fallback: "404.html",
    routes: function (callback) {
      const per_page = 50
      let cache_version = 0

      let page = 1
      let routes = ['/']

      // Load space and receive latest cache version key to improve performance
      axios.get(`https://api.storyblok.com/v1/cdn/spaces/me?token=${blokToken}`).then((space_res) => {

        // timestamp of latest publish
        cache_version = space_res.data.space.version

        // Call first Page of the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
        axios.get(`https://api.storyblok.com/v1/cdn/links?token=${blokToken}&per_page=${per_page}&page=${page}&cv=${cache_version}`).then((res) => {
          Object.keys(res.data.links).forEach((key) => {
            if (res.data.links[key].is_folder == false) {
              let path = res.data.links[key].slug
              routes.push(path)
            }
          })

          // Check if there are more pages available otherwise execute callback with current routes.
          const total = res.headers.total
          const maxPage = Math.ceil(total / per_page)
          if (maxPage <= 1) {
            callback(null, routes)
          }

          // Since we know the total we now can pregenerate all requests we need to get all Links
          let contentRequests = []
          for (let page = 2; page <= maxPage; page++) {
            contentRequests.push(axios.get(`https://api.storyblok.com/v1/cdn/links?token=${blokToken}&per_page=${per_page}&page=${page}`))
          }

          // Axios allows us to execute all requests using axios.spread we will than generate our routes and execute the callback
          axios.all(contentRequests).then(axios.spread((...responses) => {
            responses.forEach((response) => {
              Object.keys(response.data.links).forEach((key) => {
                if (response.data.links[key].is_folder == false) {
                  let path = res.data.links[key].slug
                  routes.push(path)
                }
              })
            })

            callback(null, routes)
          })).catch(callback)
        })
      })
    }
  }
}

module.exports = config
