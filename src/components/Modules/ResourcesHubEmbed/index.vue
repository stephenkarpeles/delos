<template>
  <div
    :id="blok.id || blok._uid"
    :class="[ blok.classes, 'ResourcesHubEmbed' ]"
  >

    <div
      v-if="!blok.variationNoFilters"
      :class="[ showFilters ? 'no-left-border-filters' : '' ]"
      class="top-filters d-block d-lg-none"
    >
      <div class="col col-md-12">

        <span class="filters-label">Filters</span>
        <div class="filters-switch">
          <input
            id="filters-switch-button"
            v-model="showFilters"
            type="checkbox"
            class="switch-input"
          />
          <label for="filters-switch-button" class="switch-label">Switch</label>
        </div>

        <!--<span class="filters-label">Order by</span>
        <div class="filters-select">
          <select
            id="filters-select-sort-order"
            v-model="selectedSortOrder"
            @change="sortOrderChanged()"
          >
            <option value="" label="Order results by" disabled />
            <option
              v-for="(value, key) in sortOptions"
              :key="key"
              :value="key"
              :label="value"
            />
          </select>
          <label for="filters-select-sort-order" class="d-none"></label>
        </div>-->
      </div>
    </div>

    <div class="container-fluid">
      <div class="row overflow-hidden position-relative tag-filters-row">
        <div
          v-if="!blok.variationNoFilters"
          :class="[ showFilters ? 'd-block' : 'd-none d-lg-block' ]"
          class="col-lg-3 col-md-4 col-11 tag-filters-column"
        >
          <TagsFilter />
        </div>

        <div
          :class="[ getWrapperClasses() ]"
          class="resources-list-wrapper padding-left-reset padding-right-reset"
        >
          <div
            v-if="!blok.variationNoFilters"
            class="top-filters d-none no-left-border-filters"
          >
            <div class="col col-md-12">

              <!--<span class="filters-label">Order by</span>
              <div class="filters-select">
                <select
                  id="filters-select-sort-order"
                  v-model="selectedSortOrder"
                  @change="sortOrderChanged()"
                >
                  <option value="" label="Order results by" disabled />
                  <option
                    v-for="(value, key) in sortOptions"
                    :key="key"
                    :value="key"
                    :label="value"
                  />
                </select>
                <label for="filters-select-sort-order" class="d-none"></label>
              </div>-->
            </div>
          </div>

          <h1
            id="resources-list-page-title"
            v-if="blok.title"
            v-html="blok.title"
          />

          <ResourcesList
            :resource-path="blok.resourcePath"
            :variation-sort-field="blok.variationSortField || false"
            :variation-items-per-page="blok.variationItemsPerPage || 12"
            :variation-listing-image-size="blok.variationImageSize || 'image-small'"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ResourcesList from '~/src/components/Elements/ResourcesList'
import TagsFilter from '~/src/components/Elements/TagsFilter'

export default {
  components: {
    ResourcesList,
    TagsFilter
  },

  props: {
    name: {
      type: String,
      default: 'ResourcesHubEmbed'
    },
    blok: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      showFilters: false,
      selectedSortOrder: this.getResourceDefaultSortOption(),
      sortOptions: this.getResourcesSortingOptions()
    }
  },

  mounted () {
    const QUERY = this.$route.query
    const sort = QUERY.sort || null
    const isValidSortOption = sort ? Object.keys(this.sortOptions).includes(sort) : false
    this.selectedSortOrder = isValidSortOption ? sort : this.getResourceDefaultSortOption()

    if (QUERY.hasOwnProperty('filters') && (parseInt(QUERY.filters) < 1)) {
      this.showFilters = false
    }
  },

  methods: {
    sortOrderChanged () {
      // @NOTE; a workaround; for some reason setting 'query' from $route.query is not working
      // that's why we have to loop through $route.query and fill an empty 'query' object
      const QUERY = this.$route.query
      const query = {}
      for (const _property in QUERY) {
        query[_property] = QUERY[_property]
      }
      query.sort = this.selectedSortOrder
      query.filters = this.showFilters ? '1' : undefined

      this.$router.push({
        path: this.$route.path,
        query,
        force: true
      }, () => {
        this.$router.app.refresh()
      })
    },

    getWrapperClasses () {
      if (this.blok.variationNoFilters) {
        return 'container'
        // return 'col-lg-8 offset-lg-2 col-md-10 offset-md-1 offset-0'
      }
      if (this.showFilters) {
        return 'col-lg-9 col-md-12'
      }
      return 'col-lg-9 col-md-12'
    }
  }
}
</script>

<style lang="scss" scoped>
h1#resources-list-page-title {
  display: block;
  margin-bottom: 40px;
  padding-left: 15px;
  padding-top: 20px;
  color: #000;
  text-align: left;

  @media('max-width: 768px') {
    padding-left: 30px;
  }
}
.top-filters .col {
  @media('max-width: 768px') {
    padding-left: 30px;
  }
}
</style>
