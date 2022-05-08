<template>
  <div>
    <favorite-check-component></favorite-check-component>

  </div>
</template>
<script>
import FavoriteCheckComponent from "@/components/global/FavoriteCheckComponent.vue"

export default {
  name: 'favorite-list-item-component',
  components: {FavoriteCheckComponent}
}
</script>