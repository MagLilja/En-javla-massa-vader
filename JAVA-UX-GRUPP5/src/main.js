import { createApp } from "vue";
import App from "./App.vue";
import "./assets/resets.css";
import { createRouter, createWebHistory } from "vue-router";
import startView from "@/views/StartView.vue";
import tenDayView from "@/views/TenDayView.vue";
import summaryView from "@/views/SummaryView.vue";
import worstWeatherView from "@/views/WorstWeatherView.vue";
import favoriteView from "@/views/FavoriteView.vue";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "startView",
      component: startView,
    },
    {
      path: "/ten-day-forecast",
      name: "tenDayView",
      component: tenDayView,
    },
    {
      path: "/summary",
      name: "summaryView",
      component: summaryView,
    },
    {
      path: "/worst-weather",
      name: "worstWeather",
      component: worstWeatherView,
    },
    {
      path: "/favorite",
      name: "favorite",
      component: favoriteView,
    },
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
