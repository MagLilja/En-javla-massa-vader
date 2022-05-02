<template>
  <search-bar-component/>
  <div class="site-container">

    <router-view/>
  </div>
  <navbar-component/>
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

}
</style>
