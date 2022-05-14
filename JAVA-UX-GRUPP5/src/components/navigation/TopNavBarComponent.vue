<template>
  <div class="top-nav-bar-container">
    <MqResponsive target="sm-" class="transparent-nav rounded-full hover:bg-neutral-400 ">
      <router-link to="/search" class="search-link">
        <img
          class="search-icon"
          src="../../assets/icons/search-icon.svg"
          alt="search-icon"
        />
      </router-link>
    </MqResponsive>

    <!--    This section only lives on md+ media-->
    <MqResponsive target="md+" class="search-top-nav-mp-plus">
      <div class="search-container">
        <img
          class="search-icon"
          src="../../assets/icons/search-icon.svg"
          alt="search-icon"
        />
        <search-component @click="toggleSearchResult()" />
      </div>

      <div class="search-box" v-if="showSearch">
        <search-result-component class="search-result-box-md-plus" />
      </div>
    </MqResponsive>

    <div class="favorite-link">
      <img
        class="favorite-icon"
        src="../../assets/icons/favorite.svg"
        alt="search-icon"
      />
    </div>
  </div>
</template>

<script>
import { MqResponsive } from 'vue3-mq'
import SearchComponent from '@/components/search/SearchComponent.vue'
import { mapState } from 'pinia/dist/pinia'
import { useUserDataStore } from '@/stores/useUserDataStore'
import SearchResultComponent from '@/components/search/SearchResultComponent.vue'

export default {
  components: { SearchResultComponent, MqResponsive, SearchComponent },
  data() {
    return {
      showSearch: false,
    }
  },
  computed: {
    ...mapState(useUserDataStore, ['getSearchData']),
  },
  methods: {
    toggleSearchResult() {
      this.showSearch = !this.showSearch
      console.log('hej')
    },
  },
  watch: {
    getSearchData: {
      deep: true,
      handler() {
        this.showSearch = true
      },
    },
  },
}
</script>
<style scoped>
.search-box {
}
</style>
