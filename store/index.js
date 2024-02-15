import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      cacheVersion: '',
      footerStats: null,
      language: '',
      story: null,
      brand: null,
      settings: {
        mainFooter: [],
        globalScripts: []
      }
    },
    mutations: {
      setSettings (state, settings) {
        state.settings = settings
      },
      setCacheVersion (state, version) {
        state.cacheVersion = version
      },
      setLanguage (state, language) {
        state.language = language
      },
      setFooterStats (state, stats) {
        state.footerStats = stats
      },
      setBrand (state, brand) {
        state.brand = brand
      },
      setOwner (state, owner) {
        state.owner = owner
      },
      setStory (state, story) {
        state.story = story
      },
      setFeatures (state, features) {
        state.features = features
      }
    },
    actions: {
      fetchStoryData ({ dispatch, commit }, payload) {
        this.$storyapi.get(`cdn/stories${payload}`, {
        }).then((res) => {
          commit('setStory', res.data.story)
          dispatch('fetchBrandData', res.data.story)
          dispatch('fetchOwnerData', res.data.story)
          return res.data.story
        })
      },
      fetchOwnerData ({ commit }, payload) {
        const uuids = payload.content.owner.toString()
        return new Promise((resolve, reject) => {
          this.$storyapi.get(`cdn/stories/`, {
            version: 'published',
            by_uuids: uuids,
            find_by: 'uuid'
          }).then((res) => {
            const data = res.data.stories[0].content
            commit('setOwner', { ...data })
            resolve(res)
          }, (error) => {
            reject(error)
          })
        })
      },
      fetchBrandData ({ commit }, payload) {
        const uuids = payload.content.brand.toString()
        return new Promise((resolve, reject) => {
          this.$storyapi.get(`cdn/stories/`, {
            version: 'published',
            by_uuids: uuids,
            find_by: 'uuid'
          }).then((res) => {
            const data = res.data.stories[0].content
            commit('setBrand', {
              brandName: data.brandName,
              programName: data.programName,
              logo: data?.logo[0],
              experienceHeader: data?.experienceHeader[0],
              experienceArrival: data?.experienceArrival[0],
              experienceRelax: data?.experienceRelax[0],
              experienceSleep: data?.experienceSleep[0],
              experienceWake: data?.experienceWake[0],
              experienceRecharge: data?.experienceRecharge[0]
            })
            resolve(res)
          }, (error) => {
            reject(error)
          })
        })
      },
      loadCacheVersion ({ commit }) {
        return this.$storyapi.get(`cdn/spaces/staywell-rooms`).then((res) => {
          commit('setCacheVersion', res.data.space.version)
        })
      },
      loadSettings ({ commit }, context) {
        return this.$storyapi.get(`cdn/stories/settings`, {
          version: 'published',
          cv: (new Date()).getHours() * Math.random()
        }).then((res) => {
          commit('setSettings', res.data.story.content)
        })
      }
    }
  })
}

export default createStore
