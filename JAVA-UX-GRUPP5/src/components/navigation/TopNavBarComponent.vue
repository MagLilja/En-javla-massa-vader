<template>
  <div class="top-nav-bar-container">
    <router-link to="/search">
      <img class="search-icon"
           src="../../assets/icons/search-icon.svg"
           alt="search-icon"/>
    </router-link>

    <div class="top-nav-site-title">En jävla massa väder!</div>
  </div>
</template>
<style scoped>
.search-icon {
  width: clamp(2rem,10vw,12rem);
  margin: 0.3em;
}

.top-nav-bar-container {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  height: 4em;
  width: 100%;
  justify-content: start;

}

.top-nav-site-title {
  font-size: clamp(0.8em, 7vw, 2.5em);
  margin-left: 0.5em;
  font-weight: 600;
  white-space: nowrap;
}
</style>
