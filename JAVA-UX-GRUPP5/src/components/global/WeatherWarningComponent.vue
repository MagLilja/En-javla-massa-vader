<template>
  <div class="weather-warning h-[2em] flex gap-5 bg-[#C1E0EAFF] justify-center" :class="warningClass">
<!--    <div v-for="(instance, index) of warning" :key="index">-->
<!--      <div v-if="instance.warning">-->
<!--        {{ setWarningColor() }}-->
<!--        {{ registerWarning() }}-->
<!--&lt;!&ndash;        &ndash;&gt;-->
<!--        <div class="flex justify-center gap-4" v-if="count === 201">-->
<!--          <img src="../../assets/prototype_icons/warning.svg" alt="" class="h-8 aspect-square inline-block">-->
<!--          <a-->
<!--            href="https://www.smhi.se/vader/varningar-och-brandrisk/varningar-och-meddelanden/varningar" class="hover:underline">-->

<!--          {{ instance.descr }} i ditt område</a></div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>
<script>
import smhiService from '@/services/smhiService.js'
import {mapState} from 'pinia/dist/pinia'
import {useUserDataStore} from '@/stores/useUserDataStore'
import WorstWeatherDataManager from '@/managers/WorstWeatherDataManager.js'


export default {
  name: 'weather-warning-component',
  data() {
    return {
      warning: false,
      warningClass: "",
      count: 0,
    }
  },
  computed: {

    ...mapState(useUserDataStore, ['getCoordinates']),
  },
  async created() {
    // this.warning = await this.checkIfInWarningPolygon()

  },
  methods: {
    setWarningColor() {
      this.warningClass = "bg-red-500"
    },
    registerWarning() {
      this.count++
    },
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

                let isInPolygon = WorstWeatherDataManager.rayCastingAlgorithm(
                    latitude,
                    longitude,
                    cornersLat,
                    cornersLong,
                )
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

              let isInPolygon = WorstWeatherDataManager.rayCastingAlgorithm(
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
