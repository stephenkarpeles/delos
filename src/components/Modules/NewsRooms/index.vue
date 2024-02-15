<template>
  <div v-if="blok.variation === 'homenewroom'" :class="BEM_B">
    <div class="container">

      <div :class="BEM_E('row-mobile')" class="row d-block d-lg-none">
        <div class="col-12">
          <h2 :class="BEM_E('title-mobile')">{{ blok.title }}</h2>
          <Btn :blok="blok.block[1]" />
        </div>
      </div>

      <div class="row">
        <div class="sigle-card col-md-6">
          <CardList :blok="blok.block[0]" />
        </div>
        <div class="multicard-news col-md-6">
          <h2
            v-if="blok.title"
            v-html="blok.title"
            :class="BEM_E('title')"
            class="d-none d-lg-block"
          />
          <div class="d-none d-lg-block margin-bottom-xs">
            <Btn :blok="blok.block[1]" />
          </div>
          <div class="row">

            <CardList :blok="blok.block[2]" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="blok.variation === 'aboutnewrooms'" :class="BEM_B">
    <div class="container">
      <div class="row">
        <h1 :class="BEM_E('title')">{{ blok.title }}</h1>
        <CardList :blok="blok.block[0]"/>
        <div :class="BEM_E('button')">
          <Btn :blok="blok.block[1]"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import CardList from '~/src/components/Modules/CardList'

export default {
  components: {
    CardList
  },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'NewsRooms'
    }
  }
}
</script>
