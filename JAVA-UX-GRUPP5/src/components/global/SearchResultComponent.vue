<template>
  <ul v-if="getSearchData">
    <li @click="selectCity(data)" class="search-data-item" v-for="(data, index) in getSearchData" :key="index">
      {{ data.city }}
      {{ data.municipality }}
    </li>
  </ul>
</template>
<script>
import {mapActions, mapState} from "pinia/dist/pinia";
import {useUserDataStore} from "@/stores/useUserDataStore.js";

export default {
  name: 'search-result-component',
  props: {
    searchData: {},
  },
  computed: {
    ...mapState(useUserDataStore,["getSearchData"])
  },
  methods: {
    ...mapActions(useUserDataStore, ["setCoordinates"]),
    selectCity(data) {
      let tempCoord = {}
      tempCoord.longitude = data.longitude
      tempCoord.latitude = data.latitude
      tempCoord.origin = "FROM_SEARCH"
      tempCoord.searchSelection = data.city
      this.setCoordinates(tempCoord)
      this.$router.push('/')
    },
  }
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

}

.search-data-item:hover,
.search-data-item:focus {
  font-weight:600;
  cursor: pointer;
}
</style>