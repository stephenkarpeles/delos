<template>
  <div :class="BEM_B">
    <div class="container">
      <div class="row">
          <TitleBlock :blok="blok" />
          <ul v-if="members && blok.type === 'Keystone'"
            :class="BEM_E('items')">
            <li v-for="(member, index) in portfolioMembers"
              :class="BEM_E('item') + ' ' + getFileExt(member.profile_pic)"
              v-bind:key="'Portfolio' + index">
              <a :href="'https://account.wellcertified.com/member-profiles/' + member.slug" target="_blank">
                <span v-if="member.profile_pic" :class="BEM_E('image')">
                  <img :src="member.profile_pic" alt="">
                </span>
              </a>
            </li>
            <li v-for="(member, index) in keystoneMembers"
              :class="BEM_E('item') + ' ' + getFileExt(member.profile_pic)"
              v-bind:key="'Keystone' +  index">
              <a :href="'https://account.wellcertified.com/member-profiles/' + member.slug" target="_blank">
                <span v-if="member.profile_pic" :class="BEM_E('image')">
                  <img :src="member.profile_pic" alt="">
                </span>
              </a>
            </li>
          </ul>
          <ul v-else-if="members && blok.type === 'Cornerstone'"
            :class="BEM_E('items')">
            <li v-for="(member, index) in cornerstoneMembers"
              :class="BEM_E('item') + ' ' + getFileExt(member.profile_pic)"
              v-bind:key="'Cornerstone' + index">
              <a :href="'https://account.wellcertified.com/member-profiles/' + member.slug" target="_blank">
                <span v-if="member.profile_pic" :class="BEM_E('image')">
                  <img :src="member.profile_pic" alt="">
                </span>
              </a>
            </li>
          </ul>
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
      default: 'MemberList'
    },
    blok: Object
  },
  data () {
    return {
      members: null,
    }
  },
  mounted () {
    this.fetchMembers()
  },
  methods: {
    fetchMembers () {
      return axios.get('https://v2-api.wellcertified.com/api/membership/org/list')
      .then((res) => {
        this['members'] = res.data
        return res.data
      }).catch((res) => {
        if (!res.response) {
          console.error('no res', res)
        }
      })
    },
    filterMembers (type) {
      if(this.members) {
        let members = this.members.filter(member => {
          return member.type == type
        })
        return members
      }

      return this.members
    }
  },
  computed: {
    cornerstoneMembers () {
      return this.filterMembers('Cornerstone')
    },
    keystoneMembers () {
      return this.filterMembers('Keystone')
    },
    portfolioMembers () {
      return this.filterMembers('Portfolio')
    }
  }
}
</script>
