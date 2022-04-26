import { createApp } from "vue";
import App from "./App.vue";
import "./assets/resets.css";
import "./assets/main.css";
import { createRouter, createWebHistory } from "vue-router";
import observations from "@/views/observations.vue";
import homeView from "@/views/homeView.vue";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "homeView",
      component: homeView,
    },
    {
      path: "/observations",
      name: "observations",
      component: observations,
    },
    // {
    //   path: "/forecast",
    //   name: "forecast",
    //   component: forecast,
    // },
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
