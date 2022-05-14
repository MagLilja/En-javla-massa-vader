<template>
  <div class="station-component-container" v-if="stationsForParam">
    <div>stationComponent</div>
    <div>Välj station:</div>
    <select
      v-model="selectedStationHref"
      class=""
      @change="toParent(selectedStationHref)"
    >
      <option
        v-for="(station, index) in stationsForParam.station"
        :key="`${index}`"
        :value="{
          data: station.link[0].href,
          longitude: station.longitude,
          latitude: station.latitude,
        }"
      >
        {{ station.name }}
      </option>
    </select>
  </div>
</template>

<script>
import smhiService from '../../JAVA-UX-GRUPP5/src/services/smhiService.js'
import { useUserDataStore } from '@/stores/useUserDataStore.js'
import { mapState } from 'pinia'

export default {
  props: {
    selectedParamStationsHref: String,
  },
  emits: ['selectedStationHref'],
  data() {
    return {
      stationsForParam: undefined,
    }
  },
  computed: {
    ...mapState(useUserDataStore, ['coordinates']),
  },
  watch: {
    async selectedParamStationsHref() {
      this.stationsForParam = await smhiService.fetchData(
        this.selectedParamStationsHref,
      )
      if (this.stationsForParam) {
        this.findStationNearestToCoordinates()
      }
    },
  },
  methods: {
    toParent(value) {
      this.$emit('selectedStationHref', value)
    },
    findStationNearestToCoordinates() {
      let minDistance = 10000000
      let closestStation

      for (let station of this.stationsForParam.station) {
        let distance = Math.sqrt(
          (this.coordinates.longitude - station.longitude) *
            (this.coordinates.longitude - station.longitude) +
            (this.coordinates.latitude - station.latitude) *
              (this.coordinates.latitude - station.latitude),
        )
        console.log(distance)

        if (distance < minDistance) {
          minDistance = distance
          closestStation = station
        }
      }
      //This should be removed?
      console.log(
        'The closest station: x=' +
          closestStation.longitude +
          ', y=' +
          closestStation.latitude +
          'name=' +
          closestStation.name,
      )
    },
  },
}
</script>

<style scoped>
.station-component-container {
  background-color: #d6ded1;
  padding: 2em;
}
</style>
