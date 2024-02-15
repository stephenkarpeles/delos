<template>
  <div 
    class="ResourceHubDetails ResourceHubDetails--template-two-col"
    :class='computedLeadershipClass'>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
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
        </div>
      </div>

      <div id="details-row" class="row">
        <div id="details-column-first" class="col-md-4">
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

          <div class="leadership-back-button leadership-back-button--tablet">
            <a href="/leadership">
              Back
            </a>
          </div>
        </div>

        <div id="details-column-second" class="col-md-8">

          <div class="resource-hub-wrapper">

            <div class="resource-hub-fields">
              <div
                v-if="
                  (blok.date || blok.type) &&
                    (blok.type !== 'leadership' && blok.type !== 'white_papers')
                "
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

              <div
                v-if="(blok.type == 'leadership')"
                class="resource-leadership-eyebrow"
              >
                Advisory Board
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

              <div
                v-if="blok.buttonText && blok.buttonUrl"
                class="resource-hub-link"
              >
                <a
                  :href="blok.buttonUrl"
                  :rel="blok.buttonNoFollow ? 'nofollow' : null"
                  v-html="blok.buttonText"
                  class="Btn Btn--primary-special btn-block"
                  target="_blank"
                />
              </div>


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

          <div class="leadership-back-button leadership-back-button--desktop-mobile">
            <a href="/leadership">
              Back
            </a>
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

  head () {
    return {
      script: [
        (this.blok.type === 'leadership')
          ? {
            innerHTML: `{
              '@context': 'http://schema.org',
              '@type': 'Person',
              'name': ${this.blok.title},
              'image': 'https:' + ${this.blok.image},
              'url': 'https://delos.com' + ${this.path},
              'jobTitle': ${this.blok.summary},
              'sameAs': [],
              'worksFor': {
                '@type': 'Organization',
                'name': 'Delos'
              }
            }`,
            type: 'application/ld+json'
          }
          : {}
      ]
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
    },

    computedLeadershipClass() {
      let wrapperClassName = 'ResourceHubDetails--default';

      // More complicated logic to determine what
      // class should be applied

      if (this.blok.type == 'leadership') {
        wrapperClassName = 'ResourceHubDetails--leadership-view'
      }

      return wrapperClassName;
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
