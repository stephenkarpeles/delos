<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
        <ul
          :class="BEM_E('list')"
          class="row"
        >
          <li
            v-for="(item, index) in guestProfiles"
            :key="index"
            :class="BEM_E('item')"
          >
            <Attribute
              v-if="attributeHasIncludedFeature(item.content.feature)"
              :title="item.name"
              :features="calculateIncludedFeatures(item)"
              :profile="item"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Attribute from '~/src/components/Modules/GuestProfileList/single'
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  components: {
    Attribute
  },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'GuestProfileList'
    },
    blok: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      guestProfiles: [],
      sortedAttributes: [],
      featureItems: []
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
    this.loadGuestProfiles()
    this.loadFeatures(this.blok.feature)
      .then((res) => {
        this.featureItems = res
      })
  },
  methods: {
    attributeHasIncludedFeature (features) {
      return this.allFeaturesByUuid.some(r => features.includes(r))
    },
    calculateIncludedFeatures (att) {
      return this.allFeaturesByUuid.filter(feat => att.content.feature.includes(feat))
    },
    loadGuestProfiles () {
      return this.$storyapi.get(`cdn/stories/`, {
        starts_with: 'staywell-dc/guest-profiles/',
        version: 'published',
        cv: this.$store.state.cacheVersion,
        find_by: 'uuid',
        sort_by: 'position:desc'
      }).then((res) => {
        this.guestProfiles = res.data.stories
        return res.data.story
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
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
