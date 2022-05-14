<template>


    <loading-component :loading="loading" class=""/>

  <div v-if="temperature && wind && precipitation" class="flex flex-col gap-10 m-10 p-4 my-auto w-fit">
    <h2 class="text-[2em] my-10">Sämre väder just nu!</h2>
    <p>Tycker du att vädret suger? Det finns dom som har det värre.</p>
    <worst-weather-param-component :parameter="temperature" title="Kallaste" />
    <worst-weather-param-component :parameter="precipitation" title="Blötaste"/>
    <worst-weather-param-component :parameter="wind" title="Blåsigaste"/>
  </div>
  <!--  <img src="../assets/wireframes/ej2lo70n.bmp" alt="">-->
</template>

<script>
import swedenCoordinates from "@/assets/sweden-polygon.json";
import geoLocationHelper from "@/helpers/geoLocationHelper.js";
import WorstWeatherParamComponent from "@/components/worstWeather/WorstWeatherParamComponent.vue";
import LoadingComponent from "@/components/global/LoadingComponent.vue";



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
    this.temperature = await geoLocationHelper.getMinMaxValCoord("t", 2, swedenCoordinates, 20);
    this.precipitation = await geoLocationHelper.getMinMaxValCoord("prec1h", 0, swedenCoordinates, 20);
    this.wind = await geoLocationHelper.getMinMaxValCoord("ws", 10, swedenCoordinates, 20);
    this.loading = false
    },
  methods: {},
  watch: {

  },
}
</script>

