<template>
  <div><Navigation :blok="$store.state.settings.mainNav[0]"/>
    <div v-if="blok.type === 'insights' || blok.type === 'press_release'" :class="BEM_E('insights')">
      <div :class="BEM_B" v-scroll="handleScroll">
        <div :class="BEM_E('back-link') + ' container'" v-if="back !== false">
          <a @click="to" class="nuxt-link-active">← All {{this.name}}s</a>
        </div>
        <div :class="BEM_E('image')">
          <slot name="image"></slot>
        </div>
        <article>
          <div class="container Main">
            <div class="row">
              <div :class="BEM_E('contents')">
                <header :class="BEM_E('header')">
                  <slot name="header"></slot>
                </header>
                <div :class="BEM_E('content')">
                  <slot name="content"></slot>
                </div>
              </div>
              <div
                :class="BEM_E('sidebar')"
                ref = "resourceSidebar"
                id="resourceSidebar"
                v-if="this.$slots.sidebar && this.$slots.sidebar.length > 0">
                <slot name="sidebar"></slot>
              </div>
            </div>
          </div>
        </article>
        <div :class="BEM_E('additional')">
          <slot name="additional"></slot>
        </div>
      </div>
      <Footer :blok="$store.state.settings.mainFooter[0]" />
    </div>
    <div v-else-if="blok.type === 'videos' || blok.type === 'news' || blok.type === 'white_papers'" :class="BEM_E('videos')">
      <div :class="BEM_B" v-scroll="handleScroll">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
                <div :class="BEM_E('image')">
                  <slot name="image"></slot>
                </div>
                <div :class="BEM_E('button')">
                  <a
                    :href="blok.buttonUrl"
                    v-html="blok.buttonText || 'Download'"
                    class="download"
                    target="_blank"
                 ></a>
                </div>
            </div>
            <div class="col-md-8">
              <div :class="BEM_E('contents')">
                <div :class="BEM_E('date-type')">{{ blok.date }} | {{ blok.type }}</div>
                <header :class="BEM_E('header')">
                  <slot name="header"></slot>
                </header>
                <div>
                  <slot name="sidebar"></slot>
                </div>
                <div :class="BEM_E('content')" v-html="renderContentField">
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
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Footer from '~/src/components/Modules/Footer'
import Navigation from '~/src/components/Modules/Navigation'

export default {
  extends: BaseComponent,
  components: {
    Footer,
    Navigation
  },
  props: {
    name: {
      type: String,
      default: 'Single'
    },
    type: String,
    blok: Object,
    back: {
      type: Boolean,
      default: true
    }
  },
  head () {
    return {
      title: this.blok && this.blok.metadata ? this.blok.metadata.title : this.blok.title ? this.blok.title : 'A WELL Resource',
      titleTemplate: '%s | ' + this.name + 's | WELL v2',
      meta: [{ hid: 'description', name: 'description',
      content: this.blok && this.blok.metadata ? this.blok.metadata.description : '' }],
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
      sidebarTop: 0,
      sidebarRight: 0
    }
  },
  computed: {
    renderContentField () {
      return this.$storyapi.richTextResolver.render(this.blok.content)
    }
  },
  mounted () {
    this.getSidebarPos()
  },
  methods: {
    to(){
      console.log(this.$router.go(-1))
    },
    getSidebarPos () {
      let sidebarRef = this.$refs.resourceSidebar
      let sidebarTop = ''
      let sidebarRight = ''
      if(sidebarRef !== undefined){
        sidebarTop = sidebarRef.offsetTop + 60
        sidebarRight = sidebarRef.getBoundingClientRect()
      }
      this.sidebarTop = sidebarTop
      this.sidebarRight = sidebarRight
      return [sidebarTop, sidebarRight]
    },
    handleScroll (evt, el) {
      let clsName = el.className
      let scrollCls = ' Single--scrolled'
      let includesScroll = clsName.includes(scrollCls)

      // if scroll is greater than the top of sidebar and less than the bottom of the page
      if (window.scrollY > this.sidebarTop && (window.innerHeight + window.scrollY) < document.body.offsetHeight) {
        if (!includesScroll) {
          el.setAttribute('class', clsName + scrollCls)
          this.$refs.resourceSidebar.setAttribute('style', 'left:' + this.sidebarRight.left + 'px')
        }
      } else {
        if (includesScroll) {
          el.setAttribute('class', clsName.replace(scrollCls, ''))
          this.$refs.resourceSidebar.setAttribute('style', 'left: 0')
        }
      }
    }
  }
}
</script>
