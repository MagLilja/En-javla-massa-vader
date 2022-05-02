// noinspection JSCheckFunctionSignatures,NpmUsedModulesInstalled

import { createApp } from "vue";
import App from "./App.vue";
import "./assets/resets.css";
import "./assets/main.css";
import router from '@/router'
import { createPinia } from 'pinia'
import { Vue3Mq } from "vue3-mq";

const app = createApp(App);
app.use(router);
app.use(createPinia())
app.use(Vue3Mq,{
    preset: 'bootstrap5'
});


app.mount("#app");
