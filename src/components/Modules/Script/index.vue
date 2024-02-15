<template>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'Script'
    }
  },
  mounted () {
    let myScript = document.createElement('script')
    myScript.setAttribute('src', this.blok.src)
    myScript.setAttribute('id', this.blok.id)
    myScript.async = true

    document.head.appendChild(myScript)
  }
}
</script>
