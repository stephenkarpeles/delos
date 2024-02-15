<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
    :style="applyElementStyle()"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12">

          <div
            :class="[ blok.bgColorClass ]"
            class="cta-contents-wrapper"
          >
            <div class="cta-contents-inner">

              <div
                :class="BEM_E('contents')"
                class="contents-wrap"
              >
                <component
                  :is="blok.titleTag || 'h2'"
                  v-if="blok.title"
                  v-html="blok.title"
                  :class="BEM_E('title')"
                  class="cta-title cta-text-element"
                />
                <div
                  v-if="blok.body"
                  v-html="renderField_body"
                  :class="BEM_E('body')"
                  class="cta-body cta-text-element"
                />
              </div>

              <div
                v-if="blok.links && blok.links.length"
                :class="BEM_E('links')"
                class="links-wrap"
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
      default: 'Cta'
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
  },
  methods: {
    applyElementStyle () {
      const style = {}
      if (this.blok.backgroundColor1 && this.blok.backgroundColor2) {
        const bgColor1 = this.blok.backgroundColor1
        const bgColor2 = this.blok.backgroundColor2
        style.background = `linear-gradient(to bottom, ${bgColor1} 50%, ${bgColor2} 50%)`
      }

      return style
    }
  }
}
</script>
