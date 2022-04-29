<template>
  <div class="start-view-template-container">

    <weather-warning-component/>
    <current-city-name-component v-if="userCoordinates" :userCoordinates="userCoordinates"/>
    <date-component />

    <forecast-component
        @forecastFullData="retrieveForecastFullData"
        @completeDailyWxList="retrieveDailyWxList"
        @userCoordinates="retrieveCoordinates"
    />
    <circleComponent
        v-if="forecastFullData"
        :forecast-full-data="forecastFullData"
        :complete-daily-wx-list="completeDailyWxList"
    />
    <weather-list-component v-if="forecastFullData" :forecastFullData="forecastFullData"/>
    <div></div>
  </div>
</template>
<script>
import circleComponent from "@/components/start/CircleComponent.vue";
import forecastComponent from "@/components/start/ForecastComponent.vue";
import WeatherWarningComponent from "@/components/start/WeatherWarningComponent.vue";
import WeatherListComponent from "@/components/start/WeatherListComponent.vue";
import DateComponent from "@/components/start/DateComponent.vue";
import CurrentCityNameComponent from "@/views/CurrentCityNameComponent.vue";


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
      userCoordinates:undefined,
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
.start-view-template-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
}


</style>
