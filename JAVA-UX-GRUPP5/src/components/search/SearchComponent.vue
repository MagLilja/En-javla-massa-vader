<template>
  <input
    v-model="searchInput"
    class="search-input focus:outline-none active:outline-none w-[250px] py-2 px-4 text-3xl bg-inherit"
    type="text"
    placeholder="Sök"
    @keyup.enter="submitSearch(searchInput)"
  />
  <button
    class="hidden md:hidden border-2 border-black "
    type="submit"
    @click="submitSearch(searchInput)"
  >
    Sök
  </button>
</template>
<script>
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { mapActions } from 'pinia/dist/pinia'
import { useUserDataStore } from '@/stores/useUserDataStore.js'

export default {
  name: 'SearchComponent',
  data() {
    return {
      searchInput: '',
      selected: '',
    }
  },
  methods: {
    ...mapActions(useUserDataStore, ['setSearchData']),
    async submitSearch(input) {
      const provider = new OpenStreetMapProvider()
      let res = await provider.search({ query: input })
      let searchResultData = []
      for (let data of res) {
        let split = data.raw.display_name.split(', ')
        if (
          split[split.length - 1] === 'Sweden' ||
          split[split.length - 1] === 'Sverige'
        ) {
          let searchResultObject = {}
          searchResultObject.city = split[0]
          searchResultObject.municipality = split[1]
          searchResultObject.country = split[split.length - 1]
          searchResultObject.longitude = data.x
          searchResultObject.latitude = data.y

          searchResultData.push(searchResultObject)
        }
      }
      console.info('Posting search data to state')
      this.setSearchData(searchResultData)
    },
  },
}
</script>
