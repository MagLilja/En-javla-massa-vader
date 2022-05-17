<template>

  <div class="grid grid-cols-5 w-5/6 gap-3 md:mb-0">
    <div class="font-bold w-fit">Tid</div>
    <div class="font-bold ">Väder</div>
    <div class="font-bold ">Temperatur</div>
    <div class="font-bold col-span-2 place-self-end">Vind</div>
    <div class="border-b-2 col-span-5 my-2"></div>

    <template
        v-for="(hour, index) of TwentyFourForecast"
        :key="index">
      <div class="">{{ hour.time }}</div>
      <div class="text-4xl">{{ hour.wSymb2Symbol }}</div>
      <div class="">{{ hour.temperature }}&#176;</div>
      <div class="col-span-2 text-right">
        {{ hour.wind }}
        ({{ hour.gusts }}) m/s
      </div>
      <div class="border-b-2 col-span-5 my-2 "></div>
    </template>

  </div>
</template>


<script>
import weatherDataManager from "@/managers/WeatherDataManager.js";
import WSymbol from "@/assets/Wsymb2.json";
import {mapState} from "pinia/dist/pinia";
import {useUserDataStore} from "@/stores/useUserDataStore";

export default {
  name: "WeatherListComponent",
  data() {
    return {
      weatherList: [],
      Wsymb2: WSymbol,
      TwentyFourForecast: []
    };
  },
  computed: {
    ...mapState(useUserDataStore, ["getForecastFullData"])
  },
  watch: {
    getForecastFullData() {
      this.createWeatherDataList();
    },
  },
  created() {
    this.createWeatherDataList();
  },

  methods: {
    createWeatherDataList() {
      this.TwentyFourForecast = weatherDataManager.getListWithWeatherData(
          this.getForecastFullData,
          this.Wsymb2,
          1,
          24,
          true
      );
    }
  },
};
</script>
