<template>
  <div
    v-if="blok.variation != 'cal-grey' &&  blok.variation != 'resources'"
    :class="BEM_B"
    :is="documentLink ? 'a' : 'div'"
    :href="documentLink ? documentLink : null"
    target="_blank"
  >
    <div
      :class="BEM_E('image')"
    >
      <img
        :src="image.filename"
        :alt="image.alt"
      >
    </div>
    <div :class="BEM_E('content')">
      <div :class="BEM_E('title')">
        <span>{{ title }}</span>
      </div>
      <h4 :class="BEM_E('caption')">
        <span>{{ caption }}</span>
      </h4>
      <div :class="BEM_E('content')">
        {{ replacedContent ? replacedContent : content }}
      </div>
      <Btn :blok="button" />
    </div>
  </div>
  <div
    v-else-if="blok.variation === 'cal-grey'"
    :class="BEM_B"
  >
    <div :class="BEM_E('bgimage')" v-bind:style="{ backgroundImage: 'url(' + image.filename + ')', backgroundSize: 'cover' }">
      <div :class="BEM_E('content')">
      <div :class="BEM_E('title')">
        <span>{{ title }}</span>
      </div>
      <h4 :class="BEM_E('caption')">
        <span>{{ caption }}</span>
      </h4>
      <div :class="BEM_E('content')" class="card-text-content">
        {{ replacedContent ? replacedContent : content }}
      </div>
      <Btn v-if="button" :blok="button" />
    </div>
    </div>
  </div>
  <div :class="collapses ? BEM_B + 'collapses' : BEM_B" v-else-if="blok.variation === 'resources'">
    <a :href="fancyPath"
       :class="!this.path ? BEM_E('link') + ' ' + BEM_E('link--no-path') : BEM_E('link')">
      <div :class="!this.image ? BEM_E('image') + ' no-image' : BEM_E('image')">
        <Vector v-if="this.svg" :name="this.svg" width="300" height="250" />

        <img v-if="this.image"
          :src="prepImg(this.image, imageDims ? imageDims[0] + 'x' + imageDims[1] + '/smart' : '600x300/smart')"
          :alt="this.image.imageAlt" />
        <img v-if="!this.image && !this.svg"
          :src="prepImg('//a.storyblok.com/f/101818/1920x1280/ba2394a30c/placeholder.jpeg', imageDims ? imageDims[0] + 'x' + imageDims[1] + '/smart' : '600x300/smart')" alt="Placeholder">
    </div>
      <div :class="BEM_E('details')">
        <div :class="BEM_E('metadata')"v-if="this.contentType || this.date">
          <span v-if="this.contentType" :class="BEM_E('contentType')">{{this.contentType}}</span>
          <span v-if="showDate">&nbsp;·&nbsp;</span>
          <DateTimeZone
            v-if="showDate"
            :blok="this.date"
            :disableTime="true" />
        </div>
        <div :class="BEM_E('contents')">
          <div
            @click="handleCardCollapse($event)"
            :class="BEM_E('title')"
            aria-controls="cardCollapse"
            :aria-expanded="collapses ? showCollapse ? 'true' : 'false' : 'true'">
            <span>{{this.title}}</span>
            <Vector v-if="collapses" name="icon/caret-down" width="13" />
          </div>
          <b-collapse v-model="showCollapse" id="cardCollapse">
            <h4 v-if="caption" :class="BEM_E('caption')">{{truncateText(this.caption, 120)}}</h4>
          </b-collapse>
          <span :class="BEM_E('link--sm')" v-if="this.link && this.linkLabel">{{this.linkLabel}}</span>
        </div>
        <div :class="BEM_E('tags')" v-if="this.tags && this.tags.length > 0">
          <TagList
            :tags="this.tags"
            :shouldLink="contentType === 'user' ? false : true"
            :allowMax="tagMax ? tagMax : 3"
            :linkType="contentType" />
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseComponent from '~/src/components/Templates/BaseComponent'
import DateTimeZone from '~/src/components/Elements/DateTimeZone'
import TagList from '~/src/components/Elements/TagList'

