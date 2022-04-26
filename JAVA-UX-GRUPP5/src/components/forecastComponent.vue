<template>
  <warning-component/>
  <home-view-header-component :user-geo-location-data="userGeoLocationData" :user-now-date="userNowDate"/>



</template>


<script>
import smhiService from "@/services/smhiService.js";
import WarningComponent from "./WarningComponent.vue";
import HomeViewHeaderComponent from "./HomeViewHeaderComponent.vue";

export default {
  name: "ForecastComponent",
  components: {HomeViewHeaderComponent, WarningComponent},
  data() {
    return {
      userCoordinates: "",
      forecastFullData: undefined,
      userGeoLocationData: "",
      heartIcon: "./../assets/icons/iconfinder_heart_211673.svg",
      userNowDate: "",
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
        console.log("hej");
        console.table(this.userCoordinates);
        this.forecastFullData = data;
        this.$emit("forecastFullData", this.forecastFullData);
        // this.getUserGeoLocation();
      },
    },
  },
  mounted() {
    this.getUserGeoLocation();
    this.getNowDate();
  },
  methods: {
    getNowDate() {
      let today = new Date();
      const options = {
        weekday: "long",
        day: "2-digit",
        month: "long",
      }
      let nowDate = today.toLocaleDateString('sv-SE', options)
      this.userNowDate = nowDate
    },
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

