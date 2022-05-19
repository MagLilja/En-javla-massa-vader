<template>
  <div class="desktop-card">
    <div class="desktop-card-header">
      <div class="desktop-card-icon">
        <img src="../../assets/icons/calendar-regular.svg" alt="" />
      </div>
      <div class="desktop-card-header-text">Om oss</div>
    </div>
    <div class="desktop-data-card-body">
      <about-view/>
    </div>
  </div>
</template>
<script>
import AboutView from "@/views/AboutView.vue";

export default {
  name: 'favorite-desktop-card',
  components: {AboutView },
}
</script>
