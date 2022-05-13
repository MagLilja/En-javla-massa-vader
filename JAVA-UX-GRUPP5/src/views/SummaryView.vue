<template>
  <br/>
  <div class="m-5">
    <summary-view-header-component/>
  </div>

  <section class="flex flex-col gap-7 mb-44">
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
        <weather-summary-component :param="maxTemp" :data-unit="tempUnit"/>
      </div>
      <div class="sub-container">
        Kallaste dagen<img
          class="image"
          src="../assets/prototype_icons/snowflake-solid3.svg"
          alt="rain cloud"
      />
        <weather-summary-component :param="minTemp" :data-unit="tempUnit"/>
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
          <weather-summary-component :param="maxWind" :data-unit="windUnit"/>
        </div>
      </div>
      <div class="sub-container">
        Blötaste dagen<img
          class="image"
          src="../assets/prototype_icons/snowflake-solid3.svg"
          alt="rain cloud"
      />
        <weather-summary-component :param="maxDailyPrecipitation" :data-unit="rainUnit"/>

      </div>
    </div>
  </section>

</template>

<script>
import paramComponent from '@/components/observations/ParamComponent.vue'
import stationComponent from '@/components/observations/StationComponent.vue'
import periodComponent from '@/components/observations/PeriodComponent.vue'
import dataComponent from '@/components/observations/DataComponent.vue'
import SummaryViewHeaderComponent from '@/components/summary/SummaryViewHeaderComponent.vue'
import WeatherSummaryComponent from '@/components/summary/WeatherSummaryComponent.vue'

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
      tempUnit:"\u00B0C",
      windUnit: "m/s",
      rainUnit: "mm",
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
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 1rem;
  padding:1em;
  border-bottom: 2px solid;
  border-right: 2px solid;
  border-top: 1px solid;
  border-left: 1px solid;
  border-color: var(--primary-color-lightblue);
}

.sub-container > img {
  width: 3em;
  aspect-ratio: 1;
}
</style>
