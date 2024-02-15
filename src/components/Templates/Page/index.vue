<template>
  <div v-editable="blok">
    <Navigation :blok="$store.state.settings.mainNav[0]"/>
    <Topbar
      v-if="topBar"
      :blok="topBar"
    />
    <component
      :key="blok._uid"
      v-for="blok in blok.body"
      :blok="blok"
      :is="blok.component | dashify"
    />
    <Footer :blok="$store.state.settings.mainFooter[0]" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Topbar from '~/src/components/Modules/Topbar'
import Footer from '~/src/components/Modules/Footer'
import Navigation from '~/src/components/Modules/Navigation'

export default {
  components: {
    Topbar,
    Footer,
    Navigation
  },
  props: {
    blok: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    if (this.$store.state.settings.globalScripts) {
      this.$store.state.settings.globalScripts.map((scr) => {
        this.buildScript(scr)
      })
    }
  },
  computed: {
    ...mapState({
      topBar: state => state?.owner?.topBar?.[0]
    })
  },
  methods: {
    buildScript (script) {
      const myScript = document.createElement('script')
      myScript.async = true
      myScript.setAttribute('src', script.src)

      if (script.id) {
        myScript.setAttribute('id', script.id)
      }

      document.head.appendChild(myScript)
    }
  }
}
</script>
