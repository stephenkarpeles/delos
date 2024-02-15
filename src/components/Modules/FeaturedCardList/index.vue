<template>
  <div :class="`${BEM_B} ${isTabbed ? 'tabbed' : ''}`">
    <div class="container">
      <div :class="BEM_E('title')" v-if="blok && isTabbed">
        <TitleBlock :blok="blok"/>
      </div>
      <b-tabs v-if="isTabbed" v-model="tabIndex" pills>
        <b-tab
          v-for="(type, index) in types"
          v-bind:key="index">
          <template slot="title">
            {{ parsedTypeName(type) }}
          </template>
          <div :class="BEM_E('item-content')">
            <CardList
              v-if="index === tabIndex"
              :items="posts"
              :itemsOnly="true"
              :mods="['3-up']"
              :blok="blok ? processedBlok : {'title': 'Featured ' + type}"/>
          </div>
        </b-tab>
      </b-tabs>
      <CardList
        v-else-if="posts && posts.length > 0"
        :items="posts"
        :mods="['3-up']"
        :blok="blok ? processedBlok : {'title': 'Featured ' + type}"/>
      <div v-if="blok && blok.button && blok.button[0] && isTabbed" :class="BEM_E('link')">
        <Btn :blok="tabbedCardBtn"/>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import CardList from '~/src/components/Modules/CardList'

export default {
  extends: BaseComponent,
  components: {CardList},
  props: {
    name: {
      type: String,
      default: 'FeaturedCardList'
    },
    contentType: {
      type: String,
      default: 'articles'
    },
    blok: Object
  },
  mounted() {
    this.fetchPosts()
  },
  data() {
    return {
      posts: [],
      tabIndex: 0
    }
  },
  methods: {
    fetchPosts(type) {
      let useType = type || this.currType
      return this.$storyapi.get('cdn/stories/', {
          version: 'published',
          starts_with: this.$store.state.language !== 'en' ? this.$store.state.language + '/resources/' + useType : 'resources/' + useType,
          cv: this.$store.state.cacheVersion,
          per_page: 3,
          filter_query: {"featured": {"in": true}}
        },
      ).then((res) => {
        this.posts = res.data.stories
        return res.data.stories
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    },
    parsedTypeName(type) {
      if (type) {
        return type.replace(/-/g, ' ')
      }

      return ''
    }
  },
  computed: {
    types() {
      if (this.blok && this.blok.contentType) {
        return this.blok.contentType
      }

      return this.contentType
    },
    currType() {
      return this.types[this.tabIndex]
    },
    isTabbed() {
      if (this.types.length > 1) return true

      return false
    },
    tabbedCardBtn() {
      let btn = {
        'linkLabel': 'View more ' + this.currType,
        "variation": "outline-blue",
        "targetBlank": false,
        "linkLocation": {
          "url": this.currType,
          "linktype": "url", "fieldtype": "multilink",
          "cached_url": this.currType
        }
      }
      return btn
    },
    processedBlok() {
      let pBlok = this.blok

      if (pBlok) {
        pBlok.hideCardMeta = true
        return pBlok
      }
    }
  },
  watch: {
    tabIndex(neue, old) {
      this.fetchPosts(this.currType)
    }
  }
}
</script>
