<template>

  <router-view/>
  <nav-component></nav-component>
</template>

<script>
import navComponent from "@/components/navComponent.vue";

export default {
  components: {
    navComponent,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;1,400;1,500&family=Ubuntu+Mono&display=swap');

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
