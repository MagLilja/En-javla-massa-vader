<template>
  <br>

  <data-component @stationSelection="onClickParameter"></data-component>
  <station-component :selectedParamStationsHref="selectedParamStationsHref"></station-component>
  <br>

</template>


<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import dataComponent from "./components/dataComponent.vue";
import StationComponent from "./components/stationComponent.vue";

export default {
  components: {
    StationComponent,
    dataComponent,
  },
  data() {
    return {
      selectedParamStationsHref: "",
    };
  },
  methods: {
    onClickParameter(v) {
      this.selectedParamStationsHref = v.parameterLink
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
