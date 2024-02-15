<template>
  <div
    :id="blok.id || blok._uid"
    :class="[
      blok.classes,
      'NewsFeedLandingItem',
      `NewsFeedLandingItem--${blok.variation}`
    ]"
  >

    <div
      :style="getBgImageStyle()"
      class="bg-image"
    >
      <component
        :is="getLinkComponentTag()"
        v-bind="getLinkComponentAttrs()"
        class="data-container"
      >
        <div class="inner">
          <h4
            v-if="blok.title"
            v-html="blok.title"
            class="title"
          />
          <div
            v-if="renderField_description && renderField_description.length"
            v-html="renderField_description"
            class="description"
          />
        </div>
      </component>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      tabletBreakpoint: 768,
      mobileBreakPoint: 425,
      screenWidth: window.innerWidth
    }
  },

  computed: {
    renderField_description () {
      const rendered = this.$storyapi.richTextResolver.render(this.blok.description)
      if (!rendered.replace(/(<([^>]+)>)/gi, '')) {
        return false
      }
      return rendered
    }
  },

  mounted () {
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth
    })
  },

  methods: {
    isInternalLink () {
      if (!this.blok.link || !this.blok.link.linktype) {
        return false
      }
      return (this.blok.link.linktype === 'story')
    },

    getLinkComponentTag () {
      if (this.isInternalLink()) {
        return 'nuxt-link'
      }
      return 'a'
    },

    getLinkComponentAttrs () {
      const attrs = {}

      if (!this.blok.link || !this.blok.link.linktype) {
        attrs.href = '#'
      } else if (this.isInternalLink()) {
        let url = this.blok.link.cached_url
        if (url.slice(-1) !== '/') {
          url += '/'
        }
        attrs.to = url
      } else {
        attrs.href = this.blok.link.url
      }

      return attrs
    },

    getBgImageStyle () {
      const bgUrl = (this.blok.image && this.blok.image.filename)
        ? this.blok.image.filename
        : false
      const bgUrlMobile = (this.blok.imageMobile && this.blok.imageMobile.filename)
        ? this.blok.imageMobile.filename
        : false

      const url = ((this.screenWidth < this.tabletBreakpoint) && bgUrlMobile) ? bgUrlMobile : bgUrl

      return {
        background: `
          linear-gradient(89.79deg, rgba(136, 136, 136, 0.9) 1.05%, rgba(136, 136, 136, 0) 99.81%),
          url(${url})
        `
      }
    }
  }
}
</script>
