<template>


  <div class="grid grid-cols-4 mb-48 w-full gap-3 md:mb-0 md:w-5/6" >
    <div class="font-bold w-fit">Tid</div>
    <div class="font-bold">Temp.</div>
    <div class="font-bold">Nederbörd</div>
    <div class="font-bold justify-self-center col-span-1">Vind</div>
    <div class="border-b-2 col-span-4 my-2 border-x-2 "></div>

    <template
        v-for="(wd,index) of weatherData" :key="index">
      <div class="flex flex-col">
        <div>{{ getLocalDay(wd.dataDate, index) }}</div>
        <div>{{ getLocalDate(wd.dataDate) }}</div>
      </div>
      <div class="flex flex-col">
        <div class="font-bold">{{ wd.highestTemp }}&#176;C</div>
        <div class="">({{ wd.lowestTemp }}&#176;C)</div>
      </div>
      <div class="content-start items-start justify-end">{{ wd.totalPrecipitation }} mm</div>
      <div class="justify-self-end flex flex-col items-end col-span-1">
        <div class="font-bold"> {{ wd.roundedAvgWindSpeed }} m/s</div>
        <div class="whitespace-nowrap">({{ wd.highestGust }}) m/s</div>

      </div>
      <div class="border-b-2 col-span-4 my-2 "></div>
    </template>

  </div>

</template>
<script>
import {mapState} from "pinia/dist/pinia";
import {useUserDataStore} from "@/stores/useUserDataStore";
import WeatherDataListManager from "@/managers/WeatherDataListManager.js";

export default {
  name: "ten-day-list-component",
  data() {
    return {
      weatherData: []
    };
  },
  computed: {
    ...mapState(useUserDataStore, ["getCoordinates", "getForecastFullData"])
  },
  watch: {
    getForecastFullData() {
      this.createWeatherDataList()
    },
  },
  created() {
    this.createWeatherDataList();
  },

  methods: {
    createWeatherDataList() {
      let tempList = [];
      for (let i = 0; i < 10; i++) {
        let date = new Date();
        date.setDate(date.getDate() + i);
        tempList.push(WeatherDataListManager.getWeatherDataforDate(this.getForecastFullData, date));
      }
      this.weatherData = tempList;
    },
    getLocalDate(input) {
      const event = new Date(input);
      const options = {month: "short", day: "numeric"};
      const date = event.toLocaleDateString("sv-SE", options);

      return date.replace(date.charAt(0), date.charAt(0).toUpperCase());
    },
    getLocalDay(input, index) {
      const event = new Date(input);
      const options = {weekday: "long"};
      const date = event.toLocaleDateString("sv-SE", options);

      if (index === 0) {
        return date.replace(/[^\s]*/, "Idag")
      }
      return date.replace(date.charAt(0), date.charAt(0).toUpperCase());
    }
  }
};
</script>
