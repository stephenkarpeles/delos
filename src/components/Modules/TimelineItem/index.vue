<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="row-first">
      <div
        v-if="blok.image && blok.image.filename"
        :class="BEM_E('image')"
      >
        <img
          :src="prepareImage(blok.image.filename, '64x64/smart')"
          :alt="blok.title"
        />
      </div>
      <h2
        v-if="blok.title && blok.titleVariation === 'title-top'"
        v-html="blok.title"
        :class="BEM_E('title')"
      />
      <div
        v-if="blok.subtitle"
        v-html="blok.subtitle"
        :class="BEM_E('subtitle')"
      ></div>
      <div
        v-if="blok.title && blok.titleVariation !== 'title-top'"
        v-html="blok.title"
        :class="BEM_E('title')"
      ></div>
    </div>

    <div class="row-second">
      <div
        v-if="blok.body"
        v-html="blok.body"
        :class="BEM_E('body')"
      ></div>
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
      default: 'TimelineItem'
    },
    blok: {
      type: Object,
      default: null
    }
  }
}
</script>
