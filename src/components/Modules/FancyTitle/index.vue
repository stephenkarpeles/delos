<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="container">
      <div class="row">
        <div
          :class="[
            getColumnClasses(),
            isMobile
          ]"
        >
          <component
            :is="blok.titleTag || 'h2'"
            v-html="blok.title"
            :class="BEM_E('title')"
            class="title-header"
          />
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
      default: 'FancyTitle'
    },
    blok: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      isMobile: 'title-offset'
    }
  },

  beforeDestroy () {
    if (typeof window === 'undefined') {
      return window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },

  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },

  methods: {
    onResize () {
      if (window.innerWidth <= 768) {
        this.isMobile = ''
      }
    },

    getColumnClasses () {
      if (!this.blok.column) {
        return 'col-md-11'
      }

      let columnWidth = parseInt(this.blok.column)
      if (columnWidth < 1) {
        columnWidth = 1
      } else if (columnWidth > 12) {
        columnWidth = 12
      }

      return `col-md-${columnWidth}`
    }
  }
}
</script>
