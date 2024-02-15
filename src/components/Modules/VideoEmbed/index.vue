<template>
  <div
    :class="BEM_B"
    :id="blok.id"
    v-if="blok.videoUrl"
  >
    <div class="container">
      <div class="row flex-column">
        <div :class="BEM_E('content')">
          <div :class="BEM_E('title')" v-if="blok">
            <p v-if="blok.text && blok.text[0]">
              <FancyText :blok="blok.text[0].customText" />
            </p>
          </div>
        </div>
        <div :class="BEM_E('video')">
          <Vid :blok="video && blok.videoUrl ? blok : {}" />
        </div>
        <div v-if="blok && blok.button && blok.button[0]" :class="BEM_E('link')">
          <Btn :blok="blok.button[0]" />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Vid from '~/src/components/Elements/Video'

export default {
  components: { Vid },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'VideoEmbed'
    },
    blok: Object
  },
  data () {
    return {
      video: []
    }
  },
  mounted () {
    this.loadAddlData([this.blok.video], 'video')
  },
  methods: {
    fetchPosts () {
      return this.$storyapi.get('cdn/stories/', {
        version: 'published',
        starts_with: this.$store.state.language !== 'en' ? this.$store.state.language + '/resources/' + this.contentType : 'resources/' + this.contentType,
        cv: this.$store.state.cacheVersion,
        per_page: 3,
        filter_query: { 'featured': { 'in': true } }
      }
      ).then((res) => {
        this.posts = res.data.stories
        return res.data.story
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    }
  }
}
</script>
