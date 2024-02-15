<template>
  <div
    :class="BEM_B"
    :id="blok.id"
  >
    <iframe
      :src="blok.src"
      :class="blok.scrolling ? BEM_M('scrolling') : ''"
      frameborder="0"
      width="100%"
      style="min-height: 40vh"
      :scrolling="typeof blok.scrolling !== 'undefined' ? blok.scrolling : false"
    ></iframe>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'Iframe'
    },
    blok: Object
  }
}
</script>
