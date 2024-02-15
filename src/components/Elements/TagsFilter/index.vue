<template>
  <div class="TagFilters">

    <div id="search-title">
      <label for="search-title-input" class="d-none" />
      <input
        id="search-title-input"
        v-model="searchQuery"
        @keydown="titleSearch($event)"
        type="text"
        class="form-control"
        placeholder="Search title..."
      />
    </div>

    <div
      v-if="resourceHubTypes && resourceHubTypes.length"
      class="tag-filters-switch-type"
    >
      <h3
        v-html="selectedResourceHubTypeName"
        class="text-center"
      />
    </div>

    <ul class="tag-filters-parent-list">
      <li
        v-for="(val, key) in groupedTags"
        :key="key"
      >
        <h5 v-html="key" />
        <ul class="tag-filters-child-list">
          <li
            v-for="(_tag, _idx) in val"
            :key="_idx"
          >
            <div class="form-check">
              <input
                v-model="selectedFilters"
                :value="_tag.name"
                :id="`resource-hub-tag-filter-${key}-${_idx}`"
                @change="filterChanged()"
                type="checkbox"
                name="check"
              />
              <label
                v-text="formatTagName(_tag.name)"
                :for="`resource-hub-tag-filter-${key}-${_idx}`"
                class="form-check-label"
              ></label>
            </div>

          </li>
        </ul>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  data () {
    return {
      groupedTags: {},
      selectedFilters: [],
      resourceHubTypes: [],
      selectedResourceHubType: '',
      selectedResourceHubTypeName: '',
      searchQuery: '',
      minSearchCharacters: 3
    }
  },

  async fetch () {
    const version = 'published'
    const cacheVersion = this.$store.state.cacheVersion

    const [
      tagsRes,
      resourceHubTypes
    ] = await Promise.all([
      this.$storyapi.get('cdn/tags', {
        starts_with: 'resources/',
        version,
        cv: cacheVersion,
        sort_by: 'content.title:asc'
      }),
      this.getResourceHubTypes()
    ])

    const tags = tagsRes.data.tags
    this.groupedTags = this.groupTags(tags)
    this.resourceHubTypes = resourceHubTypes
    this.resourceHubTypes.forEach((item) => {
      if (item.value === this.selectedResourceHubType) {
        this.selectedResourceHubTypeName = item.name
      }
    })
  },

  mounted () {
    const QUERY = this.$route.query
    // set title
    if (QUERY.hasOwnProperty('title')) {
      this.searchQuery = QUERY.title
    }
    // set selected tags
    if (QUERY.hasOwnProperty('tags[]')) {
      const TAGS = QUERY['tags[]']
      if (typeof TAGS === 'string') {
        this.selectedFilters = [ TAGS ]
      } else if (Array.isArray(TAGS)) {
        this.selectedFilters = TAGS
      }
    }

    this.selectedResourceHubType = this.$route.path.replace(/\/$/, '')
  },

  methods: {
    titleSearch (event) {
      // @NOTE; a workaround; for some reason setting 'query' from $route.query is not working
      // that's why we have to loop through $route.query and fill an empty 'query' object
      const QUERY = this.$route.query
      const query = {}
      for (const _property in QUERY) {
        query[_property] = QUERY[_property]
      }

      if (event.keyCode === 13) {
        if (this.searchQuery && (this.searchQuery.length >= this.minSearchCharacters)) {
          query.title = this.searchQuery
          this.search(query)
        }
        if (!this.searchQuery || this.searchQuery.length === 0) {
          query.title = undefined
          this.search(query)
        }
      }
    },

    filterChanged () {
      // @NOTE; a workaround; for some reason setting 'query' from $route.query is not working
      // that's why we have to loop through $route.query and fill an empty 'query' object
      const QUERY = this.$route.query
      const query = {}
      for (const _property in QUERY) {
        query[_property] = QUERY[_property]
      }
      query.filters = '1'
      query['tags[]'] = this.selectedFilters
      query.title = (this.searchQuery && (this.searchQuery.length >= this.minSearchCharacters))
        ? this.searchQuery
        : undefined

      this.search(query)
    },

    formatTagName (tagName) {
      const idx = tagName.indexOf('/')
      if (idx !== -1) {
        return tagName.substr(idx + 1)
      }

      return tagName
    },

    groupTags (tags) {
      const grouped = {}

      // loop through all filters
      tags.forEach((tag) => {
        const tagSplit = tag.name.split('/')

        // ignore if category already exists (e.g. grouped.topics)
        if (grouped[tagSplit[0]] && tagSplit.length <= 1) {

          // filter into group
        } else {
          const filteredFilters = tags.filter((filt) => {
            const filtSplit = filt.name.split('/')
            return filtSplit[0] === tagSplit[0]
          })

          grouped[tagSplit[0]] = filteredFilters
        }
      })

      return grouped
    },

    search (queryObject) {
      this.$router.push({
        path: this.selectedResourceHubType,
        query: queryObject,
        force: true
      }, () => {
        this.$router.app.refresh()
      })
    }
  }
}
</script>
