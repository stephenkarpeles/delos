<template>
  <!-- Link to External Url -->
  <b-button
    v-if="blok && blok.link && blok.link.linktype === 'url'"
    :href="makeExternalLink(blok.link.url)"
    :class="BEM_B"
    :target="blok.targetBlank ? '_blank' : '_self'"
    :rel="blok.relNoFollow ? 'nofollow' : null"
    @click="scrollToAnchor(blok.link.url)"
    @mouseover="mouseOver('in')"
    @mouseout="mouseOver('out')"
    variant="base"
   >
    <div class="w-100" v-if="!isNavLink">
      <span v-if="change">
        <span
          v-if="blok.icon && blok.icon.length > 0"
          :class="BEM_E('icon')"
        >
          <img
            :src="blok.icon[0].imageLocation.filename"
            :alt="(blok.icon && blok.icon.length) ? blok.icon[0].imageAlt : null"
          >
        </span>
<!--        <span-->
<!--          v-else-->
<!--          :class="BEM_E('icon')"-->
<!--        >-->
<!--          <img :src="'https://a.storyblok.com/f/101818/x/558dbc69e2/arrownarrowright_black.svg'" alt="">-->
<!--        </span>-->
      </span>
      <span v-else>
        <span v-if="blok.icon && blok.icon.length > 0" :class="BEM_E('icon')">
          <img
            :src="blok.icon[0].imageLocation.filename"
            :alt="(blok.icon && blok.icon.length) ? blok.icon[0].imageAlt : null"
          >
        </span>
      </span>
      <span v-if="blok.linkLabel || blok.linkCaption" :class="BEM_E('contents')">
        <span v-if="blok.linkLabel" :class="BEM_E('label')">{{blok.linkLabel}}</span>
        <span v-if="blok.linkCaption" :class="BEM_E('caption')">{{blok.linkCaption}}</span>
        <span v-if="blok.additionalField" :class="BEM_E('additional')">{{blok.additionalField}}</span>
      </span>
    </div>
    <div class="w-100" v-else>
      <div v-if="blok.linkLabel" :class="BEM_E('label')">{{blok.linkLabel}}</div>
      <div v-if="blok.linkCaption" :class="BEM_E('caption')" class="text-left">{{blok.linkCaption}}</div>
    </div>
  </b-button>

  <!-- :to same url -->
  <nuxt-link
    v-else-if="blok && blok.link && blok.link.linktype === 'story'"
    :to="makeStoryLink(blok.link)"
    :target="blok.targetBlank ? '_blank' : '_self'"
    :rel="blok.relNoFollow ? 'nofollow' : null"
    :class="BEM_B"
  >
    <div class="w-100" @mouseover="mouseOver('in')" @mouseout="mouseOver('out')" v-if="!isNavLink">
      <span v-if="change">
        <span v-if="blok.icon && blok.icon.length > 0  && active === false" :class="BEM_E('icon')">
          <img
            :src="blok.icon[0].imageLocation.filename"
            :alt="(blok.icon && blok.icon.length) ? blok.icon[0].imageAlt : null"
          />
        </span>
        <span v-else :class="BEM_E('icon')">
          <img
            :src="'https://a.storyblok.com/f/101818/x/558dbc69e2/arrownarrowright_black.svg'"
            :alt="(blok.icon && blok.icon.length) ? blok.icon[0].imageAlt : null"
          />
        </span>
      </span>
      <span v-else>
        <span v-if="blok.icon && blok.icon.length > 0" :class="BEM_E('icon')">
          <img
            :src="blok.icon[0].imageLocation.filename"
            :alt="(blok.icon && blok.icon.length) ? blok.icon[0].imageAlt : null"
          />
        </span>
      </span>
      <span v-if="blok.linkLabel || blok.linkCaption" :class="BEM_E('contents')">
        <span v-if="blok.linkLabel" :class="BEM_E('label')">{{blok.linkLabel}}</span>
        <span v-if="blok.linkCaption" :class="BEM_E('caption')">{{blok.linkCaption}}</span>
        <span v-if="blok.additionalField" :class="BEM_E('additional')">{{blok.additionalField}}</span>
      </span>
      <span v-if="downarrow">
        <Vector name="icon/caret-down" fill="#1B51A3" />
      </span>
    </div>
    <div class="w-100" v-else>
      <div v-if="blok.linkLabel" :class="BEM_E('label')">{{blok.linkLabel}}</div>
      <div v-if="blok.linkCaption" :class="BEM_E('caption')" class="text-left">{{blok.linkCaption}}</div>
    </div>
  </nuxt-link>

  <!-- Basic Btn -->
  <b-button
    v-else
    :href="link"
    :target="target ? target : '_self'"
    :rel="blok.relNoFollow ? 'nofollow' : null"
    :class="BEM_B"
    variant="base"
  >
    <span v-if="icon" :class="BEM_E('icon')">
      <img :src="icon">
    </span>
    <span v-if="label || caption" :class="BEM_E('contents')">
      <span v-if="label" :class="BEM_E('label')">{{label}}</span>
      <span v-if="caption" :class="BEM_E('caption')">{{caption}}</span>
      <span v-if="additional" :class="BEM_E('additional')">{{additional}}</span>
    </span>
  </b-button>
