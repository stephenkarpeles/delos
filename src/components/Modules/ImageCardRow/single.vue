<template
  v-if="blok.image && blok.image.filename"
>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >

    <a
      @click="scrollToAnchor(blok.cardUrl)"
      :href="getCardLink()"
      :target="blok.cardLinkNewPage ? '_blank' : null"
      :style="getCardStyles()"
      :class="[
        BEM_E('inner'),
        blok.cardHoverEffect && 'has-hover-effect'
      ]"
    >

      <div
        v-if="blok.title || blok.subtitle || (blok.links && blok.links.length)"
        :class="BEM_E('contents-wrapper')"
      >
        <h3
          v-if="blok.title"
          v-html="blok.title"
          :class="BEM_E('title')"
        />
        <div
          v-if="blok.subtitle"
          v-html="blok.subtitle"
          :class="BEM_E('subtitle')"
        ></div>

        <div
          v-if="blok.links && blok.links.length"
          :class="BEM_E('links')"
        >
          <Btn
            v-for="link in blok.links"
            :key="link._uid"
            :blok="link"
          />
        </div>

      </div>
    </a>

  </div>
</template>

<script>
import VueScrollTo from 'vue-scrollto'
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Btn from '~/src/components/Elements/Btn'

export default {
  components: {
    Btn
  },

  extends: BaseComponent,

  props: {
    name: {
      type: String,
      default: 'ImageCardItem'
    },
    blok: {
      type: Object,
      default: null
    },
    cardHeight: {
      type: [ String, Number, Boolean ],
      default: null
    }
  },

  data () {
    return {
      screenWidth: window.innerWidth,
      tabletBreakpoint: 960,
      mobileBreakpoint: 767
    }
  },

  methods: {
    getCardLink () {
      const link = this.blok.cardUrl || null
      if (!link) {
        return null
      }
      if (link[0] === '#') {
        return this.$route.path + link
      }
      return link
    },

    scrollToAnchor (link) {
      if (!link) {
        return false
      }
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

    getCardStyles () {
      const backgroundImage = this.blok.image.filename
      let cardHeight = parseInt(this.cardHeight)

      if (
        (cardHeight > 0) &&
        (this.screenWidth < this.tabletBreakpoint) &&
        (this.screenWidth > this.mobileBreakpoint)
      ) {
        cardHeight = Math.floor(cardHeight * 0.75)
      }

      return {
        backgroundImage: `url(${backgroundImage})`,
        minHeight: (cardHeight > 0) ? `${cardHeight}px` : null
      }
    }
  }
}
</script>
