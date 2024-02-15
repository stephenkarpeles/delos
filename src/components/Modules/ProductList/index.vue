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

          <div class="product-list-wrap">
            <div
              v-for="item in blok.items"
              :key="item._uid"
              class="product-list-item"
            >

              <div
                v-if="item.upperTitle"
                v-html="item.upperTitle"
                :class="BEM_E('upper-title')"
                class="content-item"
              ></div>
              <div
                v-if="item.image && item.image.filename"
                :class="BEM_E('image')"
                :style="{ backgroundImage: 'url(' + item.image.filename + ')' }"
                class="content-item"
              ></div>
              <div
                v-if="item.title"
                v-html="item.title"
                :class="BEM_E('title')"
                class="content-item"
              ></div>
              <div
                v-if="item.subtitle"
                v-html="item.subtitle"
                :class="BEM_E('subtitle')"
                class="content-item"
              ></div>

              <div
                v-if="item.links && item.links.length"
              >
                <Btn
                  v-for="link in item.links"
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
      default: 'ProductList'
    },
    blok: {
      type: Object,
      default: null
    }
  }
}
</script>
