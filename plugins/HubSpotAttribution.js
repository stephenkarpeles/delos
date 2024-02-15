import Vue from 'vue'

Vue.mixin({
  methods: {
    trackHubSpotAttribution () {
      let _hsq = window._hsq = window._hsq || []
      _hsq.push(['setContentType', 'blog_post'])
    }
  }
})
