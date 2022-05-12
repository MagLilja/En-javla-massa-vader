<template>


  <div v-if="temperature && wind && precipitation" class="flex flex-col justify-center items-center gap-10">
    <worst-weather-param-component :parameter="temperature" title="Kallaste" />
    <worst-weather-param-component :parameter="precipitation" title="Blötaste"/>
    <worst-weather-param-component :parameter="wind" title="Blåsigaste"/>
  </div>
  <!--  <img src="../assets/wireframes/ej2lo70n.bmp" alt="">-->
</template>

<script>
import swedenCoordinates from "@/assets/sweden-polygon.json";
import geoLocationHelper from "@/helpers/geoLocationHelper.js";
import WorstWeatherParamComponent from "@/components/WorstWeatherParamComponent.vue";



export default {
  components: {WorstWeatherParamComponent},
  data() {
    return {
      temperature: undefined,
      precipitation: undefined,
      wind: undefined,
    }
  },
  async created() {
    this.temperature = await geoLocationHelper.getMinMaxValCoord("t", 2, swedenCoordinates, 20);
    this.precipitation = await geoLocationHelper.getMinMaxValCoord("prec1h", 0, swedenCoordinates, 20);
    this.wind = await geoLocationHelper.getMinMaxValCoord("ws", 10, swedenCoordinates, 20);
  },
  methods: {},
  watch: {
    // temperature: {
    //   deep: true,
    //   async handler() {
    //     console.log("hello");
    //     // this.temperature.city = await geoLocationHelper.getCityFromGeoLocationDataApi(this.temperature)
    //   }
    // }
  },
}
</script>

