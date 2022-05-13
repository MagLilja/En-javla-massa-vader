<template>

  <!--    <table class="table-fixed [width:95%] ">-->
  <!--      <thead class="">-->
  <!--      <tr class="text-left ">-->
  <!--        <th class="w-fit">Tid</th>-->
  <!--        <th class="">Väder</th>-->
  <!--        <th>Temperatur</th>-->
  <!--        <th>Vind</th>-->
  <!--      </tr>-->
  <!--      </thead>-->
  <!--      <tbody>-->
  <!--      <tr class="text-left border-b-2 w-fit" v-for="(hour, index) of TwentyFourForecast" :key="index">-->
  <!--        <td class="">{{ hour.time }}</td>-->
  <!--        <td class="">{{ hour.wSymb2Symbol }}</td>-->
  <!--        <td>{{ hour.temperature }}&#176</td>-->
  <!--        <td class="w-fit">{{ hour.wind }} ({{ hour.gusts }}) m/s</td>-->
  <!--      </tr>-->
  <!--      </tbody>-->
  <!--    </table>-->

  <div class="grid grid-cols-5 w-5/6">
    <div class="w-fit">Tid</div>
    <div class="">Väder</div>
    <div>Temperatur</div>
    <div class="col-span-2 place-self-end">Vind</div>
    <div class="border-b-2 col-span-5 my-2"></div>

    <template class="border-y-rose-400" v-for="(hour, index) of TwentyFourForecast"
              :key="index">
      <div class="">{{ hour.time }}</div>
      <div class="">{{ hour.wSymb2Symbol }}</div>
      <div class="">{{ hour.temperature }}&#176</div>
      <div class="col-span-2 place-self-end">{{ hour.wind }} ({{ hour.gusts }}) m/s</div>
      <div class="border-b-2 col-span-5 my-2"></div>
    </template>

  </div>
</template>


<script>
  import weatherDataManager from "@/managers/WeatherDataManager.js";
  import WSymbol from "@/services/Wsymb2.json";
  import { mapState } from "pinia/dist/pinia";
  import { useUserDataStore } from "@/stores/useUserDataStore";

  export default {
    name: "WeatherListComponent",
    data() {
      return {
        weatherList: [],
        Wsymb2: WSymbol,
        TwentyFourForecast: []
      };
    },
    created() {
      this.TwentyFourForecast = weatherDataManager.getListWithWeatherData(
        this.getForecastFullData,
        this.Wsymb2,
        1,
        24,
        true
      );

    }, computed: {
      ...mapState(useUserDataStore, ["getForecastFullData"])
    }

  };
</script>

<style></style>
