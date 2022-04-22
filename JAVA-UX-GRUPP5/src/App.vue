<template>
  <br>

  <param-component
      @paramSelectionHref="onClickParameter"/>
  <station-component
      :selectedParamStationsHref="selectedParamStationsHref"
      @selectedStationHref="onClickStation"/>
  <br>

</template>


<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import paramComponent from "./components/paramComponent.vue";
import StationComponent from "./components/stationComponent.vue";

export default {
  components: {
    StationComponent,
    paramComponent,
  },
  data() {
    return {
      selectedParamStationsHref: "",
      selectedStationHref: "",
    };
  },
  methods: {
    onClickParameter(v) {
      this.selectedParamStationsHref = v.parameterLink
    },
    onClickStation(v) {
      this.selectedStationHref = v.data
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
