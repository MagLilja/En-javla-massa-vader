<template>
  worst weather view here

  <img src="./../assets/wireframes/worst.png" alt=""/>
  <div v-if="temperature && wind && precipitation">Kallast:
    {{ temperature.minValue }}
    {{ temperature.unit }}
    {{ temperature.minCoordinates }}
    <div v-if="temperature.city.minValue">
    {{ temperature.city.minValue.features[0].properties.city }}
    </div>
    <br>

    Blötast:
    {{ precipitation.maxValue }}
    {{ precipitation.unit }}
    {{ precipitation.maxCoordinates }}
<!--    {{ temperature.city.maxValueGeo.features[0].properties.city }}-->
    <br>
    Blåsigast:
    {{ wind.maxValue }}
    {{ wind.unit }}
    {{ wind.maxCoordinates }}
<!--    {{ temperature.city.maxValueGeo.features[0].properties.city }}-->
  </div>

</template>

<script>
import swedenCoordinates from "@/assets/sweden-polygon.json";
import geoLocationHelper from "@/helpers/geoLocationHelper.js";

export default {
  data() {
    return {
      temperature: undefined,
      precipitation: undefined,
      wind: undefined,
    }
  },
  async created() {
    this.temperature = await geoLocationHelper.getMinMaxValCoord("t", 2, swedenCoordinates);
    this.precipitation = await geoLocationHelper.getMinMaxValCoord("prec1h", 0, swedenCoordinates);
    this.wind = await geoLocationHelper.getMinMaxValCoord("ws", 10, swedenCoordinates);
  },
  methods: {},
  watch: {
    temperature: {
      deep: true,
      async handler(){
        console.log("hello");
        // this.temperature.city = await geoLocationHelper.getCityFromGeoLocationDataApi(this.temperature)
      }
    }
  },
}
</script>

<style scoped>

</style>
