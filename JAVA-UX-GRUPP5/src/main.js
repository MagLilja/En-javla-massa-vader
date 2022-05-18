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

app.directive("click-outside", {
    bind(el, binding, vnode) {
        el.clickOutsideEvent = (event) => {
            if (!(el === event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
    },
    unbind(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
    },
});



app.mount("#app");
