<template>
  <input v-model="searchInput" @keyup.enter="submitSearch(searchInput)"  type="text"/>
  <button type="submit" @click="submitSearch(searchInput)">Sök</button>
{{searchInput}}
  <search-result-component v-if="searchData" :search-data="searchData"/>

</template>
<script>
import {OpenStreetMapProvider} from 'leaflet-geosearch'
import 'vue-select/dist/vue-select.css'

import SearchResultComponent from "@/components/global/SearchResultComponent.vue";

export default {
  name: 'SearchComponent',
  components: {
    SearchResultComponent
  },
  emits: ['selected'],
  data() {
    return {
      searchInput: '',
      searchData: undefined,
      selected: '',
    }
  },
  watch: {
    selected() {
      console.log('selected changed')
      this.$emit('searchSelection', this.selected)
    },
  },
  methods: {
    async submitSearch(input) {
      const provider = new OpenStreetMapProvider()
      let res = await provider.search({query: input})
      this.searchData = res //Object.assign({}, res)
      console.log(res)
      console.log(this.searchData)
    },


  },
}
</script>

