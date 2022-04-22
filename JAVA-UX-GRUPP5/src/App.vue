<template>
  <img alt="Vue logo" src="./assets/logo.png"/>
  <data-component @stationSelection="onClickParameter"></data-component>
</template>


<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import dataComponent from "./components/dataComponent.vue";

export default {
  components: {
    dataComponent,
  },
  data() {
    return {
      selectedStationHref: "",
    };
  },
  methods: {
    onClickParameter(v) {
      this.selectedStationHref = v.parameterLink
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
