<template>
  <div class="period-component-container">
    <div>periodComponent</div>
    <div>Välj period:</div>
    <div v-if="periodsForStation">
      <select
        v-model="selectedPeriodForStationHref"
        class=""
        @change="toParent(selectedPeriodForStationHref)"
      >
        >
        <option
          v-for="(period, index) in periodsForStation.period"
          :key="`${index}`"
          :value="{ data: period.link[0].href }"
        >
          {{ period.title }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import smhiService from "../../services/smhiService.js";

export default {
  props: {
    selectedStationHref: String,
  },
  emits: ["selectedPeriodForStationHref"],
  data() {
    return {
      periodsForStation: { period: "" },
    };
  },
  watch: {
    async selectedStationHref() {
      this.periodsForStation = await smhiService.fetchData(
        this.selectedStationHref
      );
    },
  },
  methods: {
    toParent(value) {
      this.$emit("selectedPeriodForStationHref", value);
    },
  },
};
</script>

<style scoped>
.period-component-container {
  background-color: #d1d3de;
  padding: 2em;
}
</style>
