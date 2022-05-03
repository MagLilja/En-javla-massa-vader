<template>
  <load-data-component/>
  <top-nav-bar-component/>
  <MqResponsive class="start-view-weather-warning-component-md-plus" target="md+">
    <weather-warning-component/>
  </MqResponsive>
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
import TopNavBarComponent from "@/components/navigation/TopNavBarComponent.vue";
import {MqResponsive} from "vue3-mq";
import TenDayDesktopCard from "@/components/desktopCards/TenDayDesktopCard.vue";
import SummaryDesktopCard from "@/components/desktopCards/SummaryDesktopCard.vue";
import TwentyFourForecastDesktopCard from "@/components/desktopCards/TwentyFourForecastDesktopCard.vue";
import WeatherWarningComponent from "@/components/start/WeatherWarningComponent.vue";
import LoadDataComponent from "@/components/start/LoadDataComponent.vue";

export default {
  components: {
    TenDayDesktopCard,
    NavbarComponent,
    TopNavBarComponent,
    MqResponsive,
    SummaryDesktopCard,
    TwentyFourForecastDesktopCard,
    WeatherWarningComponent,
    LoadDataComponent,
  },
};
</script>

<style>
#app {

}
</style>
