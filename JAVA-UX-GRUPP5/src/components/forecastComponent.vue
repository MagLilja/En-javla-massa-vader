<template>
  <div class="warning-banner">VARNING: HÖG VINDSTYRKA!</div>
  <div class="home_view_city_title_container"><h2 v-if="userGeoLocationData" class="home-view-title">
    {{ userGeoLocationData.features[0].properties.city }}</h2>
    <img src="./../assets/icons/iconfinder_heart_211673.svg" class="home_view_city_title_heart" alt="a heart"></div>

  <div class="home-view-date"></div>
</template>


<script>
import smhiService from "@/services/smhiService.js";

export default {
  name: "ForecastComponent",
  data() {
    return {
      userCoordinates: "",
      forecastFullData: undefined,
      userGeoLocationData: "",
      heartIcon: "./../assets/icons/iconfinder_heart_211673.svg"
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
        let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${long}/lat/${lat}/data.json`;
        let data = await smhiService.fetchData(url);
        console.log(data);
        this.forecastFullData = data;
        this.$emit("forecastFullData", this.forecastFullData);
        this.getUserGeoLocation();
      },
    },
  },
  mounted() {
    this.getUserGeoLocation();
  },
  methods: {
    async getUserGeoLocationData(userCoordinatesTemp) {
      var requestOptions = {
        method: 'GET',
      };
      let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${userCoordinatesTemp.latitude}&lon=${userCoordinatesTemp.longitude}&apiKey=6c6c0640f23d468ab398e55bd11e17d9`;
      let response = await fetch(url, requestOptions)
      let result = await response.json()

      this.userGeoLocationData = result;
      console.log(this.userGeoLocationData);
    },
    getUserGeoLocation() {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            let userCoordinatesTemp = {
              latitude: "",
              longitude: "",
            };
            userCoordinatesTemp.latitude = latitude;
            userCoordinatesTemp.longitude = longitude;
            this.userCoordinates = userCoordinatesTemp;
            this.getUserGeoLocationData(userCoordinatesTemp)
          },
          (error) => {
            console.log(error.message);
          }
      );
    },
    seTime(time) {
      const event = new Date(time);
      const options = {
        hour: "2-digit",
      };
      return event;
    },
  },
};
</script>

<style scoped></style>
