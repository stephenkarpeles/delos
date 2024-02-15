<template
  v-if="blok.items && blok.items.length"
>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">

          <div :class="BEM_E('marquee')">

            <div class="marquee-item">
              <span
                v-for="item in blok.items"
                :key="item._uid"
                class=""
              >
                <span v-html="item.title" :class="BEM_E('title')" />
                <span v-if="item.link && item.link.length" :class="BEM_E('link')">
                  <Btn :blok="item.link[0]" />
                </span>
                <span class="separator">&bullet;</span>
              </span>
            </div>

            <div class="marquee-item">
              <span
                v-for="item in blok.items"
                :key="item._uid"
                class=""
              >
                <span v-html="item.title" :class="BEM_E('title')" />
                <span v-if="item.link && item.link.length" :class="BEM_E('link')">
                  <Btn :blok="item.link[0]" />
                </span>
                <span class="separator">&bullet;</span>
              </span>
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
      default: 'NewsTicker'
    },
    blok: {
      type: Object,
      default: null
    }
  }
}
</script>
