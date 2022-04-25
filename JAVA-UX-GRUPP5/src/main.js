import { createApp } from 'vue'
import App from './App.vue'
import './assets/resets.css'
import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.vue'
import observations from '@/views/observations.vue'
import forecast from '@/views/forecast.vue'

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/observations',
            name: 'observations',
            component: observations
        },
        {
            path: '/forecast',
            name: 'forecast',
            component: forecast
        },
    ]
})

const app = createApp(App)
    app.use(router)
    app.mount('#app')
