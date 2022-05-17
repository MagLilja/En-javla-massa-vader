<template>
  <div class="header text-[2em] mt-20 mb-10 text-center">
    Sammanfattning av vädret i {{ getActiveCityName() }} i
    {{ getLastMonth() }}
  </div>
</template>
<script>
import { mapState } from 'pinia'
import { useUserDataStore } from '@/stores/useUserDataStore'

export default {
  name: 'summary-view-header-component',
  computed: {
    ...mapState(useUserDataStore, ['getCoordinates', 'getUserGeoLocationData']),
  },
  methods: {
    getActiveCityName() {
      if (this.getCoordinates.origin === 'FROM_SEARCH') {
        return this.getCoordinates.searchSelection
      } else {
        if (this.getUserGeoLocationData.features[0].properties.city)
          return this.checkForGothenburg(
            this.getUserGeoLocationData.features[0].properties.city,
          )
      }
    },
    getLastMonth() {
      let today = new Date()
      today.setMonth(today.getMonth() - 1)

      return today.toLocaleDateString('sv-SE', { month: 'long' })
    },
    checkForGothenburg(input) {
      if (input === 'Gothenburg') {
        return 'Göteborg'
      } else {
        return input
      }
    },
  },
}
</script>

