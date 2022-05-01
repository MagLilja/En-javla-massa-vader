<template>
  <br />

  <param-component @paramSelectionHref="onClickParameter" />
  <station-component
    :selected-param-stations-href="selectedParamStationsHref"
    @selectedStationHref="onClickStation"
  />
  <period-component
    :selected-station-href="selectedStationData.data"
    @selectedPeriodForStationHref="onClickPeriod"
  />
  <data-component :selected-period-href="selectedPeriodHref" />

  {{selectedStationData.longitude}}
  {{selectedStationData.latitude}}
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
        selectedStationData: "",
        selectedPeriodHref: "",
      };
    },
    methods: {
      onClickParameter(v) {
        this.selectedParamStationsHref = v.parameterLink;
      },
      onClickStation(selectionData) {
        this.selectedStationData = selectionData;
      },
      onClickPeriod(v) {
        this.selectedPeriodHref = v.data;
      },
    },
  };
</script>
