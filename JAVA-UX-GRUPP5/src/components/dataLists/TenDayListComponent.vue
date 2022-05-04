<template>
  <table class="weather-table">
    <tr v-for="(wd,index) of weatherData" :key="index">
    <td>{{ getLocalDate(wd.dataDate) }}</td>
    <td><div class="font-weight-700">{{ wd.highestTemp }}&#176</div>
        <div>({{ wd.lowestTemp }}&#176)</div></td>
    <td>{{ wd.totalPrecipitation }} mm</td>
    <td><div class="font-weight-700">{{ wd.roundedAvgWindSpeed }}</div>
        <div>({{ wd.highestGust }}) m/s</div></td>
    </tr>
 
  </table>

  <!--
  <ul class="ten-day-list">
    <li v-for="(wd,index) of weatherData" :key="index" class="flex-row-space-around-m1">

      <div class="date">{{ getLocalDate(wd.dataDate) }}</div>
      <div>
        <div class="font-weight-700">{{ wd.highestTemp }}&#176</div>
        <div>({{ wd.lowestTemp }}&#176)</div>
      </div>

      <div>{{ wd.totalPrecipitation }} mm</div>
      <div>
        <div class="font-weight-700">{{ wd.roundedAvgWindSpeed }} m/s</div>
        <div>({{ wd.highestGust }} m/s)</div>
      </div>
    </li>
  </ul>
  -->
</template>
<script>
import {mapState} from "pinia/dist/pinia";
import {useUserDataStore} from "@/stores/useUserDataStore";
import weatherDataManager from "@/services/WeatherDataManager";

export default {
  name: 'ten-day-list-component',
  data() {
    return {
      weatherData: [],
    }
  },
  computed: {
    ...mapState(useUserDataStore, ["getCoordinates", "getForecastFullData"])
  },
  created() {
    for (let i = 0; i < 10; i++) {
      let date = new Date()
      //date = date.getDate + i
      date.setDate(date.getDate() + i)
      
      this.weatherData.push(weatherDataManager.getWeatherDataforDate(this.getForecastFullData, date))

    }
  },
  methods: {
    getLocalDate(input) {
      const event = new Date(input);
      const options = { weekday: "long", month: "long", day: "numeric" };
      const date = event.toLocaleDateString("sv-SE", options);
      return date.replace(date.charAt(0), date.charAt(0).toUpperCase())
    },
  }
}
</script>
<style>



</style>