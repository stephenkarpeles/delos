<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
        <ul :class="BEM_E('list')">
          <li
            v-for="(item, index) in blok.anchors"
            :key="index"
            :class="BEM_E('item')"
            :id="item.id"
            @click="handleRouterPush(item.anchorID)"
          >
            <div :class="BEM_E('contents')">
              <div :class="BEM_E('icon')" v-if="item.icon[0]">
                <Img
                  :blok="item.icon[0]"
                />
              </div>
              <span :class="BEM_E('title')">{{ item.text }}</span>
              <Vector name="icon/caret-down" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseComponent from '~/src/components/Templates/BaseComponent'
const VueScrollTo = require('vue-scrollto')
export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'AnchorList'
    }
  },
  computed: {
    ...mapState({
      features: state => state?.features
    })
  },
  methods: {
    shouldDisplay (id) {
      if (id !== 'meditationButton' ||
        id === 'meditationButton' && this.features && this.features.some(e => e.content.title === 'Guided Meditation')) {
        return true
      }
    },
    handleRouterPush (hash) {
      this.$router.push({ hash })
      this.scrollToHash()
    },
    scrollToHash () {
      const hash = this.$route.hash
      if (hash) {
        this.$nextTick(() => {
          VueScrollTo.scrollTo(hash, 500, {
            container: 'body',
            easing: 'linear',
            force: true,
            offset: 0
          })
        })
      }
    }
  }
}
</script>
