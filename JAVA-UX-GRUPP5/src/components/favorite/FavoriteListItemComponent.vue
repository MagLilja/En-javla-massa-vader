<template>
  <ul class="favorite-list">
    <li
      v-for="(favorite, index) of this.getFavoriteLocationList.favorites"
      :key="index"
    >
      <div class="favorite-list-item" v-if="favorite != null">
        <favorite-check-component
          class="favorite-list-icon"
          :location-data="favorite"
        />
        {{ geoLocationHelper.checkForGothenburg(favorite.city) }}
        <!--        {{ favorite.municipality }}-->
      </div>
    </li>
  </ul>
</template>
<script>
import FavoriteCheckComponent from '@/components/favorite/FavoriteCheckComponent.vue'
import { useUserDataStore } from '@/stores/useUserDataStore.js'
import { mapState } from 'pinia'
import geoLocationHelper from '@/helpers/geoLocationHelper.js'

export default {
  name: 'favorite-list-item-component',
  components: { FavoriteCheckComponent },
  computed: {
    ...mapState(useUserDataStore, ['getFavoriteLocationList']),

  },
  methods: {
    jh(){
      geoLocationHelper.checkForGothenburg()
    }
  }
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
