<template>
  <nav class="nav-bar-container">
    <router-link class="nav-bar-item" to="/"
      ><img src="../../assets/prototype%20icons/cloud-sun-solid%201.svg" alt="start-view-icon"
    /></router-link>

    <router-link class="nav-bar-item" to="/ten-day-forecast"
      ><img src="../../assets/prototype%20icons/calendar-regular%201.svg" alt="10-day-view"
    /></router-link>

    <router-link class="nav-bar-item" to="/summary"
      ><img src="../../assets/prototype%20icons/Vect213or.svg      " alt="summary-view"
    /></router-link>

    <router-link class="nav-bar-item " to="/worst-weather"
      >
<!--      <div class="worst-weather-top-icon-container"><img src="../../assets/prototype%20icons/Vectasdsdor.svg"-->
<!--                                                         alt="worst-weather"/></div>-->
<!--      <div class="worst-weather-bottom-icons-container"> <img src="../../assets/prototype%20icons/wind-solid%201.svg"-->
<!--                                                               alt="worst-weather"/>-->
        <img src="../../assets/prototype%20icons/snowflake-solid%201.svg" alt="worst-weather"/>
<!--      </div> -->
    </router-link>

    <router-link class="nav-bar-item" to="favorite"
      ><img src="../../assets/icons/favorite.svg" alt="favorite"
    /></router-link>
  </nav>
</template>

<script>
export default {};
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>

</style>
