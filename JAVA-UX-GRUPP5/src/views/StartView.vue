<template >
  <div class="start-view-template-container">

    <weather-warning-component/>

    <forecast-component
        @forecastFullData="retrieveForecastFullData"
        @completeDailyWxList="retrieveDailyWxList"
    ></forecast-component>
    <circleComponent
        v-if="forecastFullData"
        :forecast-full-data="forecastFullData"
        :complete-daily-wx-list="completeDailyWxList"
    /> 
    <weather-list-component :forecastFullData="forecastFullData" />
    <div></div>
  </div>
</template>
<script>
import circleComponent from "@/components/start/CircleComponent.vue";
import forecastComponent from "@/components/start/ForecastComponent.vue";
import WeatherWarningComponent from "@/components/start/WeatherWarningComponent.vue";
import WeatherListComponent from "@/components/start/WeatherListComponent.vue";

export default {
  components: {
    WeatherWarningComponent,
    circleComponent,
    forecastComponent,
    WeatherListComponent
  },

  data() {
    return {
      forecastFullData: undefined,
      completeDailyWxList: undefined,
    };
  },
  methods: {
    retrieveForecastFullData(v) {
      this.forecastFullData = v;
    },
    retrieveDailyWxList(v) {
      this.completeDailyWxList = v;
    },
  },
};
</script>

<style scoped>
.start-view-template-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:2em;
}


</style>
