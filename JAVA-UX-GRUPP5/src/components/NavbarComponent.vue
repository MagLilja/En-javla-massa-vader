<template>
  <nav class="nav-bar-container">
    <div class="nav-bar-item">
      <router-link to="/"
        ><img src="./../assets/icons/main-view-icon.svg" alt="start-view-icon"
      /></router-link>
    </div>

    <div class="nav-bar-item">
      <router-link to="/ten-day-forecast"
        ><img src="./../assets/icons/10-day-view.svg" alt="10-day-view"
      /></router-link>
    </div>

    <div class="nav-bar-item">
      <router-link to="forecast"
        ><img src="./../assets/icons/summary-view.svg" alt="summary-view"
      /></router-link>
    </div>

    <div class="nav-bar-item">
      <router-link to="forecast"
        ><img src="./../assets/icons/worst-weather.svg" alt="worst-weather"
      /></router-link>
    </div>
    <div class="nav-bar-item">
      <router-link to="forecast"
        ><img src="./../assets/icons/favorite.svg" alt="favorite"
      /></router-link>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.nav-bar-container {
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100vw;
}
.nav-bar-item {
    padding: 0.2em;
  margin: 0.2em;
  border: 2px solid black;
}
.nav-bar-item img {

  width: 5rem;
}
</style>
