<template>
<!--  <div class="absolute w-full h-full bg-red-500 z-[5] transparent-nav" v-if="toggleBackgroundBlur"></div>-->
  <div class="top-nav-bar-container relative">
    <div
        v-if="showAbout"
        class="transparent-box  border-2 p-8 left-0 right-0 m-auto absolute w-[350px] shadow-xl z-10 hidden md:block"
    >
      <AboutDesktopCard></AboutDesktopCard>
      <img src="../../assets/prototype_icons/rectangle-xmark-solid.svg" alt="" class="w-12 absolute -top-5 -right-5" @click="closeAll()">
    </div>

    <div
        v-if="showFavorite"
        class="transparent-box  border-2 p-8 left-0 right-0 m-auto absolute w-[350px] h-[750px] shadow-xl hidden md:block"
    >
      <favorite-desktop-card/>

      <img src="../../assets/prototype_icons/rectangle-xmark-solid.svg" alt="" class="w-12 absolute -top-5 -right-5 z-20" @click="closeAll()">
    </div>





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
      <div class="transparent-nav flex justify-center rounded-full hover:bg-neutral-400 md:hidden " >
       <router-link to="/about" >
        <img
            class="question-icon"
            src="../../assets/prototype_icons/question-solid.svg"
            alt="search-icon"

        /></router-link>

      </div>

      <div class="transparent-nav flex justify-center rounded-full hover:bg-neutral-400 hidden md:block" >

          <img
              class="question-icon"
              src="../../assets/prototype_icons/question-solid.svg"
              alt="search-icon"
              @click="toggleAbout()"
          />

      </div>

      <div class="transparent-nav flex justify-center rounded-full hover:bg-neutral-400 ">
        <img
            class="question-icon"
            src="../../assets/prototype_icons/favorite.svg"
            alt="search-icon"
            @click="toggleFavorite()"

        />
<!--        v-click-outside="onClickOutside()"-->

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
      toggleBackgroundBlur: false
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
      this.toggleBackgroundBlur = true
      this.showAbout = false
      this.showFavorite = false
    },
    toggleAbout() {
      this.showAbout = !this.showAbout
      this.toggleBackgroundBlur = true
      this.showSearch = false
      this.showFavorite = false
    },
    toggleFavorite() {
      this.showFavorite = !this.showFavorite
      this.toggleBackgroundBlur = true
      this.showSearch = false
      this.showAbout = false
    },
    closeAll() {
      this.toggleBackgroundBlur = false
      this.showSearch = false
      this.showAbout = false
      this.showFavorite = false
    }
  },
}
</script>

