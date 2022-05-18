// noinspection JSCheckFunctionSignatures,NpmUsedModulesInstalled

import {createApp} from 'vue'
import App from './App.vue'
import './index.css'
import './assets/css/resets.css'
import './assets/css/main.css'
import router from '@/router'
import {createPinia} from 'pinia'
import {library} from '@fortawesome/fontawesome-svg-core'
// Specify and add icons
import {faUserSecret} from '@fortawesome/free-solid-svg-icons'
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret)
library.add(faLocationArrow)

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
