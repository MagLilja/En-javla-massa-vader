<template>
  <input v-model="searchInput" @keyup.enter="submitSearch(searchInput)" type="text"/>
  <button type="submit" @click="submitSearch(searchInput)">Sök</button>
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
      this.setSearchData(res) //Object.assign({}, res)
      console.log(res)

    },

  },
}
</script>

