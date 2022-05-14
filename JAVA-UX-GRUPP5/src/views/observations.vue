<!--<template>-->
<!--  <br />-->

<!--  <param-component @paramSelectionHref="onClickParameter" />-->
<!--  <station-component-->
<!--    :selected-param-stations-href="selectedParamStationsHref"-->
<!--    @selectedStationHref="onClickStation"-->
<!--  />-->
<!--  <period-component-->
<!--    :selected-station-href="selectedStationHref"-->
<!--    @selectedPeriodForStationHref="onClickPeriod"-->
<!--  />-->
<!--  <data-component :selected-period-href="selectedPeriodHref" />-->
<!--</template>-->

<!--<script>-->
<!--import paramComponent from '@/../../../oldStuff/observations/ParamComponent.vue'-->
<!--import stationComponent from '@/../../../oldStuff/observations/StationComponent.vue'-->
<!--import periodComponent from '@/../../../oldStuff/observations/PeriodComponent.vue'-->
<!--import dataComponent from '@/../../../oldStuff/observations/DataComponent.vue'-->

<!--export default {-->
<!--  components: {-->
<!--    periodComponent,-->
<!--    stationComponent,-->
<!--    paramComponent,-->
<!--    dataComponent,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      selectedParamStationsHref: '',-->
<!--      selectedStationHref: '',-->
<!--      selectedPeriodHref: '',-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    onClickParameter(v) {-->
<!--      this.selectedParamStationsHref = v.parameterLink-->
<!--    },-->
<!--    onClickStation(v) {-->
<!--      this.selectedStationHref = v.data-->
<!--    },-->
<!--    onClickPeriod(v) {-->
<!--      this.selectedPeriodHref = v.data-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->
