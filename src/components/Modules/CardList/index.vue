<template>
  <div :class="BEM_B">
    <div class="container">
      <div v-if="blok && blok !== null && blok" class="row">
        <div class="col-12 padding-right-reset">

          <ul
            v-if="(screenWidth > tabletBreakpoint) || !blok.carouselOnMobile"
            :class="BEM_E('list')"
          >
            <li
              v-for="(item, index) in blok.cards"
              :key="index"
              :class="BEM_E('item')"
            >
              <Card
                :blok="item"
                :image="item.image"
                :title="item.title"
                :caption="item.caption"
                :content="item.content"
                :document="item.document"
                :button="item.Button[0]"
              />
            </li>
          </ul>

          <div
            v-if="(screenWidth <= tabletBreakpoint) && blok.carouselOnMobile"
            :class="BEM_E('list')"
          >
            <div class="row mobile-carousel-controls">
              <div class="col-6">
                <div
                  v-html="getSlideNumber()"
                  class="slide-count-text"
                />
              </div>
              <div class="col-6 text-right">
                <span
                  @click="slickSlidePrev()"
                  class="arrow-icon"
                >
                  <Vector name="icon/ArrowCircleLeftOutline-wt" />
                </span>
                <span
                  @click="slickSlideNext()"
                  class="arrow-icon"
                >
                  <Vector name="icon/ArrowCircleRightOutline-wt" />
                </span>
              </div>
            </div>

            <VueSlickCarousel
              :ref="sliderName"
              v-bind="slickOptions"
              @afterChange="slickOnAfterChange"
            >
              <div
                v-for="(item, index) in blok.cards"
                :key="index"
                :class="BEM_E('item')"
              >
                <Card
                  :blok="item"
                  :image="item.image"
                  :title="item.title"
                  :caption="item.caption"
                  :content="item.content"
                  :document="item.document"
                  :button="item.Button[0]"
                />
              </div>

            </VueSlickCarousel>
          </div>

        </div>
      </div>
      <div v-else>
        <div class="row flex-column align-items-center">
          <div :class="BEM_E('title')" v-if="blok">
            <TitleBlock :blok="blok" />
          </div>
          <ul :class="BEM_E('list') + ' row'">
            <!-- Allows us to pass in cards from editor via blok.cards or programmatically with items -->
            <li
              v-for="(item, index) in blok && blok.cards ? blokItems : items"
              v-bind:key="index"
              v-bind:title="item.msg"
              :class="BEM_E('item')"
            >
              <card
                :blok="vr"
                :image="item.content && item.content.image ? item.content.image : null"
                :title="item.content && item.content.title ? item.content.title : null"
                :caption="item.content && item.content.caption ? item.content.caption : null"
                :date="item.content ? {dateTime: item.content.dateTime, timezone:item.content.timezone} : null"
                :contentType="item.content ? item.content.component : null"
                :tags="item.tag_list && item.tag_list.length > 0 ? item.tag_list : item.content.credentials ? item.content.credentials : null"
                :path="linkCard(item.full_slug)"
                :imageDims="cardImageDims ? cardImageDims : null"
                :collapses="collapses"
                :mods="cardMods ? blok && blok.hideCardMeta ? cardMods.push('hide-meta') : cardMods : blok && blok.hideCardMeta ? ['hide-meta'] : null "/>
            </li>
          </ul>
          <div v-if="blok && blok.button && blok.button[0]" :class="BEM_E('link')">
            <Btn :blok="blok.button[0]"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Card from '~/src/components/Elements/Card'

export default {
  components: {
    VueSlickCarousel,
    Card
  },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'CardList'
    },
    cardMods: Array,
    cardImageDims: Array,
    blok: {
      type: [Object, Array],
      default: null,
      cards: {
        type: Array,
        default: null
      }
    },
    items: Array,
    startsWith: String,
    perPage: {
      type: Number,
      default: 25
    },
    sortOrder: {
      type: String,
      default: 'position:desc'
    },
    collapses: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      sliderName: 'CardListMobileSlider',
      slidesCount: this.blok.cards.length,
      currentSlideIndex: 0,
      tabletBreakpoint: 768,
      mobileBreakPoint: 650,
      screenWidth: window.innerWidth,
      blokItems: [],
      vr: {
        variation: 'resources'
      },
      slickOptions: {
        responsive: [
          {
            breakpoint: 9999,
            settings: 'unslick'
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              arrows: false,
              dots: false,
              centerMode: false,
              infinite: true
            }
          },
          {
            breakpoint: 650,
            settings: {
              slidesToShow: 1,
              arrows: false,
              dots: false,
              centerMode: false,
              infinite: true
            }
          }
        ]
      }
    }
  },

  mounted () {
    if (this.startsWith) {
      this.loadCardsByLocation(this.sortOrder)
    } else {
      this.loadCards(this.sortOrder)
    }

    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth
    })
  },

  methods: {
    getSlideNumber () {
      const slideNumber = ('0' + (this.currentSlideIndex + 1)).slice(-2)
      const slidesCount = ('0' + this.slidesCount).slice(-2)

      return `${slideNumber} / ${slidesCount}`
    },
    slickSlideNext () {
      this.$refs[this.sliderName].next()
    },
    slickSlidePrev () {
      this.$refs[this.sliderName].prev()
    },
    slickOnAfterChange (slideIndex) {
      this.currentSlideIndex = slideIndex
    },

    loadCardsByLocation (sortOrder) {
      return this.$storyapi.get(`cdn/stories/`, {
        version: 'published',
        cv: this.$store.state.cacheVersion,
        starts_with: this.startsWith,
        sort_by: sortOrder,
        per_page: this.perPage
      }).then((res) => {
        this.blokItems = res.data.stories
        return res.data.story
      }).catch((res) => {
        if (!res.response) {
          // console.error('no res', res)
        }
      })
    },
    loadCards (sortOrder) {
      if (this.blok && this.blok.cards) {
        const uuids = this.blok.cards ? this.blok.cards.toString() : ''
        return this.$storyapi.get(`cdn/stories/`, {
          version: 'published',
          cv: this.$store.state.cacheVersion,
          by_uuids: uuids,
          find_by: 'uuid',
          sort_by: sortOrder
        }).then((res) => {
          this.blokItems = res.data.stories
          return res.data.story
        }).catch((res) => {
          if (!res.response) {
            // console.error('no res', res)
          }
        })
      }
    },
    linkCard (slug) {
      const lang = this.$store.state.language
      if (lang !== '' && lang !== 'en' && !slug.startsWith(lang)) {
        return lang + '/' + slug
      }

      return slug
    }
  }
}
</script>
