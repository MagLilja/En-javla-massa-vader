<template>
  <h2>Favoriter</h2>
  <img src="./../assets/wireframes/favorite.png" alt="">
  <favorite-list-item-component/>
  {{getFavoriteLocationList}}
</template>
<script>
import FavoriteListItemComponent from "@/components/global/FavoriteListItemComponent.vue";
import {useUserDataStore} from "@/stores/useUserDataStore";
import {mapState} from "pinia";

export default {
  components: {FavoriteListItemComponent},
  computed: {
    ...mapState(useUserDataStore, ["getFavoriteLocationList"])
  }
}

</script>