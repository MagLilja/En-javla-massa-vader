<template>


  <div class="grid grid-cols-5 w-5/6 mb-48 content-start">
    <div class="w-fit">Tid</div>
    <div class="">Väder</div>
    <div>Temperatur</div>
    <div class="col-span-2 justify-self-end">Vind</div>
    <div class="border-b-2 col-span-5 my-2"></div>

    <template class="" v-for="(wd,index) of weatherData" :key="index">
      <div class="">{{ getLocalDate(wd.dataDate) }}</div>
      <div class="flex flex-col">
        <div class="font-bold">{{ wd.highestTemp }}&#176</div>
        <div class="">({{ wd.lowestTemp }}&#176)</div>
      </div>
      <div class="content-start items-start justify-start">{{ wd.totalPrecipitation }} mm</div>
      <div class="col-span-2 justify-self-end flex flex-col items-end">
        <div class="x"> {{ wd.roundedAvgWindSpeed }} m/s</div>
        <div class="x">({{ wd.highestGust }}) m/s</div>
      </div>
      <div class="border-b-2 col-span-4 my-2 "></div>
    </template>

  </div>


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
  import { mapState } from "pinia/dist/pinia";
  import { useUserDataStore } from "@/stores/useUserDataStore";
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
    created() {
      for (let i = 0; i < 10; i++) {
        let date = new Date();
        //date = date.getDate + i
        date.setDate(date.getDate() + i);

        this.weatherData.push(weatherDataManager.getWeatherDataforDate(this.getForecastFullData, date));

      }
    },
    methods: {
      getLocalDate(input) {
        const event = new Date(input);
        const options = { weekday: "long", month: "long", day: "numeric" };
        const date = event.toLocaleDateString("sv-SE", options);
        return date.replace(date.charAt(0), date.charAt(0).toUpperCase());
      }
    }
  };
</script>
<style>


</style>