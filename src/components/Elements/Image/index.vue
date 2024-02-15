<template>
  <img
    v-if="blok && blok.resize !== true"
    :src="blok.imageLocation ? blok.imageLocation.filename: ''"
    :alt="blok.imageLocation ? blok.imageLocation.alt : ''"
    :width="blok.suggestedWidth ? blok.suggestedWidth : null"
    :height="height ? height : null"
  >
  <img
    v-else-if="blok && blok.resize === true"
    :src="prepImg(blok.imageLocation, blok.resizeWidth + 'x' + blok.resizeHeight + '/smart')">
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import BEM from '~/mixins/bem.js'

export default {
  extends: BaseComponent,
  mixins: [BEM],
  props: {
    name: {
      type: String,
      default: 'Img'
    },
    blok: Object,

    // otherwise
    src: String,
    alt: String,
    width: Number,
    height: Number,
  },
  methods: {
    BEM_E: function(el) {
      return BEM.methods.ElCls(this.name, el)
    },
    BEM_M: function(mod) {
      return BEM.methods.ModCls(this.name, mod)
    },
    prepImg(image, option) {
      const imageService = '//img2.storyblok.com/'
      const imgSearch = 'https://a.storyblok.com'
      let hasString = image && image.filename.includes(imgSearch)

      if (hasString) {
        let path = image.filename.replace(imgSearch, '')
        return imageService + option + path
      }

      return image
    }
  },
  computed: {
    computeMods () {
      let arr = []
      if (this.mods && this.mods !== []) {
        arr = this.mods
      }

      if (this.blok && this.blok.variation) {
        arr.push(this.blok.variation)
      }

      return arr
    },
    computeCls () {
      let arr = []
      if (this.blok && this.blok.classes) {
        arr = this.blok.classes.split(',')
      }

      return arr
    },
    BEM_B () {
      return BEM.methods.BlockCls(this.name, this.computeMods, this.computeCls)
    }
  }
}
</script>
