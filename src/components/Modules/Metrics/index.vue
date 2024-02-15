<template>
  <div
    v-bind:style="{
      backgroundImage: blok.image ? 'url(' + prepImg(blok.image, '1200x600/smart') + ')' : 'none',
      backgroundSize: blok.image ? 'cover' : 'initial' }"
    :class="BEM_B"
    :id="blok.id ? blok.id : null"
  >
    <div class="container">
      <div class="row">
        <div :class="BEM_E('contents')">
          <TitleBlock :blok="metricsContent" />
        </div>
        <div :class="BEM_E('action')" v-if="blok.button && blok.button[0]">
          <Btn v-if="blok.button && blok.button[0]" :class="BEM_E('link')" :blok="blok.button[0]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import axios from 'axios'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'Metrics'
    },
    blok: Object
  },
  computed: {
    stats () {
      return this.$store.state.footerStats
    },
    metricsContent () {
      let content = {}
      if(this.blok) {
        content.subtitle = this.blok.subtitle
        content.title = this.metricsText

        return content
      }

      return content
    },
    metricsText () {
      if(this.stats) {
        let sqftTxt = this.stats.sqftArea + ' million square feet'

        let enTxt = this.stats.stat_projects + ' projects encompassing over ' + sqftTxt + ' are applying WELL across ' + this.stats.stat_countries + ' countries.'
        let zhTxt = '全球' + this.stats.stat_countries + '个国家逾' + this.stats.mArea +'万平方米' + this.stats.stat_projects + '个项目在使用 WELL。'

        let fullTxt = this.$store.state.language == 'zh-cn' ? zhTxt : enTxt

        return fullTxt
      }
    }
  }
}
</script>
