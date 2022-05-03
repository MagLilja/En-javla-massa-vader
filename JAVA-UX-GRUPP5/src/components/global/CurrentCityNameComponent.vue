<template>
  <div v-if="userGeoLocationData">
    <div class="city-name"> {{ checkForGothenburg(userGeoLocationData.features[0].properties.city) }}

    </div>

    <!--    {{getRoundedCoordinate(getCoordinates.longitude)}}-->
    <!--    {{getRoundedCoordinate(userGeoLocationData.features[0].geometry.coordinates[0])}}-->
    <!--    {{getRoundedCoordinate(getUserGeoLocationData.features[0].geometry.coordinates[0])}}-->
  </div>
</template>
<script>
import {useUserDataStore} from "@/stores/useUserDataStore.js"
import {mapState, mapActions} from 'pinia'

export default {
  name: 'current-city-name-component',
  created() {
    this.getUserGeoLocationDataFromApi();
  },
  data() {
    return {
      userGeoLocationData: undefined,
      coordinates: this.getCoordinates,
    }
  },
  computed: {
    ...mapState(useUserDataStore, ["getCoordinates", "getUserGeoLocationData"])
  },
  methods: {
    checkForGothenburg(cityName) {
      if (cityName === 'Gothenburg') {
        return "Göteborg"
      }
      return cityName
    },
    getRoundedCoordinate(v) {
      return (Math.round((v + Number.EPSILON) * 100) / 100)
    },
    async getUserGeoLocationDataFromApi() {
      var requestOptions = {
        method: 'GET',
      };
      let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${this.getCoordinates.latitude}&lon=${this.getCoordinates.longitude}&apiKey=6c6c0640f23d468ab398e55bd11e17d9`;
      // if the coordinates in the Store match the geolocation data coordinates in the Store
      if (
          this.getRoundedCoordinate(this.getCoordinates.longitude)
          ===
          this.getRoundedCoordinate(this.getUserGeoLocationData.features[0].geometry.coordinates[0])) {
        console.log("Already got UserGeoLocationData for this coordinates");
        console.log(this.getRoundedCoordinate(this.getUserGeoLocationData.features[0].geometry.coordinates[0]));
        this.userGeoLocationData = this.getUserGeoLocationData
      }
      // if the coordinates in the Store doesnt match the geolocation data coordinates in the Store get new geolocation data
      else {
        let response = await fetch(url)
        let result = await response.json()
        this.userGeoLocationData = result;
        this.setUserGeoLocationData(result)
        console.log(this.userGeoLocationData);
      }

    },
    seTime(time) {
      const event = new Date(time);
      const options = {
        hour: "2-digit",
      };
      return event;
    },
    ...mapActions(useUserDataStore, ["setUserGeoLocationData"]),
  },

}
</script>

<style>
.heart {
  width: 1em;
}

.city-name {
  font-size: 2em;
}
</style>
