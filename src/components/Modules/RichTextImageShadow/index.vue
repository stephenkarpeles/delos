<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="container">
      <div class="row">
        <div class="column-image">
          <div
            :class="BEM_E('image-wrapper')"
          >
            <div
              :style="bgImageStyles()"
              class="image"
            ></div>
            <div
              :class="blok.bgColorCode ? 'bg-' + blok.bgColorCode : ''"
              class="shadow"
            ></div>
          </div>
        </div>

        <div class="column-content">
          <div
            :class="BEM_E('content-wrapper')"
          >
            <div class="inner">
              <div
                v-if="blok.subtitle"
                v-html="blok.subtitle"
                :class="BEM_E('subtitle')"
              ></div>
              <h1
                v-if="blok.title"
                v-html="blok.title"
                :class="BEM_E('title')"
              />
              <div
                v-if="blok.body"
                v-html="blok.body"
                :class="BEM_E('body')"
              ></div>

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
import Btn from '~/src/components/Elements/Btn'

export default {
  components: {
    Btn
  },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'RichTextImageShadow'
    },
    blok: {
      type: Object,
      default: null
    }
  },
  methods: {
    bgImageStyles () {
      const style = {}
      if (this.blok.image && this.blok.image.filename) {
        const bgUrl = this.blok.image.filename
        style.backgroundImage = `url(${bgUrl})`
      }

      return style
    }
  }
}
</script>
