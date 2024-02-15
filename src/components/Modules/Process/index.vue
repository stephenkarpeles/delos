<template>
  <div
    :id="blok.id || blok._uid"
    :class="BEM_B"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12">

          <div
            v-if="blok.timeline && blok.timeline.length"
            :class="BEM_E('timeline')"
            class="timeline-row"
          >
            <div
              v-for="item in blok.timeline"
              :key="item._uid"
              :class="BEM_E('timeline-item')"
              class="timeline-column"
            >
              <TimelineItem :blok="item" />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import TimelineItem from '~/src/components/Modules/TimelineItem'

export default {
  components: {
    TimelineItem
  },
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'Process'
    },
    blok: {
      type: Object,
      default: null
    }
  }
}
</script>
