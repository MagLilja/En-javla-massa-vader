<template>

  <section class="flex-column-center-2 start-view-section">

    <loading-component :loading="loading"/>
    <div class="flex flex-col items-center mt-20 md:mt-0">
      <div class="flex gap-5 ">
        <current-city-name-component class="text-[2em] font-bold"/>
        <favorite-check-component :location-data="locationData" />
      </div>
      <date-component class="text-4xl"/>
    </div>

    <circleComponent class="my-10"/>

  </section>

  <div class="md:hidden">
    <same-day-list-component/>
  </div>
</template>
<script>
import circleComponent from '@/components/start/CircleComponent.vue'
import WeatherWarningComponent from '@/components/start/WeatherWarningComponent.vue'
import SameDayListComponent from '@/components/dataLists/SameDayListComponent.vue'
import DateComponent from '@/components/global/DateComponent.vue'
import CurrentCityNameComponent from '@/components/global/CurrentCityNameComponent.vue'
import { MqResponsive } from 'vue3-mq'
import FavoriteCheckComponent from '@/components/favorite/FavoriteCheckComponent.vue'
import { useUserDataStore } from '@/stores/useUserDataStore.js'
import { mapState } from 'pinia'
import LoadingComponent from "@/components/global/LoadingComponent.vue";

export default {
  components: {
    LoadingComponent,
    FavoriteCheckComponent,
    CurrentCityNameComponent,
    WeatherWarningComponent,
    circleComponent,
    SameDayListComponent,
    DateComponent,
    MqResponsive,
  },
  computed: {
    ...mapState(useUserDataStore, ['getCoordinates', 'getUserGeoLocationData']),
  },
  created() {
    let locationDataTemp = {
      city: this.getUserGeoLocationData.features[0].properties.city,
      country: this.getUserGeoLocationData.features[0].properties.country,
      latitude: this.getCoordinates.latitude,
      longitude: this.getCoordinates.longitude,
      municipality: this.getUserGeoLocationData.features[0].properties.county,
    }
    this.locationData = locationDataTemp
  },
  data() {
    return {
      forecastFullData: undefined,
      completeDailyWxList: undefined,
      userCoordinates: undefined,
      locationData: undefined,
      loading:false,
    }
  },

  methods: {},
}
</script>
