<template>
  <div
    v-if="Object.entries(blockContent).length > 0"
    :class="BEM_B"
    :id="blok.id ? blok.id : blok._uid"
  >
    <div
      :class="BEM_E('background')"
      :style="{
        backgroundImage: blok.image && blok.image[0]
          ? 'url(' + blok.image[0].imageLocation.filename + ')'
          : 'none',
        backgroundSize: (blok.image && blok.image[0] && blok.image[0].imageLocation) ? 'cover' : 'initial'
      }"
    />
    <div class="container">
      <div class="row">
        <div
          v-if="blockContent.title || blockContent.subtitle || blockContent.caption || blockContent.link"
          :class="[BEM_E('contents'), {noLogo: !blok.showLogo, noCaption: !blockContent.caption}]">
          <Img
            v-if="blok.showLogo && logo"
            :class="BEM_E('logo')"
            :blok="logo"
          />
          <h2 v-if="blockContent.title" :class="BEM_E('title')">
            <FancyText :blok="blockContent.title" />
          </h2>
          <h5 v-if="blockContent.caption" :class="BEM_E('caption')">
            <FancyText :blok="blockContent.caption" />
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseComponent from '~/src/components/Templates/BaseComponent'
import BEM from '~/mixins/bem.js'
import FancyText from '~/src/components/Elements/FancyText'
import Img from '~/src/components/Elements/Image'

export default {
  components: { FancyText, Img },
  extends: BaseComponent,
  mixins: [BEM],
  props: {
    name: {
      type: String,
      default: 'TitleBlock'
    },
    blok: {
      type: Object,
      default: () => {}
    },
    mods: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState({
      logo: state => state?.brand?.logo,
      brandName: state => state?.brand?.brandName
    }),
    computeMods () {
      let arr = []
      if (this.mods && this.mods !== []) {
        arr = this.mods
      }

      if (this.blok.titleBlock && this.blok.titleBlock[0] && this.blok.titleBlock[0].variation) {
        arr.push(this.blok.titleBlock[0].variation)
      } else if (!this.blok.titleBlock && this.blok.variation) {
        arr.push(this.blok.variation)
      }

      return arr
    },
    computeCls () {
      let arr = []

      if (this.blok.titleBlock && this.blok.titleBlock[0] && this.blok.titleBlock[0].classes) {
        arr = this.blok.titleBlock[0].classes.split(',')
      } else if (!this.blok.titleBlock && this.blok.classes) {
        arr = this.blok.classes.split(',')
      }

      return arr
    },
    BEM_B () {
      return BEM.methods.BlockCls(this.name, this.computeMods, this.computeCls)
    },
    blockContent () {
      const content = {}
      let image, title, subtitle, caption, link

      // accept both raw and nested component titleBlock
      if (this.blok.titleBlock && this.blok.titleBlock.length > 0) {
        image = this.setBlockContentVal(this.blok.titleBlock[0].image)
        title = this.setBlockContentVal(this.blok.titleBlock[0].title)
        subtitle = this.setBlockContentVal(this.blok.titleBlock[0].subtitle)
        caption = this.setBlockContentVal(this.blok.titleBlock[0].caption)
        link = this.setBlockContentVal(this.blok.titleBlock[0].button)
      } else if (this.blok && this.blok.component === 'TitleBlock') {
        image = this.setBlockContentVal(this.blok.image)
        subtitle = this.setBlockContentVal(this.blok.subtitle)
        title = this.setBlockContentVal(this.blok.title)
        caption = this.setBlockContentVal(this.blok.caption)
        link = this.setBlockContentVal(this.blok.button)
      } else if (this.blok) {
        subtitle = this.blok.subtitle ? this.blok.subtitle : null
        title = this.blok.title ? this.blok.title : null
        caption = this.blok.caption ? this.blok.caption : null
      }

      if (image) {
        content.image = image[0] ? image[0] : image
      }

      if (title) {
        content.title = title
      }

      if (subtitle) {
        content.subtitle = subtitle
      }

      if (caption) {
        content.caption = caption
      }

      if (link) {
        content.link = link
      }

      return content
    },
    hasGlobalTextToReplace () {
      return Boolean(this?.blok?.caption?.[0]?.existingText)
    }
  },
  created () {
    this.$store.watch((state) => {
      return this.$store.state.brand
    },
    (newValue, oldValue) => {
      if (this.blok && this.blok.title) {
        this.replaceTemplates()
      }
    })
  },
  mounted () {
    if (this.hasGlobalTextToReplace) {
      this.replaceGlobalText()
    } else {
      this.replaceTemplates()
    }
  },
  methods: {
    replaceGlobalText () {
      const uuid = this?.blok?.caption?.[0]?.existingText
      if (uuid !== '' && uuid !== undefined) {
        this.loadGlobalText(uuid)
          .then((res) => {
            this.blok.caption[0].existingText = res[0].content.text
            this.replaceTemplates()
          })
      }
    },
    loadGlobalText (uuid) {
      return this.$storyapi.get(`cdn/stories/`, {
        starts_with: 'staywell-dc/global-text',
        version: 'published',
        cv: this.$store.state.cacheVersion,
        by_uuids: uuid,
        find_by: 'uuid',
        sort_by: 'position:desc'
      }).then((res) => {
        // this.blokItems = res.data.stories
        return res.data.stories
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    },
    BEM_E (el) {
      return BEM.methods.ElCls(this.name, el)
    },
    BEM_M (mod) {
      return BEM.methods.ModCls(this.name, mod)
    },
    setBlockContentVal (valArr) {
      if (valArr && valArr[0]) {
        return valArr[0]
      }
      return null
    },
    replaceTitleTemplate () {
      const text = this.blok.title[0].customText
      const regex = RegExp('{{.*}}')
      if (regex.test(text)) {
        this.blok.title[0].customText = text.replace(regex, this.brandName)
      }
    },
    replaceCaptionTemplate () {
      if (this.blok?.caption[0]?.customText) {
        const text = this.blok.caption[0].customText
        const regex = RegExp('{{.*}}')
        if (regex.test(text)) {
          this.blok.caption[0].customText = text.replace(regex, this.brandName)
        }
      } else if (this?.blok?.caption[0]?.existingText) {
        const text = this.blok.caption[0].existingText
        const regex = RegExp('{{.*}}')
        if (regex.test(text)) {
          this.blok.caption[0].existingText = text.replace(regex, this.brandName)
        }
      }
    },

    replaceTemplates () {
      if (this.blok?.title?.[0]?.customText) {
        this.replaceTitleTemplate()
      }
      if (this?.blok?.caption?.[0]?.customText || this?.blok?.caption?.[0]?.existingText) {
        this.replaceCaptionTemplate()
      }
      // this.replaceBackground()
    }
  }
}
</script>
