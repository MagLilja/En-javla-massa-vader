<template>
  <load-data-component
      @forecastFullData="retrieveForecastFullData"
      @completeDailyWxList="retrieveDailyWxList"
      @userCoordinates="retrieveCoordinates"
  />
  <section class="flex-column-center-2 start-view-section" v-if="forecastFullData">
    <MqResponsive class="start-view-weather-warning-component-sm-minus" target="sm-">
      <weather-warning-component/>
    </MqResponsive>
    <div class="start-view-header">
      <current-city-name-component/>
      <img class="heart" src="../assets/icons/favorite.svg" alt="a heart"></div>
    <date-component/>

    <circleComponent

        :forecast-full-data="forecastFullData"
        :complete-daily-wx-list="completeDailyWxList"
    />
    <MqResponsive class="start-view-weather-same-day-list-component-sm-minus" target="sm-">
      <same-day-list-component />
    </MqResponsive>
  </section>
</template>
<script>
import circleComponent from "@/components/start/CircleComponent.vue";
import loadDataComponent from "@/components/start/LoadDataComponent.vue";
import WeatherWarningComponent from "@/components/start/WeatherWarningComponent.vue";
import SameDayListComponent from "@/components/dataLists/SameDayListComponent.vue";
import DateComponent from "@/components/global/DateComponent.vue";
import CurrentCityNameComponent from "@/components/global/CurrentCityNameComponent.vue";
import {MqResponsive} from "vue3-mq";

export default {
  components: {
    CurrentCityNameComponent,
    WeatherWarningComponent,
    circleComponent,
    loadDataComponent: loadDataComponent,
    SameDayListComponent,
    DateComponent,
    MqResponsive,
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
