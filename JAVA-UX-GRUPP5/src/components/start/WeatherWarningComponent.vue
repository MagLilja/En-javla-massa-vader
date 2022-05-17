<template>
  <div class="weather-warning h-16 flex">
    <div v-for="instance of warning">
      <div v-if="instance.warning">{{ instance.descr }}</div>
      <!--      <div v-else>Om du befinner dig i ett område med en vädervarning kommer det att synas här!</div>-->
    </div>
  </div>
</template>
<script>
import smhiService from '@/services/smhiService.js'
import { mapState } from 'pinia/dist/pinia'
import { useUserDataStore } from '@/stores/useUserDataStore'
import geoLocationHelper from '@/helpers/geoLocationHelper.js'

export default {
  name: 'weather-warning-component',
  data() {
    return {
      warning: false,
    }
  },
  computed: {
    ...mapState(useUserDataStore, ['getCoordinates']),
  },
  async created() {
    this.warning = await this.checkIfInWarningPolygon()
  },
  methods: {
    async checkIfInWarningPolygon() {
      let url =
        'https://opendata-download-warnings.smhi.se/ibww/api/version/1/warning.json'
      let res = await smhiService.fetchData(url)
      let longitude = this.getCoordinates.longitude //16.43
      let latitude = this.getCoordinates.latitude //57.04
      let warningData = []

      res.forEach((warning) => {
        if (warning.warningAreas[0].area.type === 'Feature') {
          warning.warningAreas.forEach((warningArea) => {
            if (warningArea.area.geometry.type === 'MultiPolygon') {
              warningArea.area.geometry.coordinates[0].forEach((coordinate) => {
                let cornersLong = []
                let cornersLat = []
                coordinate.forEach((coordinate) => {
                  cornersLong.push(coordinate[0])
                  cornersLat.push(coordinate[1])
                })

                let isInPolygon = geoLocationHelper.rayCastingAlgorithm(
                  latitude,
                  longitude,
                  cornersLat,
                  cornersLong,
                )
                console.log(isInPolygon)
                warningData.push({
                  warning: isInPolygon,
                  descr: warning.event.sv,
                })
              })
            } else {
              let cornersLong = []
              let cornersLat = []
              warningArea.area.geometry.coordinates.forEach((coordinate) => {
                cornersLong.push(coordinate[0])
                cornersLat.push(coordinate[1])
              })

              let isInPolygon = geoLocationHelper.rayCastingAlgorithm(
                latitude,
                longitude,
                cornersLat,
                cornersLong,
              )

              warningData.push({
                warning: isInPolygon,
                descr: warning.event.sv,
              })
            }
          })
        }
      })
      return warningData
    },
  },
}
</script>

<style scoped></style>
