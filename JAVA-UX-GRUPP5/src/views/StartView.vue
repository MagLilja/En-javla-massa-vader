<template >
  <div class="start-view-template-container">
    <forecast-component
        @forecastFullData="retrieveForecastFullData"
    ></forecast-component>
    <circleComponent
        v-if="forecastFullData"
        :forecast-full-data="forecastFullData"
    />
    <div></div>
  </div>
</template>
<script>
import circleComponent from "@/components/start/CircleComponent.vue";
import forecastComponent from "@/components/start/ForecastComponent.vue";

export default {
  components: {
    circleComponent,
    forecastComponent,
  },

  data() {
    return {
      forecastFullData: undefined,
    };
  },
  methods: {
    retrieveForecastFullData(v) {
      this.forecastFullData = v;
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
