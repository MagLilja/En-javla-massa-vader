<template>

  {{ value }}
  {{ param }}
  <!--  {{nearestStation.name}}-->

</template>

<script>
import smhiService from "@/services/smhiService.js";
import {useUserDataStore} from "@/stores/useUserDataStore.js";
import {mapState} from "pinia";
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

      // let res = weatherSummaryManager.getSummary(this.param, this.nearestStation)
      // res.log
      // return res

      let hrefToStationPeriods = await smhiService.fetchData(this.nearestStation.link[0].href)


      for (let period of hrefToStationPeriods.period) {

        if (period.key === "latest-months") {
          let hrefToPeriodData = await smhiService.fetchData(period.link[0].href)
          let actualData = await smhiService.fetchData(hrefToPeriodData.data[0].link[0].href)
          console.log(actualData);

          switch (this.param) {
            case 23:
              console.log("23");
              return actualData.value[actualData.value.length - 1].value
            case 10:
              console.log("10");
              let timestamp = new Date(actualData.value[0].date)
              let today = new Date()
              console.log();
              console.log(timestamp.getMonth());
              let totalValue = 0
              for (let value of actualData.value) {
                let timestamp = new Date(value.date)
                let lastMonth = today.getMonth() -1
                if (timestamp.getMonth() === ( lastMonth)) {
                  totalValue += parseInt(value.value)
                }

              }
              totalValue = totalValue/3600;
              return Math.round(totalValue);

          }
        }
      }


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
      if (closestStation.name === "Göteborg") {
        for (let station of this.stationList) {
          if (station.name === "Göteborg A") {
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
