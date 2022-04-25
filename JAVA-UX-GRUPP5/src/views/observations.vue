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
  <data-component :selectedPeriodHref="selectedPeriodHref"

    />
</template>

<script>
import paramComponent from "@/components/paramComponent.vue";
import stationComponent from "@/components/stationComponent.vue";
import periodComponent from "@/components/periodComponent.vue";
import dataComponent from "@/components/dataComponent.vue";

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
