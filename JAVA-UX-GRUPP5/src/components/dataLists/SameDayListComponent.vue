<template>
  <ul>
    <li v-for="(hour, index) of TwentyFourForecast" :key="index">
      {{ hour.time }}, {{ hour.wSymb2Symbol }}, {{ hour.temperature }},
      {{ hour.wind }} ({{ hour.gusts }})
    </li>
  </ul>
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
