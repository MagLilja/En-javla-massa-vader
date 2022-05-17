<template>
  <div class="flex flex-col justify-center items-start mt-20 md:mt-0">
    <div v-if="!getSearchData">
      <div class="border-b-2 mb-4">Senaste valda sökningar</div>
      <div
        v-for="(lastSearchData, index) in getLastSearchList.lastSearch"
        :key="index"
        class="flex"
      >
        <div v-if="lastSearchData !== null" class="flex">
          <favorite-check-component
            :location-data="lastSearchData"
            class="w-8"
          />
          <div class="search-data-item" @click="selectCity(lastSearchData)">
            {{ lastSearchData.city }}
            {{ lastSearchData.municipality }}
          </div>
        </div>
      </div>
    </div>

    <ul v-if="getSearchData" class="search-data-list rounded-2xl">
      <li
        v-for="(data, index) in getSearchData"
        :key="index"
        class="search-data-item"
      >
        <favorite-check-component :location-data="data" />
        <div @click="selectCity(data)">
          {{ data.city }}
          {{ data.municipality }}
        </div>

        <font-awesome-icon :icon="['fas', 'location-arrow']" />
      </li>
      <li class="text-gray-500 w-full text-xl m-4 ml-12">
        * Klicka på hjärtat för att favorit-markera platsen!
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia/dist/pinia'
import { useUserDataStore } from '@/stores/useUserDataStore.js'
import FavoriteCheckComponent from '@/components/favorite/FavoriteCheckComponent.vue'

export default {
  name: 'SearchResultComponent',
  components: {
    FavoriteCheckComponent,
  },
  props: {
    searchData: {},
  },
  computed: {
    ...mapState(useUserDataStore, ['getSearchData', 'getLastSearchList']),
  },
  methods: {
    ...mapActions(useUserDataStore, [
      'setCoordinates',
      'setLastSearchList',
      'deleteSearchData',
    ]),
    selectCity(data) {
      let tempCoord = {}
      tempCoord.longitude = data.longitude
      tempCoord.latitude = data.latitude
      tempCoord.origin = 'FROM_SEARCH'
      tempCoord.searchSelection = data.city
      this.setLastSearchList(data)
      this.setCoordinates(tempCoord)
      this.deleteSearchData()
      this.$router.push('/')
    },
  },
}
</script>
<style scoped>
.search-data-item {
  padding: 0.2em 0;
  margin: 0.2em;
  text-align: left;
}

.search-data-item:hover,
.search-data-item:focus {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  cursor: pointer;
}

.search-data-list {
  width: fit-content;
  margin: 2em 0em;
}
</style>
