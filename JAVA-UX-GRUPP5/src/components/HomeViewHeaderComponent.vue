<template>
  <div class="home_view_city_title_container"><h2 v-if="userGeoLocationData" class="home-view-title">
    {{ userGeoLocationData.features[0].properties.city }}</h2>
    <img src="./../assets/icons/iconfinder_heart_211673.svg" class="home_view_city_title_heart" alt="a heart">

  </div>
  <div class="home-view-date">{{ userNowDate }}</div>

</template>
<script>
export default {
  name: 'home-view-header-component',
  props: {
    userGeoLocationData: {},
    userNowDate: {}
  }
}
</script>