<template>
  <div :class="BEM_E('contents')">
    <div :class="BEM_E('image')">
      <Img :blok="profile.content.image[0]" />
    </div>
    <div :class="BEM_E('content')">
      <div :class="BEM_E('details')">
        <span :class="BEM_E('title')">
          {{ title }}
        </span>
        <p :class="BEM_E('description')">
          {{ profile.content.description[0].customText }}
        </p>
      </div>
      <div>
        <span>Benefits:</span>
        <ul :class="BEM_E('benefit-list')">
          <li
            v-for="(feature, idx) in featureItems"
            :key="idx"
            :class="BEM_E('benefit-list-item')"
          >
            {{ feature.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Img from '~/src/components/Elements/Image'

export default {
  components: { Img },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'GuestProfile'
    },
    profile: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: 'Profile'
    },
    features: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      featureItems: []
    }
  },
  computed: {
    ...mapState({
      brandName: state => state?.brand?.brandName
    })
  },
  mounted () {
    if (this.brandName) {
      this.replaceDescriptionTemplate()
    }
    this.loadFeatures(this.features)
      .then((res) => {
        this.featureItems = res
      })
  },
  methods: {
    replaceDescriptionTemplate () {
      const text = this.profile.content.description[0].customText
      const regex = RegExp('{{.*}}')
      if (regex.test(text)) {
        this.profile.content.description[0].customText = text.replace(regex, this.brandName)
      }
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
