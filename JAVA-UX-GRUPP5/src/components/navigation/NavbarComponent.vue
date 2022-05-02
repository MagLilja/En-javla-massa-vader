<template>
  <nav class="nav-bar-container">
    <router-link class="nav-bar-item" to="/"
      ><img src="../../assets/icons/main-view-icon.svg" alt="start-view-icon"
    /></router-link>

    <router-link class="nav-bar-item" to="/ten-day-forecast"
      ><img src="../../assets/icons/10-day-view.svg" alt="10-day-view"
    /></router-link>

    <router-link class="nav-bar-item" to="/summary"
      ><img src="../../assets/icons/summary-view.svg" alt="summary-view"
    /></router-link>

    <router-link class="nav-bar-item" to="/worst-weather"
      ><img src="../../assets/icons/worst-weather.svg" alt="worst-weather"
    /></router-link>

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
