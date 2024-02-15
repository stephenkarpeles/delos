<template>
  <div :id="blok.id || blok._uid" :class="BEM_B">
    <div class="container">
      <div class="row">
        <div
          :class="'variation-width-' + blok.variationWidth"
          class="col-md-12"
        >
          <div class="contents-wrapper">
            <div
              v-if="blok.title || blok.subtitle"
              class="title-wrapper"
            >
              <div
                v-if="isLogoPresent()"
                :class="[
                  BEM_E('logo'),
                  blok.alignLogoCenter && 'text-center'
                ]"
              >
                <img
                  :src="blok.logo.filename"
                  :alt="blok.title"
                  :width="blok.resizeLogoWidth || null"
                  :height="blok.resizeLogoHeight || null"
                />
              </div>
              <component
                :is="blok.titleTag || 'h2'"
                v-if="!isLogoPresent() && blok.title"
                v-html="blok.title"
                :class="[
                  BEM_E('title'),
                  blok.titleIsProductHeading ? 'title-product-heading' : ''
                ]"
                class="title-inner"
              />
              <div
                v-if="renderField_subtitle && renderField_subtitle.length"
                v-html="renderField_subtitle"
                :class="BEM_E('subtitle')"
                class="title-inner"
              ></div>

              <div
                v-if="
                  blok.links &&
                    blok.links.length &&
                    blok.showLinksAfter === 'group-1st' &&
                    blok.variation !== 'title-top'
                "
                :class="BEM_E('links')"
                :style="{
                  marginTop: (parseInt(blok.linksTopMargin)) ? `${blok.linksTopMargin}px` : null
                }"
                class="d-none d-lg-block"
              >
                <Btn v-for="link in blok.links" :key="link._uid" :blok="link" :change="true"/>
              </div>
            </div>

            <div
              v-if="blok.body1 || blok.body2 || blok.secondaryTitle"
              class="body-wrapper"
            >
              <component
                :is="blok.titleTag || 'h1'"
                v-if="isLogoPresent()"
                v-html="blok.title"
                :class="BEM_E('title')"
                class="title-inner"
              />
              <div
                v-if="blok.secondaryTitle"
                v-html="blok.secondaryTitle"
                :class="[
                  BEM_E('secondary-title'),
                  (blok.secondaryTitleVariation === 'large') ? 'st-large' : ''
                ]"
              ></div>
              <div
                v-if="renderField_body1 && renderField_body1.length"
                class="body-inner"
              >
                <div
                  v-html="renderField_body1"
                  :class="BEM_E('body')"
                />

                <div
                  v-if="
                    blok.links &&
                      blok.links.length &&
                      blok.showLinksAfter === 'group-1st' &&
                      blok.variation === 'title-top'
                  "
                  :class="BEM_E('links')"
                  :style="{
                    marginTop: (parseInt(blok.linksTopMargin)) ? `${blok.linksTopMargin}px` : null
                  }"
                >
                  <Btn
                    v-for="link in blok.links"
                    :key="link._uid"
                    :blok="link"
                  />
                </div>
              </div>
              <div
                v-if="renderField_body2 && renderField_body2.length"
                class="body-inner"
              >
                <div
                  v-html="renderField_body2"
                  :class="BEM_E('body')"
                />

                <div
                  v-if="
                    blok.links &&
                      blok.links.length &&
                      blok.showLinksAfter !== 'group-1st' &&
                      blok.variation === 'title-top'
                  "
                  :class="BEM_E('links')"
                  :style="{
                    marginTop: (parseInt(blok.linksTopMargin)) ? `${blok.linksTopMargin}px` : null
                  }"
                >
                  <Btn
                    v-for="link in blok.links"
                    :key="link._uid"
                    :blok="link"
                  />
                </div>
              </div>

              <div
                v-if="
                  blok.links &&
                    blok.links.length &&
                    blok.showLinksAfter === 'group-1st' &&
                    blok.variation !== 'title-top'
                "
                :class="BEM_E('links')"
                :style="{
                  marginTop: (parseInt(blok.linksTopMargin)) ? `${blok.linksTopMargin}px` : null
                }"
                class="d-block d-lg-none"
              >
                <Btn v-for="link in blok.links" :key="link._uid" :blok="link" :change="true"/>
              </div>

              <div
                v-if="
                  blok.links &&
                    blok.links.length &&
                    blok.showLinksAfter !== 'group-1st' &&
                    blok.variation !== 'title-top'
                "
                :class="BEM_E('links')"
                :style="{
                  marginTop: (parseInt(blok.linksTopMargin)) ? `${blok.linksTopMargin}px` : null
                }"
              >
                <Btn v-for="link in blok.links" :key="link._uid" :blok="link" :change="true"/>
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
import Btn from '~/src/components/Elements/Btn'

export default {
  components: {
    Btn
  },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'ColumnText'
    },
    blok: {
      type: Object,
      default: null
    }
  },
  computed: {
    renderField_subtitle () {
      const rendered = this.$storyapi.richTextResolver.render(this.blok.subtitle)
      if (!rendered.replace(/(<([^>]+)>)/gi, '')) {
        return false
      }
      return rendered
    },
    renderField_body1 () {
      const rendered = this.$storyapi.richTextResolver.render(this.blok.body1)
      if (!rendered.replace(/(<([^>]+)>)/gi, '')) {
        return false
      }
      return rendered
    },
    renderField_body2 () {
      const rendered = this.$storyapi.richTextResolver.render(this.blok.body2)
      if (!rendered.replace(/(<([^>]+)>)/gi, '')) {
        return false
      }
      return rendered
    }
  },
  methods: {
    isLogoPresent () {
      return this.blok.logo && this.blok.logo.filename
    }
  }
}
</script>

<style scoped>
@media (min-width: 768px) and (max-width: 1024px) {
  .contents-wrapper {
    display: block;
  }
  .body-wrapper {
    margin-left:0px !important;
  }
}
</style>
