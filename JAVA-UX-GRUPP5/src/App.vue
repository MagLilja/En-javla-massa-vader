<template>
  <search-bar-component/>
  <div class="site-container">
    <router-view/>
    <MqResponsive target="md+">
      <ten-day-desktop-card/>
      <summary
    </MqResponsive>
  </div>
  <MqResponsive target="sm-">
    <navbar-component/>
  </MqResponsive>

</template>
<script>
// noinspection NpmUsedModulesInstalled
import NavbarComponent from "@/components/navigation/NavbarComponent.vue";
// noinspection NpmUsedModulesInstalled
import SearchBarComponent from "@/components/navigation/TopNavBarComponent.vue";
import {MqResponsive} from "vue3-mq";
import TenDayDesktopCard from "@/components/desktopCards/TenDayDesktopCard";

export default {
  components: {
    TenDayDesktopCard,
    NavbarComponent,
    SearchBarComponent,
    MqResponsive,
  },
};
</script>

<style>
#app {

}
</style>
