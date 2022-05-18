// noinspection JSCheckFunctionSignatures,NpmUsedModulesInstalled

import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "./assets/css/resets.css";
import "./assets/css/main.css";
import router from "@/router";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");
