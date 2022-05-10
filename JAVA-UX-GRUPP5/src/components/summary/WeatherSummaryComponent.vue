<template>

  {{value}}

</template>

<script>
import smhiService from "@/services/smhiService.js";
import { useUserDataStore } from "@/stores/useUserDataStore.js";
import { mapState } from "pinia";
import weatherSummaryManager from "@/services/WeatherSummaryManager.js";

export default {
    props: {
    param: String,
  },
  data() {
    return {
      stationList: undefined,
      nearestStation: undefined,
      value: undefined
    };
  },

  computed: {
    ...mapState(useUserDataStore, ["getCoordinates"]),
  },
  watch: {
    stationList: {
      deep: true,
      handler() {
        this.getStationNo();
      },
    },
    nearestStation: {
        deep: true,
        async handler() {
          this.value = await this.getSummary();
        }
      }
  },
  mounted() {
    this.fetchStationList();
  },

  methods: {
    async getSummary() {

      let res = weatherSummaryManager.getSummary(this.param, this.nearestStation)
      res.log
      return res

    },

    getStationNo() {
      let minDistance = 10000000;
      let closestStation;
      let long = this.getCoordinates.longitude;
      let lat = this.getCoordinates.latitude;

      for (let station of this.stationList) {
        let distance = Math.sqrt(
          (long - station.longitude) * (long - station.longitude) +
            (lat - station.latitude) * (lat - station.latitude)
        );

        if (distance < minDistance) {
          minDistance = distance;
          closestStation = station;
        }
      }
      if (closestStation.name === "Göteborg"){
        for (let station of this.stationList){
          if(station.name === "Göteborg A"){
            closestStation = station
          }
        }
      }
      this.nearestStation = closestStation
    },

    async fetchStationList() {
      let url = `https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/${this.param}.json`;
      let result = await smhiService.fetchData(url);
      this.stationList = result.station;
    },
  },
};
</script>
