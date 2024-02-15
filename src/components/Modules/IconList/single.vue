<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >

    <div class="inner">

      <div class="icon-wrapper">
        <div
          v-if="blok.image && blok.image.filename"
          :class="BEM_E('image')"
        >
          <img
            :src="getImageUrl()"
            :alt="blok.title"
            :class="[
              (blok.variationIcon === 'null') && 'img-fluid'
            ]"
          />
        </div>
      </div>

      <div class="contents-wrapper">
        <h4
          v-if="blok.title"
          v-html="blok.title"
          :class="BEM_E('title')"
        ></h4>
        <div
          v-if="blok.body"
          v-html="blok.body"
          :class="BEM_E('body')"
        ></div>

        <div
          v-if="blok.link && blok.link.length"
          :class="BEM_E('link')"
        >
          <Btn :blok="blok.link[0]" />
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Btn from '~/src/components/Elements/Btn'

export default {
  components: {
    Btn
  },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'Icon'
    },
    blok: {
      type: Object,
      default: null
    }
  },
  methods: {
    getImageSize () {
      let imageSize = ''
      if (!this.blok.variationIcon) {
        imageSize = '64x64'
      }

      switch (this.blok.variationIcon) {
        case 'large':
          imageSize = '100x100'
          break
        case 'small':
          imageSize = '64x64'
          break
        case 'null':
        default:
          imageSize = null
          break
      }

      return imageSize
    },
    getImageUrl () {
      if (!this.blok.image || !this.blok.image.filename) {
        return false
      }

      const imageSize = this.getImageSize()
      const imageUrl = this.blok.image.filename

      if (imageSize) {
        return this.prepareImage(imageUrl, `${imageSize}/smart`)
      }

      return imageUrl
    }
  }
}
</script>
