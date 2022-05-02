<template>

  <div>10-dagar</div>

  <ul class="ten-day-list">
    <li v-for="(wd,index) of weatherData" :key="index" class="ten-day-list-item">

      <div class="date">{{ getLocalDate(wd.dataDate) }}</div>
      <div><div class="font-weight-700">{{ wd.highestTemp }}&#176</div>
        <div>({{ wd.lowestTemp }}&#176)</div></div>

      <div>{{ wd.totalPrecipitation }} mm</div>
      <div><div class="font-weight-700">{{ wd.roundedAvgWindSpeed }} m/s</div>
        <div>({{ wd.highestGust }} m/s)</div></div>
    </li>
  </ul>
</template>

<script>
import CurrentCityNameComponent from "@/components/global/CurrentCityNameComponent.vue";
import {useUserDataStore} from "@/stores/useUserDataStore.js";
import {mapState} from "pinia";
import weatherDataManager from "@/services/WeatherDataManager.js"


export default {
  components: {CurrentCityNameComponent,},
  data() {
    return {
      weatherData: [],
    }
  },
  computed: {
    ...mapState(useUserDataStore, ["getCoordinates", "getForecastFullData"])
  },
  created() {
    let date = new Date()
    for (let i = 0; i < 10; i++) {
      date.setDate(date.getDate() + 1)
      console.log(date);
      this.weatherData.push(weatherDataManager.getWeatherDataforDate(this.getForecastFullData, date))

    }
  },
  methods: {
    getLocalDate(input) {
      const event = new Date(input);
      const options = { weekday: "long", month: "long", day: "numeric" };
      const date = event.toLocaleDateString("sv-SE", options);
      return date.replace(date.charAt(0), date.charAt(0).toUpperCase())
    },
  }
}


</script>

<style>

.ten-day-list-item {
  display:flex;
  justify-content: space-around;
  margin:1em;

}

.date{
  width:12vw;
}

.font-weight-700 {
  font-weight: 700;
}
</style>


