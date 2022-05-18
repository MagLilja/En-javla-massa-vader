<template>
  <loading-component :loading="loading" class=""/>

  <div
      v-if="temperature && wind && precipitation"
      class="flex flex-col gap-10 items-center m-10 p-4 my-auto w-fit md:m-0 md:p-0"
  >
    <h2 class="text-[2em] my-10 md:hidden">Sämre väder just nu!</h2>
    <p class="md:hidden">
      Tycker du att vädret suger? Det finns dom som har det värre.
    </p>
    <worst-weather-param-component :parameter="temperature" title="Kallare"/>
    <worst-weather-param-component :parameter="precipitation" title="Blötare"/>
    <worst-weather-param-component :parameter="wind" title="Blåsigare"/>
  </div>
</template>

<script>
import swedenCoordinates from '@/assets/json/sweden-polygon.json'
import WorstWeatherDataManager from '@/managers/WorstWeatherDataManager.js'
import WorstWeatherParamComponent from '@/components/worstWeather/WorstWeatherParamComponent.vue'
import LoadingComponent from '@/components/global/LoadingComponent.vue'

export default {
  components: {LoadingComponent, WorstWeatherParamComponent},
  data() {
    return {
      temperature: undefined,
      precipitation: undefined,
      wind: undefined,
      loading: false,
    }
  },
  async mounted() {
    this.loading = true
    this.temperature = await WorstWeatherDataManager.getMinMaxValCoord(
        't',
        2,
        swedenCoordinates,
        20,
    )
    this.precipitation = await WorstWeatherDataManager.getMinMaxValCoord(
        'prec1h',
        0,
        swedenCoordinates,
        20,
    )
    this.wind = await WorstWeatherDataManager.getMinMaxValCoord(
        'ws',
        10,
        swedenCoordinates,
        20,
    )
    this.loading = false
  },
}
</script>
