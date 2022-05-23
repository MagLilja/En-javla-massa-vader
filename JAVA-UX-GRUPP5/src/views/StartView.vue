<template>
  <section class="flex-column-center-2 ">
    <loading-component :loading="loading"/>
    <div class="flex flex-col items-center mt-20 md:mt-0">
<!--      <weather-warning-component class="md:hidden"></weather-warning-component>-->
      <div class="flex gap-5 mt-20 md:mt-0">
        <current-city-name-component class="text-[2em] font-bold"/>
        <favorite-check-component :location-data="locationData"/>
      </div>
      <date-component class="text-4xl"/>
    </div>

    <circleComponent class="my-10"/>
  </section>

  <div class="md:hidden flex  flex-col items-center mb-48">
    <same-day-list-component/>
  </div>
</template>
<script>
import circleComponent from '@/components/start/CircleComponent.vue'
import SameDayListComponent from '@/components/dataLists/SameDayListComponent.vue'
import DateComponent from '@/components/global/DateComponent.vue'
import CurrentCityNameComponent from '@/components/global/CurrentCityNameComponent.vue'
import FavoriteCheckComponent from '@/components/favorite/FavoriteCheckComponent.vue'
import {useUserDataStore} from '@/stores/useUserDataStore.js'
import {mapState} from 'pinia'
import LoadingComponent from '@/components/global/LoadingComponent.vue'
import WeatherWarningComponent from "@/components/global/WeatherWarningComponent.vue";

export default {
  components: {
    WeatherWarningComponent,
    LoadingComponent,
    FavoriteCheckComponent,
    CurrentCityNameComponent,
    circleComponent,
    SameDayListComponent,
    DateComponent,
  },
  data() {
    return {
      forecastFullData: undefined,
      completeDailyWxList: undefined,
      userCoordinates: undefined,
      locationData: undefined,
      loading: false,
    }
  },
  computed: {
    ...mapState(useUserDataStore, ['getCoordinates', 'getUserGeoLocationData']),
  },
  created() {
    this.locationData = {
      city: this.getUserGeoLocationData.features[0].properties.city,
      country: this.getUserGeoLocationData.features[0].properties.country,
      latitude: this.getCoordinates.latitude,
      longitude: this.getCoordinates.longitude,
      municipality: this.getUserGeoLocationData.features[0].properties.county,
    }
  },

}
</script>
