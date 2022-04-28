<template>
  <div class="station-component-container">
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
        :value="{ data: station.link[0].href }"
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
      stationsForParam: "",
    };
  },
  watch: {
    async selectedParamStationsHref() {
      this.stationsForParam = await smhiService.fetchData(
        this.selectedParamStationsHref
      );
    },
  },
  methods: {
    toParent(value) {
      this.$emit("selectedStationHref", value);
    },
  },
};
</script>

<style scoped>
.station-component-container {
  background-color: #d6ded1;
  padding: 2em;
}
</style>
