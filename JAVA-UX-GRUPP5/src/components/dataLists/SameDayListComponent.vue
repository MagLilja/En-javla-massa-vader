<template>
  <ul>
    <li v-for="(hour, index) of TwentyFourForecast" :key="index">
      {{ hour.time }}, {{ hour.wSymb2Symbol }}, {{ hour.temperature }}, 
      {{ hour.wind }} ({{hour.gusts}})
    </li>
  </ul>
</template>

<script>
import weatherDataManager from "@/services/WeatherDataManager.js";
import WSymbol from "@/services/Wsymb2.json";

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
      this.forecastFullData,
      this.Wsymb2,
      1,
      24,
        true
    )

  },
  props: { forecastFullData: [] },
};
</script>

<style></style>
