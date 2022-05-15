<template>
  <div class="weather-warning">vädervarning</div>
<!--  {{ test() }}-->
</template>
<script>
import smhiService from '@/services/smhiService.js'
import {mapState} from "pinia/dist/pinia";
import {useUserDataStore} from "@/stores/useUserDataStore";
import geoLocationHelper from "@/helpers/geoLocationHelper.js";


export default {
  name: 'weather-warning-component',
  computed: {
    ...mapState(useUserDataStore, ["getCoordinates"])
  },
  created() {
    console.log(this.test());
  },
  methods: {
    async test() {
      let url = "https://opendata-download-warnings.smhi.se/ibww/api/version/1/warning.json"
      let res = await smhiService.fetchData(url);
      let longitude = 16.43
      let latitude = 57.04

      res.forEach(warning => {
        if (warning.warningAreas[0].area.type === 'Feature') {
          warning.warningAreas.forEach(warningArea => {

            if (warningArea.area.geometry.type === 'MultiPolygon') {
              warningArea.area.geometry.coordinates[0].forEach(coordinate => {
                let cornersLong = []
                let cornersLat = []
                coordinate.forEach(coordinate => {

                  cornersLong.push(coordinate[0])
                  cornersLat.push(coordinate[1])
                })

                let isInPolygon = geoLocationHelper.rayCastingAlgorithm(latitude, longitude, cornersLat, cornersLong);
                return {
                  warning: isInPolygon,
                  descr: warning.event.sv,
                }
              })
            } else {

              let cornersLong = []
              let cornersLat = []
              warningArea.area.geometry.coordinates.forEach(coordinate => {

                cornersLong.push(coordinate[0])
                cornersLat.push(coordinate[1])
              })

              let isInPolygon = geoLocationHelper.rayCastingAlgorithm(latitude, longitude, cornersLat, cornersLong);

              return {
                warning: isInPolygon,
                descr: warning.event.sv,
              }

            }
          })
        }
      })
    }
  }


}

</script>

<style scoped></style>
