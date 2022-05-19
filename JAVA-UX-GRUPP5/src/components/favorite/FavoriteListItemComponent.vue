<template>
  <ul class="favorite-list">
    <li
        v-for="(favorite, index) of getFavoriteLocationList.favorites"
        :key="index"
    >
      <div
          v-if="favorite != null"
          class="favorite-list-item">
        <favorite-check-component
            class="favorite-list-icon"
            :location-data="favorite"
        />
        <div class="flex gap-2 hover:font-bold cursor-pointer" @click="selectCity(favorite)">{{ checkForGothenburg(favorite.city) }}
          {{ favorite.municipality }}
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import FavoriteCheckComponent from '@/components/favorite/FavoriteCheckComponent.vue'
import {useUserDataStore} from '@/stores/useUserDataStore.js'
import {mapState} from 'pinia'
import WorstWeatherDataManager from '@/managers/WorstWeatherDataManager.js'
import {mapActions} from "pinia/dist/pinia";

export default {
  name: 'favorite-list-item-component',
  components: {FavoriteCheckComponent},
  computed: {
    ...mapState(useUserDataStore, ['getFavoriteLocationList']),
  },
  methods: {
    ...mapActions(useUserDataStore, [
      'setCoordinates',
      'setLastSearchList',
      'deleteSearchData',
    ]),
    checkForGothenburg(c) {
      return WorstWeatherDataManager.checkForGothenburg(c)
    },
    selectCity(data) {
      let tempCoord = {}
      tempCoord.longitude = data.longitude
      tempCoord.latitude = data.latitude
      tempCoord.origin = 'FROM_SEARCH'
      tempCoord.searchSelection = data.city
      this.setCoordinates(tempCoord)
      this.$router.push('/')
    },
  },
}
</script>
<style scoped>
.favorite-list-icon {
  width: 1.3em;
}

.favorite-list-item {
  display: flex;
  gap: 1.5em;
}
</style>
