<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="spacer"></div>

    <div :class="BEM_E('wrapper-1')">
      <div
        v-if="blok.image && blok.image.filename"
        :class="BEM_E('image')"
        :style="{ backgroundImage: `url(${blok.image.filename})` }"
        class="d-none d-md-block"
      />
      <div
        v-if="blok.image && blok.image.filename"
        :class="BEM_E('image')"
        :style="{ backgroundImage: `url(${getMobileImageUrl()})` }"
        class="d-md-none"
      />

      <div class="container">
        <div class="row">

          <div
            :class="BEM_E('content-wrapper')"
            class="col-lg-6 col-md-11 col-11"
          >
            <div>

              <h5
                v-if="blok.caption"
                v-html="blok.caption"
                :class="BEM_E('caption')"
              />
              <h2
                v-if="blok.title"
                v-html="blok.title"
                :class="BEM_E('title')"
              />
              <div
                v-if="blok.subtitle"
                v-html="blok.subtitle"
                :class="BEM_E('subtitle')"
              />

            </div>
          </div>

        </div>
      </div>
    </div>

    <div
      v-if="blok.body"
      :class="BEM_E('wrapper-2')"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-12">

            <div
              v-html="renderField_body"
              :class="BEM_E('body')"
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
      default: 'HeroImageSide'
    },
    blok: {
      type: Object,
      default: null
    }
  },
  computed: {
    renderField_body () {
      return this.$storyapi.richTextResolver.render(this.blok.body)
    }
  },
  methods: {
    getMobileImageUrl () {
      if (this.blok.imageMobile && this.blok.imageMobile.filename) {
        return this.blok.imageMobile.filename
      }
      if (this.blok.image && this.blok.image.filename) {
        return this.blok.image.filename
      }
      return false
    }
  }
}
</script>
