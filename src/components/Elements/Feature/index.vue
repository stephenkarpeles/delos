<template>
  <div :class="BEM_B">
    <div>
      <div :class="BEM_E('image')">
        <img :src="image">
      </div>
      <div :class="BEM_E('contents')">
        <span :class="BEM_E('title')">
          {{ title }}
        </span>
        <div
          :class="BEM_E('content')"
          v-html="markdown(content)"
        >
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
      default: 'Feature'
    },
    image: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    blok: Object
  },
  data() {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
