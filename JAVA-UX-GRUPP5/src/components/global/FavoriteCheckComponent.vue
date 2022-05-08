<template>
  <img class="checked-heart" @click="toggleFavorite()"
       :src="heartIcon" alt="a heart">
  {{ favorite }}
  {{this.getFavoriteLocationList.favorites}}
  {{locationData}}

</template>
<script>
import {useUserDataStore} from "@/stores/useUserDataStore.js";
import {mapActions, mapState} from "pinia";
import checkedHeart from "@/assets/icons/favorite.svg"
import unCheckedHeart from "@/assets/icons/iconfinder_heart_like_8664909.svg"

export default {
  name: 'favorite-check-component',
  props: {
    locationData: [],
  },
  created() {
    this.checkIfFavorite()
  },
  mounted() {
    this.checkIfFavorite()
  },
  data() {
    return {
      heartIcon: unCheckedHeart,
      favorite: false,
    }
  },
  watch: {
    locationData: {
      deep: true,
      handler(v) {
        this.checkIfFavorite(v)
        console.log(v);
      }
    }
  },
  computed: {
    ...mapState(useUserDataStore, ["getFavoriteLocationList"])
  },
  methods: {
    ...mapActions(useUserDataStore, ["removeFavoriteLocation", "setFavoriteLocation", "getFavoriteLocationList"]),
    toggleFavorite() {
      this.favorite = !this.favorite

      if (this.favorite) {
        this.heartIcon = checkedHeart
        this.setFavoriteLocation(this.locationData)
        console.log(this.locationData);
      } else {
        this.removeFavoriteLocation(this.locationData)
        this.heartIcon = unCheckedHeart
      }
    },
    checkIfFavorite(v) {
      console.log(this.getFavoriteLocationList.favorites.length);
      console.log(this.getFavoriteLocationList.favorites);
      for (let favorite of this.getFavoriteLocationList.favorites) {
        if (favorite != null) {
          if (favorite.longitude === v.longitude && favorite.latitude === v.latitude) {
            this.heartIcon = checkedHeart
            this.favorite = !this.favorite
            console.log(this.favorite);
            console.log("match");
          }
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
