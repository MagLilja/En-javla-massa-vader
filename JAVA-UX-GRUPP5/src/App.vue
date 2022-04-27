<template>
  <h1>En jävla massa väder</h1>
  <router-view />
  <navbar-component />
</template>
<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
export default {
  components: {
    NavbarComponent,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
