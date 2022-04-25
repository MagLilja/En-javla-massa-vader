<template>
  <div>Dina koordinater</div>
  <div v-if="forecastFullData">
    <div>Longitude: {{ forecastFullData.geometry.coordinates[0][0] }}</div>
    <div>Latitude: {{ forecastFullData.geometry.coordinates[0][1] }}</div>
 </div>
</template>

<script>
import smhiService from "@/services/smhiService.js";

export default {
  name: 'forecastComponent',
  data() {
    return {
      userCoordinates:"",
      forecastFullData:undefined,
    }
  },
  computed: {
  },
  methods: {
    getCoordinatesFromUser() {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            let userCoordinatesTemp= {
              latitude:"",
              longitude:""
            }
            userCoordinatesTemp.latitude = latitude
            userCoordinatesTemp.longitude = longitude
            this.userCoordinates = userCoordinatesTemp
          },
          (error) => {
            console.log(error.message)
          }
      )
    },
    seTime(time){
      const event = new Date(time);
      const options = {
        hour: '2-digit'
      }
      return event
    }
  },
  watch: {
    userCoordinates: {
      deep:true,
      async handler() {
        //let forecastData = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/parameter.json';
        // Parameter url
        // https://en.ilmatieteenlaitos.fi/weather-symbols
        let long =
            Math.round((this.userCoordinates.longitude + Number.EPSILON) * 100) / 100
        let lat = Math.round((this.userCoordinates.latitude + Number.EPSILON) * 100) / 100
        let url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${long}/lat/${lat}/data.json`
        let data = await smhiService.fetchData(url);
        console.log(data);
        this.forecastFullData = data
        this.$emit('forecastFullData', this.forecastFullData)
      }
    }
  },
  mounted() {
    this.getCoordinatesFromUser()
  }
}
</script>

<style scoped></style>
