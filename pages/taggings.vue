<template>
  <div>
    <h3>Featured Posts:</h3>
    <em>The following posts have been marked as Featured.<br/>Currently, we only will show the first <b>3</b> in the Resource Hub and Featured Card Lists.</em>
    <ul>
      <li style="list-style: none;"><b>--- Articles ---</b></li>
      <li v-for="(post, key) in featuredarticles" v-bind:key="'articles' + key">
        {{post.name}}
      </li>
      <li style="list-style: none;"><b>--- Events ---</b></li>
      <li v-for="(post, key) in featuredevents" v-bind:key="'events' + key">
        {{post.name}}
      </li>
      <li style="list-style: none;"><b>--- Press Releases ---</b></li>
      <li v-for="(post, key) in featuredpress" v-bind:key="'press' + key">
        {{post.name}}
      </li>
    </ul>
    <h3>Active tags (count):</h3>
    <em>The following tags have been utilized shown with their (count) for number of times they are selected. This is across resource content types (articles, events, etc).</em>
    <ul>
      <li v-for="(tag, key) in this.tags" class="tags" v-bind:key="key">
        {{tag.name}} ({{tag.taggings_count}})
      </li>
    </ul>
  </div>
</template>

<script>
const loadData = function({lang, api, cacheVersion, errorCallback, version, path}) {
  return api.get(`cdn/stories${path}`, {
    version: version,
    cv: cacheVersion,
    resolve_links: 2
  }).then((res) => {
    return res.data
  }).catch((res) => {
    if (!res.response) {
      console.error(res, 'uh oh')
      errorCallback({ statusCode: 404, message: 'Failed to receive content form api' })
    }
  })
}
export default {
  data () {
    return {
      tags: [],
      featuredarticles: [],
      featuredevents: [],
      featuredpress: []
    }
  },
  head () {
    return {
      meta: [{ name: 'robots', content: 'noindex'}]
    }
  },
  mounted () {
    this.loadTags()
    this.fetchPosts('articles')
    this.fetchPosts('events')
    this.fetchPosts('press-releases')
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      this.$nuxt.$loading.finish()
    })
  },
  methods: {
    loadTags () {
      return this.$storyapi.get('cdn/tags/', {
        version: 'published',
        cv: this.$store.state.cacheVersion,
        sort_by: 'content.title:asc'
      },
      ).then((res) => {
        this.tags = res.data.tags
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    },
    fetchPosts (type) {
      if (type) {
        return this.$storyapi.get('cdn/stories/', {
          version: 'published',
          starts_with: 'resources/' + type,
          cv: this.$store.state.cacheVersion,
          per_page: 10,
          filter_query: {"featured":{"in": true }}
        }).then((res) => {
          console.log(res.data)
          let featType = `featured${type === 'press-releases' ? 'press' : type}`
          this[featType] = res.data.stories
          return res.data.stories
        }).catch((res) => {
          if (!res.response) {
            console.error('no res', res)
          }
        })
      }
    },
  }
}
</script>