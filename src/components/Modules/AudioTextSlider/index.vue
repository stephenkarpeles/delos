<template>
  <div :class="BEM_B">
    <div :class="BEM_E('container')" class="container">
      <div :class="BEM_E('row')" class="row">
        <div :class="BEM_E('left-col')" class="col-md-5">
          <div :class="BEM_E('content')">
            <div :class="BEM_E('title')" class="d-none d-md-block">
              <h2>{{ blok.title }}</h2>
            </div>
            <div
              :class="BEM_E('bm-button')"
              class="clearfix d-block d-md-none"
            >
              <span class="slide-number">0{{ currentSlide }}/0{{ totalSlide }} </span>
              <span
                @click="prevArrow('carousel')"
                class="prev"
              >
                <Vector name="icon/play-circle-right"/>
              </span>
              <span
                @click="nextArrow('carousel')"
                class="next"
              >
                <Vector name="icon/play-circle-left"/>
              </span>
            </div>
            <div :class="BEM_E('title')" class="d-block d-md-none padding-top-xs">
              <h2>{{ blok.title }}</h2>
            </div>
            <div :class="BEM_E('body')"><p>{{ blok.body }}</p></div>
            <div :class="BEM_E('more-button')">
              <Btn :blok="blok.button[0]"/>
            </div>
          </div>
        </div>
        <div :class="BEM_E('right-col')" class="col-md-7">
          <VueSlickCarousel
            v-bind="slickOptions"
            :ref="'carousel'"
            @reInit="onInitCarousel"
            @afterChange="onAfterChange"
          >
            <div v-for="(item, index) in blok.audioitems" :key="index" @click="handleAudioClick(item)">
              <AudioCard
                :blok="item"
                :image="item.image[0]"
                :title="item.title"
                :caption="item.caption"
                :audio="item.audio"
                :playing="isPlaying(item)"
              />
            </div>
          </VueSlickCarousel>
          <div
            :class="BEM_E('bm-button-desktop')"
            class="clearfix d-none d-md-block"
          >
            <span class="slide-number">0{{ currentSlide }}/0{{ totalSlide }}</span>
            <span
              @click="prevArrow('carousel')"
              class="prev"
            >
              <Vector name="icon/play-circle-right"/>
            </span>
            <span
              @click="nextArrow('carousel')"
              class="next"
            >
              <Vector name="icon/play-circle-left"/>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import AudioCard from '~/src/components/Modules/AudioList/single'
import {Howl, Howler} from 'howler'

export default {
  components: {
    VueSlickCarousel,
    AudioCard
  },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'AudioTextSlider'
    }
  },
  methods: {
    loadAudio(audio) {
      this.sound = new Howl({
        src: [audio],
        html5: true
      })
    },
    isPlaying(audio) {
      return this.activeCard === audio.title
    },
    isActiveCard(audio) {
      return audio.title === this.activeCard
    },
    handleAudioClick(audio) {
      if (this.isActiveCard(audio)) {
        this.handlePausingAudio(audio)
      } else if (this.activeCard !== audio.title) {
        this.handleNewAudio(audio)
      }
    },
    handlePausingAudio() {
      if (this.sound) {
        this.sound.pause()
        this.setActiveCard(null)
      }
    },
    handleNewAudio(audio) {
      if (this.activeCard !== null) {
        this.handlePausingAudio()
      }
      this.setActiveCard(audio.title)
      this.loadAudio(audio.audio.filename)
      this.sound.play()
    },
    setActiveCard(audio) {
      this.activeCard = audio
    },
    nextArrow (caro) {
      this.$refs[caro].next()
    },
    prevArrow (caro) {
      this.$refs[caro].prev()
    },
    onInitCarousel() {
      // console.log(this.totalSlide());
      // slideCount = slick.slideCount();
      // this.setSlideCount();
      // this.setCurrentSlideNumber(slick.currentSlide);
    },
    onAfterChange (slideIndex) {
      this.currentSlide = slideIndex + 1
    }
  },
  data () {
    return {
      currentSlide: 1,
      totalSlide: this.blok.audioitems.length,
      activeCard: null,
      sound: null,
      slickOptions: {
        slidesToShow: 1,
        arrows: false,
        dots: false,
        infinite: true,
        centerMode: true,
        centerPadding: "10px",
        responsive: [
          {
            breakpoint: 786,
            settings: {
              arrows: false,
              slidesToShow: 1,
              centerPadding: "10px",
              centerMode: false,
              dots: false,
              infinite: true,
            }
          },
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              slidesToShow: 1,
              centerPadding: "12px",
              dots: false,
              infinite: true,
              centerMode: true,
            }
          }
        ]
      }
    }
  },
  mounted () {
  }
}
</script>
