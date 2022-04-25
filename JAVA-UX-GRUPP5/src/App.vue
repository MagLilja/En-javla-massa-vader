<template>
    <router-link to="home">Tja</router-link>
    <br>
    <router-link to="observations">Observationer</router-link>
    <router-view />
</template>


<script>

import paramComponent from "./components/paramComponent.vue";
import stationComponent from "./components/stationComponent.vue";
import periodComponent from "./components/periodComponent.vue";
import dataComponent from "./components/dataComponent.vue";

export default {
  components: {
    periodComponent,
    stationComponent,
    paramComponent,
    dataComponent
  },
  data() {
    return {
      selectedParamStationsHref: "",
      selectedStationHref: "",
      selectedPeriodHref: "",
    };
  },
  methods: {
    onClickParameter(v) {
      this.selectedParamStationsHref = v.parameterLink
    },
    onClickStation(v) {
      this.selectedStationHref = v.data
    },
    onClickPeriod(v) {
      this.selectedPeriodHref = v.data
    }
  }
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
