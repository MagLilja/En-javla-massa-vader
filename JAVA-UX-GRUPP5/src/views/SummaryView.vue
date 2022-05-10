<template>
  <br />
  <div>
    <summary-view-header-component />
  </div>

  <div class="container">
  
    <div class="text">Nederbörd &nbsp &nbsp &nbsp &nbsp<br/><img class="image" src="../assets/prototype icons/Group 12.svg" alt="rain cloud"><weather-summary-component :param="preciptation" /> mm</div>
    <div class="text">Soltimmar <br/><img class="image" src ="../assets/prototype icons/Group 7.svg" alt="sun"><weather-summary-component :param="sunHours" /> h</div>
  </div>

  <div class="container">
    <div class="text"> Varmaste dagen &nbsp<br/><img class="image" src="../assets/prototype icons/sun-solid 2.svg" alt="rain cloud"> <weather-summary-component :param="maxTemp" />&#176;C</div>
    <div class="text"> Kallaste dagen <br/><img class="image" src="../assets/prototype icons/snowflake-solid 3.svg" alt="rain cloud"><weather-summary-component :param="minTemp" />&#176;C</div>
  </div>

  <div class="container">
    <div class="text"> Blåsigaste dagen <br/><img class="image" src="../assets/prototype icons/wind-solid 3.svg" alt="rain cloud"> <weather-summary-component :param="maxWind" />m/s</div>
    <div class="text"> Blötaste dagen <br/><img class="image" src="../assets/prototype icons/snowflake-solid 3.svg" alt="rain cloud"><weather-summary-component :param="maxDailyPrecipitation" />mm</div>
  </div>

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
.container {
  display: flex;
  justify-content: flex-start;
 
}

.text {
  font-size: 1em;
  font-weight: 600;
  margin: 1.2em;
}

.image {
  margin: 0.5em;
  width: 3em;
  height: auto;
}

</style>
