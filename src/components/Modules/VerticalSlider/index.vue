<template
  v-if="blok.items && blok.items.length"
>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >

    <div class="container">
      <div class="row">
        <div
          :class="BEM_E('pager-titles')"
          class="col-lg-6 container-titles"
        >
          <div class="container-titles-inner">
            <div
              v-for="(item, idx) in blok.items"
              :key="item._uid"
              :class="BEM_E('title-container')"
              @click="slickGoToSlide(idx)"
              :id="idx === currentSlideIndex ? 'active' : 'deactive'"
            >
              <h4
                v-if="item.title"
                v-html="item.title"
                :class="BEM_E('title')"
              />
              <div
                v-if="item.body"
                v-html="renderRichText(item.body)"
                :class="BEM_E('body')"
              />
            </div>

            <div
              v-if="blok.links && blok.links.length"
              :class="BEM_E('links')"
            >
              <div
                v-for="link in blok.links"
                :key="link._uid"
                class="link-item"
              >
                <Btn :blok="link" />
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 d-none d-lg-block container-slides">
          <VueSlickCarousel
            :ref="sliderName"
            v-bind="slickOptions"
            @afterChange="slickOnAfterChange"
          >
            <div
              v-for="(item, idx) in blok.items"
              :key="item._uid"
              :class="BEM_E('image')"
              :style="{
                backgroundImage: (item.image && item.image.filename) ? `url(${item.image.filename})` : null
              }"
            >
            </div>
          </VueSlickCarousel>

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
      default: 'VerticalSlider'
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
      sliderName: 'VerticalCarouselSlider',
      slickOptions: {
        slidesToShow: 1,
        infinite: true,
        centerMode: false,
        arrows: false,
        dots: false,
        pauseOnHover: this.blok.carouselPauseOnHover || false,
        autoplay: this.blok.carouselAutoplay || false,
        autoplaySpeed: (parseInt(this.blok.carouselAutoplaySpeed) > 0) ? parseInt(this.blok.carouselAutoplaySpeed) : 3000,
        responsive: []
      }
    }
  },

  methods: {
    renderRichText (field) {
      return this.$storyapi.richTextResolver.render(field)
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
