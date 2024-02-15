<template>
  <div :class="BEM_B">
    <div class="container">
      <div
        :class="BEM_E('footer-top')"
        class="row"
      >
        <div class="col d-none"></div>

        <div
          class="col-lg-2 col-md-3 col-6"
        >
          <a
            v-if="blok.homeImage"
            :href="linkHome(blok.homeLink)"
            :class="BEM_E('logo-link')"
            class="text-left"
          >
            <img :class="BEM_E('logo')" :src="blok.homeImage.filename" alt="" />
          </a>

          <p
            v-if="blok.homeCaption && blok.homeCaption.length"
            :class="BEM_E('caption')"
            class="footer-add d-block d-md-none padding-top-xs"
          >
            <RichText :blok="blok.homeCaption[0]" />
          </p>

          <ul
            v-if="blok.socialLinks"
            :class="BEM_E('social-links')"
            class="d-block d-md-none margin-top-l"
          >
            <li v-for="(link, index) in blok.socialLinks" v-bind:key="index">
              <a :href="link.url" :class="BEM_E('social-link')" target="_blank">
                <Vector :name="'social/' + link.name" width="32" height="32" />
              </a>
            </li>
          </ul>
        </div>

        <div
          class="col-lg-2 col-md-5 col-6 offset-lg-1 offset-md-0 offset-0"
        >
          <p
            v-if="blok.homeCaption && blok.homeCaption.length"
            :class="BEM_E('caption')"
            class="footer-add d-none d-md-block"
          >
            <RichText :blok="blok.homeCaption[0]" />
          </p>

          <div
            :class="BEM_E('link-lists')"
            class="d-block d-md-block d-lg-none"
          >
            <div
              v-for="(itemList, index) in blok.navItems"
              v-bind:key="index"
              :class="itemList.classes"
            >
              <!-- {{itemList}} -->
              <TitleBlock :blok="itemList" />
              <h6 v-if="itemList.title && itemList.title.length">
                <FancyText :blok="itemList.title" />
              </h6>
              <ul
                :class="
                itemList.classes !== ''
                  ? BEM_E('link-list') + ' ' + itemList.classes
                  : BEM_E('link-list')
              "
              >
                <li
                  v-for="(item, idx) in itemList.buttons"
                  v-bind:key="idx + item.linkLabel"
                >
                  <Btn :blok="item" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          class="col-lg-2 offset-lg-1 offset-md-0 offset-0 d-none d-lg-block"
        >
          <div :class="BEM_E('link-lists')">
            <div
              v-for="(itemList, index) in blok.navItems"
              v-bind:key="index"
              :class="itemList.classes"
            >
              <!-- {{itemList}} -->
              <TitleBlock :blok="itemList" />
              <h6 v-if="itemList.title && itemList.title.length">
                <FancyText :blok="itemList.title" />
              </h6>
              <ul
                :class="
                itemList.classes !== ''
                  ? BEM_E('link-list') + ' ' + itemList.classes
                  : BEM_E('link-list')
              "
              >
                <li
                  v-for="(item, idx) in itemList.buttons"
                  v-bind:key="idx + item.linkLabel"
                >
                  <Btn :blok="item" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          class="col-lg-4 col-md-4 text-right d-none d-md-block"
        >
          <ul :class="BEM_E('social-links')" v-if="blok.socialLinks">
            <li v-for="(link, index) in blok.socialLinks" v-bind:key="index">
              <a :href="link.url" :class="BEM_E('social-link')" target="_blank">
                <Vector :name="'social/' + link.name" width="32" height="32" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div :class="BEM_E('footer-bottom')">
      <div class="container">
        <div class="row">

          <div id="footer-bottom-col-first" class="col-lg-7 col-md-6 pl-md-0">
            <div class="disclaimer">
              <RichText :blok="blok.disclaimer[0]" />
            </div>
          </div>

          <div id="footer-bottom-col-second" class="col-lg-5 col-md-6">
            <div
              :class="BEM_E('terms')"
              v-if="blok.copyrightNavItems"
              v-for="(itemList, index) in blok.copyrightNavItems"
              :key="index"
            >
              <Btn
                v-for="(item, index) in itemList.buttons"
                :key="index + item.linkLabel"
                :blok="item"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import RichText from '~/src/components/Modules/RichText'

export default {
  components: {
    RichText
  },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'Footer'
    },
    blok: {
      type: [Array, Object],
      default: null
    }
  },
  data() {
    return {
      socialLinks:
        this.$store && this.$store.state.settings
          ? this.$store.state.settings.socialLinks
          : []
    }
  },
  computed: {
    stats() {
      return this.$store.state.footerStats
    }
  },
  mounted() {},
  methods: {
    linkHome(link) {
      let path = ''

      if (this.$store) {
        path =
          this.$store.state.language === 'en' ? '' : this.$store.state.language
        path += link ? link.cached_url : ''
      }

      return path
    }
  }
}
</script>
<style scoped>
@media screen and (max-width: 767px) {
  .footer-add {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}
</style>
