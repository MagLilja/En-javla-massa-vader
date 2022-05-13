<template>


  <div class="grid grid-cols-4 w-5/6 mb-48 content-start gap-5">
    <div class="w-fit">Tid</div>
    <div class="">Väder</div>
    <div>Temperatur</div>
    <div class=" justify-self-center col-span-1">Vind</div>
    <div class="border-b-2 col-span-4 my-2 border-x-2 "></div>

    <template class="" v-for="(wd,index) of weatherData" :key="index">
      <div class="">{{ getLocalDate(wd.dataDate, index) }}</div>
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
      getLocalDate(input, index) {
        const event = new Date(input);
        const options = { weekday: "long", month: "long", day: "numeric" };
        const date = event.toLocaleDateString("sv-SE", options);

        if(index === 0){
          let todayString = date.replace(/[^\s]*/, "Idag \u00A0\u00A0\u00A0");
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