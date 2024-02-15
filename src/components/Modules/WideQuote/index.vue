<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >

    <div class="container">
      <div class="row">

        <div
          :class="[
            BEM_E('column'),
            getColumnClasses()
          ]"
        >
          <h3
            v-if="blok.title"
            v-html="blok.title"
            :class="BEM_E('title')"
            class="content-item"
          />
          <div
            v-if="blok.body"
            v-html="blok.body"
            :class="BEM_E('body')"
            class="content-item"
          />

          <div :class="BEM_E('quote-wrapper')">
            <div :class="BEM_E('quote-inner')">
              <div :class="BEM_E('quote-content')">

                <div
                  v-if="blok.quote"
                  v-html="blok.quote"
                  :class="BEM_E('quote')"
                />
                <div
                  v-if="blok.name"
                  v-html="blok.name"
                  :class="BEM_E('quoter')"
                />
                <div
                  v-if="blok.company"
                  v-html="blok.company"
                  :class="BEM_E('quoter')"
                />

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
      default: 'WideQuote'
    },
    blok: {
      type: Object,
      default: null
    }
  },
  methods: {
    getColumnClasses () {
      return `col-md-${this.getColumnWidth()}`
    },
    getColumnWidth () {
      let columnWidth = this.blok.column || null
      if (!columnWidth) {
        return 12
      }

      columnWidth = parseInt(columnWidth)
      if (columnWidth < 1) {
        return 1
      }
      if (columnWidth > 12) {
        return 12
      }

      return columnWidth
    }
  }
}
</script>
