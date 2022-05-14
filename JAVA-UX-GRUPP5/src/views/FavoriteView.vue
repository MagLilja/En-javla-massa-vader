<template>
  <h2>Favoriter</h2>
  <!--  <img src="./../assets/wireframes/favorite.png" alt="">-->
  <favorite-list-component />
</template>
<script>
import FavoriteListComponent from '@/components/favorite/FavoriteListItemComponent.vue'

export default {
  components: { FavoriteListComponent: FavoriteListComponent },
}
</script>
