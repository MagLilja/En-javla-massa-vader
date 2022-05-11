<template>
  <div class="desktop-data-card flex-column-center-2">
    <div class="desktop-data-card-header">
      <div>
        <img
          class="big-icon"
          src="../../assets/icons/summary-view.svg"
          alt=""
        />
      </div>
    </div>
    <div class="desktop-data-card-body">
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
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
