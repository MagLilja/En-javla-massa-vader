<template>
  <search-bar-component />

  <router-view />
  <navbar-component />
</template>
<script>
// noinspection NpmUsedModulesInstalled
import NavbarComponent from "@/components/navigation/NavbarComponent.vue";
// noinspection NpmUsedModulesInstalled
import SearchBarComponent from "@/components/navigation/TopNavBarComponent.vue";
export default {
  components: {
    NavbarComponent,
    SearchBarComponent,
  },
};
</script>

<style>
#app {

  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600&display=swap');
  font-family: 'Sora', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
