<template>
  <!--  <div>Dina koordinater</div>-->
  <!--  <div v-if="forecastFullData">-->
  <!--    <div>Longitude: {{ forecastFullData.geometry.coordinates[0][0] }}</div>-->
  <!--    <div>Latitude: {{ forecastFullData.geometry.coordinates[0][1] }}</div>-->
  <!--  </div>-->
</template>

<script>
import smhiService from "@/services/smhiService.js";
import weatherDataManager from "@/services/WeatherDataManager.js";
import wSymb2 from "@/services/Wsymb2.json"

export default {
  name: "ForecastComponent",
  data() {
    return {
      userCoordinates: "",
      forecastFullData: undefined,
      analysisFullData: undefined,
      completeDailyWxList: undefined,
      wsymbol: wSymb2
    };
  },
  computed: {},
  watch: {
    userCoordinates: {
      deep: true,
      async handler() {
        //let forecastData = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/parameter.json';
        // Parameter url
        // https://en.ilmatieteenlaitos.fi/weather-symbols
        let long =
            Math.round((this.userCoordinates.longitude + Number.EPSILON) * 100) /
            100;
        let lat =
            Math.round((this.userCoordinates.latitude + Number.EPSILON) * 100) /
            100;
        let forecastUrl = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${long}/lat/${lat}/data.json`;
        let analysisUrl = `https://opendata-download-metanalys.smhi.se/api/category/mesan1g/version/2/geotype/point/lon/${long}/lat/${lat}/data.json`
        this.forecastFullData = await smhiService.fetchData(forecastUrl);
        this.analysisFullData = await smhiService.fetchData(analysisUrl);


        let forecastList = weatherDataManager.getListWithWeatherDataForToday(this.forecastFullData, this.wsymbol, 2, 12)
        let analysisList = weatherDataManager.getListWithWeatherDataForToday(this.analysisFullData, this.wsymbol, 2, 12).reverse()
        this.completeDailyWxList = analysisList.concat(forecastList)
        //console.log(fullWxList)


        this.$emit("forecastFullData", this.forecastFullData);
        this.$emit("completeDailyWxList", this.completeDailyWxList)

      },
    },
  },
  mounted() {
    this.getCoordinatesFromUser();
  },
  emits: [
    'forecastFullData',
    'completeDailyWxList',
    'userCoordinates'],
  methods: {
    getCoordinatesFromUser() {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            let userCoordinatesTemp = {
              latitude: "",
              longitude: "",
            };
            userCoordinatesTemp.latitude = latitude;
            userCoordinatesTemp.longitude = longitude;
            this.userCoordinates = userCoordinatesTemp;
            this.$emit('userCoordinates', userCoordinatesTemp)
          },
          (error) => {
            console.log(error.message);
          }
      );
    },
    // seTime(time) {
    //   const event = new Date(time);
    //   const options = {
    //     hour: "2-digit",
    //   };
    //   return event;
    // },
  },
};
</script>

<style scoped></style>
