<template>
  <div class="ResourceHubDetails ResourceHubDetails--template-blog BlogTemplate">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">

          <div class="BlogTemplate__meta">
            <div class="BlogTemplate__meta-intro-text">
              <a href="https://delos.com/blog">Blog</a>
            </div>
            <div class="BlogTemplate__meta-title">
              <h1
                v-if="blok.title"
                v-html="blok.title"
              />
            </div>
            <div
              v-if="blok.summary"
              v-html="blok.summary"
              class="BlogTemplate__meta-summary"
            />
            <div class="BlogTemplate__meta-date">
              <div
                v-if="blok.date || blok.type"
                class="resource-date-type"
              >
                <span
                  v-if="blok.date"
                  v-html="formatDate(blok.date)"
                />
              </div>
            </div>

            <a
              v-if="blok.author.length > 0"
              v-for="(author, index) in author" v-bind:key="'author' + index"
              class="BlogTemplate__meta-author"
              v-scroll-to="{ el: '#authorBlock', offset: -100 }"
            >                                    
              {{author.name}}                
            </a>

            </div>
          </div>

        </div>

        <div class="col-md-12">

          <div class="BlogTemplate__featured-image">
            <div
              v-if="blok.image"
              class="resource-hub-image"
            >
              <picture>
                <source media="(max-width: 599px)" :srcset="blok.mobileImage">
                <source media="(max-width: 999px)" :srcset="blok.tabletImage">
                <img :src="blok.image" :alt="blok.title" class="img-fluid">
              </picture>
            </div>
            <div
              v-if="blok.imageCaption"
              v-html="blok.imageCaption"
              class="BlogTemplate__featured-image-caption"
            />
          </div>

          <div class="BlogTemplate__share-block BlogTemplate__share-block--desktop">
            <div class="BlogTemplate__share-block-heading">
              Share
            </div>
            <div class="addthis_inline_share_toolbox"></div>
          </div>

        </div>

        <div class="col-lg-8 offset-lg-2">
          <div class="BlogTemplate__content">              

            <div
              v-if="blok.content"
              v-html="renderField_content"
              class="resource-content"
            />

            <div
              v-if="blok.markdown_content"
              v-html="markdown(blok.markdown_content)"
              class="resource-content"
            />
          
          </div>

          <div class="BlogTemplate__tags">

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

          <div class="BlogTemplate__share-block BlogTemplate__share-block--mobile">
            <div class="BlogTemplate__share-block-heading">
              Share
            </div>
            <AddThis publicId="ra-5ccc5566758aaca2" />
          </div>

          <div v-if="blok.author.length > 0">

            <div 
              v-for="(author, index) in author" v-bind:key="'author' + index"
              id="authorBlock"
              class="BlogTemplate__author-block">
              <div class="BlogTemplate__author-block-heading">Author</div>
              <div class="BlogTemplate__author-block-grid">
                <div v-if="author.content.author_image" class="BlogTemplate__author-block-col-left">
                  <img
                    :src="author.content.author_image"
                    :alt="author.content.name"
                    class="img-fluid BlogTemplate__author-image"
                  />
                </div>
                <div class="BlogTemplate__author-block-col-right">
                  <a :href="`/${author.full_slug}`">
                    <h4 class="BlogTemplate__author-block-name">{{author.content.name}}</h4>
                  </a>
                  <div
                    v-if="author.content.title"
                    v-html="author.content.title"
                    class="BlogTemplate__author-block-title"
                  />
                  <div
                    v-if="author.content.bio"
                    v-html="renderBio_content"
                    class="BlogTemplate__author-block-bio"
                  />
                  <div 
                    v-if="blok.additionalContributors.length > 0" class="BlogTemplate__author-block-contributors">
                    <div class="BlogTemplate__additional-contributors-heading">Contributors:</div>
                    <div 
                      v-for="(additionalContributor, index) in additionalContributors" v-bind:key="'additionalContributors' + index"
                      class="BlogTemplate__additional-contributor"
                    >
                      <a :href="`/resources/authors/${additionalContributor.slug}`">
                        {{additionalContributor.content.name}}
                      </a>
                    </div>
                  </div>
                </div>   
              </div>  
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
import BaseComponent from '~/src/components/Templates/BaseComponent'
import AddThis from 'vue-simple-addthis-share'
const VueScrollTo = require('vue-scrollto')

export default {
  extends: BaseComponent,
  components: {
    Vector,
    AddThis
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
        { src: '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5ccc5566758aaca2',
          type: 'text/javascript',
          async: true,
          defer: true
        }
      ]
    }
  },

  data () {
    return {
      author: [],
      additionalContributors: [],
      backlink: false,
      path: this.$route.path
    }
  },

  computed: {
    renderField_content () {
      return this.$storyapi.richTextResolver.render(this.blok.content)
    },

    renderBio_content () {
      return this.$storyapi.richTextResolver.render(this.author[0].content.bio)
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

  mounted () {
    this.loadAddlData(this.blok.author, 'author')
    this.loadAddlData(this.blok.additionalContributors, 'additionalContributors')
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
