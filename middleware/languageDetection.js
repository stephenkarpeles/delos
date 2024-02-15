export default function ({ app, route, store, isDev }) {
  const version = route.query._storyblok || isDev ? 'draft' : 'published'
  const langs = ['en', 'zh-cn']

  const urlLang = route.fullPath.split('/')[1]
  const hasLang = langs.includes(urlLang)
  const language = hasLang ? urlLang : 'en'

  if (process.server) {
    store.commit('setCacheVersion', app.$storyapi.cacheVersion)
  }

  if ((!store.state.settings._uid || language !== store.state.language) && store.state.language === '') {
    store.commit('setLanguage', language)

    return store.dispatch('loadSettings', { version, language })
  }
}
