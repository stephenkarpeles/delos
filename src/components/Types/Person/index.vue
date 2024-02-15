<template>
  <div
    :class="BEM_B"
  >
    <Navigation :blok="$store.state.settings.mainNav[0]"/>
    
    <div class="ResourceHubDetails ResourceHubDetails--template-author AuthorTemplate">

      <div class="container">
        <div class="row">
          <div class="col-lg-8 offset-lg-2">

            <div class="AuthorTemplate__intro">
              
              <div 
                v-if="blok.author_image"
                class="AuthorTemplate__author-image">
                <img :src="blok.author_image" :alt="blok.title" class="img-fluid">
              </div>

              <h1
                v-if="blok.name"
                v-html="blok.name"
                class="AuthorTemplate__name"
              />

              <div
                v-if="blok.title"
                v-html="blok.title"
                class="AuthorTemplate__title"
              />

              <p
                v-if="blok.bio"                
                v-html="renderField_content"
                class="AuthorTemplate__bio"
              />

            </div>

          </div>

          <div class="col-md-12">

            <div v-if="authorPosts && authorPosts.length > 0" :class="BEM_E('author-posts')">
              <div class="author-post-card-grid">
                <div 
                  class="author-post-card" 
                  v-for="(authorPost, index) in authorPosts" 
                  :key="index" 
                  >
                  <a :href="authorPost.full_slug">
                    <div class="author-post-card__image">
                      <img :src="authorPost.content.image">
                    </div>
                    <div class="author-post-card__type">
                      {{authorPost.content.type}}
                      {{authorPost.content.full_slug}}
                    </div>
                    <div class="author-post-card__title">
                      {{authorPost.content.title}}
                    </div>   
                  </a>             
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>   
      
    </div>

    <Footer :blok="$store.state.settings.mainFooter[0]" />
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Navigation from '~/src/components/Modules/Navigation'
import Footer from '~/src/components/Modules/Footer'
import CardList from '~/src/components/Modules/CardList'

export default {
  extends: BaseComponent,

  components: {
    Navigation,
    Footer,
    CardList
  },

  props: {
    name: {
      type: String,
      default: 'Person'
    },
    blok: Object,
    slug: String,
    authorId: String,
  },

  head () {
    return {
      title: this.blok.metadata ? this.blok.metadata.title : this.blok.name,
      titleTemplate: '%s | Delos',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.blok.metadata ? this.blok.metadata.description : ''
        },
        {
          property: 'og:title',
          content: this.blok.metadata ? this.blok.metadata.title : this.blok.name
        },
        {
          property: 'og:description',
          content: this.blok.metadata ? this.blok.metadata.description : ''
        },
        {
          name: 'twitter:title',
          content: this.blok.metadata ? this.blok.metadata.title : this.blok.name
        },
        {
          name: 'twitter:description',
          content: this.blok.metadata ? this.blok.metadata.description : ''
        },
      ],
    }
  },

  data () {
    return {
      posts: null,
      authorPosts: null,
    }
  },

  computed: {
    renderField_content () {
      return this.$storyapi.richTextResolver.render(this.blok.bio)
    }
  },

  created () {
    this.fetchAuthorPosts()
  },

  methods: {
    fetchAuthorPosts: function () {
      return this.$storyapi.get('cdn/stories/', {
        version: 'published',
        starts_with: 'resources/blog',
        cv: this.$store.state.cacheVersion,
        resolve_relations: 'author',
        filter_query: {
          author: {
            in: this.authorId
          }
        }
      },
      ).then((res) => {
        console.log(res.data.stories)
        this.authorPosts = res.data.stories
        return res.data.story
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    },
  }
}
</script>