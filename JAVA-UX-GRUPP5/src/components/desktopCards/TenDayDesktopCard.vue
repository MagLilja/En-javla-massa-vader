<template>
  <div class="desktop-card">
    <div class="desktop-card-header">
      <div class="desktop-card-icon">
        <img src="../../assets/icons/calendar-regular.svg" alt="" />
      </div>
      <div class="desktop-card-header-text">10 dygn</div>
    </div>
    <div class="desktop-data-card-body">
      <ten-day-list-component></ten-day-list-component>
    </div>
  </div>
</template>
<script>
import TenDayListComponent from '@/components/dataLists/TenDayListComponent.vue'

export default {
  name: 'ten-day-desktop-card',
  components: { TenDayListComponent },
}
</script>
