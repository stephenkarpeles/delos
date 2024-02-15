<template>
  <div
    :class="BEM_B"
  >
    <Navigation :blok="$store.state.settings.mainNav[0]"/>

    <div v-if="canUseOneCol()">
      <DetailsTemplateOneCol
        :blok="blok"
        :tag-list="tagList"
      />
    </div>

    <div v-else-if="canUseTwoCol()">
      <DetailsTemplateTwoCol
        :blok="blok"
        :tag-list="tagList"
      />
    </div>

    <div v-else-if="canUseBlogTemplate()">
      <DetailsTemplateBlog
        :blok="blok"
        :tag-list="tagList"
      />
    </div>

    <div v-else-if="canUseWhitePaperTemplate()">
      <DetailsTemplateWhitePaper
        :blok="blok"
        :tag-list="tagList"
      />
    </div>

    <div v-else-if="canUsePressReleaseTemplate()">
      <DetailsTemplatePressRelease
        :blok="blok"
        :tag-list="tagList"
      />
    </div>

    <div v-else-if="canUseNewsroomTemplate()">
      <DetailsTemplateNewsroom
        :blok="blok"
        :tag-list="tagList"
      />
    </div>

    <div v-else>
      <DetailsTemplateOneCol
        :blok="blok"
        :tag-list="tagList"
      />
    </div>

    <Footer :blok="$store.state.settings.mainFooter[0]" />
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Navigation from '~/src/components/Modules/Navigation'
import Footer from '~/src/components/Modules/Footer'
import DetailsTemplateOneCol from '~/src/components/Types/Resources/DetailsTemplateOneCol'
import DetailsTemplateTwoCol from '~/src/components/Types/Resources/DetailsTemplateTwoCol'
import DetailsTemplateBlog from '~/src/components/Types/Resources/DetailsTemplateBlog'
import DetailsTemplateWhitePaper from '~/src/components/Types/Resources/DetailsTemplateWhitePaper'
import DetailsTemplatePressRelease from '~/src/components/Types/Resources/DetailsTemplatePressRelease'
import DetailsTemplateNewsroom from '~/src/components/Types/Resources/DetailsTemplateNewsroom'

export default {
  components: {
    Navigation,
    Footer,
    DetailsTemplateOneCol,
    DetailsTemplateTwoCol,
    DetailsTemplateBlog,
    DetailsTemplateWhitePaper,
    DetailsTemplatePressRelease,
    DetailsTemplateNewsroom
  },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'Resources'
    },
    blok: {
      type: Object,
      default: null
    },
    tagList: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      oneColTypes: [
        'insights'
      ],
      twoColTypes: [
        'leadership'
      ],
      blogType: [
        'blog', 'article'
      ],
      whitePaperType: [
        'white_papers'
      ],
      pressReleaseType: [
        'press_release'
      ],
      newsroomType: [
        'news'
      ]
    }
  },
  methods: {
    canUseOneCol () {
      return this.oneColTypes.includes(this.blok.type)
    },

    canUseTwoCol () {
      return this.twoColTypes.includes(this.blok.type)
    },

    canUseBlogTemplate () {
      return this.blogType.includes(this.blok.type)
    },

    canUseWhitePaperTemplate () {
      return this.whitePaperType.includes(this.blok.type)
    },

    canUsePressReleaseTemplate () {
      return this.pressReleaseType.includes(this.blok.type)
    },

    canUseNewsroomTemplate () {
      return this.newsroomType.includes(this.blok.type)
    }
  }
}
</script>
