<template
  v-if="blok.items && blok.items.length"
>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="testimonials-list-wrap">
            <div
              v-for="item in blok.items"
              :key="item._uid"
              class="testimonials-item"
            >
              <div
                v-if="item.title"
                v-html="item.title"
                :class="BEM_E('title')"
              />
              <div
                v-if="renderRichTextField(item.body)"
                v-html="renderRichTextField(item.body)"
                :class="BEM_E('body')"
              />
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
      default: 'StatisticsList'
    },
    blok: {
      type: Object,
      default: null
    }
  },
  methods: {
    renderRichTextField (field) {
      if (typeof field === 'string') {
        return field
      }
      return this.$storyapi.richTextResolver.render(field)
    }
  }
}
</script>
