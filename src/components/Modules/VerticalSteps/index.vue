<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
        <ul
          :class="BEM_E('list')"
        >
          <li
            v-for="(item, index) in blok.steps"
            :key="index"
            :class="BEM_E('item')"
          >
            <div
              :class="BEM_E('contents')"
              :is="item.link && item.link.cached_url ? 'a' : 'div'"
              :href="item.link ? makeInteralLink(item.link.cached_url) : null"
            >
              <div
              :class="BEM_E('image')"
              >
                <Img
                  :blok="item.image[0]"
                />
              </div>
              <div :class="BEM_E('content')">
                <span
                  :class="BEM_E('title')"
                >
                  {{ item.title }}
                </span>
                  <p v-html="markdown(item.content)" />
              </div>
            </div>
          </li>
        </ul>
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
      default: 'VerticalSteps'
    },
    blok: Object
  },
  methods: {
    makeInteralLink(link) {
      const url = link
      let strippedUrl = url.indexOf('staywell-dc/clients/') > -1 ? url.replace('staywell-dc/clients/', '') : url
      return `/${strippedUrl}`
    }
  }
}
</script>
