<template>
  <search-bar-component/>
  <div class="site-container">
    <router-view/>
    <MqResponsive class="md-plus-target" target="md+">
      <twenty-four-forecast-desktop-card/>
      <ten-day-desktop-card/>
      <summary-desktop-card/>
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
import TenDayDesktopCard from "@/components/desktopCards/TenDayDesktopCard.vue";
import SummaryDesktopCard from "@/components/desktopCards/SummaryDesktopCard.vue";
import TwentyFourForecastDesktopCard from "@/components/desktopCards/TwentyFourForecastCard.vue";

export default {
  components: {
    TenDayDesktopCard,
    NavbarComponent,
    SearchBarComponent,
    MqResponsive,
    SummaryDesktopCard,
    TwentyFourForecastDesktopCard,
  },
};
</script>

<style>
#app {

}
</style>
