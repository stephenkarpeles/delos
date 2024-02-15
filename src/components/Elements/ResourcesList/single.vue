<template>
  <nuxt-link
    :to="'/' + resource.full_slug + '/'"
    tag="div"
    class="ResourceTeaser"
  >

    <div
      :style="getImageStyles()"
      :class="[ `image-size-${variationImageSize}` ]"
      class="resource-image"
    />
    <div class="card-data">
      <div
        v-if="resource.content.date || resource.content.type"
        class="resource-date-type"
      >
        <span
          v-if="resource.content.date"
          v-html="formatDate(resource.content.date)"
        />
      </div>
      <nuxt-link
        :to="'/' + resource.full_slug + '/'"
        v-if="resource.content.title"
        v-html="resource.content.title"
        class="resource-title"
      ></nuxt-link>
      <div
        v-if="resource.content.summary"
        v-html="trimText(resource.content.summary, 140)"
        class="resource-caption"
      ></div>

      <ul class="resource-tags">
        <li
          v-for="_tag in tagList"
          v-html="_tag"
        />
      </ul>
    </div>

  </nuxt-link>
</template>

<script>
import dateFormat from 'dateformat'
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,

  props: {
    resource: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      tagList: [],
      noOfTagsToShow: 2,
      variationImageSize: this.$parent.variationListingImageSize || 'image-small'
    }
  },

  mounted () {
    if (this.resource.tag_list && this.resource.tag_list.length) {
      this.tagList = this.resource.tag_list
        .slice(0, this.noOfTagsToShow)
        .map(item => this.formatTagName(item))
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

    trimText (text, length) {
      if (!text || !text.length || typeof text !== 'string') {
        return ''
      }

      length = length || 140
      if (text.length <= length) {
        return text
      }

      return text.substr(0, 140).trim() + '...'
    },

    formatTagName (tagName) {
      const idx = tagName.indexOf('/')
      if (idx !== -1) {
        return tagName.substr(idx + 1)
      }

      return tagName
    },

    getImageStyles () {
      const styles = {}
      if (!this.resource.content.image) {
        return styles
      }

      // const imageUrl = this.prepareImage(this.resource.content.image, '400x500/smart')
      const imageUrl = this.resource.content.image
      styles.backgroundImage = `url(${imageUrl})`

      return styles
    }
  }
}
</script>
