<template>
  <div class="desktop-data-card flex-column-center-2">
    <div class="desktop-data-card-header">
      <div >
        <img class="big-icon" src="../../assets/icons/main-view-icon.svg" alt="">
      </div>
    </div>
    <div class="desktop-data-card-body">
      <same-day-list-component/>
    </div>
  </div>
</template>
<script>
import SameDayListComponent from "@/components/dataLists/SameDayListComponent.vue"

export default {
  name: 'ten-day-desktop-card',
  components: {SameDayListComponent}
}
</script>