</template>

<script>
import VueScrollTo from 'vue-scrollto'
import BaseComponent from '~/src/components/Templates/BaseComponent'
import BEM from '~/mixins/bem.js'
import Vector from '~/src/components/Elements/Vector'

export default {
  extends: BaseComponent,
  components: {
    Vector
  },
  mixins: [BEM],
  props: {
    name: {
      type: String,
      default: 'Btn'
    },
    blok: Object,
    isNavLink: {
      type: Boolean,
      default: false,
      required: false
    },
    // otherwise
    icon: String,
    label: String,
    caption: String,
    additional: String,
    link: String,
    target: [String, Boolean],
    domain: String,
    downarrow: [String, Boolean],
    change:{
      type: Boolean,
      default:false
    },
  },
  data() {
    return {active: false}
  },
  methods: {
    mouseOver(action){
      if(action === 'in'){
        this.active = true;
      }
      if(action === 'out'){
        this.active = false;
      }
    },
    BEM_E: function(el) {
      return BEM.methods.ElCls(this.name, el)
    },
    BEM_M: function(mod) {
      return BEM.methods.ModCls(this.name, mod)
    },

    // prepend with lang
    makeStoryLink (link) {
      let url = link.cached_url
      let lang = this.$store.state.language !== 'en' ? '/' + this.$store.state.language + '/' : '/'
      let strippedUrl = url.indexOf('resources/') > -1 ? url.replace('resources/', '') : url

      if(!strippedUrl.startsWith(lang)) {
        strippedUrl = lang + strippedUrl
      }

      return strippedUrl + '/'
    },

    scrollToAnchor (link) {
      if (link[0] !== '#') {
        return false
      }

      VueScrollTo.scrollTo(link, 500, {
        container: 'body',
        easing: 'linear',
        force: true,
        offset: -120
      })
    },

    makeExternalLink (link) {
      if (link[0] === '#') {
        return this.$route.path + link
      }

      let lang = '/' + this.$store.state.language
      this.$store.state.language !== 'en' ? lang += '/' : lang = '/'

      const isValidUrl = this.checkUrlValidity(link)
      const rawUrl = isValidUrl ? link : lang + link

      if (isValidUrl) {
        return link
      }

      return rawUrl
    },

    checkUrlValidity(str) {
      let res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)

      if (res == null) {
        return false
      } else {
        return true
      }
    },

    checkResourceMatch(link) {
      let env = process.env.prodUrl

      let resourceMatch = [
        'resources', '/zh-cn/resources',
        'articles', '/zh-cn/articles',
        'events', '/zh-cn/events',
        'faqs', '/zh-cn/faqs',
        'people', '/zh-cn/people',
        'tools', '/zh-cn/tools',
        'webcasts', '/zh-cn/webcasts']

      let isResource = resourceMatch.some(function(v) { return link.startsWith(v) })
      let domainIsResources = env.includes('resources.wellcertified')

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
  },
  computed: {
    computeMods () {
      let arr = []
      if (this.mods && this.mods !== []) {
        arr = this.mods
      }

      if (this.blok && this.blok.variation) {
        arr.push(this.blok.variation)
      }

      return arr
    },
    computeCls () {
      let arr = []
      if (this.blok && this.blok.classes) {
        arr = this.blok.classes.split(',')
      }

      return arr
    },
    BEM_B () {
      return BEM.methods.BlockCls(this.name, this.computeMods, this.computeCls)
    }
  }
}
</script>
