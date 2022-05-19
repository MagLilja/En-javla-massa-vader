<template>
  <div class="desktop-card">
    <div class="desktop-card-header">
      <div class="desktop-card-icon">
        <img src="../../assets/icons/calendar-regular.svg" alt="" />
      </div>
      <div class="desktop-card-header-text">Samman-fattning</div>
    </div>
    <div class="desktop-data-card-body">
      <summary-view></summary-view>
    </div>
  </div>
</template>
<script>
import SummaryView from '@/views/SummaryView.vue'

export default {
  name: 'summary-desktop-card',
  components: { SummaryView },
}
</script>
