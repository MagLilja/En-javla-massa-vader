<template>
  <div class="desktop-card">
    <div class="desktop-card-header">
      <div class="desktop-card-icon">
        <img src="../../assets/icons/calendar-regular.svg" alt="" />
      </div>
      <div class="desktop-card-header-text">Favoriter</div>
    </div>
    <div class="desktop-data-card-body">
      <favorite-view></favorite-view>
    </div>
  </div>
</template>
<script>
import FavoriteView from '@/views/FavoriteView.vue'

export default {
  name: 'favorite-desktop-card',
  components: { FavoriteView },
}
</script>
