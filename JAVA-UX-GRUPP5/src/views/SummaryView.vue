<template>
  <br/>
  <div>
    <summary-view-header-component/>
  </div>

  <section class="flex flex-col gap-7">
    <div class="container">
      <div class="sub-container">
        Nederbörd<img
          class="image"
          src="../assets/prototype_icons/Group12.svg"
          alt="rain cloud"
      />
        <weather-summary-component :param="preciptation"/>
        mm
      </div>
      <div class="sub-container">
        Soltimmar<img
          class="image"
          src="../assets/prototype_icons/Group7.svg"
          alt="sun"
      />
        <weather-summary-component :param="sunHours"/>
        h
      </div>
    </div>

    <div class="container">
      <div class="sub-container">
        Varmaste dagen<img
          class="image"
          src="../assets/prototype_icons/sun-solid2.svg"
          alt="rain cloud"
      />
        <weather-summary-component :param="maxTemp"/>&#176;C
      </div>
      <div class="sub-container">
        Kallaste dagen<img
          class="image"
          src="../assets/prototype_icons/snowflake-solid3.svg"
          alt="rain cloud"
      />
        <weather-summary-component :param="minTemp"/>&#176;C
      </div>
    </div>

    <div class="container">
      <div class="sub-container">
        <div>Blåsigaste dagen</div>
        <img
            class="image"
            src="../assets/prototype_icons/wind-solid3.svg"
            alt="rain cloud"
        />
        <div class="">
          <weather-summary-component :param="maxWind"/>
          m/s
        </div>
      </div>
      <div class="sub-container">
        Blötaste dagen<img
          class="image"
          src="../assets/prototype_icons/snowflake-solid3.svg"
          alt="rain cloud"
      />
        <weather-summary-component :param="maxDailyPrecipitation"/>
        mm
      </div>
    </div>
  </section>

  <!--  -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
  <!--  <param-component @paramSelectionHref="onClickParameter" />-->
  <!--  <station-component-->
  <!--    :selected-param-stations-href="selectedParamStationsHref"-->
  <!--    @selectedStationHref="onClickStation"-->
  <!--  />-->
  <!--  <period-component-->
  <!--    :selected-station-href="selectedStationData.data"-->
  <!--    @selectedPeriodForStationHref="onClickPeriod"-->
  <!--  />-->
  <!--  <data-component :selected-period-href="selectedPeriodHref" />-->

  <!--  {{ selectedStationData.longitude }}-->
  <!--  {{ selectedStationData.latitude }}-->

  <!--  <img src="./../assets/wireframes/summary.png" alt="" />-->
</template>

<script>
import paramComponent from '@/components/observations/ParamComponent.vue'
import stationComponent from '@/components/observations/StationComponent.vue'
import periodComponent from '@/components/observations/PeriodComponent.vue'
import dataComponent from '@/components/observations/DataComponent.vue'
import SummaryViewHeaderComponent from '@/components/summary/SummaryViewHeaderComponent.vue'
import WeatherSummaryComponent from '@/components/summary/WeatherSummaryComponent.vue'
import smhiService from '@/services/smhiService'

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
      selectedParamStationsHref: '',
      selectedStationData: '',
      selectedPeriodHref: '',
      preciptation: 23,
      sunHours: 10,
      maxTemp: 20,
      minTemp: 19,
      maxDailyPrecipitation: 5,
      maxWind: 25,
    }
  },
  methods: {
    onClickParameter(v) {
      this.selectedParamStationsHref = v.parameterLink
    },
    onClickStation(selectionData) {
      this.selectedStationData = selectionData
    },
    onClickPeriod(v) {
      this.selectedPeriodHref = v.data
    },
  },
}
</script>

<style scoped>
.container {
  border: 1px solid red;
  display: flex;
  justify-content: space-around;
}

.sub-container {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  align-items: flex-start;
  justify-content: flex-start;
  width:40%;
}

.sub-container > img {
  width: 3em;
  aspect-ratio: 1;
}
</style>
