<template
  v-if="blok.items && blok.items.length"
>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12">

          <div :class="BEM_E('carousel')">

            <VueSlickCarousel
              :ref="sliderName"
              v-bind="slickOptions"
            >
              <div
                v-for="item in blok.items"
                :key="item._uid"
              >
                <FeatureQuote
                  :blok="item"
                  :slick-enabled="true"
                  @feature-quote-slider-event="slickTriggerAction"
                />
              </div>
            </VueSlickCarousel>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import BaseComponent from '~/src/components/Templates/BaseComponent'
import FeatureQuote from '~/src/components/Modules/FeatureQuote'

export default {
  components: {
    VueSlickCarousel,
    FeatureQuote
  },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'FeatureQuoteSlider'
    },
    blok: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      slidesCount: this.blok.items.length,
      currentSlideIndex: 0,
      sliderName: 'FeatureQuoteCarouselSlider',
      slickOptions: {
        slidesToShow: 1,
        infinite: true,
        centerMode: false,
        arrows: false,
        dots: false,
        pauseOnHover: this.blok.carouselPauseOnHover || false,
        autoplay: this.blok.carouselAutoplay || false,
        autoplaySpeed: this.blok.carouselAutoplaySpeed ? parseInt(this.blok.carouselAutoplaySpeed) : 3000,
        responsive: []
      }
    }
  },

  methods: {
    slickSlideNext () {
      this.$refs[this.sliderName].next()
    },

    slickSlidePrev () {
      this.$refs[this.sliderName].prev()
    },

    slickTriggerAction (actionName) {
      if (actionName === 'next') {
        this.slickSlideNext()
      } else if (actionName === 'prev') {
        this.slickSlidePrev()
      }
    }
  }
}
</script>
