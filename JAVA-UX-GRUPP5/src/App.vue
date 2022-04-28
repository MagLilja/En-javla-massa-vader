<template>
  <search-bar-component />
  <h1>En jävla massa väder</h1>
  <router-view />
  <navbar-component />
</template>
<script>
// noinspection NpmUsedModulesInstalled
import NavbarComponent from "@/components/navigation/NavbarComponent.vue";
// noinspection NpmUsedModulesInstalled
import SearchBarComponent from "@/components/navigation/SearchBarComponent.vue";
export default {
  components: {
    NavbarComponent,
    SearchBarComponent,
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
