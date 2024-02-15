<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div
      :class="BEM_E('container-1')"
    >
      <div
        :style="heroStyles()"
        class="inner mobile-hidden"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-11 offset-lg-1 offset-md-0 offset-sm-0">

              <div class="hero-wrapper">
                <h1
                  v-if="blok.caption"
                  v-html="blok.caption"
                  :class="BEM_E('caption')"
                />
                <h2
                  v-if="blok.title"
                  v-html="blok.title"
                  :class="BEM_E('title')"
                />

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

            </div>
          </div>
        </div>
      </div>

      <div class="inner-mobile mobile-visible">
        <div class="container-fluid">
          <div class="row">
            <div
              :style="heroStyles('mobile')"
              class="backgrounder-mobile col-12"
            ></div>
            <div class="content-mobile col-11 offset-md-1">

              <h2
                v-if="blok.caption"
                v-html="blok.caption"
                :class="BEM_E('caption')"
              ></h2>
              <h1
                v-if="blok.title"
                v-html="blok.title"
                :class="BEM_E('title')"
              ></h1>

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
          </div>
        </div>
      </div>

    </div>

    <div
      v-if="blok.body"
      :class="BEM_E('container-2')"
    >
      <div class="inner">

        <div class="container container-mobile">
          <div class="row">
            <div class="col-lg-10 offset-lg-1 offset-md-0 offset-0 col-12">
              <p
                v-html="blok.body"
                :class="BEM_E('body')"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
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
      default: 'HeroImage'
    },
    blok: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      tabletBreakpoint: 960,
      mobileBreakPoint: 767,
      screenWidth: window.innerWidth
    }
  },

  mounted() {
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth
    })
  },

  methods: {
    heroStyles (screen) {
      const styles = {}

      if (screen === 'mobile' && this.blok.mobileImage && this.blok.mobileImage.filename) {
        styles.backgroundImage = `url(${this.blok.mobileImage.filename})`
        return styles
      }

      if (this.screenWidth <= this.tabletBreakpoint && this.blok.tabletImage && this.blok.tabletImage.filename) {
        styles.backgroundImage = `url(${this.blok.tabletImage.filename})`
        return styles
      }

      if (this.blok.image && this.blok.image.filename) {
        styles.backgroundImage = `url(${this.blok.image.filename})`
      }

      return styles
    }
  }
}
</script>
