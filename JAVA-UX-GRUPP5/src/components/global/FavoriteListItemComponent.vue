<template>
  <div>
    <div
        v-for="(favorite,index) of this.getFavoriteLocationList.favorites"
        :key="index"
        :locationData="favorite">
      <div v-if="(favorite != null)">
      <favorite-check-component :locationData="favorite"></favorite-check-component>

      {{ favorite.city }}
        {{ favorite.municipality }}
      </div>

    </div>

  </div>
</template>
<script>
import FavoriteCheckComponent from "@/components/global/FavoriteCheckComponent.vue"
import {useUserDataStore} from "@/stores/useUserDataStore.js";
import {mapState} from "pinia"

export default {
  name: 'favorite-list-item-component',
  components: {FavoriteCheckComponent},
  computed: {
    ...mapState(useUserDataStore, ["getFavoriteLocationList"])
  },
}
</script>