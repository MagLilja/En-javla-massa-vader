<template>
  <ul class="weather-list">
    <li class="weather-list-item title-row">
      <div class="time">Tid </div>
      <div class="symbol">Väder</div>
      <div>Temperatur</div>
      <div>Vind</div>
    </li>
    <li class="weather-list-item" v-for="(hour, index) of TwentyFourForecast" :key="index">
      <div class="time">{{ hour.time }} </div>
      <div class="symbol">{{ hour.wSymb2Symbol }}</div>
      <div>{{ hour.temperature }}&#176</div>
      <div>{{ hour.wind }} ({{ hour.gusts  }}) m/s</div>
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
