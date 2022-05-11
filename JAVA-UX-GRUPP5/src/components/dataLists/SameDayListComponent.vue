<template>
  <div>
    <table class="table-fixed [width:95%] ">
      <thead class="">
      <tr class="text-left ">
        <th class="w-fit">Tid</th>
        <th class="">Väder</th>
        <th>Temperatur</th>
        <th>Vind</th>
      </tr>
      </thead>
      <tbody>
      <tr class="text-left border-b-2 w-fit" v-for="(hour, index) of TwentyFourForecast" :key="index">
        <td class="">{{ hour.time }}</td>
        <td class="">{{ hour.wSymb2Symbol }}</td>
        <td>{{ hour.temperature }}&#176</td>
        <td class="w-fit">{{ hour.wind }} ({{ hour.gusts }}) m/s</td>
      </tr>
      </tbody>
    </table>
  </div>
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
