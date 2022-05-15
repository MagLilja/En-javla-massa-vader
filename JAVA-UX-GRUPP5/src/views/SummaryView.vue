<template>

  <div class="">
    <summary-view-header-component class=""/>
  </div>

  <section class="section">

    <div class="sub-container">
      <div class="title">Nederbörd</div>
      <img
          class="image"
          src="../assets/prototype_icons/Group12.svg"
          alt="rain cloud"
      />
      <weather-summary-component :param="preciptation" :data-unit="rainUnit"/>
    </div>
    <div class="sub-container">
      <div class="title">Soltimmar</div>
      <img
          class="image"
          src="../assets/prototype_icons/Group7.svg"
          alt="sun"
      />
      <weather-summary-component :param="sunHours" :data-unit="sunUnit"/>

    </div>


    <div class="sub-container">
      <div class="title">Varmaste dagen</div>
      <img
          class="image"
          src="../assets/prototype_icons/sun-solid2.svg"
          alt="rain cloud"
      />
      <weather-summary-component :param="maxTemp" :data-unit="tempUnit"/>
    </div>
    <div class="sub-container">
      <div class="title">Kallaste dagen</div>
      <img
          class="image"
          src="../assets/prototype_icons/snowflake-solid3.svg"
          alt="rain cloud"
      />
      <weather-summary-component :param="minTemp" :data-unit="tempUnit"/>
    </div>


    <div class="sub-container">
      <div class="title">Blåsigaste dagen</div>
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
      <div class="title">Blötaste dagen</div>
      <img
          class="image"
          src="../assets/prototype_icons/Group12.svg"
          alt="rain cloud"
      />
      <weather-summary-component :param="maxDailyPrecipitation" :data-unit="rainUnit"/>

    </div>

  </section>

</template>

<script>
import SummaryViewHeaderComponent from '@/components/summary/SummaryViewHeaderComponent.vue'
import WeatherSummaryComponent from '@/components/summary/WeatherSummaryComponent.vue'

export default {
  components: {
    SummaryViewHeaderComponent,

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
      tempUnit: "\u00B0C",
      windUnit: "m/s",
      rainUnit: "mm",
      sunUnit: "h",
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

.section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 190px));
  grid-gap:1em;
  justify-content: center;
  width:100%;
  height:100%;
  margin-bottom: 7em;
}

.sub-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.3em;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;


  padding: 0.8em;

  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 1rem;
  border-bottom: 2px solid;
  border-right: 2px solid;
  border-top: 1px solid;
  border-left: 1px solid;
  border-color: var(--primary-color-lightblue);
}

.sub-container > .title {
  grid-column: span 2;
}

.sub-container > img {
  width: 2.5em;
  aspect-ratio: 1;
}
</style>
