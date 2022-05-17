<template>
  <div class="top-nav-bar-container">
    <div class="transparent-nav rounded-full hover:bg-neutral-400 md:hidden">
      <router-link to="/search" class="search-link">
        <img
            class="search-icon"
            src="../../assets/icons/search-icon.svg"
            alt="search-icon"
        />
      </router-link>
    </div>

    <!--    This section only lives on md+ media-->
    <div
        class="hidden search-top-nav-mp-plus md:block"
        @click="toggleSearchResult()"
    >
      <div class="search-container relative">
        <img
            class="search-icon"
            src="../../assets/icons/search-icon.svg"
            alt="search-icon"
        />
        <search-component/>
        <div
            class="bg-[#c1e0ea] border-2 p-8 top-20 left-28 absolute w-[250px]"
            v-if="showSearch"
        >
          <search-result-component class=""/>
        </div>
      </div>
    </div>
    <div
        class="transparent-nav flex justify-center rounded-full hover:bg-neutral-400 w-24 md:hidden"
    >
      <router-link to="/about" class="hover:font-bold"
      ><img
          class="question-icon"
          src="../../assets/prototype_icons/question-solid.svg"
          alt="search-icon"
      /></router-link>
    </div>
  </div>
</template>

<script>
import SearchComponent from '@/components/search/SearchComponent.vue'
import {mapState} from 'pinia/dist/pinia'
import {useUserDataStore} from '@/stores/useUserDataStore'
import SearchResultComponent from '@/components/search/SearchResultComponent.vue'

export default {
  components: {SearchResultComponent, SearchComponent},
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
