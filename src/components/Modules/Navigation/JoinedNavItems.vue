<template>
  <div :class="this.openNav === true ? BEM_B + ' mobile-open' : BEM_B + ' mobile-closed'">
    <header class="JoinedNav" ref="element">
      <a class="nav-trigger" ref="mobileTrigger">
        <span/><span/><span/>
      </a>
      <nav class="main-nav" ref="mainNav" v-if="items">
        <ul>
          <li
            v-for="(item, index) in items"
            v-bind:key="index"
          >
            <span v-if="item.subitems"
                  :class="item.subitems.length > 0 ? 'nav-link has-dropdown ' + item.classes : 'nav-link ' + item.classes"
                  :data-content="'item-' + index">
            <a
              v-if="item.classes === 'language'"
              class="nav-item Btn"
              @click="updateLang($store.state.language !== 'zh-cn' ? 'zh-cn' : 'en')">
              <Vector name="icon/globe" fill="#949494"/>
              <span class="Btn__label">{{ getLangLabel() }}</span>
            </a>
            <span v-else-if="item.classes === 'search'"
                  class="nav-item Btn">
              <input type="text" class="st-default-search-input">
            </span>

            <Btn v-else :blok="item.link[0]" class="nav-item" :downarrow="item.subitems.length > 0 ? true : false"/>

            </span>
            <span v-if="!item.subitems">
            <a
              v-if="item.HomeImage"
              :href="item.HomeLink.cached_url"
              :class="BEM_E('logo-link')">
              <img
                v-if="isProductPage && topOfPage"
                :class="BEM_E('logo')"
                :src="item.HomeImageLight"
                width="100px"
              />
              <img
                v-else
                :class="BEM_E('logo')"
                :src="item.HomeImage"
                width="100px"
              />
            </a>
            </span>
          </li>
        </ul>
      </nav>
      <div class="morph-dropdown-wrapper" ref="morphWrapper">
        <div class="dropdown-list" style="min-width: 250px;" ref="dropdownList">
          <ul>
            <li
              :id="'item-' + index"
              v-for="(item, index) in items"
              v-bind:key="index"
              class="dropdown"
              style="min-width: 250px;"
            >
              <div :class="[expanded && 'expanded', 'content']">
                <ul v-if="item.link && item.link[0].linkLabel === 'work with us'" class="links-list"
                    style="min-width: 500px; ">
                  <div class="row no-gutters w-100">
                    <div class="col-6">
                      <li
                        v-for="(link, linkIndex) in item.subitems.slice(0, 3)"
                        :key="linkIndex"
                        :class="link.classes"
                      >
                        <Btn
                          :blok="link"
                          class="w-100 d-flex"
                        />
                      </li>
                    </div>
                    <div class="col-6">
                      <li
                        v-for="(link, linkIndex) in item.subitems.slice(3, 6)"
                        :key="linkIndex"
                        :class="link.classes"
                      >
                        <Btn
                          :blok="link"
                          class="w-100 d-flex"
                        />
                      </li>
                    </div>
                  </div>
                </ul>
                <ul v-else-if="item.link && item.link[0].linkLabel === 'About'" class="links-list"
                    style="min-width: 500px; ">
                  <div class="row no-gutters w-100">
                    <div class="col-6">
                      <li
                        v-for="(link, linkIndex) in item.subitems.slice(0, 4)"
                        :key="linkIndex"
                        :class="link.classes"
                      >
                        <Btn
                          :blok="link"
                          class="w-100 d-flex"
                        />
                      </li>
                    </div>
                    <div class="col-6">
                      <li
                        v-for="(link, linkIndex) in item.subitems.slice(4, 8)"
                        :key="linkIndex"
                        :class="link.classes"
                      >
                        <Btn
                          :blok="link"
                          class="w-100 d-flex"
                        />
                      </li>
                    </div>
                  </div>
                </ul>
                <div v-else-if="item.link && item.link[0].linkLabel === 'Products & Solutions'">
                  <div @mouseleave="expanded = false, showAdditionalField(items[2].subitems[0])"
                       class="d-flex justify-content-between">
                    <ul class="links-list" style="min-width: 250px;">
                      <li
                        @mouseenter="showAdditionalField(link)"
                        v-for="(link, linkIndex) in item.subitems"
                        :key="linkIndex"
                        :class="link.classes"
                      >
                        <Btn
                          :isNavLink="true"
                          :blok="link"
                          class="w-100 d-flex"
                        />
                      </li>
                    </ul>
                    <div v-if="additionalField" class="w-full border-left pl-4 d-flex" style="width: 1100px;">
                      <div class="my-auto">
                        <div>
                          <img v-if="additionalIcon" :src="additionalIcon">
                        </div>
                        <div class="mt-3 text-blue-50">
                          {{ additionalField }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ul v-else class="links-list">
                  <li
                    v-for="(link, linkIndex) in item.subitems"
                    :key="linkIndex"
                    :class="link.classes"
                  >
                    <Btn
                      :isNavLink="true"
                      :blok="link"
                      class="w-100 d-flex"
                    />
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div class="bg-layer" aria-hidden="true" ref="dropdownBG"></div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  name: 'Header',
  props: {
    name: {
      type: String,
      default: 'JoinedNavItems'
    },
    items: Array
  },
  data() {
    return {
      expanded: false,
      openNav: false,
      latestFeatArticle: {},
      topOfPage: true,
      additionalField: null,
      additionalIcon: null
    }
  },
  async mounted() {
    await this.init()
    await this.fetchPosts()
    this.showAdditionalField(this.items[2].subitems[0])
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    showAdditionalField(link) {
      // console.log(link)
      this.expanded = true
      this.additionalField = link.additionalField
      if (link.icon[0]) {
        this.additionalIcon = link.icon[0].imageLocation.filename
      } else {
        this.additionalIcon = null
      }
    },
    handleScroll(event) {
      // Any code to be executed when the window is scrolled
      // console.log(window.scrollY)
      if (window.scrollY === 0) {
        this.topOfPage = true
      } else {
        this.topOfPage = false
      }
    },
    init() {
      if (this.$refs.mainNav) {
        const mainNavigationItems = this.$refs.mainNav.querySelectorAll(
          ".has-dropdown"
        );
        mainNavigationItems.forEach(item => {
          item.addEventListener("mouseenter", () => {
            this.showDropdown(item);
          });
          item.addEventListener("mouseleave", () => {
            if (
              this.$refs.mainNav.querySelectorAll(".has-dropdown:hover")
                .length === 0 &&
              this.$refs.morphWrapper.querySelectorAll(".dropdown-list:hover")
                .length === 0
            )
              this.hideDropdown(item);
          });
        });

        this.$refs.element.addEventListener("mouseleave", () => {
          const activeItems = this.$refs.morphWrapper.querySelectorAll(".active");
          activeItems.forEach(item => item.classList.remove("active"));
          this.$refs.element.classList.remove("is-dropdown-visible");
        });

        this.$refs.mobileTrigger.addEventListener("click", () => {
          this.reset()
          this.toggleNav()
          if (this.$refs.element.classList.contains("nav-open")) {
            this.$refs.element.classList.remove("nav-open");
          } else {
            this.$refs.element.classList.add("nav-open");
          }
        });
      }
    },
    fetchPosts() {
      return this.$storyapi.get('cdn/stories/', {
          version: 'published',
          starts_with: this.$store.state.language !== 'en' ? this.$store.state.language + '/resources/articles' : 'resources/articles',
          cv: this.$store.state.cacheVersion,
          per_page: 1,
          filter_query: {"featured": {"in": true}}
        },
      ).then((res) => {
        this.latestFeatArticle = res.data.stories && res.data.stories[0] ? res.data.stories[0] : null
        return res.data.story
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    },
    updateLang(lang) {
      // abort update if already translated
      if (this.$store.state.language === lang) {
        return null
      }

      this.$store.commit('setLanguage', lang)
      this.$store.dispatch('loadSettings', {language: lang})

      let newPath = this.buildNewLangPath()

      if (newPath !== null) {
        this.$router.push({
          path: newPath
        })
      }
    },

    buildNewLangPath() {
      let fullPath = this.$route.fullPath
      let lang = this.$store.state.language

      // remove any lang from url and serve default for english
      if (lang === 'en') {
        let stripLang = fullPath.split('/')

        return fullPath.split(stripLang[1])[1]

        // append new lang to url
      } else {
        return '/' + lang + this.$route.fullPath
      }
    },

    showDropdown(item) {
      const selectedDropdown = this.$refs.dropdownList.querySelector(
        `#${item.dataset.content}`
      )
      const selectedDropdownHeight = selectedDropdown.clientHeight;
      const content = [...selectedDropdown.childNodes].find(item =>
        item && item.classList ? item.classList.contains("content") : null
      );
      const selectedDropdownWidth = content.clientWidth
      const selectedDropdownLeft =
        item.offsetLeft + item.clientWidth / 2 - selectedDropdownWidth / 2;

      this.updateDropdown(
        selectedDropdown,
        parseInt(selectedDropdownHeight),
        selectedDropdownWidth,
        parseInt(selectedDropdownLeft)
      );
      const activeDropdownItems = this.$refs.morphWrapper.querySelectorAll(
        ".active"
      );
      activeDropdownItems.forEach(item => item.classList.remove("active"));
      const activeNavItems = this.$refs.mainNav.querySelectorAll(".active");
      activeNavItems.forEach(item => item.classList.remove("active"));
      item.classList.add("active");
      const children = [...selectedDropdown.parentNode.children];
      const prev = children.filter(
        (el, index) => index < children.indexOf(selectedDropdown)
      );
      const after = children.filter(
        (el, index) => index > children.indexOf(selectedDropdown)
      );
      selectedDropdown.classList.add("active");
      selectedDropdown.classList.remove("move-left");
      selectedDropdown.classList.remove("move-right");
      if (prev.length > 0) {
        prev.forEach(el => {
          el.classList.add("move-left");
        });
      }
      if (after.length > 0) {
        after.forEach(el => {
          el.classList.add("move-right");
        });
      }
      this.$refs.element.classList.add("is-dropdown-visible");
    },
    hideDropdown(item) {
      const selectedDropdown = this.$refs.dropdownList.querySelector(
        `#${item.dataset.content}`
      );
      const prevs = this.$refs.dropdownList.querySelectorAll(".move-left");
      const afters = this.$refs.dropdownList.querySelectorAll(".move-right");
      prevs.forEach(el => {
        el.classList.remove("move-left");
      });
      afters.forEach(el => {
        el.classList.remove("move-right");
      });
      selectedDropdown.classList.remove("active");
      item.classList.remove("active");
      this.$refs.element.classList.remove("is-dropdown-visible");
    },
    updateDropdown(dropdownItem, height, width, left) {
      this.$refs.dropdownList.style["transform"] = `translateX(${left}px)`;
      this.$refs.dropdownList.style["width"] = `${width}px`;
      this.$refs.dropdownList.style["height"] = `${height}px`;

      this.$refs.dropdownBG.style[
        "transform"
        ] = `scaleX(${width}) scaleY(${height})`;
    },
    reset() {
      this.$refs.dropdownList.style["transform"] = "";
      this.$refs.dropdownList.style["width"] = "";
      this.$refs.dropdownList.style["height"] = "";
      this.$refs.dropdownBG.style["transform"] = "";
      const activeDropdownItems = this.$refs.morphWrapper.querySelectorAll(
        ".active"
      );
      activeDropdownItems.forEach(item => item.classList.remove("active"));
      const activeNavItems = this.$refs.mainNav.querySelectorAll(".active");
      activeNavItems.forEach(item => item.classList.remove("active"));
      this.$refs.element.classList.remove("is-dropdown-visible");
    },
    toggleNav() {
      this.openNav = !this.openNav
    },
    linkHome(link) {
      let lang = this.$store.state.language === 'en' ? '' : '/' + this.$store.state.language
      let path = lang

      path += link ? link.cached_url : ''

      return path
    },
    getLangLabel() {
      return this.$store.state.language === 'zh-cn' ? 'EN' : '中文'
    }
  },
  computed: {
    isProductPage() {
      // excluding specific page that SG asked for
      return ( this.$route.path.includes('products/') || this.$route.path.includes('/campaigns/thankyou/')) && !this.$route.path.includes('products/advanced-air-standalone')
    },
    lang() {
      if (this.$store.state.language) {
        return this.$store.state.language
      }

      return ''
    },
    latestFeatArticleLink() {
      if (this.latestFeatArticle) {
        let link = this.RESOURCES_URL + '/' + this.latestFeatArticle.full_slug

        link = link.replace('zh_cn', 'zh-cn').replace('resources/', '')

        return link
      }

      return '#'
    }
  }
}
</script>
