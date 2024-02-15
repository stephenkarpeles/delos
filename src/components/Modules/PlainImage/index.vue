<template v-if="blok.image && blok.image.filename">
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
    :style="applyElementStyle()"
  >
    <div
      :class="[
        (blok.variation === 'width-boxed') && 'container'
      ]"
      class="plain-image-container"
    >
      <div
        :class="[
          (blok.variation === 'width-boxed') && 'row'
        ]"
        class="plain-image-row clearfix"
      >
        <div
          :class="[
            (blok.variation === 'width-boxed') && 'col-12'
          ]"
          class="plain-image-col"
        >

          <div
            :class="BEM_E('image')"
            :style="{}"
            class="d-none d-lg-block"
          >
            <img
              :src="getImageUrl()"
              :alt="blok.title"
              class="img-fluid"
            />
          </div>
          <div
            :class="BEM_E('image')"
            :style="{
              backgroundImage: `url(${getTabletImageUrl()})`
            }"
            class="d-none d-lg-none d-md-block"
          />
          <div
            :class="BEM_E('image')"
            class="d-block d-md-none"
          >
            <img
              :src="getMobileImageUrl()"
              :alt="blok.title"
              class="img-fluid"
            />
          </div>

        </div>
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
      default: 'PlainImage'
    },
    blok: {
      type: Object,
      default: null
    }
  },
  methods: {
    applyElementStyle () {
      const style = {}
      if (this.blok.backgroundColor1 && this.blok.backgroundColor2) {
        const bgColor1 = this.blok.backgroundColor1
        const bgColor2 = this.blok.backgroundColor2
        if (window.innerWidth > 767 && window.innerWidth < 1024) {
          style.background = `linear-gradient(to bottom, ${bgColor1} 20%, ${bgColor2} 20%)`
        } else {
          style.background = `linear-gradient(to bottom, ${bgColor1} 31%, ${bgColor2} 20%)`
        }
      }

      return style
    },

    getImageUrl () {
      const url = this.blok.image.filename

      if (!this.blok.resizeImage) {
        return url
      }
      if (!this.blok.resizeWidth || !this.blok.resizeHeight) {
        return url
      }

      return this.prepareImage(
        url,
        `${this.blok.resizeWidth}x${this.blok.resizeHeight}/smart`
      )
    },
    getTabletImageUrl() {
      if (this.blok.imageTablet && this.blok.imageTablet.filename) {
        return this.blok.imageTablet.filename
      }
      return this.getImageUrl()
    },
    getMobileImageUrl() {
      if (this.blok.imageMobile && this.blok.imageMobile.filename) {
        return this.blok.imageMobile.filename
      }
      return this.getImageUrl()
    }
  }
}
</script>
