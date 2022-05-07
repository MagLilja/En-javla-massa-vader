<template>
  <div class="search-result-container">
    <ul v-if="getSearchData" class="search-data-list">
      <li class="search-data-item" v-for="(searchData, index) in getSearchData" :key="index">
        <favorite-check-component :search-data="searchData"/>
        <div @click="selectCity(searchData)">{{ searchData.city }}
          {{ searchData.municipality }}
        </div>


        <font-awesome-icon :icon="['fas', 'location-arrow']"/>

      </li>
    </ul>
  </div>
</template>
<script>
import {mapActions, mapState} from "pinia/dist/pinia";
import {useUserDataStore} from "@/stores/useUserDataStore.js";
import FavoriteCheckComponent from "@/components/global/FavoriteCheckComponent.vue";


export default {
  name: 'search-result-component',
  props: {
    searchData: {},
  },
  components: {
    FavoriteCheckComponent

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
  font-size: 1em;
  padding: 0.2em 1.5em;
  margin: 0.4em;
  text-align: left;


}


search-data-item::after {

}

.search-data-item:hover,
.search-data-item:focus {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  cursor: pointer;
}

.search-data-list {

  width: fit-content;



}

.search-result-container {
  display:flex;
  justify-content:center;

}
</style>