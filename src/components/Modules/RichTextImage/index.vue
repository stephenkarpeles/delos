<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="container">
      <div
        v-match-heights="getMatchHeightsClassName()"
        class="row"
      >

        <div
          :class="rowMatchHeights()"
          class="column-contents"
        >
          <div class="rich-text-image-inner">
            <div class="row">
              <div class="col-md-10 offset-md-1">

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

        <div
          :class="rowMatchHeights()"
          class="column-image"
        >
          <div
            v-if="blok.image && blok.image.filename"
            :style="imageStyles()"
            :class="BEM_E('image')"
          ></div>
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
      default: 'RichTextImage'
    },
    blok: {
      type: Object,
      default: null
    }
  },
  methods: {
    imageStyles () {
      const style = {}
      if (this.blok.image && this.blok.image.filename) {
        const bgUrl = this.blok.image.filename
        style.backgroundImage = `url(${bgUrl})`
      }

      return style
    },
    getMatchHeightsClassName () {
      const _id = this.blok._uid

      return `${_id}-match-heights`
    },
    rowMatchHeights () {
      const cssName = this.getMatchHeightsClassName()

      return {
        el: [ `.${cssName}` ]
      }
    }
  }
}
</script>
