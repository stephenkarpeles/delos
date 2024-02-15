<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="container">
      <div class="row">
        <div
          :class="[
            getColumnClassName(),
            BEM_E('wrapper')
          ]"
        >

          <h2
            v-if="blok.title"
            v-html="blok.title"
            :class="
            [
              BEM_E('title'),
              BEM_E(blok.title_text_alignment),
            ]"
          />
          <div
            v-if="blok.subtitle"
            v-html="blok.subtitle"
            :class="BEM_E('subtitle')"
          />
          <div
            v-if="blok.body"
            v-html="blok.body"
            :class="BEM_E('body')"
          ></div>

        </div>
      </div>

      <div class="row">
        <div
          :class="[
            getColumnClassName(),
            BEM_E('wrapper')
          ]"
        >

          <div
            v-if="blok.items && blok.items.length"
            :class="BEM_E('items')"
            class="quote-list-items"
          >
            <div
              v-for="item in blok.items"
              :key="item._uid"
              class="quote-list-item"
            >
              <Quote :blok="item"/>
            </div>
          </div>

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
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Quote from '~/src/components/Modules/Quote'

export default {
  components: {
    Quote
  },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'QuoteList'
    },
    blok: {
      type: Object,
      default: null
    }
  },
  methods: {
    getColumnClassName () {
      return `col-lg-${this.getColumnWidth()}`
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
