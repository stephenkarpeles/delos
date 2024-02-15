<template>
  <div class="ResourcesList">
    <div class="container-fluid">
      <div
        :class="[
          $parent.showFilters ? 'margin-left-reset margin-right-reset' : ''
        ]"
        class="row resources-list-wrapper-row"
      >

        <div
          id="empty-results"
          v-if="(!resources || resources.length === 0) && !isLoading"
        >
          <h4>
            Sorry, we can’t seem to find the resource you're looking for.
          </h4>
          <p>
            Not to worry, get back on the road to health and wellness.
          </p>
          <a
            @click="refreshPage()"
            class="Btn Btn--primary-special"
          >
            Refresh page
          </a>
        </div>

        <div
          v-for="_resource in resources"
          :key="_resource.uuid"
          class="col-lg-4 col-md-6"
        >
          <ResourceTeaser :resource="_resource" />
        </div>

      </div>

      <div class="row">
        <div class="col-md-12">

          <div class="paginator">
            <a
              @click="getPage()"
              v-show="canGetNewPage && !isLoading"
              class="Btn Btn--primary-special"
              href="javascript:void(0)"
            >
              Load more
            </a>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ResourceTeaser from '~/src/components/Elements/ResourcesList/single'

export default {
  components: {
    ResourceTeaser
  },

  props: {
    resourcePath: {
      type: [ String, Boolean ],
      default: null
    },
    variationSortField: {
      type: [ String, Boolean ],
      default: null
    },
    variationItemsPerPage: {
      type: [ Number, String ],
      default: 12
    },
    variationListingImageSize: {
      type: [ String ],
      default: 'image-small'
    }
  },

  data () {
    return {
      currentPage: 1,
      canGetNewPage: true,
      isLoading: true,
      resources: []
    }
  },

  async fetch () {
    this.resources = await this.loadDelosResourceHub(this.resourcePath, this.variationItemsPerPage, 1, this.variationSortField)
    this.isLoading = false

    if (!this.resources.length) {
      this.canGetNewPage = false
    }

    this.canGetNewPage = !(Array.isArray(this.resources) && this.resources.length < this.variationItemsPerPage)
  },

  methods: {
    async getPage () {
      if (this.canGetNewPage) {
        this.currentPage = this.currentPage + 1
        const resources = await this.loadDelosResourceHub(this.resourcePath, this.variationItemsPerPage, this.currentPage)
        if (Array.isArray(resources)) {
          if (resources.length) {
            this.resources = this.resources.concat(resources)
          }
          if (!resources.length || resources.length < this.variationItemsPerPage) {
            this.canGetNewPage = false
          }
        }
      }
    },

    refreshPage () {
      this.$router.push({
        path: this.$route.path,
        force: true
      }, () => {
        this.$router.app.refresh()
      })
    }
  }
}
</script>
