<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >

    <div class="container">
      <div class="row">
        <div class="col-md-12">

          <div class="icon-list-row">
            <div
              v-for="item in blok.icons"
              :key="item._uid"
              :class="item.classes"
              class="icon-list-column"
            >
              <Icon :blok="item" />
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import Icon from '~/src/components/Modules/IconList/single'

export default {
  components: {
    Icon
  },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'IconList'
    },
    blok: {
      type: Object,
      default: null
    }
  }
}
</script>
