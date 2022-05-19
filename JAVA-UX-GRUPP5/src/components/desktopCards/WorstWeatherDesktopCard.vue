<template>
  <div class="desktop-card">
    <div class="desktop-card-header">
      <div class="desktop-card-icon">
        <img src="../../assets/icons/Vector.svg" alt="" />
      </div>
      <div class="desktop-card-header-text">Sämre väder</div>
    </div>
    <div class="desktop-data-card-body">
      <worst-weather-view></worst-weather-view>
    </div>
  </div>
</template>
<script>
import WorstWeatherView from '@/views/WorstWeatherView.vue'

export default {
  name: 'worst-weather-day-desktop-card',
  components: { WorstWeatherView },
}
</script>
