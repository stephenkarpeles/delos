<template>
  <div v-if="!isMobile"
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="container">
      <div
        :class="BEM_E('background')"
        :style="wrapperStyle()"
        class="row"
      >
        <div class="col-md-6 col-carousel-navigation padding-left-reset padding-right-reset">
          <div
            v-if="slickEnabled"
            class="col-carousel-navigation-controls"
          >
            <span
              @click="triggerCarouselEvent('prev')"
              class="action-button prev"
            >
              <Vector name="icon/FeatureQuote-ButtonLeft" />
            </span><span
              @click="triggerCarouselEvent('next')"
              class="action-button next"
            >
              <Vector name="icon/FeatureQuote-ButtonRight" />
            </span>
          </div>
        </div>

        <div
          class="col-md-6 padding-left-reset padding-right-reset"
        >
          <div
            :class="BEM_E('content-wrapper')"
          >
            <div
              v-if="blok.image && blok.image.filename"
              :class="BEM_E('image')"
            >
              <img
                :src="prepareImage(blok.image.filename, '225x200/smart')"
                :alt="blok.name"
              />
            </div>
            <div
              v-if="blok.body"
              v-html="blok.body"
              :class="BEM_E('body')"
            ></div>

            <div
              v-if="blok.name || blok.position"
              :class="BEM_E('quoter')"
            >
              <span
                v-if="blok.name"
                v-html="blok.name"
                :class="BEM_E('quoter-name')"
              ></span><span
                v-if="blok.name && blok.position"
                v-html="', '"
              ></span>
              <span
                v-if="blok.position"
                v-html="blok.position"
                :class="BEM_E('quoter-position')"
              ></span>
            </div>

            <div
              v-if="blok.companyLogo && blok.companyLogo.filename"
              :class="BEM_E('logo')"
            >
              <img
                :src="blok.companyLogo.filename"
                width="95"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else 
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="container">
      <div
        :class="BEM_E('background')"
        :style="wrapperStyle('mobile')"
        class="row"
      >

        <div
          class="col-md-6 p-0"
        >
          <div
            :class="BEM_E('content-wrapper')"
          >
            <div
              v-if="blok.image && blok.image.filename"
              :class="BEM_E('image')"
            >
              <img
                :src="prepareImage(blok.image.filename, '225x200/smart')"
                :alt="blok.name"
              />
            </div>
            <div
              v-if="blok.body"
              v-html="blok.body"
              :class="BEM_E('body')"
            ></div>

            <div
              v-if="blok.name || blok.position"
              :class="BEM_E('quoter')"
            >
              <span
                v-if="blok.name"
                v-html="blok.name"
                :class="BEM_E('quoter-name')"
              ></span><span
                v-if="blok.name && blok.position"
                v-html="', '"
              ></span>
              <span
                v-if="blok.position"
                v-html="blok.position"
                :class="BEM_E('quoter-position')"
              ></span>
            </div>

            <div
              v-if="blok.companyLogo && blok.companyLogo.filename"
              :class="BEM_E('logo')"
            >
              <img
                :src="blok.companyLogo.filename"
                width="95"
                alt=""
              />
            </div>
          </div>
        </div>
         <div class="col-md-6 col-carousel-navigation ">
          <div
            v-if="slickEnabled"
            class="col-carousel-navigation-controls"
          >
            <span
              @click="triggerCarouselEvent('prev')"
              class="action-button prev"
            >
              <Vector name="icon/FeatureQuote-ButtonLeft" />
            </span><span
              @click="triggerCarouselEvent('next')"
              class="action-button next"
            >
              <Vector name="icon/FeatureQuote-ButtonRight" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'FeatureQuote'
    },
    blok: {
      type: Object,
      default: null
    },
    // slick options
    slickEnabled: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      isMobile: false,
    }
  },
  beforeDestroy () {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', this.onResize, { passive: true })
  },

  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    onResize () {
        this.isMobile = window.innerWidth < 768
    },
    wrapperStyle (mob) {
      const style = {}
      if(mob === 'mobile'){
        // if (this.blok.mobileBackgroundImage && this.blok.mobileBackgroundImage.filename) {
        //   const bgImage = this.prepareImage(this.blok.mobileBackgroundImage.filename, '750x540/smart')
        //   style.backgroundImage = `url(${bgImage})`
        // }
      }
      else{
        if (this.blok.backgroundImage && this.blok.backgroundImage.filename) {
          const bgImage = this.prepareImage(this.blok.backgroundImage.filename, '750x540/smart')
          style.backgroundImage = `url(${bgImage})`
        }
      }
      return style
    },

    triggerCarouselEvent (eventName) {
      this.$emit('feature-quote-slider-event', eventName)
    }
  }
}
</script>
