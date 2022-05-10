<template>
  <br />
  <div>
    <summary-view-header-component />
  </div>

  <div class="prec-and-sun-container">
    <div class="precipitation">Nederbörd <br/><img class="precepitation-image" src="../assets/prototype icons/Group 12.svg" alt="rain cloud"><weather-summary-component :param="preciptation" /> mm</div>
    <div class="sun-hour">Soltimmar <br/><img class="sun-hour-image" src ="../assets/prototype icons/sun-solid 2.svg" alt="sun"><weather-summary-component :param="sunHours" /> h</div>
  </div>
  maxTemp: <weather-summary-component :param="maxTemp" />
  <br />
  minTemp: <weather-summary-component :param="minTemp" />
  <br />
  maxWind: <weather-summary-component :param="maxWind" />
  <br />
  maxPrecipitation: <weather-summary-component :param="maxDailyPrecipitation" />

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

  {{ selectedStationData.longitude }}
  {{ selectedStationData.latitude }}

  <img src="./../assets/wireframes/summary.png" alt="" />
</template>

<script>
import paramComponent from "@/components/observations/ParamComponent.vue";
import stationComponent from "@/components/observations/StationComponent.vue";
import periodComponent from "@/components/observations/PeriodComponent.vue";
import dataComponent from "@/components/observations/DataComponent.vue";
import SummaryViewHeaderComponent from "@/components/summary/SummaryViewHeaderComponent.vue";
import WeatherSummaryComponent from "@/components/summary/WeatherSummaryComponent.vue";
import smhiService from "@/services/smhiService";

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
      sunHours: 10,
      maxTemp: 20,
      minTemp: 19,
      maxDailyPrecipitation: 5,
      maxWind: 25,
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

<style scoped>
.prec-and-sun-container {
  display: flex;
  justify-content: space-between;
 
}

.precipitation {
  font-size: 1.2em;
  font-weight: 600;
  margin: 1.5em;
}

.precepitation-image {
  width: 3em;
  height: auto;
}

.sun-hour {
  font-size: 1.2em;
  font-weight: 600;
  margin: 1.5em;

}

.sun-hour-image {
  width: 3em;
  height: auto;
}
</style>