export default {
  extends: BaseComponent,
  components: {
    DateTimeZone,
    TagList
  },
  props: {
    name: {
      type: String,
      default: 'Card'
    },
    document: {
      type: String,
      default: null
    },
    image: {
      type: [Object, String],
      default: null
    },
    title: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    caption: {
      type: String,
      default: null
    },
    button: {
      type: [Object, String],
      default: null
    },
    svg: String,
    imageDims: Array,
    date: [Array, Object],
    contentType: String,
    tags: [Array ,String],
    tagMax: Number,
    type: String,
    link:String,
    linkLable: String,
    path: String,
    collapses: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      replacedContent: '',
      documentLink: '',
      showCollapse: !this.collapses
    }
  },
  computed: {
    ...mapState({
      logo: state => state?.brand?.logo,
      brandName: state => state?.brand?.brandName
    }),
    showDate() {
      if (this.contentType && this.contentType !== 'tool' && this.date && this.date.dateTime) {
        return true
      }
    },

    fancyPath () {
      if(this.path) {
        let path = this.path
        let matchesDomain = this.checkResourceMatch(path)
        // if story + matchesDomain, route story
        if (matchesDomain) {
          path = path.replace('zh-cn/zh_cn/resources/', '/zh-cn/').replace('zh-cn/resources/', '/zh-cn/').replace('resources/', '/')
          return path
        } else if (!matchesDomain) {
          let env = process.env.prodUrl

          // if my prod url is resources, link to main,
          // else link to resources
          //if(env.includes('resources.delos')) {
          if(env.includes('resources.wellcertified')) {
            path = process.env.mainUrl + '/' + path
          } else {
            path = process.env.resourcesUrl + '/' + path.replace('zh-cn/zh_cn/resources/', 'zh-cn/').replace('zh-cn/resources/', 'zh-cn/').replace('resources/', '')
          }
        }

        return path
      }
    }
  },
  created () {
    this.$store.watch((state) => {
      return this.$store.state.brand
    },
    (newValue, oldValue) => {
      if (this.content) {
        this.replaceTemplates()
      }
    })
  },
  mounted () {
    this.loadDocument()
    this.replaceTemplates()
  },
  methods: {
    loadDocument () {
      if (this.document) {
        const uuids = this.document.toString()
        return this.$storyapi.get(`cdn/stories/`, {
          version: 'published',
          cv: this.$store.state.cacheVersion,
          by_uuids: uuids,
          find_by: 'uuid',
          sort_by: 'position:desc'
        }).then((res) => {
          this.documentLink = res.data.stories[0].content.file.filename
          return res.data.stories
        }).catch((res) => {
          if (!res.response) {
            console.error('no res', res)
          }
        })
      }
    },
    replaceTemplates () {
      const text = this.content
      const regex = RegExp('{{.*}}')
      if (regex.test(text)) {
        this.replacedContent = text.replace(regex, this.brandName)
      }
    },
    handleCardCollapse (event) {
      if (event && this.collapses) {
        event.preventDefault()

        this.showCollapse = !this.showCollapse
      }

      return
    },
    truncateText(str, length) {
      let strLength = str.length
      let truncated = str.substring(0, length) + (strLength > length ? '...' : '')

      return truncated
    },
    checkResourceMatch(link) {
      let env = process.env.prodUrl

      let resourceMatch = [
      'resources', 'zh-cn/resources', 'zh-cn/zh_cn/resources',
      'insights',  'zh-cn/insights',  'zh-cn/zh_cn/insights',
      'news',    'zh-cn/news',    'zh-cn/news',
      'videos',      'zh-cn/videos',      'zh-cn/zh_cn/videos',
      'press-releases',    'zh-cn/press-releases',    'zh-cn/zh_cn/press-releases',
      'white-papers',     'zh-cn/white-papers',     'zh-cn/zh_cn/white-papers',]

      let isResource = resourceMatch.some(function(v) { return link.startsWith(v) })
      let domainIsResources = true

      if(isResource && domainIsResources) {
        return true
      } else if(!isResource && domainIsResources) {
        return false
      } else if(isResource && !domainIsResources) {
        return false
      } else if(!isResource && !domainIsResources) {
        return true
      }

      return false
    }
  }
}
</script>
