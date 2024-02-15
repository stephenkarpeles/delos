<template>
  <div>
    <div :class="BEM_E('contents')">
      <div :class="BEM_E('image')">
        <Img :blok="getImage(title)" />
      </div>
      <div :class="BEM_E('content')">
        <span :class="BEM_E('title')">
          {{ title }}
        </span>
        <span
          v-for="feature in featureItems"
          v-html="markdown(feature.content.attributeContent)"
        />
      </div>
    </div>
    <div
      v-if="!isLast"
      :class="BEM_E('divider')"
    >
      <Vector name="icon/arrow-double" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'Attribute'
    },
    title: {
      type: String,
      default: 'Attribute'
    },
    features: {
      type: Array,
      default: () => []
    },
    isLast: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      featureItems: []
    }
  },
  computed: {
    ...mapState({
      brand: state => state?.brand
    })
  },
  mounted () {
    this.loadFeatures(this.features)
      .then((res) => {
        this.featureItems = res
        this.sortAttributes()
      })
  },
  methods: {
    sortAttributes () {
      this.featureItems.sort((a, b) => parseFloat(a.content.attribute_order) - parseFloat(b.content.attribute_order))
    },
    getImage (att) {
      if (this.brand) {
        const experienceArr = Object.keys(this.brand).filter(ele => ele.startsWith('experience'))
        for (let i = 0; i < experienceArr.length; i++) {
          if (`experience${att}` === experienceArr[i]) {
            return this.brand[experienceArr[i]]
          }
        }
      }
    },
    loadFeatures (features) {
      if (features) {
        const uuids = features.toString()
        return this.$storyapi.get(`cdn/stories/`, {
          starts_with: this.$store.state.language !== 'en' ? this.$store.state.language + '/*' : null,
          version: 'published',
          cv: this.$store.state.cacheVersion,
          by_uuids: uuids,
          find_by: 'uuid',
          sort_by: 'position:desc'
        }).then((res) => {
          return res.data.stories
        }).catch((res) => {
          if (!res.response) {
            console.error('no res', res)
          }
        })
      }
    }
  }
}
</script>
