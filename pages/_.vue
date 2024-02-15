<template>
  <div
    :class="story.content.classes ? 'Page ' + story.content.classes : story.full_slug === 'home' ? 'Page coming-soon' : 'Page'"
    v-scroll="handleScroll"
  >
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component | dashify"
      :tagList="story.tag_list"
    />
  </div>
</template>

<script>
import {mapActions} from 'vuex'

const VueScrollTo = require('vue-scrollto')
const loadData = function ({lang, api, cacheVersion, errorCallback, version, path}) {
  return api.get(`cdn/stories${path}`, {
    version,
    cv: cacheVersion,
    resolve_links: 2
  }).then((res) => {
    if (res.data) {
      return res.data
    }
  }).catch((res) => {
    errorCallback({statusCode: 404, message: 'Failed to receive content form api'})
  })
}

export default {
  data () {
    return { story: { content: {} } }
  },
  head () {
    return {
      title: this.story.content.metadata ? this.story.content.metadata.title : this.story.title,
      titleTemplate: '%s | Delos',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.story.content.metadata ? this.story.content.metadata.description : ''
        },
        {
          name: 'robots',
          content: this.story.content.noindex ? 'noindex' : ''
        },

        {
          property: 'og:type',
          content: this.story.content.ogType || 'website'
        },
        {
          property: 'og:url',
          content: 'https://delos.com/' + (this.story.full_slug !== 'home' ? this.story.full_slug + '/' : '')
        },
        {
          property: 'og:title',
          content: this.story.content.metadata ? this.story.content.metadata.title : this.story.title
        },
        {
          property: 'og:description',
          content: this.story.content.metadata ? this.story.content.metadata.description : ''
        },
        {
          property: 'og:image',
          content: this.getSocialImageUrl()
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:site',
          content: '@delosliving'
        },
        {
          name: 'twitter:title',
          content: this.story.content.metadata ? this.story.content.metadata.title : this.story.title
        },
        {
          name: 'twitter:description',
          content: this.story.content.metadata ? this.story.content.metadata.description : ''
        },
        {
          name: 'twitter:image',
          content: this.getSocialImageUrl()
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://delos.com/' + (this.story.full_slug !== 'home' ? this.story.full_slug + '/' : '')
        }
      ],
      script: [],
      __dangerouslyDisableSanitizers: ['script']
    }
  },
  asyncData (context) {
    // this.fetchStoryData(context)
    // context.store.dispatch('fetchStoryData', { context: context })
    let editMode = false
    if (context.payload) {
      return { story: context.payload }
    } else {
      if (context.query._storyblok || context.isDev || (typeof window !== 'undefined' && window.localStorage.getItem('_storyblok_draft_mode'))) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('_storyblok_draft_mode', '1')
          if (window.location == window.parent.location) {
            window.localStorage.removeItem('_storyblok_draft_mode')
          }
        }

        editMode = true
      }

      const version = editMode ? 'draft' : 'published'

      const path = context.route.path === '/' ? '/home' : context.route.path

      // const lang = context.nuxtState ? context.nuxtState.state.language : ''
      const lang = ''

      // Load the JSON from the API
      return loadData({
        lang,
        version,
        api: context.app.$storyapi,
        cacheVersion: context.store.state.cacheVersion,
        errorCallback: context.error,
        path
      })
    }
  },
  mounted () {
    // this.fetchBrandData(this.story)
    const hash = this.$route.hash
    if (hash) {
      this.$nextTick(() => {
        VueScrollTo.scrollTo(hash, 500, {
          container: 'body',
          easing: 'linear',
          force: true,
          offset: 0
        })
      })
    }

    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      this.$nuxt.$loading.finish()
    })

    this.$storybridge.on(['input', 'published', 'change'], (event) => {
      if (event.action == 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      } else if (!event.slugChanged) {
        window.location.reload()
      }
    })
  },
  methods: {
    ...mapActions(['fetchBrandData', 'fetchStoryData']),
    handleScroll(evt, el) {
      const clsName = el.className
      const scrollCls = ' Page--scrolled'
      const includesScroll = clsName.includes(scrollCls)

      if (window.scrollY > 80) {
        if (!includesScroll) {
          el.setAttribute('class', clsName + scrollCls)
        }
      } else if (includesScroll) {
        el.setAttribute('class', clsName.replace(scrollCls, ''))
      }
    },
    getSocialImageUrl () {
      const url = this.story.content.ogImage || null
      if (url) {
        if (url.substring(0, 2) === '//') {
          return `https:${url}`
        }
        return url
      }
      return url
    }
  },
  computed: {
    AspotText () {
      const aspot = this.story && this.story.content && this.story.content.body ? this.story.content.body.find(component => component.component === 'ASpot') : null
      const title = aspot ? aspot.title[0] : null
      if (title && title.customText !== '') {
        return title.customText
      } else if (title && title.existingText !== 'null') {
        return title.existingText
      } else {
        return ''
      }
    }
  }
}
</script>
