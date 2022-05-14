<template>
  <search-component />
  <search-result-component />
</template>

<script>
import SearchComponent from '@/components/search/SearchComponent.vue'
import SearchResultComponent from '@/components/search/SearchResultComponent.vue'

export default {
  components: { SearchResultComponent, SearchComponent },
}
</script>

<style scoped></style>
