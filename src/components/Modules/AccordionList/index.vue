<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12">

          <div class="accordion-content-wrapper">
            <div
              v-if="blok.items && blok.items.length"
              class="accordion accordion-content-grid"
              role="tablist"
            >
              <div
                v-for="(item, idx) in blok.items"
                class="accordion-content-item"
              >
                <b-card
                  :class="BEM_E('item')"
                  no-body
                  class="accordion-inner"
                >
                  <b-card-header
                    :class="BEM_E('header')"
                    header-tag="div"
                    role="tab"
                  >
                    <div
                      v-b-toggle="item._uid"
                      :class="BEM_E('title-wrapper')"
                    >
                      <span
                        v-html="item.title"
                        :class="BEM_E(item.titleVariation === 'caption' ? 'caption' : 'title')"
                      />
                      <span class="collapse-sign collapse-plus">+</span>
                      <span class="collapse-sign collapse-minus">-</span>
                    </div>
                  </b-card-header>
                  <b-collapse
                    :id="item._uid"
                    :visible="idx === 0 && blok.expandFirstItem"
                    :accordion="'accordion-' + blok._uid"
                    role="tabpanel"
                  >
                    <div
                      :class="BEM_E('body')"
                      v-html="markdown(item.body)"
                    />

                    <div
                      v-if="item.links && item.links.length"
                      :class="BEM_E('links')"
                    >
                      <Btn
                        v-for="link in item.links"
                        :key="link._uid"
                        :blok="link"
                      />
                    </div>
                  </b-collapse>
                </b-card>
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
      default: 'AccordionList'
    },
    blok: {
      type: Object,
      default: null
    }
  },
  methods: {
    accordionAttributes (accordionItem, index) {
      // return `v-b-toggle.accordion-${index}`
      return {
        // 'v-b-toggle': [ accordionItem._uid ]
      }
    }
  }
}
</script>
