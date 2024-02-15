import Vue from 'vue'

Vue.mixin({
  methods: {
    loadDelosResourceHub (resourcePath, itemsPerPage, pageNumber, sortOption) {
      pageNumber = pageNumber || 1
      itemsPerPage = itemsPerPage || 12

      const version = 'published' // @TODO; change this
      const cacheVersion = this.$store.state.cacheVersion

      const query = this.$route.query
      const queryTitle = (query.title && query.title.length)
        ? `*${query.title}*`
        : undefined
      const queryTags = (query['tags[]'] && query['tags[]'].length)
        ? query['tags[]']
        : undefined
      if (!sortOption) {
        sortOption = (query.sort && query.sort.length && Object.keys(this.getResourcesSortingOptions()).includes(query.sort))
          ? query.sort
          : this.getResourceDefaultSortOption()
      }

      return new Promise((resolve) => {
        this.$storyapi.get('cdn/stories', {
          starts_with: resourcePath,
          per_page: itemsPerPage,
          page: pageNumber,
          with_tag: queryTags,
          sort_by: sortOption,
          'filter_query[title][like]': queryTitle,
          'filter_query[component][in]': 'resources',
          version,
          cv: cacheVersion
        })
          .then((response) => {
            const stories = response.data.stories.filter(item => !item.is_startpage)
            resolve(stories)
          })
          .catch((response) => {
            resolve([])
          })
      })
    },

    getResourcesSortingOptions () {
      return {
        'content.date:desc': 'Newest',
        'content.date:asc': 'Oldest',
        'content.title:asc': 'A-Z',
        'content.title:desc': 'Z-A'
      }
    },

    getResourceDefaultSortOption () {
      return 'content.date:desc'
    },

    getResourceHubTypes () {
      const cacheVersion = this.$store.state.cacheVersion

      return new Promise((resolve) => {
        this.$storyapi.get('cdn/datasource_entries', {
          datasource: 'resource-hub-types',
          cv: cacheVersion
        })
          .then((response) => {
            const items = response.data.datasource_entries
            resolve(items)
          })
          .catch((response) => {
            resolve(false)
          })
      })
    },

    getResourceHubBacklinks () {
      const cacheVersion = this.$store.state.cacheVersion

      return new Promise((resolve) => {
        this.$storyapi.get('cdn/datasource_entries', {
          datasource: 'resource-hub-backlinks',
          dimension: 'backlink',
          cv: cacheVersion
        })
          .then((response) => {
            const items = response.data.datasource_entries
            resolve(items)
          })
          .catch((response) => {
            resolve([])
          })
      })
    }
  }
})
