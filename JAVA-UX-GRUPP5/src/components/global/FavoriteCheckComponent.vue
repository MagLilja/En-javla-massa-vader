<template>
  <img
    class="checked-heart"
    @click="toggleFavorite()"
    :src="heartIcon"
    alt="a heart"
  />
  <!--  {{ favorite }}-->
  <!--  {{ this.getFavoriteLocationList.favorites }}-->
  <!--  {{ favorite }}-->
  <!--  {{ this._uid }}-->
</template>
<script>
import { useUserDataStore } from '@/stores/useUserDataStore.js'
import { mapActions, mapState } from 'pinia'
import checkedHeart from '@/assets/icons/favorite.svg'
import unCheckedHeart from '@/assets/icons/iconfinder_heart_like_8664909.svg'

export default {
  name: 'favorite-check-component',
  props: {
    locationData: [],
  },
  created() {
    this.checkIfFavorite(this.locationData)
  },
  mounted() {
    console.log(this._uid)
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
        console.log(v)
      },
    },
    favorite() {
      if (this.favorite) {
        this.heartIcon = checkedHeart
      }
    },
  },
  computed: {
    ...mapState(useUserDataStore, ['getFavoriteLocationList']),
  },
  methods: {
    ...mapActions(useUserDataStore, [
      'removeFavoriteLocation',
      'setFavoriteLocation',
      'getFavoriteLocationList',
    ]),
    toggleFavorite() {
      this.favorite = !this.favorite

      if (this.favorite) {
        this.heartIcon = checkedHeart
        this.setFavoriteLocation(this.locationData)
        console.log(this.locationData)
      } else {
        this.removeFavoriteLocation(this.locationData)
        this.heartIcon = unCheckedHeart
      }
    },
    checkIfFavorite(v) {
      let contains = 0
      for (let favorite of this.getFavoriteLocationList.favorites) {
        if (favorite != null) {
          console.log(
            favorite.longitude === v.longitude &&
              favorite.latitude === v.latitude,
          )
          if (
            favorite.longitude === v.longitude &&
            favorite.latitude === v.latitude
          ) {
            contains++
          }
        }
      }
      if (contains > 0) {
        this.heartIcon = checkedHeart
        this.favorite = true
      } else {
        this.favorite = false
        this.heartIcon = unCheckedHeart
      }

      // console.log(this.getFavoriteLocationList.favorites.indexOf(v));//

      // if (favorite.longitude === v.longitude && favorite.latitude === v.latitude) {
      //   this.heartIcon = checkedHeart
      //   this.favorite = !this.favorite
      //   console.log(this.favorite);
      //   console.log("match");
      // }
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
