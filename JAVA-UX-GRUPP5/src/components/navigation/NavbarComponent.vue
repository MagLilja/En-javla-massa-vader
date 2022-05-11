<template>
  <nav class="nav-bar-container transparent-nav">
    <router-link class="nav-bar-item" to="/"
      ><img
        src="../../assets/prototype_icons/cloud-sun-solid.svg"
        alt="start-view-icon"
    /></router-link>

    <router-link class="nav-bar-item" to="/ten-day-forecast"
      ><img
        src="../../assets/prototype_icons/calendar-regular.svg"
        alt="10-day-view"
    /></router-link>

    <router-link class="nav-bar-item" to="/summary"
      ><img
        src="../../assets/prototype_icons/Vect213or.svg      "
        alt="summary-view"
    /></router-link>

    <router-link class="nav-bar-item" to="/worst-weather">
      <!--      <div class="worst-weather-top-icon-container"><img src="../../assets/prototype_icons/Vectasdsdor.svg"-->
      <!--                                                         alt="worst-weather"/></div>-->
      <!--      <div class="worst-weather-bottom-icons-container"> <img src="../../assets/prototype_icons/wind-solid%201.svg"-->
      <!--                                                               alt="worst-weather"/>-->
      <img
        src="../../assets/prototype_icons/snowflake-solid.svg"
        alt="worst-weather"
      />
      <!--      </div> -->
    </router-link>

    <router-link class="nav-bar-item" to="favorite"
      ><img src="../../assets/icons/favorite.svg" alt="favorite"
    /></router-link>
  </nav>
</template>

<script>
export default {}
</script>

<!--suppress CssUnusedSymbol -->
<style scoped></style>
