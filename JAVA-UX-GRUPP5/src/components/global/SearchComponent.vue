<template>
  <input @keyup.enter="submitSearch(searchInput)" v-model="searchInput" type="text"/>
  <button type="submit" @click="submitSearch(searchInput)">Sök</button>

  <!--  <v-select-->
  <!--      v-model="searchInput"-->
  <!--      placeholder="Se resultat"-->
  <!--      :options="searchData"-->
  <!--      autocomplete="true"-->
  <!--      label="label"-->
  <!--  />-->

  <ul v-if="searchData">
    <li @click="selectCity(data)" class="search-data-item" v-for="(data, index) in searchData" :key="index">
      {{ data.label }}
    </li>
  </ul>

  {{ selected.x }}
  {{ selected.y }}
</template>
<script>
import {OpenStreetMapProvider} from 'leaflet-geosearch'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import {mapState, mapActions} from "pinia";
import {useUserDataStore} from "@/stores/useUserDataStore.js";

export default {
  name: 'SearchComponent',
  components: {
    vSelect,
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

    ...mapActions(useUserDataStore, ["setCoordinates"]),
    selectCity(data) {
      console.log(data.x) //long
      console.log(data.y) //lat
      let tempCoord = {}
      tempCoord.longitude = data.x
      tempCoord.latitude = data.y
      this.setCoordinates(tempCoord)
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.search-data-item {
  border: 1px solid #c2c2c2;
  font-size: 0.7em;
  padding: 0.5em 1.5em;
  margin: 0.4em;
  text-align: left;
  background-color: #d9d9d9;
  cursor: pointer;
}
</style>
