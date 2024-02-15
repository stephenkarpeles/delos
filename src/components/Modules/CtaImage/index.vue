<template
  v-if="blok.image && blok.image.filename"
>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12">

          <h2
            v-if="blok.outerTitle"
            v-html="blok.outerTitle"
            :class="BEM_E('outer-title')"
          />

          <div
            :class="BEM_E('image')"
            :style="getImageStyles()"
          >
            <div class="inner">

              <div
                v-if="blok.subtitle"
                v-html="blok.subtitle"
                :class="BEM_E('subtitle')"
                class="text-content"
              />
              <h2
                v-if="blok.title"
                v-html="blok.title"
                :class="BEM_E('title')"
                class="text-content"
              />

              <div
                v-if="blok.links && blok.links.length"
                :class="BEM_E('links')"
              >
                <Btn
                  v-for="link in blok.links"
                  :key="link._uid"
                  :blok="link"
                />
              </div>

            </div>
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
      default: 'CtaImage'
    },
    blok: {
      type: Object,
      default: null
    }
  },
  methods: {
    getImageStyles () {
      const style = {}
      let bgUrl = null

      if (!this.blok.image || !this.blok.image.filename) {
        return style
      }


      if (window.innerWidth > 767 && this.blok.image && this.blok.image.filename) {
        bgUrl = this.imageResizable()
          ? this.prepareImage(this.blok.image.filename, `${this.blok.imageResizeWith}x${this.blok.imageResizeHeight}/smart`)
          : this.blok.image.filename
      } else {
        bgUrl = this.imageResizable()
          ? this.prepareImage(this.blok.mobileBackgroundImage.filename, `${this.blok.imageResizeWith}x${this.blok.imageResizeHeight}/smart`)
          : this.blok.mobileBackgroundImage.filename
      }

      style.backgroundImage = `url(${bgUrl})`
      // style.background = `cover url(${bgUrl}), linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.37) 65.61%)`

      return style
    },
    imageResizable () {

      return !!(this.blok.imageResize && this.blok.imageResizeWidth && this.blok.imageResizeHeight)
    }
  }
}
</script>
