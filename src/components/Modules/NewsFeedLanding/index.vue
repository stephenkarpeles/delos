<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="container">

      <div class="row">
        <div class="col-md-12">
          <h1
            v-if="blok.title"
            v-html="blok.title"
            :class="BEM_E('title')"
          />
          <div
            v-if="renderField_description && renderField_description.length"
            v-html="renderField_description"
            :class="BEM_E('description')"
          />
        </div>
      </div>

      <div
        v-if="screenWidth > mobileBreakPoint"
        class="row"
      >
        <div
          v-for="item in blok.items"
          :key="item._uid"
          :class="[
            getItemRowClasses(item),
            'col'
          ]"
        >
          <NewsFeedLandingItem :blok="item" />
        </div>
      </div>

      <div
        v-else
        :class="BEM_E('mobile-carousel')"
      >
        <div class="wrapper">
          <VueSlickCarousel
            :ref="mobileCarouselName"
            v-bind="slickOptions"
            @afterChange="slickOnAfterChange"
          >
            <div
              v-for="item in blok.items"
              :key="item._uid"
            >
              <NewsFeedLandingItem :blok="item" />
            </div>
          </VueSlickCarousel>
        </div>

        <div
          :class="BEM_E('mobile-carousel-dots')"
        >
          <div
            v-for="(item, idx) in blok.items"
            :key="item._uid"
            @click="slickGoToSlide(idx)"
            :class="[
              currentSlideIndex === idx && 'active'
            ]"
            class="dot"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import NewsFeedLandingItem from './single'
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  components: {
    VueSlickCarousel,
    NewsFeedLandingItem
  },

  extends: BaseComponent,

  props: {
    name: {
      type: String,
      default: 'NewsFeedLanding'
    },
    blok: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      tabletBreakpoint: 768,
      mobileBreakPoint: 425,
      screenWidth: window.innerWidth,
      mobileCarouselName: 'NewsFeedLandingMobileSlider',
      currentSlideIndex: 0,
      slickOptions: {
        responsive: [
          {
            breakpoint: 9999,
            settings: 'unslick'
          },
          {
            breakpoint: 425,
            settings: {
              slidesToShow: 2,
              arrows: false,
              dots: false,
              centerMode: false,
              infinite: true,
              pauseOnHover: this.blok.carouselPauseOnHover || false,
              autoplay: this.blok.carouselAutoplay || false,
              autoplaySpeed: (parseInt(this.blok.carouselAutoplaySpeed) > 0) ? parseInt(this.blok.carouselAutoplaySpeed) : 3000,
            }
          }
        ]
      }
    }
  },

  computed: {
    renderField_description () {
      const rendered = this.$storyapi.richTextResolver.render(this.blok.description)
      if (!rendered.replace(/(<([^>]+)>)/gi, '')) {
        return false
      }
      return rendered
    }
  },

  mounted () {
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth
    })
  },

  methods: {
    getItemRowClasses (item) {
      return (item.variation === 'large') ? 'col-md-12' : 'col-md-6'
    },

    slickOnAfterChange (slideIndex) {
      this.currentSlideIndex = slideIndex
    },

    slickGoToSlide (slideIndex) {
      this.$refs[this.mobileCarouselName].goTo(slideIndex)
    }
  }
}
</script>
