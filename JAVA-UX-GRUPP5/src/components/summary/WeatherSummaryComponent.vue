<template>
  <div v-if="date">
    {{ properDate(date) }}
    <div class="font-bold">{{ value }} {{ dataUnit }}</div>
  </div>
  <div v-else>
    <div class="font-bold">{{ value }} {{ dataUnit }}</div>
  </div>




</template>

<script>
import smhiService from '@/services/smhiService.js'
import {useUserDataStore} from '@/stores/useUserDataStore.js'
import {mapState} from 'pinia'

export default {
  props: {
    param: String,
    dataUnit: String,
  },
  data() {
    return {
      stationList: undefined,
      nearestStation: undefined,
      value: undefined,
      date: undefined,
    }
  },

  computed: {
    ...mapState(useUserDataStore, ['getCoordinates']),
  },
  watch: {
    stationList: {
      deep: true,
      handler() {
        this.getStationNo()
      },
    },
    nearestStation: {
      deep: true,
      async handler() {
        let res = await this.getSummary()
        this.value = res.value
        this.date = res.date
      },
    },
  },
  mounted() {
    this.fetchStationList()
  },

  methods: {
    async getSummary() {
      // let res = weatherSummaryManager.getSummary(this.param, this.nearestStation)
      // res.log
      // return res

      let hrefToStationPeriods = await smhiService.fetchData(
          this.nearestStation.link[0].href,
      )

      for (let period of hrefToStationPeriods.period) {
        if (period.key === 'latest-months') {
          let hrefToPeriodData = await smhiService.fetchData(
              period.link[0].href,
          )
          let actualData = await smhiService.fetchData(
              hrefToPeriodData.data[0].link[0].href,
          )
          let today = new Date()
          let lastMonth = today.getMonth() - 1
          switch (this.param) {
            case 23:
              let res = actualData.value[actualData.value.length - 1].value
              return {value: res}

            case 10:
              let timestamp = new Date(actualData.value[0].date)
              let totalValue = 0
              for (let value of actualData.value) {
                let timestamp = new Date(value.date)
                if (timestamp.getMonth() === lastMonth) {
                  totalValue += parseInt(value.value)
                }
              }
              totalValue = totalValue / 3600
              return {value: Math.round(totalValue)}

            case 20:
              let highestTemp = -100
              let hottestDay = undefined
              for (let value of actualData.value) {
                let date = new Date(value.ref)
                if (date.getMonth() === lastMonth) {
                  if (parseFloat(value.value) > highestTemp) {
                    highestTemp = parseFloat(value.value)
                    hottestDay = value.ref
                  }
                }
              }
              return {
                value: highestTemp,
                date: hottestDay
              }

            case 19:
              let lowestTemp = 100
              let coldestDay = undefined
              for (let value of actualData.value) {
                let date = new Date(value.ref)

                if (date.getMonth() === lastMonth) {
                  if (parseFloat(value.value) < lowestTemp) {
                    coldestDay = value.ref
                    lowestTemp = parseFloat(value.value)
                  }
                }
              }
              return {
                value: lowestTemp,
                date: coldestDay
              }
            case 5:
              let mostRain = -100
              let rainiestDay = undefined
              for (let value of actualData.value) {
                let date = new Date(value.ref)

                if (date.getMonth() === lastMonth) {
                  if (parseFloat(value.value) > mostRain) {
                    mostRain = parseFloat(value.value)
                    rainiestDay = value.ref
                  }
                }
              }
              return {
                value: mostRain,
                date: rainiestDay
              }
            case 25:
              let mostWind = 0
              let windiestDay = undefined
              //console.log(actualData)

              for (let value of actualData.value) {
                let date = new Date(value.date)

                if (date.getMonth() === lastMonth) {
                  if (value.value > mostWind) {
                    mostWind = value.value
                    windiestDay = date.toLocaleDateString('sv-SE')
                  }
                }
              }

              return {
                value: mostWind,
                date: windiestDay
              }
          }
        }
      }
    },
    properDate(date) {
      let ex = new Date(date)
      return ex.toLocaleDateString("sv-SE", {day: "2-digit", month: "short"})
    },

    getStationNo() {
      let minDistance = 10000000
      let closestStation
      // Koordinaterna för Yrgo. Kan användas i utvecklingssyfte.
      //let long = 11.93672177256134
      //let lat = 57.70585326345131
      let long = this.getCoordinates.longitude
      let lat = this.getCoordinates.latitude

      for (let station of this.stationList) {
        let distance = Math.sqrt(
            (long - station.longitude) * (long - station.longitude) +
            (lat - station.latitude) * (lat - station.latitude),
        )

        if (distance < minDistance) {
          minDistance = distance
          closestStation = station
        }
      }
      if (closestStation.name === 'Göteborg') {
        for (let station of this.stationList) {
          if (station.name === 'Göteborg A') {
            closestStation = station
          }
        }
      }
      this.nearestStation = closestStation
    },

    async fetchStationList() {
      let url = `https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/${this.param}.json`
      let result = await smhiService.fetchData(url)
      this.stationList = result.station
    },
  },
}
</script>
