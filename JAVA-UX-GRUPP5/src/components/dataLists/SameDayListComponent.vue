<template>
  <table class="weather-table">
    <tr v-for="(hour, index) of TwentyFourForecast" :key="index">
      <td>{{ hour.time }} </td> 
      <td>{{ hour.wSymb2Symbol }}</td>
      <td>{{ hour.temperature }}&#176</td>
      <td>{{ hour.wind }} ({{ hour.gusts }}) m/s</td>
    </tr>
  </table>
</template>


<script>
import weatherDataManager from "@/services/WeatherDataManager.js";
import WSymbol from "@/services/Wsymb2.json";
import {mapState} from "pinia/dist/pinia";
import {useUserDataStore} from "@/stores/useUserDataStore";

export default {
  name: "WeatherListComponent",
  data() {
    return {
      weatherList: [],
      Wsymb2: WSymbol,
      TwentyFourForecast: [],
    };
  },
  created() {
    this.TwentyFourForecast = weatherDataManager.getListWithWeatherData(
        this.getForecastFullData,
        this.Wsymb2,
        1,
        24,
        true
    )

  }, computed: {
    ...mapState(useUserDataStore, ["getForecastFullData"])
  },

};
</script>

<style></style>
