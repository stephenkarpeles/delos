<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="container">
      <div class="row">
        <div
          :class="[
            'col',
            blok.variationWidth ? 'feature-list-width-' + blok.variationWidth : 'col-md-12',
            blok.variationAlignment ? 'feature-list-align-' + blok.variationAlignment : ''
          ]"
        >

          <h3
            v-if="blok.title"
            v-html="blok.title"
            :class="BEM_E('title')"
          />

          <ul
            v-if="blok.items && blok.items.length"
            :class="blok.variationListStyle ? 'variation-listStyle-' + blok.variationListStyle : ''"
            class="features-list-wrap"
          >
            <li
              v-for="(item, idx) in blok.items"
              :key="item._uid"
              :id="item.id"
              :class="[item.classes]"
            >
              <span
                v-if="blok.variationListStyle === 'list-bullet'"
                v-html="item.title"
              ></span>

              <span
                v-if="blok.variationListStyle === 'list-numbered'"
                v-html="('0' + (idx + 1)).slice(-2)"
                class="item-number"
              ></span>
              <h4
                v-if="blok.variationListStyle === 'list-numbered'"
                v-html="item.title"
              ></h4>
            </li>
          </ul>

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
      default: 'FeatureList'
    },
    blok: {
      type: Object,
      default: null
    }
  }
}
</script>
