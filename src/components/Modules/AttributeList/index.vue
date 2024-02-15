<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
        <ul
          :class="BEM_E('list')"
        >
          <li
            v-for="(item, index) in sortedAttributes"
            :key="index"
            :class="BEM_E('item')"
          >
            <Attribute
              v-if="attributeHasIncludedFeature(item.content.feature)"
              :title="item.name"
              :features="calculateIncludedFeatures(item)"
              :isLast="index === sortedAttributes.length-1"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Attribute from '~/src/components/Modules/AttributeList/single'
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  components: {
    Attribute
  },
  props: {
    name: {
      type: String,
      default: 'AttributeList'
    },
    blok: Object
  },
  data () {
    return {
      allAttributes: [],
      sortedAttributes: [],
      featureItems: []
    }
  },
  watch: {
    allAttributes (n) {
      this.sortedAttributes = n.slice()
      this.sortedAttributes.sort((a, b) => parseFloat(a.content.display_order) - parseFloat(b.content.display_order))
    }
  },
  computed: {
    allFeaturesByUuid () {
      return this.featureItems.map(obj => obj.uuid)
    },
    allFeaturesByName () {
      return this.featureItems.map(obj => obj.name)
    }
  },
  mounted () {
    this.loadAllAttributes()
    this.loadFeatures(this.blok.feature)
      .then((res) => {
        this.featureItems = res
      })
  },
  methods: {
    ...mapMutations(['setFeatures']),
    attributeHasIncludedFeature (features) {
      return this.allFeaturesByUuid.some(r => features.includes(r))
    },
    calculateIncludedFeatures (att) {
      return this.allFeaturesByUuid.filter(feat => att.content.feature.includes(feat))
    },
    loadAllAttributes () {
      let uuids = this.blok.attribute ? this.blok.attribute.toString() : ''
      return this.$storyapi.get(`cdn/stories/`, {
        starts_with: 'staywell-dc/attributes/',
        version: 'published',
        cv: this.$store.state.cacheVersion,
        find_by: 'uuid',
        sort_by: 'position:desc'
      }).then((res) => {
        this.allAttributes = res.data.stories
        return res.data.story
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    },
    loadFeatures (features) {
      if (features) {
        let uuids = features.toString()
        return this.$storyapi.get(`cdn/stories/`, {
          starts_with: this.$store.state.language !== 'en' ? this.$store.state.language + '/*' : null,
          version: 'published',
          cv: this.$store.state.cacheVersion,
          by_uuids: uuids,
          find_by: 'uuid',
          sort_by: 'position:desc'
        }).then((res) => {
          this.setFeatures(res.data.stories)
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
