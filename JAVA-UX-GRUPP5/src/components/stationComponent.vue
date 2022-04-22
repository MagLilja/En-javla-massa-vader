<template>
  <div class="station-component-container">
    <div>stationComponent</div>
    <div>Välj station:</div>

    <select
        v-model="selectedHref"
        class=""
        @change="toParent(selectedHref)">
      <option
          v-for="(station, index) in stationsForParam.station"
          :key="`${index}`"
          :value="{stationHref: station.link[0].href}"
      >
        {{ station.name }}
      </option>
    </select>

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
  methods: {
    toParent(value) {
      this.$emit('stationSelection', value)
    },
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
  background-color: #d6ded1;
  padding: 2em;
}
</style>
