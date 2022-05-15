<template>
  <div class="desktop-card ">
    <div class="desktop-card-header">
      <div class="desktop-card-icon">
        <img
            src="../../assets/prototype_icons/calendar-regular.svg"
            alt=""
        /></div>
      <div class="desktop-card-header-text">Favoriter</div>
    </div>
    <div class="desktop-data-card-body">
<favorite-view></favorite-view>
    </div>
  </div>
</template>
<script>
import TenDayListComponent from '@/components/dataLists/TenDayListComponent.vue'
import FavoriteView from "@/views/FavoriteView.vue";

export default {
  name: 'ten-day-desktop-card',
  components: {FavoriteView, TenDayListComponent },
}
</script>
