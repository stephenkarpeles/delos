<template>
  <div
    :class="BEM_B"
    :id="blok.id"
  >
    <div class="container">
      <div class="row">
        <b-modal
          ref="Lightbox__modal"
          title="BootstrapVue"
          modal-class="Lightbox__modal"
          hide-header
          hide-footer
        >
          <Vid :blok="activeVideo" />
        </b-modal>
        <div v-if="blok.variation === 'single'">
          <div
            :class="BEM_E('contents')"
            @click="showModal(blok.video[0])"
          >
            <div :class="BEM_E('content')">
              <div :class="BEM_E('title')">
                <span>{{ blok.video[0].title }}</span>
              </div>
            </div>
            <div :class="BEM_E('image')">
              <Img
                :blok="blok.video[0].image[0]"
              />
            </div>
            <div :class="BEM_E('play')">
              <Vector
                name="icon/play"
                width="60"
                height="55"
              />
            </div>
          </div>
        </div>
        <ul
          :class="BEM_E('list')"
          class="row"
          v-else
        >
          <li
            v-for="(item, index) in blok.video"
            :key="index"
            :class="BEM_E('item')"
          >
            <div
              :class="BEM_E('contents')"
              @click="showModal(item)"
            >
              <div :class="BEM_E('image')">
                <Img
                  :blok="item.image[0]"
                />
              </div>
              <div :class="BEM_E('play')">
                <Vector
                  name="icon/play"
                  width="60"
                  height="55"
                />
              </div>
              <div :class="BEM_E('content')">
                <div :class="BEM_E('title')">
                  <span>{{ item.title }}</span>
                </div>
                <div :class="BEM_E('caption')">
                  {{ item.caption }}
                </div>
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
import Vid from '~/src/components/Elements/Video'
export default {
  components: { Vid },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'Lightbox'
    }
  },
  data () {
    return {
      activeVideo: null
    }
  },
  methods: {
    showModal (video) {
      this.activeVideo = video
      this.$refs['Lightbox__modal'].show()
    }
  }
}
</script>
