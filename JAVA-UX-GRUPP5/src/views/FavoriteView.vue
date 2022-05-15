<template>
  <h2 class="text-[2em] my-10 md:hidden">Dina favoriter</h2>
  <favorite-list-component />
</template>
<script>
import FavoriteListComponent from '@/components/favorite/FavoriteListItemComponent.vue'

export default {
  components: { FavoriteListComponent: FavoriteListComponent },
}
</script>
