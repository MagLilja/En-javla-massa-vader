<template>
  <div class="desktop-card flex-column-center-2">
    <div class="desktop-card-header">
      <div>
        <img class="big-icon" src="../../assets/icons/10-day-view.svg" alt="" />
      </div>
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
