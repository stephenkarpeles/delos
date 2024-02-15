<template>
  <div
    :class="BEM_B"
  >

    <div :class="[ { container: blok.variation !== 'fullWidth' } ]">
      <div class="row">
        <div
          v-for="item in children"
          :class="[
          `col-md-${getItemColumnWidth(item)}`,
          `row-align-items--${blok.variationAlignItems}`
        ]"
        >
          <component
            :key="item._uid"
            :blok="item"
            :is="item.component | dashify"
          >
          </component>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'RowModule'
    }
  },
  data () {
    return {
      children: [],
      remainingColumns: 12,
      childrenWithoutColumn: 0
    }
  },
  computed: {
    numberOfChildren () {
      return this.blok.children.length
    }
  },
  mounted () {
    this.calculateColumnForChild()
  },
  methods: {
    calculateChildrenWithoutColumn () {
      this.blok.children.map((module) => {
        if (!module.column) {
          this.childrenWithoutColumn++
        }
      })
    },
    calculateColumnForChild () {
      this.calculateChildrenWithoutColumn()
      this.calculateRemainingColumns()
      this.blok.children.map((module) => {
        if (!module.column) {
          module.column = this.remainingColumns / this.childrenWithoutColumn
        }
        this.children.push(module)
      })
    },
    calculateRemainingColumns () {
      this.blok.children.map((module) => {
        if (module.column) {
          this.remainingColumns -= module.column
        }
      })
      if (this.remainingColumns % 2 !== 0) {
        this.remainingColumns--
      }
    },
    getItemColumnWidth (item) {
      let columnValue = item.column || null
      if (!columnValue) {
        return 12
      }
      columnValue = parseInt(columnValue)
      if (columnValue < 1) {
        return 1
      }
      if (columnValue > 12) {
        return 12
      }

      return columnValue
    }
  }
}
</script>
