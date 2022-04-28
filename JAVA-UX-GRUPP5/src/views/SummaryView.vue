<template>
  <br />

  <param-component @paramSelectionHref="onClickParameter" />
  <station-component
    :selected-param-stations-href="selectedParamStationsHref"
    @selectedStationHref="onClickStation"
  />
  <period-component
    :selected-station-href="selectedStationHref"
    @selectedPeriodForStationHref="onClickPeriod"
  />
  <data-component :selected-period-href="selectedPeriodHref" />
</template>

<script>
  import paramComponent from "@/components/observations/ParamComponent.vue";
  import stationComponent from "@/components/observations/StationComponent.vue";
  import periodComponent from "@/components/observations/PeriodComponent.vue";
  import dataComponent from "@/components/observations/DataComponent.vue";

  export default {
    components: {
      periodComponent,
      stationComponent,
      paramComponent,
      dataComponent,
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
        this.selectedParamStationsHref = v.parameterLink;
      },
      onClickStation(v) {
        this.selectedStationHref = v.data;
      },
      onClickPeriod(v) {
        this.selectedPeriodHref = v.data;
      },
    },
  };
</script>
