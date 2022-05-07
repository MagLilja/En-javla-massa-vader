<template>
  <img class="checked-heart" @click="toggleFavorite()" :src="heartIcon" alt="a heart">


</template>
<script>
import {useUserDataStore} from "@/stores/useUserDataStore.js";
import {mapActions, mapState} from "pinia";

export default {
  name: 'favorite-check-component',
  props: {
    searchData: [],
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
    toggleFavorite() {
      this.favorite = !this.favorite

      if (this.favorite) {
        this.heartIcon = '/src/assets/icons/favorite.svg'
      } else {
        this.heartIcon = '/src/assets/icons/iconfinder_heart_like_8664909.svg'
      }
    }
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
