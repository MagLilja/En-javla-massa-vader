<template>

  {{value}}

</template>

<script>
import smhiService from "@/services/smhiService.js";
import { useUserDataStore } from "@/stores/useUserDataStore.js";
import { mapState } from "pinia";

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
      console.log(this.nearestStation.key)
      let hrefToStationPeriods = await smhiService.fetchData(this.nearestStation.link[0].href)
      
   if(hrefToStationPeriods.period[0].key === "corrected-archive"){
     return 'Värde saknas'
   }

      let hrefToPeriodData = await smhiService.fetchData(hrefToStationPeriods.period[0].link[0].href)
      
      let actualData = await smhiService.fetchData(hrefToPeriodData.data[0].link[0].href)

      return actualData.value[actualData.value.length-1].value
      // https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/23/station/71420/period/latest-months/data.json
     
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
