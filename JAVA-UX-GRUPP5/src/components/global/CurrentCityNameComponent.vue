<template>
  <div v-if="userGeoLocationData">
    <div class="city-name text-6xl">{{ currentCityName }}</div>
  </div>
</template>
<script>
import {useUserDataStore} from '@/stores/useUserDataStore.js'
import {mapActions, mapState} from 'pinia'

export default {
  name: 'current-city-name-component',
  data() {
    return {
      userGeoLocationData: undefined,
      coordinates: this.getCoordinates,
      currentCityName: undefined,
    }
  },
  computed: {
    ...mapState(useUserDataStore, ['getCoordinates', 'getUserGeoLocationData']),
  },
  watch: {
    getCoordinates() {
      this.getUserGeoLocationDataFromApi()
    },
  },
  created() {
    this.getUserGeoLocationDataFromApi()
  },
  methods: {
    checkForGothenburg(cityName) {
      if (cityName === 'Gothenburg') {
        return 'Göteborg'
      }
      return cityName
    },
    getRoundedCoordinate(v) {
      return Math.round((v + Number.EPSILON) * 100) / 100
    },
    async getUserGeoLocationDataFromApi() {
      let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${this.getCoordinates.latitude}&lon=${this.getCoordinates.longitude}&apiKey=6c6c0640f23d468ab398e55bd11e17d9`
      // checks if the coordinates in the Store match the geolocation data coordinates in the Store
      if (
          this.getRoundedCoordinate(this.getCoordinates.longitude) ===
          this.getRoundedCoordinate(
              this.getUserGeoLocationData.features[0].geometry.coordinates[0],
          )
      ) {
        console.info('Already got UserGeoLocationData for this coordinates')
        this.userGeoLocationData = this.getUserGeoLocationData
        this.currentCityName = this.checkForGothenburg(
            this.userGeoLocationData.features[0].properties.city,
        )
      }
      // if the coordinates in the Store doesn't match the geolocation data coordinates in the Store get new geolocation data
      else {
        if (this.getCoordinates.origin === 'FROM_SEARCH') {
          this.currentCityName = this.getCoordinates.searchSelection
          this.userGeoLocationData = this.getCoordinates.searchSelection
        } else {
          let response = await fetch(url)
          let result = await response.json()
          this.userGeoLocationData = result
          this.currentCityName = this.checkForGothenburg(
              this.userGeoLocationData.features[0].properties.city,
          )
          this.setUserGeoLocationData(result)
          console.info('UserGeoLocationData updated')
        }
      }
    },
    ...mapActions(useUserDataStore, ['setUserGeoLocationData']),
  },
}
</script>

