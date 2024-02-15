<template>
  <div
    :id="blok.id || blok._uid"
    :style="styleObject"
    :class="
      [
        BEM_B,
        {hideLabel: blok.hideLabel},
        BEM_M(blok.direction),
        BEM_M(blok.button_style),
        BEM_M(blok.form_style),
      ]"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12">

          <div v-if="blok.columnText && blok.columnText.length">
            <ColumnText :blok="blok.columnText[0]" />
          </div>

          <div class="row">
            <div
              v-if="!chinese"
              :id="'hubspotform-' + blok.formId"
              :class="blok.width"
              class=""
            >
            </div>
            <div
              v-else
              :id="'hubspotform-' + blok.formIdChinese"
              :class="blok.width"
              class="offset-sm-0"
            >
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import ColumnText from '~/src/components/Modules/ColumnText'

export default {
  components: {
    ColumnText
  },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'FormEmbed'
    }
  },
  data () {
    return {
      chinese: false,
      styleObject: {
        backgroundColor: this.blok.bg_color,
        backgroundImage: this.blok.bgImage ? 'url(' + this.prepImg(this.blok.bgImage, '1200x600/smart') + ')' : 'none',
        backgroundSize: this.blok.bgImage ? 'cover' : 'initial'
      }
    }
  },
  mounted () {
    this.isChinese()
    if (!this.chinese) {
      hbspt.forms.create({
        portalId: this.blok.portalId,
        formId: this.blok.formId,
        target: '#hubspotform-' + this.blok.formId
      })
    } else {
      hbspt.forms.create({
        portalId: this.blok.portalIdChinese,
        formId: this.blok.formIdChinese,
        target: '#hubspotform-' + this.blok.formIdChinese
      })
    }
  },
  methods: {
    isChinese () {
      this.chinese = window.location.href.includes('zh-cn')
    }
  }
}
</script>
