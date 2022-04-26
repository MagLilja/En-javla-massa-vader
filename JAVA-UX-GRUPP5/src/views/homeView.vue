<template>
  <forecast-component
    @forecastFullData="retrieveForecastFullData"
  ></forecast-component>

  <circleComponent
    v-if="forecastFullData"
    :forecast-full-data="forecastFullData"
  />

  <ul>
    <li v-if="forecastFullData" v-for="(timeSerie, index) of forecastFullData">
      {{timeSerie.validTime}}
    </li>
  </ul>
  <div></div>
</template>
<script>
import circleComponent from "@/components/circleComponent.vue";
import forecastComponent from "@/components/forecastComponent.vue";

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
      console.log(this.forecastFullData);
    },
  },
};
</script>
