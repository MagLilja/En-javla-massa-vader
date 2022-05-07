<template>
  <input class="search-input" v-model="searchInput" @keyup.enter="submitSearch(searchInput)" type="text"/>
  <button class="search-button" type="submit" @click="submitSearch(searchInput)">Sök</button>
  {{ searchInput }}

</template>
<script>
import {OpenStreetMapProvider} from 'leaflet-geosearch'
import {MqResponsive} from "vue3-mq";
import {mapActions} from "pinia/dist/pinia";
import {useUserDataStore} from "@/stores/useUserDataStore.js";

export default {
  name: 'SearchComponent',
  components: {
    MqResponsive
  },

  data() {
    return {
      searchInput: '',
      selected: '',
    }
  },
  watch: {},
  methods: {
    ...mapActions(useUserDataStore, ["setSearchData"]),
    async submitSearch(input) {
      const provider = new OpenStreetMapProvider()
      let res = await provider.search({query: input})
      let searchResultData = []
      for (let data of res) {
        let split = data.raw.display_name.split(', ');
        if (split[split.length - 1] === 'Sweden') {
          let searchResultObject = {}
          searchResultObject.city = split[0]
          searchResultObject.municipality = split[1]
          searchResultObject.country = split[split.length - 1]
          searchResultObject.longitude = data.x
          searchResultObject.latitude = data.y
          searchResultData.push(searchResultObject)
        }
      }
      this.setSearchData(searchResultData) //Object.assign({}, res)
      console.log(searchResultData);

    },

  },
}
</script>

