<template>
  <div
    v-if="blok.variation != 'slide-card'"
    :class="BEM_B"
  >
    <div :class="BEM_E('image')">
      <Img
        :blok="image"
      />
    </div>
    <div :class="BEM_E('play')">
      <Vector
        :name="playing ? 'icon/PauseButton' : 'icon/PlayButton'"
        width="90"
        height="90"
      />
    </div>
    <div :class="BEM_E('content')">
      <div :class="BEM_E('title')">
        <span>{{ title }}</span>
      </div>
      <div :class="BEM_E('caption')">
        {{ caption }}
      </div>
    </div>
  </div>
  <div :class="BEM_B" v-else-if="blok.variation === 'slide-card'">
    <div
     :style="setHeroBackground(image)"
     :class="BEM_E('container')"
    >
        <div :class="BEM_E('content')">
          <div :class="BEM_E('title')">
            <h3>{{ title }}</h3>
          </div>
          <div :class="BEM_E('caption')">
            <h5>{{ caption }}</h5>
          </div>
        </div>
          <div :class="BEM_E('play')">
            <Vector
              :name="playing ? 'icon/PauseButton' : 'icon/PlayButton'"
              width="90"
              height="90"
            />
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
      default: 'AudioCard'
    },
    image: {
      type: Object ,
      default: () => {}
    },
    audio: {
      type: Object ,
      default: () => {}
    },
    title: {
      type: String,
      default: null
    },
    playing: {
      type: Boolean,
      default: null
    },
    caption: {
      type: String,
      default: null
    }
  },
  data () {
    return {
    }
  },
  methods: {
    setHeroBackground (image) {
      if (image.imageLocation && image.imageLocation.filename) {
        const bgUrl = image.imageLocation.filename
        return {
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.34902) 0%, rgba(0, 0, 0, 0.0001) 46.35%, rgba(0, 0, 0, 0) 69.27%, rgba(0, 0, 0, 0.35) 100%), url(${bgUrl})`,
          backgroundSize: 'cover',
          height: '450px',
          width: '360px'
        }
      }

      return {}
    }
  }
}
</script>
