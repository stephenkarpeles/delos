<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12">

          <div
            :class="[
              BEM_E('wrapper'),
              hasImage && 'has-image',
              hasMobileImage && 'has-mobile-image'
            ]"
          >
            <div class="row">
              <div
                v-if="hasImage"
                :class="BEM_E('image-wrapper')"
                class="col-md-6 d-none d-lg-block"
              >
                <div class="image-inner">
                  <img
                    :src="blok.image.filename"
                    :alt="blok.title"
                    class="img-fluid"
                  />
                </div>
              </div>

              <div
                v-if="hasMobileImage"
                :class="BEM_E('mobile-image-wrapper')"
                class="col-md-6 d-block d-lg-none"
              >
                <div class="image-inner">
                  <img
                    :src="blok.imageMobile.filename"
                    :alt="blok.title"
                    class="img-fluid"
                  />
                </div>
              </div>

              <div
                :class="[
                  hasImage ? 'col-lg-6' : 'col-lg-12'
                ]"
              >
                <h3
                  v-if="blok.title"
                  v-html="blok.title"
                  :class="BEM_E('title')"
                />
                <div
                  v-if="blok.body"
                  v-html="blok.body"
                  :class="BEM_E('body')"
                  class="d-none d-md-block"
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
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'CtaWhitepaper'
    },
    blok: {
      type: Object,
      default: null
    }
  },
  computed: {
    hasImage () {
      return !!(this.blok.image && this.blok.image.filename)
    },
    hasMobileImage () {
      return !!(this.blok.imageMobile && this.blok.imageMobile.filename)
    }
  }
}
</script>
