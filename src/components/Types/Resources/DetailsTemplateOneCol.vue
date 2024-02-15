<template>
  <div class="ResourceHubDetails ResourceHubDetails--template-one-col">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2 offset-0">
          <div class="backlink-wrapper">
            <a
              v-if="backlink"
              :href="backlink.path"
            >
              <Vector name="icon/HUB-backArrow" />
              Back to {{ backlink.name }}
            </a>
            <a
              v-if="!backlink"
              @click="goBackLink()"
              href="javascript:void(0)"
            >
              <Vector name="icon/HUB-backArrow" />
              back
            </a>
          </div>

          <div class="resource-hub-wrapper">
            <div
              v-if="blok.image"
              class="resource-hub-image"
            >
              <img
                :src="blok.image"
                :alt="blok.title"
                class="img-fluid"
              />
            </div>

            <div class="resource-hub-fields">
              <div
                v-if="blok.date || blok.type"
                class="resource-date-type"
              >
                <span
                  v-if="blok.date"
                  v-html="formatDate(blok.date)"
                />
                <span v-if="blok.date && blok.type">|</span>
                <span
                  v-if="blok.type"
                  v-html="formatResourceType(blok.type)"
                />
              </div>

              <h1
                v-if="blok.title"
                v-html="blok.title"
                class="resource-title"
              />

              <div
                v-if="blok.summary"
                v-html="blok.summary"
                class="resource-summary"
              />

              <div
                v-if="blok.author"
                v-html="`By ${blok.author}`"
                class="resource-author"
              />

              <div
                v-if="blok.content"
                v-html="renderField_content"
                class="resource-content"
              />


              <ul
                v-if="tagList && tagList.length"
                class="resource-tags"
              >
                <li
                  v-for="_tagName in tagList"
                  :key="_tagName"
                  v-html="formatTagName(_tagName)"
                />
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormat from 'dateformat'
import Vector from '~/src/components/Elements/Vector'

export default {
  components: {
    Vector
  },

  props: {
    blok: {
      type: Object,
      default: null
    },
    tagList: {
      type: Array,
      default: null
    }
  },

  data () {
    return {
      backlink: false,
      path: this.$route.path
    }
  },

  computed: {
    renderField_content () {
      return this.$storyapi.richTextResolver.render(this.blok.content)
    }
  },

  async fetch () {
    const backlinks = await this.getResourceHubBacklinks()
    if (Array.isArray(backlinks) && backlinks.length) {
      backlinks.forEach((item) => {
        if (item.hasOwnProperty('name') && item.name === this.blok.type) {
          this.backlink = {
            name: item.value,
            path: item.dimension_value
          }
        }
      })
    }
  },

  methods: {
    formatDate (date) {
      if (!date || !date.length) {
        return date
      }
      date = date.replace(' ', 'T') + 'Z'
      const casted = new Date(date)
      if (casted) {
        return dateFormat(casted, 'mmmm dd, yyyy')
      }

      return date
    },

    formatResourceType (type) {
      if (typeof type !== 'string') {
        return type
      }
      return type.replaceAll('_', ' ')
    },

    formatTagName (tagName) {
      const idx = tagName.indexOf('/')
      if (idx !== -1) {
        return tagName.substr(idx + 1)
      }

      return tagName
    },

    goBackLink () {
      this.$router.go(-1)
    }
  }
}
</script>
