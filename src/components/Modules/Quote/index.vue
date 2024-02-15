<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="quote-wrapper">
      <div
        v-if="blok.body"
        v-html="blok.body"
        class="quote-body"
      ></div>

      <div
        :class="BEM_E('quoter')"
      >
        <div
          v-if="blok.name"
          v-html="blok.name"
          :class="BEM_E('quoter-name')"
        ></div>
        <span
          v-if="blok.title"
          v-html="blok.title"
          :class="BEM_E('quoter-title')"
        ></span><span
          v-if="blok.title && blok.company"
          v-html="', '"
        ></span>
        <span
          v-if="blok.company"
          v-html="blok.company"
          :class="BEM_E('quoter-company')"
        ></span>
      </div>

      <div
        v-if="blok.logo && blok.logo.filename"
        :class="BEM_E('logo')"
      >
        <img
          :src="blok.logo.filename"
          :alt="blok.company"
          :width="(blok.logoResize && blok.logoResizeWidth) ? blok.logoResizeWidth : null"
          :height="(blok.logoResize && blok.logoResizeHeight) ? blok.logoResizeHeight : null"
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
      default: 'Quote'
    },
    blok: {
      type: Object,
      default: null
    }
  }
}
</script>
