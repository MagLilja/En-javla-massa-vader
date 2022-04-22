<template>
  <div class="station-component-container">
    <ul>
      <li
          v-for="(station, index) in stationsForParam.station"
          :key="index">
        {{station.name}}
        {{station.link[0]}}
      </li>
    </ul>

  </div>
</template>

<script>
import smhiService from "./../services/smhiService.js";

export default {
  props: {
    selectedParamStationsHref: String,
  },
  data() {
    return {
      stationsForParam: "",
    }
  },
  watch: {
    async selectedParamStationsHref() {
      this.stationsForParam = await smhiService.fetchData(this.selectedParamStationsHref)
      console.log(this.stationsForParam)
    }
  }
}
</script>

<style scoped>
.station-component-container {
  background-color: #ded1d1;
  padding: 2em;
}
</style>
