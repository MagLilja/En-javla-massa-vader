<template>
  <div v-if="loading" class="flex flex-col items-center">
    <div class="loader"></div>
    <div>Tålamod...</div>
  </div>
</template>

<script>
export default {
  name: 'LoadingComponent',
  props: {
    loading: String,
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.loader {
  border: 16px solid var(--primary-color-lightgrey);
  border-top: 16px solid var(--primary-color-greyishblue);
  border-radius: 50%;
  width: 84px;
  aspect-ratio: 1;
  animation: spin 2s linear infinite;
  margin-top: 30vh;
  margin-bottom: 2em;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
