<template>
  <div class="search-bar-container">
    <router-link to="/search"
      ><img
        class="search-icon"
        src="../../assets/icons/search-icon.svg"
        alt="search-icon"
    /></router-link>
  </div>
</template>
<style>
.search-icon {
  width: 5rem;
}
.search-bar-container {
  position: fixed;
  top: 0;
}
</style>
