<template>

<search-component/>
  <search-result-component/>


</template>

<script>

import SearchComponent from "@/components/global/SearchComponent.vue";
import SearchResultComponent from "@/components/global/SearchResultComponent.vue";

export default {
  components: {SearchResultComponent, SearchComponent}
}
</script>

<style scoped>

</style>