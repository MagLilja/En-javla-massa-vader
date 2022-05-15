<template>
  <div class="desktop-card ">
    <div class="desktop-card-header">
      <div class="desktop-card-icon"><img
          src="../../assets/prototype_icons/cloud-sun-solid.svg"
          alt=""
      /></div>
      <div class="desktop-card-header-text">Vädret idag</div>
    </div>
    <div class="desktop-data-card-body">
      <same-day-list-component/>
    </div>
  </div>
</template>
<script>
import SameDayListComponent from '@/components/dataLists/SameDayListComponent.vue'
import {useUserDataStore} from '@/stores/useUserDataStore.js'
import {mapState, mapActions} from 'pinia'

export default {
  name: 'ten-day-desktop-card',
  components: {SameDayListComponent},
  computed: {
    ...mapState(useUserDataStore, 'getForecastFullData'),
  },
}
</script>
