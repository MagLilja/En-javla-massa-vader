<template>
  <br>

  <param-component
      @paramSelectionHref="onClickParameter"/>
  <station-component
      :selectedParamStationsHref="selectedParamStationsHref"
      @selectedStationHref="onClickStation"/>
  <period-component
      :selectedStationHref="selectedStationHref"
      @selectedPeriodForStationHref="onClickPeriod"/>
  {{ selectedPeriodHref }}
</template>


<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import paramComponent from "./components/paramComponent.vue";
import StationComponent from "./components/stationComponent.vue";
import PeriodComponent from "./components/periodComponent.vue";

// "https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/21/station/188790/period/latest-hour/data.json
// TODO add dataComponent and manipulate href

export default {
  components: {
    PeriodComponent,
    StationComponent,
    paramComponent,
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
