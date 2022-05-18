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

    >
      <div class="search-container relative">
        <img
            class="search-icon"
            src="../../assets/icons/search-icon.svg"
            alt="search-icon"
        />
        <div class="x" @click="toggleSearchResult()">
          <search-component />
        </div>
        <div
            v-if="showSearch"
            class="transparent-box  border-2 p-8 top-20 left-28 absolute w-[250px] shadow-xl"
        >
          <search-result-component class=""/>
        </div>
      </div>
    </div>

    <div class="flex gap-10 relative">
      <div class="transparent-nav flex justify-center rounded-full hover:bg-neutral-400 " @click="toggleAbout()">
        <img
            class="question-icon"
            src="../../assets/prototype_icons/question-solid.svg"
            alt="search-icon"
        />

        <div
            v-if="showAbout"
            class="transparent-box  border-2 p-8 top-[35px] right-[130px] absolute w-[350px] shadow-xl z-10"
        >
          <AboutDesktopCard></AboutDesktopCard>
        </div>
      </div>

      <div class="transparent-nav flex justify-center rounded-full hover:bg-neutral-400 " @click="toggleFavorite()">
        <img
            class="question-icon"
            src="../../assets/prototype_icons/favorite.svg"
            alt="search-icon"
        />

        <div
            v-if="showFavorite"
            class="transparent-box  border-2 p-8 top-[35px] right-[35px] absolute w-[350px] shadow-xl z-10"
        >
          <favorite-desktop-card/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import SearchComponent from '@/components/search/SearchComponent.vue'
import {mapState} from 'pinia/dist/pinia'
import {useUserDataStore} from '@/stores/useUserDataStore'
import SearchResultComponent from '@/components/search/SearchResultComponent.vue'
import FavoriteDesktopCard from "@/components/desktopCards/FavoriteDesktopCard.vue";
import AboutDesktopCard from "@/components/desktopCards/AboutDesktopCard.vue";

export default {
  components: {FavoriteDesktopCard, SearchResultComponent, SearchComponent, AboutDesktopCard},
  data() {
    return {
      showSearch: false,
      showAbout: false,
      showFavorite: false,
    }
  },
  computed: {
    ...mapState(useUserDataStore, ['getSearchData']),
  },
  watch: {
    getSearchData: {
      deep: true,
      handler() {
        this.showSearch = true
      },
    },
  },
  methods: {
    toggleSearchResult() {
      this.showSearch = !this.showSearch
      this.showAbout = false
      this.showFavorite = false
    },
    toggleAbout() {
      this.showAbout = !this.showAbout
      this.showSearch = false
      this.showFavorite = false
    },
    toggleFavorite() {
      this.showFavorite = !this.showFavorite
      this.showSearch = false
      this.showAbout = false
    },
  },
}
</script>

