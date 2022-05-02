<template>
  <forecast-component
      @forecastFullData="retrieveForecastFullData"
      @completeDailyWxList="retrieveDailyWxList"
      @userCoordinates="retrieveCoordinates"
  />
  <div class="flex-column-center-2" v-if="forecastFullData">

    <weather-warning-component/>
    <div class="start-view-header">
      <current-city-name-component/>
      <img class="heart" src="../assets/icons/favorite.svg" alt="a heart"></div>
    <date-component/>

    <circleComponent

        :forecast-full-data="forecastFullData"
        :complete-daily-wx-list="completeDailyWxList"
    />
    <weather-list-component :forecastFullData="forecastFullData"/>

    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  </div>
</template>
<script>
import circleComponent from "@/components/start/CircleComponent.vue";
import forecastComponent from "@/components/start/ForecastComponent.vue";
import WeatherWarningComponent from "@/components/start/WeatherWarningComponent.vue";
import WeatherListComponent from "@/components/dataLists/SameDayListComponent.vue";
import DateComponent from "@/components/global/DateComponent.vue";
import CurrentCityNameComponent from "@/components/global/CurrentCityNameComponent.vue";


export default {
  components: {
    CurrentCityNameComponent,
    WeatherWarningComponent,
    circleComponent,
    forecastComponent,
    WeatherListComponent,
    DateComponent
  },

  data() {
    return {
      forecastFullData: undefined,
      completeDailyWxList: undefined,
      userCoordinates: undefined,
    };
  },
  methods: {
    retrieveForecastFullData(v) {
      this.forecastFullData = v;
    },
    retrieveDailyWxList(v) {
      this.completeDailyWxList = v;
    },
    retrieveCoordinates(v) {
      this.userCoordinates = v;
    },
  },
};
</script>

<style scoped>



</style>
