<template>
  <div v-if="userGeoLocationData">
    <div class="city-name"> {{ checkForGothenburg(userGeoLocationData.features[0].properties.city) }}
      <img class="heart" src="./../assets/icons/favorite.svg" alt="a heart">
    </div>

  </div>
</template>
<script>
export default {
  name: 'current-city-name-component',
  created() {
    this.getUserGeoLocationData();
  },
  props: {
    userCoordinates:[]
  },
  data(){
    return {
      userGeoLocationData:undefined,
    }
  },
  methods: {
    getNowDate() {
      let today = new Date();
      const options = {
        weekday: "long",
        day: "2-digit",
        month: "long",
      }
      let nowDate = today.toLocaleDateString('sv-SE', options)
      this.userNowDate = nowDate
    },
    checkForGothenburg(cityName){
      if(cityName === 'Gothenburg'){
        return "Göteborg"
      }
      return cityName
    },
    async getUserGeoLocationData() {
      var requestOptions = {
        method: 'GET',
      };
      let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${this.userCoordinates.latitude}&lon=${this.userCoordinates.longitude}&apiKey=6c6c0640f23d468ab398e55bd11e17d9`;
      let response = await fetch(url)
      let result = await response.json()
      this.userGeoLocationData = result;
      console.log(this.userGeoLocationData);
    },
    seTime(time) {
      const event = new Date(time);
      const options = {
        hour: "2-digit",
      };
      return event;
    },
  },
}
</script>

<style>
.heart {
  width:1em;
}

.city-name{
  font-size:2em;
}
</style>
