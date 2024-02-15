<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
        <carousel
          v-if="blok.sound.length > 2 && (windowWidth <= 767)"
          :per-page="1"
          :mouse-drag="true"
          @page-change="handlePausingAudio"
        >
          <slide
            v-for="(item, index) in blok.sound"
            :key="index"
            @slide-click="handleAudioClick(item)"
          >
            <AudioCard
              :image="item.image[0]"
              :title="item.title"
              :caption="item.caption"
              :audio="item.audio"
              :playing="isPlaying(item)"
            />
          </slide>
        </carousel>
        <ul
          :class="BEM_E('list')"
          v-if="(windowWidth > 767) || blok.sound.length <= 2"
          class="row"
        >
          <li
            v-for="(item, index) in blok.sound"
            :key="index"
            :class="BEM_E('item')"
            @click="handleAudioClick(item)"
          >
            <AudioCard
              :image="item.image[0]"
              :title="item.title"
              :caption="item.caption"
              :audio="item.audio"
              :playing="isPlaying(item)"
            />
          </li>
        </ul>
      </div>
    </div>
    <resize-observer @notify="handleResize" />
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import AudioCard from '~/src/components/Modules/AudioList/single'
import { Carousel, Slide } from 'vue-carousel';
import {Howl, Howler} from 'howler';
export default {
  extends: BaseComponent,
  components: {
    AudioCard,
    Carousel,
    Slide
  },
  props: {
    name: {
      type: String,
      default: 'AudioList'
    }
  },
  data () {
    return {
      activeCard: null,
      sound: null
    }
  },
  methods: {
    loadAudio(audio) {
      this.sound = new Howl({
        src: [audio],
        html5: true
      })
    },
    isPlaying (audio) {
      return this.activeCard === audio.title
    },
    isActiveCard (audio) {
      return audio.title === this.activeCard
    },
    handleAudioClick (audio) {
      if (this.isActiveCard(audio)) {
        this.handlePausingAudio(audio)
      }
      else if (this.activeCard !== audio.title) {
        this.handleNewAudio(audio)
      }
    },
    handlePausingAudio () {
      if (this.sound) {
        this.sound.pause()
        this.setActiveCard(null)
      }
    },
    handleNewAudio (audio) {
      if (this.activeCard !== null) {
        this.handlePausingAudio()
      }
      this.setActiveCard(audio.title)
      this.loadAudio(audio.audio.filename)
      this.sound.play()
    },
    setActiveCard (audio) {
      this.activeCard = audio
    }
  }
}
</script>
