<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2>{{ blok.title }}</h2>
        </div>
        <div class="col-md-6">
          <p>{{ blok.body }}</p>
        </div>
      </div>
    </div>

    <div class="container hs-slider-container">
      <div class="row">
        <div class="col-12 padding-left-reset">

          <VueSlickCarousel v-bind="slickOptions" :ref="'carousel'" :variableWidth="true">
            <div
              v-for="item in blok.solutioncard"
              :key="item._uid"
            >
              <ImageCardItem
                :blok="item"
                :card-height="sanitizeCardHeight()"
              />
            </div>
          </VueSlickCarousel>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12">
          <div :class="BEM_E('bm-button')">
            <span @click="prevArrow('carousel')"><Vector name="icon/play-circle-left"/></span>
            <span @click="nextArrow('carousel')"><Vector name="icon/play-circle-right"/></span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import ImageCardItem from '~/src/components/Modules/ImageCardRow/single'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  components: {
    ImageCardItem,
    VueSlickCarousel
  },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'HealthSolutionSlider'
    }
  },
  data () {
    return {
      slickOptions: {
        slidesToShow: 5,
        arrows: false,
        dots: false,
        infinite: true,
        centerMode: false,
        pauseOnHover: this.blok.carouselPauseOnHover || false,
        autoplay: this.blok.carouselAutoplay || false,
        autoplaySpeed: (parseInt(this.blok.carouselAutoplaySpeed) > 0) ? parseInt(this.blok.carouselAutoplaySpeed) : 3000,
        responsive: [
          {
            breakpoint: 1040,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      }
    }
  },
  methods: {
    nextArrow(caro) {
      this.$refs[caro].next()
    },
    prevArrow(caro) {
      this.$refs[caro].prev()
    },
    sanitizeCardHeight() {
      let cardHeight = this.blok.cardHeight || null
      if (!cardHeight) {
        return false
      }

      cardHeight = parseInt(cardHeight)
      if (cardHeight < 100) {
        cardHeight = 100
      } else if (cardHeight > 800) {
        cardHeight = 800
      }

      return cardHeight
    }
  }
}
</script>
