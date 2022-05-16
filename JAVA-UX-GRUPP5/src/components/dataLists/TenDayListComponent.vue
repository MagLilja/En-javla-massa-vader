<template>


  <div class="grid grid-cols-4 w-full mb-48 content-start gap-3 md:mb-0">
    <div class="font-bold w-fit">Tid</div>
    <div class="font-bold">Väder</div>
    <div class="font-bold">Temperatur</div>
    <div class="font-bold justify-self-center col-span-1">Vind</div>
    <div class="border-b-2 col-span-4 my-2 border-x-2 "></div>

    <template class="" v-for="(wd,index) of weatherData" :key="index">
      <div class="flex flex-col">
        <div>{{ getLocalDay(wd.dataDate, index) }}</div>
        <div>{{ getLocalDate(wd.dataDate) }}</div>
      </div>
      <div class="flex flex-col">
        <div class="font-bold">{{ wd.highestTemp }}&#176</div>
        <div class="">({{ wd.lowestTemp }}&#176)</div>
      </div>
      <div class="content-start items-start justify-start">{{ wd.totalPrecipitation }} mm</div>
      <div class="justify-self-end flex flex-col items-center col-span-1">
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
import weatherDataManager from "@/managers/WeatherDataManager";

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
      console.log("loglog");
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
        tempList.push(weatherDataManager.getWeatherDataforDate(this.getForecastFullData, date));
      }
      this.weatherData = tempList;
    },
    getLocalDate(input, index) {
      const event = new Date(input);
      const options = {month: "long", day: "numeric"};
      const date = event.toLocaleDateString("sv-SE", options);

      let dateString = date.replace(date.charAt(0), date.charAt(0).toUpperCase());

      return dateString;
    },
    getLocalDay(input, index) {
      const event = new Date(input);
      const options = {weekday: "long"};
      const date = event.toLocaleDateString("sv-SE", options);

      if (index === 0) {
        let todayString = date.replace(/[^\s]*/, "Idag");
        return todayString
      }
      let dateString = date.replace(date.charAt(0), date.charAt(0).toUpperCase());

      return dateString;
    }
  }
};
</script>
<style>


</style>