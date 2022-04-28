<template>
  <forecast-component
    @forecastFullData="retrieveForecastFullData"
  ></forecast-component>
  <circleComponent
    v-if="forecastFullData"
    :forecast-full-data="forecastFullData"
  />
  <div></div>
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
