<template>
  <nav class="nav-bar-container transparent-nav">
    <router-link class="nav-bar-item" to="/"
      ><img
        src="../../assets/icons/cloud-sun-solid.svg"
        alt="start-view-icon"
    /></router-link>

    <router-link class="nav-bar-item" to="/ten-day-forecast"
      ><img
        src="../../assets/icons/calendar-regular.svg"
        alt="10-day-view"
    /></router-link>

    <router-link class="nav-bar-item" to="/summary"
      ><img
        src="../../assets/icons/Vect213or.svg      "
        alt="summary-view"
    /></router-link>

    <router-link class="nav-bar-item" to="/worst-weather">
      <img
        src="../../assets/icons/snowflake-solid.svg"
        alt="worst-weather"
      />
    </router-link>

    <router-link class="nav-bar-item" to="favorite"
      ><img src="../../assets/icons/favorite.svg" alt="favorite"
    /></router-link>
  </nav>
</template>


