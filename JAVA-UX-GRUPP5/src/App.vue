<template>
  <loading-component :loading="loading"/>
  <div v-if="isLoaded" class="site-container">
    <top-nav-bar-component/>
    <div class="hidden md:block w-full">
      <weather-warning-component/>
    </div>

    <div class="view-container">
      <div class="hidden md:block">
        <twenty-four-forecast-desktop-card/>
      </div>

      <router-view/>
      <div class="hidden md:block mt-20">
        <favorite-desktop-card/>
      </div>

      <div class="hidden md:block">
        <ten-day-desktop-card/>
      </div>

      <div class="hidden md:block">
        <summary-desktop-card class=""/>
      </div>

      <div class="hidden md:block">
        <worst-weather-desktop-card/>
      </div>
    </div>
    <div class="block md:hidden">
      <navbar-component/>
    </div>
  </div>
</template>
<script>
//modules
import {mapActions, mapState} from 'pinia'
//store
import {useUserDataStore} from '@/stores/useUserDataStore.js'
//Global
import smhiService from '@/services/smhiService'
import LoadingComponent from '@/components/global/LoadingComponent.vue'
import WeatherWarningComponent from '@/components/start/WeatherWarningComponent.vue'
// navigation
import NavbarComponent from '@/components/navigation/NavbarComponent.vue'
import TopNavBarComponent from '@/components/navigation/TopNavBarComponent.vue'
// Desktop cards
import TenDayDesktopCard from '@/components/desktopCards/TenDayDesktopCard.vue'
import SummaryDesktopCard from '@/components/desktopCards/SummaryDesktopCard.vue'
import TwentyFourForecastDesktopCard from '@/components/desktopCards/TwentyFourForecastDesktopCard.vue'
import FavoriteDesktopCard from '@/components/desktopCards/FavoriteDesktopCard.vue'
import WorstWeatherDesktopCard from '@/components/desktopCards/WorstWeatherDesktopCard.vue'

export default {
  components: {
    LoadingComponent,
    TenDayDesktopCard,
    NavbarComponent,
    TopNavBarComponent,
    SummaryDesktopCard,
    TwentyFourForecastDesktopCard,
    WeatherWarningComponent,
    FavoriteDesktopCard,
    WorstWeatherDesktopCard,
  },
  data() {
    return {
      isLoaded: false,
      loading: false,
    }
  },
  computed: {
    ...mapState(useUserDataStore, [
      'getCoordinates',
      'getForecastFullData',
      'getFavoriteLocationList',
    ]),
  },

  watch: {
    getCoordinates: {
      deep: true,
      handler() {
        if (this.getCoordinates.origin === 'FROM_SEARCH') {
          this.getForecastFullDataFromAPI(this.getCoordinates)
          this.getAnalysisFullDataFromAPI(this.getCoordinates)
        }
      },
    },
  },
  mounted() {
    this.loading = true
    this.setUpAllData()
  },
  methods: {
    ...mapActions(useUserDataStore, [
      'setFavoriteLocation',
      'setAnalysisFulldata',
      'setCoordinates',
      'setForecastFulldata',
      'setUserGeoLocationData',
    ]),
    async setUpAllData() {
      this.getCoordinatesFromUser()
      console.info('set up data')
    },
    getCoordinatesFromUser() {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            let latitude = position.coords.latitude
            let longitude = position.coords.longitude
            let userCoordinatesTemp = {
              latitude: '',
              longitude: '',
            }
            userCoordinatesTemp.latitude = latitude
            userCoordinatesTemp.longitude = longitude
            this.setCoordinates(userCoordinatesTemp)
            console.info('userCoordinates initialized')
            this.getForecastFullDataFromAPI(userCoordinatesTemp)
            this.getAnalysisFullDataFromAPI(userCoordinatesTemp)
            this.getUserGeoLocationDataFromApi(userCoordinatesTemp)
          },
          (error) => {
            console.error(error.message)
          },
      )
    },
    async getForecastFullDataFromAPI(userCoordinatesTemp) {
      let long =
          Math.round((userCoordinatesTemp.longitude + Number.EPSILON) * 100) / 100
      let lat =
          Math.round((userCoordinatesTemp.latitude + Number.EPSILON) * 100) / 100
      let forecastUrl = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${long}/lat/${lat}/data.json`
      let forecastFullData = await smhiService.fetchData(forecastUrl)
      this.setForecastFulldata(forecastFullData)
      console.info('forecastFullData initialized')
    },
    async getUserGeoLocationDataFromApi(userCoordinatesTemp) {
      let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${userCoordinatesTemp.latitude}&lon=${userCoordinatesTemp.longitude}&apiKey=6c6c0640f23d468ab398e55bd11e17d9`
      let response = await fetch(url)
      let result = await response.json()
      this.userGeoLocationData = result
      this.setUserGeoLocationData(result)
      console.info('UserGeoLocationData initialized')
      this.loading = false
      this.isLoaded = true
    },
    async getAnalysisFullDataFromAPI(userCoordinatesTemp) {
      let long =
          Math.round((userCoordinatesTemp.longitude + Number.EPSILON) * 100) / 100
      let lat =
          Math.round((userCoordinatesTemp.latitude + Number.EPSILON) * 100) / 100
      let analysisUrl = `https://opendata-download-metanalys.smhi.se/api/category/mesan1g/version/2/geotype/point/lon/${long}/lat/${lat}/data.json`
      let result = await smhiService.fetchData(analysisUrl)
      this.setAnalysisFulldata(result)
      console.info('AnalysisFulldata initialized')
      this.cleanUpFavoriteList()
    },
    // TODO = Not working!
    cleanUpFavoriteList() {
      // let favoriteLocationList = this.getFavoriteLocationList.favorites;
      // let favoriteLocationListTemp = []
      // for (let favorite of favoriteLocationList){
      //   if (favorite != null){
      //     favoriteLocationListTemp.push(favorite)
      //   }
      // }
      // console.log(favoriteLocationListTemp);
      // this.setFavoriteLocation(favoriteLocationListTemp)
    },
  },
}
</script>

