<template>
  <img class="checked-heart" @click="toggleFavorite()" :src="heartIcon" alt="a heart">

</template>
<script>
import {useUserDataStore} from "@/stores/useUserDataStore.js";
import {mapActions, mapState} from "pinia";

export default {
  name: 'favorite-check-component',
  props: {
    locationData: [],
  },
  mounted() {
    this.checkIfFavorite()
  },
  data() {
    return {
      heartIcon: '/src/assets/icons/iconfinder_heart_like_8664909.svg',
      favorite: false,
    }
  },
  computed: {
    ...mapState(useUserDataStore, ["getFavoriteLocationList"])
  },
  methods: {
    ...mapActions(useUserDataStore, ["removeFavoriteLocation","setFavoriteLocation","getFavoriteLocationList"]),
    toggleFavorite() {
      this.favorite = !this.favorite

      if (this.favorite) {
        this.heartIcon = '/src/assets/icons/favorite.svg'
        this.setFavoriteLocation(this.locationData)
        console.log(this.locationData);
      } else {
        this.removeFavoriteLocation(this.locationData)
        this.heartIcon = '/src/assets/icons/iconfinder_heart_like_8664909.svg'
      }
    },
    checkIfFavorite() {
      for (let favorite of this.getFavoriteLocationList.favorites){
        if(favorite != null && favorite.longitude === this.locationData.longitude && favorite.latitude === this.locationData.latitude){
          this.heartIcon = '/src/assets/icons/favorite.svg'
          this.favorite = !this.favorite
          console.log("match");
        }
      }
    },
  },

}
</script>

<style>
.checked-heart {
  width: 42px;
  aspect-ratio: 1;
}

.unchecked-heart {
  width: 38px;
  aspect-ratio: 1;
}
</style>
