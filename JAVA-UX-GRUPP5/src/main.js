import { createApp } from "vue";
import App from "./App.vue";
import "./assets/resets.css";
import { createRouter, createWebHistory } from "vue-router";
import observations from "@/views/observations.vue";
import forecast from "@/views/forecast.vue";
import startView from "@/views/StartView.vue";
import tenDayView from "@/views/TenDayView.vue";
import summaryView from "@/views/SummaryView.vue";

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
      path:"/summary",
      name:"summaryView",
      component: summaryView,
    },
    //old below
    {
      path: "/observations",
      name: "observations",
      component: observations,
    },
    {
      path: "/forecast",
      name: "forecast",
      component: forecast,
    },
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
