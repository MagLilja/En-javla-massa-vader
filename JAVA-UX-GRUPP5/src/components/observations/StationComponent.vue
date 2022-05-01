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
          longitude:station.longitude,
          latitude:station.latitude
        }"
      >
        {{ station.name }}
      </option>
    </select>

  </div>

</template>

<script>
import smhiService from "../../services/smhiService.js";

export default {
  props: {
    selectedParamStationsHref: String,
  },
  emits: ["selectedStationHref"],
  data() {
    return {
      stationsForParam: undefined,
    };
  },
  computed: {},
  watch: {
    async selectedParamStationsHref() {
      this.stationsForParam = await smhiService.fetchData(this.selectedParamStationsHref);
      if(this.stationsForParam){
        this.findStationNearestToCoordinates()
      }
    },
  },
  methods: {
    toParent(value) {
      this.$emit("selectedStationHref", value);
    },
    findStationNearestToCoordinates() {

      var myPoint = {
        x: 10000,
        y: 10000
      };

      let minDistance = 10000000;
      let closestPoint;
      for (let station of this.stationsForParam.station) {
        let distance = Math.sqrt((myPoint.x - station.longitude) * (myPoint.x - station.longitude) + (myPoint.y - station.latitude) * (myPoint.y - station.latitude));
        if (distance < minDistance) {
          minDistance = distance;
          closestPoint = station;
        }
        console.log(station.longitude);
      }
      console.log("The closest point: x=" + closestPoint.longitude + ", y=" + closestPoint.latitude + 'name=' + closestPoint.name);
    }
  },
};
</script>

<style scoped>
.station-component-container {
  background-color: #d6ded1;
  padding: 2em;
}
</style>
