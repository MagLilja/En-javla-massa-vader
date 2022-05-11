<template>
  <div class="header">
    Sammanfattning av vädret i {{ this.getActiveCityName() }}
  </div>
  <br />
  <div class="display-month-container">
    <div class="month">{{ this.getLastMonth().toUpperCase() }}</div>
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
          return this.convertGothenburg(
            this.getUserGeoLocationData.features[0].properties.city,
          )
      }
    },
    getLastMonth() {
      let today = new Date()
      today.setMonth(today.getMonth() - 1)

      return today.toLocaleDateString('sv-SE', { month: 'long' })
    },
    convertGothenburg(input) {
      if (input === 'Gothenburg') {
        return 'Göteborg'
      } else {
        return input
      }
    },
  },
}
</script>
<style scoped>
.header {
  font-size: 1.5em;
  font-weight: 600;
}

.display-month-container {
  display: flex;
}

.month {
  font-size: 1.2em;
  font-weight: 600;
  margin-left: 1em;
}
</style>
