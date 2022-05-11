import { createRouter, createWebHistory } from 'vue-router'
import startView from '@/views/StartView.vue'
import tenDayView from '@/views/TenDayView.vue'
import summaryView from '@/views/SummaryView.vue'
import worstWeatherView from '@/views/WorstWeatherView.vue'
import favoriteView from '@/views/FavoriteView.vue'
import searchView from '@/views/SearchView.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'startView',
      component: startView,
    },

    {
      path: '/ten-day-forecast',
      name: 'tenDayView',
      component: tenDayView,
    },
    {
      path: '/summary',
      name: 'summaryView',
      component: summaryView,
    },
    {
      path: '/worst-weather',
      name: 'worstWeather',
      component: worstWeatherView,
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: favoriteView,
    },
    {
      path: '/search',
      name: 'searchView',
      component: searchView,
    },
  ],
})

export default router
