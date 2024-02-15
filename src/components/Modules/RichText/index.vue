<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12">

          <div
            v-if="blok.subtitle"
            v-html="blok.subtitle"
            :class="BEM_E('subtitle')"
          ></div>
          <component
            :is="blok.titleTag || 'h2'"
            v-if="blok.title"
            v-html="blok.title"
            :class="BEM_E('title')"
            class="title-header"
          />
          <div
            v-if="blok.body"
            v-html="renderField_body"
            :class="BEM_E('body')"
          ></div>

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
import Btn from '~/src/components/Elements/Btn'

export default {
  components: {
    Btn
  },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'RichText'
    },
    blok: {
      type: Object,
      default: null
    }
  },
  computed: {
    renderField_body () {
      return this.$storyapi.richTextResolver.render(this.blok.body)
    }
  }
}
</script>
