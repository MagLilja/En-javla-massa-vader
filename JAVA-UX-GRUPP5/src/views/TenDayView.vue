<template>
  <current-city-name-component
    class="text-[2em] my-10 font-bold"
  ></current-city-name-component>
  <ten-day-list-component />
</template>

<script>
import TenDayListComponent from '@/components/dataLists/TenDayListComponent.vue'
import CurrentCityNameComponent from '@/components/global/CurrentCityNameComponent.vue'

export default {
  components: { TenDayListComponent, CurrentCityNameComponent },
  data() {
    return {}
  },
}
</script>
