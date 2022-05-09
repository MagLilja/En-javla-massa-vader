<template>
  <div class="header">Sammanfattning av vädret i {{ this.getActiveCityName() }}</div>
  <br>
  <div class="month">{{ this.getLastMonth().toUpperCase() }}</div>
</template>
<script>
import { mapState } from "pinia";
import { useUserDataStore } from "@/stores/useUserDataStore";

export default {
  name: "summary-view-header-component",
  computed: {
    ...mapState(useUserDataStore, ["getCoordinates", "getUserGeoLocationData"]),
  },
  methods: {
    getActiveCityName() {
      if (this.getCoordinates.origin === "FROM_SEARCH") {
        return this.getCoordinates.searchSelection;
      } else {
        if (this.getUserGeoLocationData.features[0].properties.city)
          return this.convertGothenburg(
            this.getUserGeoLocationData.features[0].properties.city
          );
      }
    },
    getLastMonth() {
      let today = new Date();
      today.setMonth(today.getMonth() - 1);

      return today.toLocaleDateString("sv-SE", { month: "long" });
    },
    convertGothenburg(input) {
      if (input === "Gothenburg") {
        return "Göteborg";
      } else {
        return input;
      }
    },
  },
};
</script>
<style scoped>
.header {
  font-size: 1.5em;
  font-weight: 600;
}
.month {
  font-size: 1.5em;
  font-weight: 600;
}
</style>
