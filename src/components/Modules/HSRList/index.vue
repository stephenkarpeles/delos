<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
        <TitleBlock :blok="blok" />
        <b-table
          :fields="tableFields"
          :items="members"
          striped
          hover
          responsive
        >
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from '~/src/components/Templates/BaseComponent'
import axios from 'axios'

export default {
  extends: BaseComponent,
  props: {
    name: {
      type: String,
      default: 'HSRList'
    },
    blok: Object
  },
  data () {
    return {
      members: null,
      tableFields: [
        {key: 'owner_org', label: 'Name', sortable: true},
        {key: 'country', label: 'Country', sortable: true},
        {key:'hsr_status', label: 'Status', sortable: true}
      ],
    }
  },
  mounted () {
    this.fetchMembers()
  },
  methods: {
    fetchMembers () {
      return axios.get('https://v2-api.wellcertified.com/api/hsr-directory/get')
      .then((res) => {
        this['members'] = res.data
        return res.data
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    }
  }
}
</script>
