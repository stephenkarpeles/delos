<template>
  <div
    :id="blok.id || blok._uid"
    :class="[
      BEM_B,
      (screenWidth <= mobileBreakPoint) && `${name}--carousel`
    ]"
    :style="applyElementStyle()"
  >
    <div
      v-if="(blok.variation === 'carousel' || screenWidth <= mobileBreakPoint)"
      class="container"
    >
      <div
        :class="[
          isBleedingCarousel && 'carousel-is-bleeding',
          'row'
        ]"
      >
        <div
          :class="[
            'col',
            'col-12',
            'position-relative',
            'padding-right-reset'
          ]"
          @mouseenter="slickMouseEnter()"
          @mouseleave="slickMouseLeave()"
        >
          <VueSlickCarousel
            v-bind="defaultSlickOptions"
            :ref="defaultSlickName"
          >
            <div
              v-for="item in blok.items"
              :key="item._uid"
              class="image-card-row"
            >
              <ImageCardItem
                :blok="item"
                :card-height="sanitizeCardHeight()"
              />
            </div>
          </VueSlickCarousel>
          <div
            :class="[
              BEM_E('default-carousel-controls'),
              isBleedingCarousel && 'carousel-is-bleeding',
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
          <div
            v-if="isBleedingCarousel"
            :class="BEM_E('bleeding-shadow')"
            :style="{
              maxHeight: `${sanitizeCardHeight()}px`
            }"
            class="d-none d-lg-block"
          />
        </div>
      </div>

    </div>

    <div
      v-else
      class="container"
    >
      <div
        :class="BEM_E('card-row-row')"
        class="row"
      >
        <div
          :class="BEM_E('card-row-col')"
          class="col col-md-12"
        >
          <div
            :class="[blok.variationOneColumnPadding ? 'has-hidden-column' : '']"
            class="image-card-rows"
          >
            <VueSlickCarousel v-bind="noCarouselSlickOptions">
              <div
                v-if="
                  blok.variationOneColumnPadding
                    && screenWidth > mobileBreakPoint
                "
                class="image-card-row d-none d-md-block"
              />
              <div
                v-for="item in blok.items"
                :key="item._uid"
                class="image-card-row"
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
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import BaseComponent from '~/src/components/Templates/BaseComponent'
import ImageCardItem from '~/src/components/Modules/ImageCardRow/single'

export default {
  components: {
    VueSlickCarousel,
    ImageCardItem
  },

  extends: BaseComponent,

  props: {
    name: {
      type: String,
      default: 'ImageCardRow'
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
      screenWidth: window.innerWidth,
      isBleedingCarousel: !!(this.blok.carouselBleed),
      defaultSlickName: 'ImageCardRow-default-carousel',
      showDefaultSlickControls: false,
      defaultSlickOptions: {
        slidesToShow: (this.blok.carouselBleed) ? 5 : 4,
        infinite: this.blok.carouselBleed ? true : this.blok.carouselInfinite,
        centerMode: false,
        arrows: false,
        dots: false,
        cssEase: 'ease-in-out',
        pauseOnHover: this.blok.carouselPauseOnHover || false,
        autoplay: this.blok.carouselAutoplay || false,
        autoplaySpeed: this.blok.carouselAutoplaySpeed ? parseInt(this.blok.carouselAutoplaySpeed) : 3000,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: (this.blok.carouselBleed) ? 4 : 3
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: (this.blok.carouselBleed) ? 3 : 2
            }
          },
          {
            breakpoint: 525,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      },
      noCarouselSlickOptions: {
        responsive: [
          {
            breakpoint: 9999,
            settings: 'unslick'
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              arrows: false,
              dots: false,
              centerMode: false,
              // centerPadding: '50%',
              infinite: true
            }
          }
        ]
      }
    }
  },

  mounted () {
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth
    })
  },

  methods: {
    applyElementStyle () {
      const style = {}
      if (this.blok.backgroundColor1 && this.blok.backgroundColor2) {
        const bgColor1 = this.blok.backgroundColor1
        const bgColor2 = this.blok.backgroundColor2
        style.background = `linear-gradient(to bottom, ${bgColor1} 75%, ${bgColor2} 75%)`
      }

      return style
    },
    sanitizeCardHeight () {
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
    },

    slickSlideNext () {
      this.$refs[this.defaultSlickName].next()
    },

    slickSlidePrev () {
      this.$refs[this.defaultSlickName].prev()
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
<style scoped>
@media screen and (max-width: 767px) {
  .container {
    padding-right: 0px !important;
  }
}
</style>
