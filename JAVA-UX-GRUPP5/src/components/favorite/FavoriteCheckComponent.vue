<template>
  <img
      class="checked-heart"
      :src="heartIcon"
      alt="a heart"
      @click="toggleFavorite()"
  />
</template>
<script>
import {useUserDataStore} from '@/stores/useUserDataStore.js'
import {mapActions, mapState} from 'pinia'
import checkedHeart from '@/assets/icons/favorite.svg'
import unCheckedHeart from '@/assets/icons/iconfinder_heart_like_8664909.svg'

export default {
  name: 'favorite-check-component',
  props: {
    locationData: [],
  },
  data() {
    return {
      heartIcon: unCheckedHeart,
      favorite: false,
    }
  },
  computed: {
    ...mapState(useUserDataStore, ['getFavoriteLocationList']),
  },
  watch: {
    locationData: {
      deep: true,
      handler(v) {
        this.checkIfFavorite(v)
      },
    },
    favorite() {
      if (this.favorite) {
        this.heartIcon = checkedHeart
      }
    },
  },

  created() {
    this.checkIfFavorite(this.locationData)
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
      } else {
        this.removeFavoriteLocation(this.locationData)
        this.heartIcon = unCheckedHeart
      }
    },
    checkIfFavorite(v) {
      let contains = 0
      for (let favorite of this.getFavoriteLocationList.favorites) {
        if (favorite != null) {
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
    },

  },
}
</script>

<style>
.checked-heart {
  width: 42px;
  aspect-ratio: 1;
}

</style>
