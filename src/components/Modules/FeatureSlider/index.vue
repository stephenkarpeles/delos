<template
  v-if="blok.items && blok.items.length"
>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >

    <div class="container">
      <div class="row d-none d-md-block">
        <div class="col-md-12">

          <div :class="BEM_E('pager')">
            <div
              v-for="(item, idx) in blok.items"
              :key="item._uid"
              class="pager-item"
            >
              <div
                @click="slickGoToSlide(idx)"
                :class="[
                  idx === currentSlideIndex ? 'active' : ''
                ]"
                class="pager-item-inner"
              >
                <div
                  v-html="getSlideNumber(idx)"
                  :class="BEM_E('pager-item-index')"
                />
                <div
                  v-html="item.title"
                  :class="BEM_E('pager-item-title')"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      <div
        :class="BEM_E('carousel-row')"
        class="row"
      >
        <div
          @mouseenter="slickMouseEnter()"
          @mouseleave="slickMouseLeave()"
          class="col col-md-12"
        >

          <VueSlickCarousel
            :ref="sliderName"
            v-bind="slickOptions"
            @afterChange="slickOnAfterChange"
          >
            <div
              v-for="(item, idx) in blok.items"
              :key="item._uid"
            >
              <div
                v-if="item.image && item.image.filename"
                :class="BEM_E('image')"
                class="position-relative"
              >
                <img
                  :src="item.image.filename"
                  :alt="item.title"
                  class="img-fluid position-relative d-none d-md-block"
                />
                <img
                  :src="getMobileImageUrl(item)"
                  :alt="item.title"
                  class="img-fluid position-relative d-block d-md-none"
                />
                <div
                  :class="[
                    BEM_E('default-carousel-controls'),
                    showDefaultSlickControls && 'active',
                    'clearfix',
                    'd-none',
                    'd-lg-block'
                  ]"
                >
                  <span class="slide-nav-button">
                    <span
                      @click="slickSlidePrev()"
                      class="arrow-icon prev"
                    >
                      <Vector name="icon/SQ-ButtonLeft" />
                    </span>
                    <span
                      @click="slickSlideNext()"
                      class="arrow-icon next float-right"
                    >
                      <Vector name="icon/SQ-ButtonRight" />
                    </span>
                  </span>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6 col-md-5">
                  <h2
                    v-if="item.title"
                    v-html="item.title"
                    :class="BEM_E('title')"
                  />
                </div>

                <div class="col-lg-6 col-md-7">
                  <div
                    v-if="item.body"
                    v-html="renderRichText(item.body)"
                    :class="BEM_E('body')"
                  />
                </div>
              </div>
            </div>
          </VueSlickCarousel>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  components: {
    VueSlickCarousel
  },

  extends: BaseComponent,

  props: {
    name: {
      type: String,
      default: 'FeatureSlider'
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
      slidesCount: this.blok.items.length,
      currentSlideIndex: 0,
      showDefaultSlickControls: false,
      sliderName: 'FeatureCarouselSlider',
      slickOptions: {
        slidesToShow: 1,
        infinite: true,
        centerMode: false,
        arrows: false,
        dots: false,
        pauseOnHover: this.blok.carouselPauseOnHover || false,
        autoplay: this.blok.carouselAutoplay || false,
        autoplaySpeed: this.blok.carouselAutoplaySpeed ? parseInt(this.blok.carouselAutoplaySpeed) : 3000,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              centerMode: false
            }
          }
        ]
      }
    }
  },

  beforeDestroy () {
    if (typeof window === 'undefined') {
      return window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },

  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },

  methods: {
    onResize () {
    },
    getMobileImageUrl (item) {
      if (item.mobileimage && item.mobileimage.filename) {
        return item.mobileimage.filename
      }

      return item.image.filename
    },
    imageStyle(item){
      var moimage = item.mobileimage;
      if(moimage !== undefined && window.innerWidth < 575){
        if(typeof item.mobileimage.filename !== 'undefined' && item.mobileimage.filename != null){
          return item.mobileimage.filename
        }else{
          return item.image.filename
        }
      }
      else{
        return item.image.filename
      }
    },
    renderRichText (field) {
      return this.$storyapi.richTextResolver.render(field)
    },

    getSlideNumber (slideIndex) {
      const slideNumber = ('0' + (slideIndex + 1)).slice(-2)
      const slidesCount = ('0' + this.slidesCount).slice(-2)

      return `${slideNumber} / ${slidesCount}`
    },

    slickGoToSlide (slideIndex) {
      this.$refs[this.sliderName].goTo(slideIndex)
    },

    slickSlideNext () {
      this.$refs[this.sliderName].next()
    },

    slickSlidePrev () {
      this.$refs[this.sliderName].prev()
    },

    slickOnAfterChange (slideIndex) {
      this.currentSlideIndex = slideIndex
    },

    slickMouseEnter () {
      this.showDefaultSlickControls = true
    },

    slickMouseLeave () {
      this.showDefaultSlickControls = false
    }
  }
}
</script>
