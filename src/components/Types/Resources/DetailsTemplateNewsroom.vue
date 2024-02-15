<template>
  <div class="ResourceHubDetails ResourceHubDetails--template-white-paper WhitePaperTemplate">
    <div class="container">
      <div class="row">

        <div class="col-md-12">

          <div class="WhitePaperTemplate__featured-image">
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
              class="WhitePaperTemplate__featured-image-caption"
            />
          </div>

          <div class="WhitePaperTemplate__content-grid">

            <div class="col--WhitePaperContent">

              <div class="WhitePaperTemplate__meta-intro-text">
                <a href="https://delos.com/newsroom">News</a>
              </div>
              <div class="WhitePaperTemplate__meta-title">
                <h2
                  v-if="blok.title"
                  v-html="blok.title"
                />
              </div>
              <div
                v-if="blok.summary"
                v-html="blok.summary"
                class="WhitePaperTemplate__meta-summary"
              />
              <div class="WhitePaperTemplate__meta-date" v-if="blok.date">
                <div                  
                  class="resource-date-type"
                >
                  <span
                    v-if="blok.date"
                    v-html="formatDate(blok.date)"
                  />
                </div>
              </div>

              <div class="WhitePaperTemplate__content">  

                <div 
                  class="WhitePaperTemplate__cta-button-block WhitePaperTemplate__cta-button-block--mobile"
                  v-if="blok.buttonUrl">
                  <a 
                    :href="blok.buttonUrl" 
                    class="WhitePaperTemplate__cta-button">
                    {{blok.buttonText}}
                  </a>
                </div>            

                <div
                  v-if="blok.content"
                  v-html="renderField_content"
                  class="resource-content"
                />
          
              </div>
            
            </div>

            <div class="col--WhitePaperSidebar">
              <div 
                class="WhitePaperTemplate__cta-button-block WhitePaperTemplate__cta-button-block--desktop"
                v-if="blok.buttonUrl">
                <a 
                  :href="blok.buttonUrl" 
                  class="WhitePaperTemplate__cta-button">
                  {{blok.buttonText}}
                </a>
              </div>
              <div class="WhitePaperTemplate__share-block WhitePaperTemplate__share-block--desktop">
                <div class="WhitePaperTemplate__share-block-heading">
                  Share
                </div>
                <AddThis publicId="ra-5ccc5566758aaca2" />
              </div>

              <div 
                v-if="tagList && tagList.length"
                class="WhitePaperTemplate__tags">
                <div class="WhitePaperTemplate__tags-heading">
                  Tags
                </div>

                <ul                  
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

  // head () {
  //   return {
  //     script: [
  //       { src: '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5ccc5566758aaca2',
  //         type: 'text/javascript',
  //         async: false,
  //         defer: false
  //       }
  //     ]
  //   }
  // },

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
