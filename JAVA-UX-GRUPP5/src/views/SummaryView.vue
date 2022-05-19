<template>

    <summary-view-header-component class=""/>


  <section class="section gap-16 mt-10">
    <div class="sub-container">
      <div class="title">Nederbörd</div>
      <img
          class="image"
          src="../assets/icons/Group12.svg"
          alt="rain cloud"
      />
      <weather-summary-component :param="precipitation" :data-unit="rainUnit"/>
    </div>
    <div class="sub-container">
      <div class="title">Soltimmar</div>
      <img class="image" src="../assets/icons/Group7.svg" alt="sun"/>
      <weather-summary-component :param="sunHours" :data-unit="sunUnit"/>
    </div>

    <div class="sub-container">
      <div class="title">Varmaste dagen</div>
      <img
          class="image"
          src="../assets/icons/sun-solid2.svg"
          alt="rain cloud"
      />
      <weather-summary-component :param="maxTemp" :data-unit="tempUnit"/>
    </div>
    <div class="sub-container">
      <div class="title">Kallaste dagen</div>
      <img
          class="image"
          src="../assets/icons/snowflake-solid3.svg"
          alt="rain cloud"
      />
      <weather-summary-component :param="minTemp" :data-unit="tempUnit"/>
    </div>

    <div class="sub-container">
      <div class="title">Blåsigaste dagen</div>
      <img
          class="image"
          src="../assets/icons/wind-solid3.svg"
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
          src="../assets/icons/Group12.svg"
          alt="rain cloud"
      />
      <weather-summary-component
          :param="maxDailyPrecipitation"
          :data-unit="rainUnit"
      />
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
      precipitation: 23,
      sunHours: 10,
      maxTemp: 20,
      minTemp: 19,
      maxDailyPrecipitation: 5,
      maxWind: 25,
      tempUnit: '\u00B0C',
      windUnit: 'm/s',
      rainUnit: 'mm',
      sunUnit: 'h',
    }
  },
}
</script>

<style scoped>
.section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 150px));
  justify-content: center;
  width: 100%;
  margin-bottom: 7em;
}

.sub-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 0 0.5em;
}

.sub-container > .title {
  grid-column: span 2;
  font-weight: 700;
}

.sub-container > img {
  width: 2.5em;
  aspect-ratio: 1;
}
</style>
