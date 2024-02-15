<template>
  <div
    :class="BEM_B"
    :is="blok.link && blok.link.cached_url ? 'a' : 'div'"
    :href="blok.link && blok.link.cached_url ? blok.link.cached_url : null"
    :target="blok.targetBlank ? '_blank' : '_self'"
  >
    <div :class="BEM_E('content')">
      {{ blok.linkLabel }}
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
      default: 'Topbar'
    },
    blok: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
  }
}
</script>
