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
        {{ checkForGothenburg(favorite.city) }}
        {{ favorite.municipality }}
      </div>
    </li>
  </ul>
</template>
<script>
import FavoriteCheckComponent from '@/components/favorite/FavoriteCheckComponent.vue'
import {useUserDataStore} from '@/stores/useUserDataStore.js'
import {mapState} from 'pinia'
import WorstWeatherDataManager from '@/managers/WorstWeatherDataManager.js'
export default {
  name: 'favorite-list-item-component',
  components: {FavoriteCheckComponent},
  computed: {
    ...mapState(useUserDataStore, ['getFavoriteLocationList']),
  },
  methods: {
    checkForGothenburg(c) {
      return WorstWeatherDataManager.checkForGothenburg(c)
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
