<template>
  <br>
  <summary-view-header-component/>
  regn: <weather-summary-component :param="preciptation" />
  <br>
  sol: <weather-summary-component :param="sunHours" />
  <br>

  ---------------------------------------------------------------------
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


  <img src="./../assets/wireframes/summary.png" alt="">
</template>

<script>
import paramComponent from "@/components/observations/ParamComponent.vue";
import stationComponent from "@/components/observations/StationComponent.vue";
import periodComponent from "@/components/observations/PeriodComponent.vue";
import dataComponent from "@/components/observations/DataComponent.vue";
import SummaryViewHeaderComponent from "@/components/summary/SummaryViewHeaderComponent.vue";
import WeatherSummaryComponent from    "@/components/summary/WeatherSummaryComponent.vue";

export default {
    components: {
      SummaryViewHeaderComponent,
      periodComponent,
      stationComponent,
      paramComponent,
      dataComponent,
      WeatherSummaryComponent,
    },
    data() {
      return {
        selectedParamStationsHref: "",
        selectedStationData: "",
        selectedPeriodHref: "",
        preciptation: 23,
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
