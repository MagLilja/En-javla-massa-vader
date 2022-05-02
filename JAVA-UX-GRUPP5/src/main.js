// noinspection JSCheckFunctionSignatures,NpmUsedModulesInstalled

import { createApp } from "vue";
import App from "./App.vue";
import "./assets/resets.css";
import "./assets/main.css";
import router from '@/router'
import { createPinia } from 'pinia'

const app = createApp(App);
app.use(router);
app.use(createPinia())
app.mount("#app");
