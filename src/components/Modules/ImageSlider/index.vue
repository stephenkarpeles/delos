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
              @afterChange="slickOnAfterChange"
            >
              <div
                v-for="(item, idx) in blok.items"
                :key="item._uid"
              >
                <img
                  :src="item.image.filename"
                  :alt="item.imageAlt"
                  class="img-fluid"
                />
              </div>
            </VueSlickCarousel>
          </div>

          <div :class="BEM_E('page-indicator')">
            <div
              v-for="(item, idx) in blok.items"
              :key="item._uid"
              class="pager-item"
            >
              <div
                :class="[
                  idx === currentSlideIndex ? 'active' : ''
                ]"
                class="inner"
              />
            </div>
          </div>

          <div :class="BEM_E('carousel-arrows')">
            <span
              v-html="getSlideNumber(currentSlideIndex)"
              class="slide-count-text"
            />
            <span
              @click="slickSlidePrev()"
              class="arrow-icon"
            >
                      <Vector name="icon/play-circle-left" />
                    </span>
            <span
              @click="slickSlideNext()"
              class="arrow-icon"
            >
                      <Vector name="icon/play-circle-right" />
                    </span>
          </div>

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
      default: 'ImageSlider'
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
      sliderName: 'ImageCarouselSlider',
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
    }
  }
}
</script>
