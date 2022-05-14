<template>
  <div class="weather-warning">vädervarning</div>
  {{ test() }}
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
  methods: {
    async test() {
      let url = "https://opendata-download-warnings.smhi.se/ibww/api/version/1/warning.json"
      let res = await smhiService.fetchData(url);
      console.log(res);
      // let longitude = this.getCoordinates.longitude;
      // let latitude = this.getCoordinates.latitude;

      let longitude = 16.051568
      let latitude = 56.776062


      res.forEach(warning => {
        if (warning.warningAreas[0].area.type === 'Feature') {
          warning.warningAreas.forEach(warningArea => {
            console.log(warningArea.id);
            console.log(warningArea.eventDescription.sv);
            if (warningArea.area.geometry.type === 'MultiPolygon') {
              warningArea.area.geometry.coordinates.forEach(coordinate => {

                let cornersLong = coordinate[0][0]
                let cornersLat = coordinate[0][1]

                let isInPolygon = geoLocationHelper.rayCastingAlgorithm(latitude, longitude, cornersLat, cornersLong);
                console.log(isInPolygon + "---------");
              })
            } else {
              console.log(warningArea.area.geometry.coordinates);
              let cornersLong = warningArea.area.geometry.coordinates[0][0]
              let cornersLat = warningArea.area.geometry.coordinates[0][1]

              let isInPolygon = geoLocationHelper.rayCastingAlgorithm(latitude, longitude, cornersLat, cornersLong);
              console.log(isInPolygon + "&&&&&&&&&&");



            }
          })
        }
      })
    }
  }


}

</script>

<style scoped></style>
