<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div
      :class="BEM_E('container')"
      class="container"
    >

      <div
        :class="BEM_E('content-wrapper')"
      >
        <div class="hero-wrapper">
          <div v-if="blok.logo && blok.logo.filename" :class="BEM_E('logo')">
            <img
              :src="blok.logo.filename"
              :alt="blok.title"
              :width="
                  blok.logoResize && blok.logoResizeWidth
                    ? blok.logoResizeWidth
                    : null
                "
              :height="
                  blok.logoResize && blok.logoResizeHeight
                    ? blok.logoResizeHeight
                    : null
                "
            />
          </div>

          <h1
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
            v-if="blok.body"
            v-html="blok.body"
            :class="BEM_E('body')"
          ></div>
          <div v-if="blok.links && blok.links.length" :class="BEM_E('links')">
            <Btn v-for="link in blok.links" :key="link._uid" :blok="link" />
          </div>
        </div>
      </div>

      <div
        :class="[
          BEM_E('dotted-bg'),
          `variation-${blok.variation}`,
          'd-none',
          'd-md-block'
        ]"
      />

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
      default: 'HeroText'
    },
    blok: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      screenWidth: window.innerWidth
    }
  }
}
</script>
